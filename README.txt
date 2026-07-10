WEBSITE TỔNG CÔNG TY — HỆ THỐNG NGỌC ANH

1. CẤU TRÚC
- index.html: nội dung, SEO, schema và toàn bộ cấu trúc giao diện.
- style.css: giao diện sáng, responsive cho desktop, tablet và mobile.
- script.js: menu mobile, hiệu ứng, lọc sản phẩm, FAQ và xử lý biểu mẫu.
- assets/: logo và hình ảnh sản phẩm.

2. NHỮNG PHẦN ĐÃ TỐI ƯU
- Phiên bản V6 hoàn thiện theo góp ý giao diện mới nhất.
- Đặt “Uy tín 30+ năm - Đại lý ủy quyền - Trả góp linh hoạt” ngay dưới hai nút hành động của hero.
- Viết lại phần Hệ sinh thái thương hiệu với tiêu đề “Các thương hiệu thuộc Hệ thống Ngọc Anh”.
- Dựng lại 6 thẻ thương hiệu theo tỷ lệ banner 16:9 để hình và chữ trong ảnh không bị cắt mất.
- Giảm khoảng trắng thừa, bổ sung nhóm thông tin ngắn cho từng thương hiệu và giữ vùng bấm rõ ràng.
- Dựng lại phần Về Hệ thống Ngọc Anh với logo, số năm uy tín, số thương hiệu và ba giá trị nổi bật.
- Rút gọn tiêu đề liên hệ thành “Bạn đang quan tâm dòng xe nào?” để xuống dòng tự nhiên hơn.
- Dựng lại header, hero và dải thương hiệu theo cùng một hệ thiết kế sáng, rõ và hiện đại.
- Header mới có thanh thông tin, logo nhận diện rõ, menu gọn và nút liên hệ nổi bật.
- Hero mới phân cấp nội dung rõ ràng, tiêu đề không lỗi xuống dòng và thẻ thương hiệu dễ đọc.
- Dải chữ chạy dạng pill, có nhãn hệ sinh thái cố định, hiệu ứng fade hai đầu và dừng khi rê chuột.
- Dùng hình xe máy thật trong khu vực nổi bật và thẻ hệ sinh thái.
- Giảm các mảng nền tối; toàn trang ưu tiên nền trắng, xám sáng và điểm nhấn đỏ.
- Chuẩn hóa cỡ chữ, line-height, độ rộng tiêu đề và xử lý xuống dòng.
- Tăng kích thước chữ mô tả, footer, biểu mẫu và vùng bấm trên điện thoại.
- Menu mobile có khóa cuộn, đóng bằng ESC và đóng khi bấm ra ngoài.
- Bộ lọc sản phẩm có trạng thái aria-selected; FAQ hỗ trợ aria-expanded.
- Không dùng thư viện icon bên ngoài, tránh lỗi icon khi mất mạng.

3. ĐĂNG LÊN GITHUB PAGES
- Upload toàn bộ file và thư mục assets vào repository.
- Vào Settings > Pages > Deploy from a branch.
- Chọn branch main, thư mục /(root), bấm Save.

4. KẾT NỐI BIỂU MẪU GOOGLE SHEETS
- Tạo Google Sheet và Apps Script Web App nhận JSON.
- Deploy Apps Script dạng Web app.
- Mở script.js, dán URL Web App vào:
  const FORM_ENDPOINT = "URL_WEB_APP_CUA_BAN";
- Khi chưa cấu hình, biểu mẫu sẽ hướng khách hàng gọi hotline hoặc liên hệ Zalo, không báo gửi thành công giả.

5. THÔNG TIN CẦN KIỂM TRA TRƯỚC KHI CHẠY
- Hotline, email, địa chỉ và link Zalo.
- Canonical URL, og:url và og:image trong index.html.
- Google Tag Manager / GA4 nếu cần theo dõi chuyển đổi.
- Chính sách quyền riêng tư nếu thu thập dữ liệu khách hàng.

CẬP NHẬT V7
- Dựng lại toàn bộ phần “Về Hệ thống Ngọc Anh” theo bố cục tiêu đề ngang, logo và 3 giá trị rõ ràng.
- Giảm cỡ chữ và xử lý lại xuống dòng để không còn các khối chữ quá lớn, vụn dòng.
- Dựng phần tư vấn thành 2 thẻ cân bằng: nội dung liên hệ và biểu mẫu.
- Thêm các lợi ích tư vấn: đúng nhu cầu, hỗ trợ trả góp, kết nối đại lý chính hãng.
- Chuyển FAQ sang bố cục tiêu đề ngang và accordion toàn chiều rộng, loại bỏ khoảng trắng thừa.
- Tối ưu riêng cho màn hình máy tính bảng và điện thoại.
