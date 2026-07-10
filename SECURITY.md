# Security

- Frontend chỉ sử dụng Supabase Publishable key.
- Quyền truy cập dữ liệu được kiểm soát bằng Row Level Security.
- Không lưu mật khẩu trong mã nguồn.
- Không đưa khóa đặc quyền hoặc khóa máy chủ lên GitHub.
- Mọi tài khoản CMS phải tồn tại trong Supabase Authentication và bảng `profiles`.
