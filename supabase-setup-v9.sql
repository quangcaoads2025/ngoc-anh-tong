-- NGỌC ANH CMS V9 - SUPABASE SETUP AN TOÀN, CÓ THỂ CHẠY LẠI
-- Chạy toàn bộ file trong Supabase > SQL Editor > New query.
-- File này KHÔNG chứa khóa API.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_label text,
  description text,
  website_url text,
  image_url text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  area text,
  product_interest text,
  message text,
  source text default 'Website Hệ Thống Ngọc Anh',
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','invalid')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists trg_settings_updated_at on public.site_settings;
create trigger trg_settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();
drop trigger if exists trg_brands_updated_at on public.brands;
create trigger trg_brands_updated_at before update on public.brands
for each row execute function public.set_updated_at();
drop trigger if exists trg_faqs_updated_at on public.faqs;
create trigger trg_faqs_updated_at before update on public.faqs
for each row execute function public.set_updated_at();
drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at before update on public.leads
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), 'editor')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users for each row execute function public.handle_new_user();

-- Bổ sung profile cho tài khoản Auth đã tạo trước khi cài trigger.
insert into public.profiles (id, full_name, role)
select id, coalesce(raw_user_meta_data->>'full_name', split_part(email,'@',1)), 'editor'
from auth.users
on conflict (id) do nothing;

create or replace function public.is_cms_user()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','editor')
  );
$$;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.brands enable row level security;
alter table public.faqs enable row level security;
alter table public.leads enable row level security;

-- Xóa policy cũ trước khi tạo lại để file có thể chạy nhiều lần.
drop policy if exists "public read settings" on public.site_settings;
drop policy if exists "public read visible brands" on public.brands;
drop policy if exists "public read visible faqs" on public.faqs;
drop policy if exists "public submit leads" on public.leads;
drop policy if exists "cms read own profile" on public.profiles;
drop policy if exists "cms update own profile" on public.profiles;
drop policy if exists "cms manage settings" on public.site_settings;
drop policy if exists "cms manage brands" on public.brands;
drop policy if exists "cms manage faqs" on public.faqs;
drop policy if exists "cms manage leads" on public.leads;
drop policy if exists "cms update leads" on public.leads;
drop policy if exists "cms delete leads" on public.leads;

create policy "public read settings" on public.site_settings
for select to anon, authenticated using (true);
create policy "public read visible brands" on public.brands
for select to anon, authenticated using (is_visible = true or public.is_cms_user());
create policy "public read visible faqs" on public.faqs
for select to anon, authenticated using (is_visible = true or public.is_cms_user());
create policy "public submit leads" on public.leads
for insert to anon, authenticated with check (
  length(trim(full_name)) between 2 and 120
  and phone ~ '^0[0-9]{9}$'
);
create policy "cms read own profile" on public.profiles
for select to authenticated using (id = auth.uid() or public.is_cms_user());
create policy "cms update own profile" on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "cms manage settings" on public.site_settings
for all to authenticated using (public.is_cms_user()) with check (public.is_cms_user());
create policy "cms manage brands" on public.brands
for all to authenticated using (public.is_cms_user()) with check (public.is_cms_user());
create policy "cms manage faqs" on public.faqs
for all to authenticated using (public.is_cms_user()) with check (public.is_cms_user());
create policy "cms manage leads" on public.leads
for select to authenticated using (public.is_cms_user());
create policy "cms update leads" on public.leads
for update to authenticated using (public.is_cms_user()) with check (public.is_cms_user());
create policy "cms delete leads" on public.leads
for delete to authenticated using (public.is_cms_user());

insert into storage.buckets (id, name, public)
values ('site-media','site-media',true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public view site media" on storage.objects;
drop policy if exists "cms upload site media" on storage.objects;
drop policy if exists "cms update site media" on storage.objects;
drop policy if exists "cms delete site media" on storage.objects;

create policy "public view site media" on storage.objects
for select to anon, authenticated using (bucket_id = 'site-media');
create policy "cms upload site media" on storage.objects
for insert to authenticated with check (bucket_id = 'site-media' and public.is_cms_user());
create policy "cms update site media" on storage.objects
for update to authenticated using (bucket_id = 'site-media' and public.is_cms_user())
with check (bucket_id = 'site-media' and public.is_cms_user());
create policy "cms delete site media" on storage.objects
for delete to authenticated using (bucket_id = 'site-media' and public.is_cms_user());

-- Initial content
insert into public.site_settings(key,value) values
('utility_message','Hệ thống ô tô – xe máy đa thương hiệu tại Cà Mau'),
('brand_name','HỆ THỐNG NGỌC ANH'),
('brand_tagline','Niềm tin của mọi nhà'),
('hero_eyebrow','HỆ THỐNG Ô TÔ – XE MÁY NGỌC ANH'),
('hero_title_html','Một hệ sinh thái.<br><em>Nhiều lựa chọn đúng nhu cầu.</em>'),
('hero_lead','Kết nối xe máy, ô tô, xe điện, xe tải nhẹ và dịch vụ hậu mãi trong cùng một hệ thống — giúp khách hàng dễ chọn, dễ mua và an tâm sử dụng.'),
('hero_primary_text','Khám phá hệ sinh thái'),
('hero_phone_text','Gọi 1900 9270'),
('trust_1','Uy tín 30+ năm'),
('trust_2','Đại lý ủy quyền'),
('trust_3','Trả góp linh hoạt'),
('ecosystem_label','HỆ SINH THÁI THƯƠNG HIỆU'),
('ecosystem_title_html','Các thương hiệu thuộc <em>Hệ thống Ngọc Anh</em>'),
('ecosystem_description','Mỗi thương hiệu là một website chuyên biệt, được vận hành đồng bộ trong cùng một hệ thống đa nền tảng — giúp khách hàng tìm đúng dòng xe, đúng dịch vụ và đúng bộ phận phụ trách.'),
('about_label','VỀ HỆ THỐNG NGỌC ANH'),
('about_title_html','Một thương hiệu trung tâm.<br><em>Nhiều nền tảng chuyên ngành.</em>'),
('about_description','Website được xây dựng như một bản đồ hệ sinh thái, giúp khách hàng hiểu nhanh các nhóm phương tiện Ngọc Anh đang cung cấp và kết nối đúng đội ngũ phụ trách.'),
('contact_label','KẾT NỐI TƯ VẤN'),
('contact_title_html','Chọn đúng dòng xe.<br><em>Kết nối đúng đội ngũ.</em>'),
('contact_description','Để lại thông tin để đội ngũ Ngọc Anh kết nối đúng thương hiệu và nhóm sản phẩm phù hợp với nhu cầu của bạn.'),
('faq_label','THÔNG TIN NHANH'),
('faq_title_html','Giải đáp trước khi <em>lựa chọn phương tiện.</em>'),
('faq_description','Một số thông tin thường được khách hàng quan tâm khi tìm hiểu thương hiệu, giá bán, trải nghiệm xe, trả góp và dịch vụ sau bán hàng.'),
('footer_description','Hệ sinh thái xe máy, ô tô, xe điện, xe tải nhẹ và dịch vụ hậu mãi tại Cà Mau.'),
('seo_title','Hệ Thống Ngọc Anh Cà Mau | Ô tô, Xe máy, Xe điện & Xe tải'),
('seo_description','Hệ sinh thái phương tiện đa thương hiệu tại Cà Mau: xe máy, ô tô điện, ô tô du lịch, xe tải nhẹ, xe van và dịch vụ hậu mãi đồng bộ.'),
('hotline_text','1900 9270'),
('hotline_href','tel:19009270'),
('email_text','kinhdoanh@ngocanhcm.vn'),
('email_href','mailto:kinhdoanh@ngocanhcm.vn'),
('address_text','144 Nguyễn Tất Thành, Phường 8, TP. Cà Mau')
on conflict (key) do nothing;

insert into public.brands(name,category_label,description,website_url,image_url,sort_order,is_visible)
select * from (values
('Hệ thống Xe máy Ngọc Anh','01 · XE MÁY','Danh mục xe máy đa thương hiệu phục vụ nhu cầu đi học, đi làm, di chuyển gia đình và lựa chọn phương tiện tiết kiệm.','https://ngocanhcm.vn/','assets/xe-may-tong.webp',1,true),
('BYD Thành Công Cà Mau','02 · Ô TÔ ĐIỆN & PHEV','Giải pháp ô tô điện và PHEV, hỗ trợ trải nghiệm xe, dự toán chi phí và chăm sóc sau bán hàng.','https://bydthanhcong.vn/','assets/byd-sealion-card.webp',2,true),
('VinFast Ngọc Anh Cà Mau','03 · HỆ SINH THÁI ĐIỆN','Ô tô điện, xe máy điện, phụ kiện và dịch vụ bảo dưỡng, sửa chữa theo mô hình 3S.','https://vinfast3scamau.com/','assets/vinfast-banner-card.webp',3,true),
('Suzuki Ngọc Anh','04 · XE DU LỊCH & XE TẢI','Xe du lịch cho gia đình và xe tải phục vụ vận chuyển, giao nhận và hoạt động kinh doanh.','https://suzukingocanh.vn/','assets/suzuki-banner-card.webp',4,true),
('Teraco Ngọc Anh','05 · XE TẢI NHẸ & XE VAN','Xe tải nhẹ, xe van và nhiều cấu hình thùng phù hợp nhu cầu vận chuyển trong đô thị.','https://teracongocanh.vn/','assets/teraco-banner-card.webp',5,true),
('SRM / Shineray Ngọc Anh','06 · XE TẢI NHẸ & XE VAN','Phương tiện tải nhẹ và xe van phục vụ giao hàng, bán hàng lưu động và kinh doanh.','https://shinerayngocanh.vn/','assets/srm-banner-card.webp',6,true)
) as v(name,category_label,description,website_url,image_url,sort_order,is_visible)
where not exists (select 1 from public.brands b where b.name = v.name);

insert into public.faqs(question,answer,sort_order,is_visible)
select * from (values
('Trang tổng công ty có báo giá trực tiếp không?','Trang tập trung giới thiệu hệ sinh thái và tiếp nhận nhu cầu. Giá bán, ưu đãi và tình trạng xe được cập nhật tại website chuyên ngành hoặc xác nhận qua đội ngũ tư vấn.',1,true),
('Tôi chưa biết nên chọn thương hiệu nào thì làm sao?','Bạn chỉ cần chọn nhóm sản phẩm hoặc mô tả mục đích sử dụng. Nhu cầu sẽ được chuyển đến bộ phận phù hợp để hỗ trợ so sánh và tư vấn.',2,true),
('Có hỗ trợ trải nghiệm xe và mua trả góp không?','Tùy thương hiệu và chính sách từng thời điểm, đội ngũ tư vấn sẽ cung cấp thông tin trải nghiệm xe, dự toán chi phí và phương án thanh toán phù hợp.',3,true),
('Tôi có thể liên hệ dịch vụ sau bán hàng ở đâu?','Bạn có thể gửi yêu cầu qua biểu mẫu, gọi hotline hoặc truy cập website thương hiệu tương ứng để kết nối bộ phận dịch vụ.',4,true)
) as v(question,answer,sort_order,is_visible)
where not exists (select 1 from public.faqs f where f.question = v.question);

-- Gán quyền admin cho tài khoản hiện tại của bạn.
insert into public.profiles(id, full_name, role)
select id, 'Quản trị viên Ngọc Anh', 'admin'
from auth.users
where email = 'quangcaoads2025@gmail.com'
on conflict (id) do update
set full_name = excluded.full_name, role = excluded.role, updated_at = now();

-- Kiểm tra kết quả: phải thấy email và role = admin.
select u.email, p.full_name, p.role
from auth.users u
left join public.profiles p on p.id = u.id
where u.email = 'quangcaoads2025@gmail.com';
