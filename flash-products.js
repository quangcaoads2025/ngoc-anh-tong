/*
  DỮ LIỆU FLASH SALE – HỆ THỐNG NGỌC ANH

  - category: "car" = Ô tô, "motorbike" = Xe máy
  - cardType: "poster" = ảnh chương trình; "vehicle" = ảnh sản phẩm
  - active: true để hiển thị, false để tạm ẩn

  Chỉ cần sửa nội dung trong từng khối sản phẩm để cập nhật chương trình.
*/
window.FLASH_PRODUCTS = [
  {
    id: "vinfast-vf5-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "VINFAST NGỌC ANH – CÀ MAU",
    name: "VinFast VF 5",
    badge: "ƯU ĐÃI THÁNG 7",
    offerLabel: "Giảm tiền mặt",
    offerValue: "20 triệu",
    description: "Giải pháp ô tô điện đô thị với phương án trả trước và trả góp linh hoạt.",
    metrics: [
      { label: "Trả trước từ", value: "48 triệu" },
      { label: "Trả góp/tháng", value: "8 triệu" }
    ],
    note: "Giá trên chưa áp dụng voucher xe xăng VinFast. Chương trình đến 31/07/2026.",
    image: "assets/vinfast-vf5-thang-7.webp",
    imageAlt: "Chương trình ưu đãi VinFast VF 5 tháng 7",
    buttonText: "Nhận tư vấn VF 5",
    link: "#contact"
  },
  {
    id: "vinfast-limo-green-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "VINFAST NGỌC ANH – CÀ MAU",
    name: "VinFast Limo Green",
    badge: "ƯU ĐÃI THÁNG 7",
    offerLabel: "Giảm tiền mặt",
    offerValue: "20 triệu",
    description: "Mẫu MPV điện rộng rãi, phù hợp gia đình và nhu cầu kinh doanh dịch vụ.",
    metrics: [
      { label: "Trả trước từ", value: "75 triệu" },
      { label: "Trả góp/tháng", value: "12 triệu" }
    ],
    note: "Giá trên chưa áp dụng voucher xe xăng VinFast. Chương trình đến 31/07/2026.",
    image: "assets/vinfast-limo-green-thang-7.webp",
    imageAlt: "Chương trình ưu đãi VinFast Limo Green tháng 7",
    buttonText: "Nhận tư vấn Limo Green",
    link: "#contact"
  },
  {
    id: "vinfast-vf6-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "VINFAST NGỌC ANH – CÀ MAU",
    name: "VinFast VF 6",
    badge: "GIÁ TỐT THÁNG 7",
    offerLabel: "Giá chỉ từ",
    offerValue: "646 triệu",
    description: "SUV điện hiện đại với phương án thanh toán ban đầu tối ưu trong tháng 7.",
    metrics: [
      { label: "Trả trước từ", value: "68 triệu" },
      { label: "Trả góp/tháng", value: "9 triệu" }
    ],
    note: "Giá trên chưa áp dụng voucher xe xăng VinFast. Chương trình đến 31/07/2026.",
    image: "assets/vinfast-vf6-thang-7.webp",
    imageAlt: "Chương trình giá VinFast VF 6 tháng 7",
    buttonText: "Nhận tư vấn VF 6",
    link: "#contact"
  },
  {
    id: "byd-sealion-6-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "BYD THÀNH CÔNG CÀ MAU",
    name: "BYD Sealion 6 Dynamic",
    badge: "ƯU ĐÃI NỔI BẬT",
    offerLabel: "Tổng giá trị đến",
    offerValue: "86 triệu",
    description: "SUV năng lượng mới với gói ưu đãi và phụ kiện thiết thực trong tháng 7.",
    metrics: [
      { label: "Phí trước bạ", value: "Giảm 50%" },
      { label: "Thời hạn", value: "31/07/2026" }
    ],
    note: "Quà tặng và điều kiện áp dụng theo chương trình thực tế tại đại lý.",
    image: "assets/byd-sealion-6-thang-7.webp",
    imageAlt: "Ưu đãi BYD Sealion 6 Dynamic tháng 7",
    buttonText: "Nhận ưu đãi Sealion 6",
    link: "#contact"
  },
  {
    id: "byd-m6-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "BYD THÀNH CÔNG CÀ MAU",
    name: "BYD M6 Standard",
    badge: "ƯU ĐÃI THÁNG 7",
    offerLabel: "Tổng giá trị đến",
    offerValue: "51 triệu",
    description: "MPV điện đa dụng, phù hợp gia đình và nhu cầu vận hành dịch vụ.",
    metrics: [
      { label: "Giảm tiền mặt", value: "30 triệu" },
      { label: "Thời hạn", value: "31/07/2026" }
    ],
    note: "Kèm chính sách bảo hành pin hoặc bộ sạc theo điều kiện chương trình.",
    image: "assets/byd-m6-thang-7.webp",
    imageAlt: "Ưu đãi BYD M6 Standard tháng 7",
    buttonText: "Nhận ưu đãi BYD M6",
    link: "#contact"
  },
  {
    id: "byd-seal-5-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "BYD THÀNH CÔNG CÀ MAU",
    name: "BYD Seal 5 Premium 2025",
    badge: "ƯU ĐÃI NỔI BẬT",
    offerLabel: "Tổng giá trị đến",
    offerValue: "81 triệu",
    description: "Sedan DM-i hiện đại với gói hỗ trợ chi phí sở hữu hấp dẫn.",
    metrics: [
      { label: "Phí trước bạ", value: "Giảm 100%" },
      { label: "Thời hạn", value: "31/07/2026" }
    ],
    note: "Kèm bộ sạc và thiết bị V2L theo điều kiện chương trình thực tế.",
    image: "assets/byd-seal-5-thang-7.webp",
    imageAlt: "Ưu đãi BYD Seal 5 Premium 2025",
    buttonText: "Nhận ưu đãi Seal 5",
    link: "#contact"
  },
  {
    id: "byd-dolphin-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "BYD THÀNH CÔNG CÀ MAU",
    name: "BYD Dolphin Standard 2026",
    badge: "ƯU ĐÃI KHÁCH HÀNG SỚM",
    offerLabel: "Tổng giá trị đến",
    offerValue: "81 triệu",
    description: "Mẫu hatchback điện gọn gàng, tiết kiệm và phù hợp nhu cầu đô thị.",
    metrics: [
      { label: "Giảm tiền mặt", value: "70 triệu" },
      { label: "Số lượng", value: "1.000 khách đầu" }
    ],
    note: "Ưu đãi và quà tặng áp dụng theo điều kiện, số lượng xe thực tế.",
    image: "assets/byd-dolphin-thang-7.webp",
    imageAlt: "Ưu đãi BYD Dolphin Standard 2026",
    buttonText: "Nhận ưu đãi Dolphin",
    link: "#contact"
  },
  {
    id: "byd-atto-2-july",
    category: "car",
    cardType: "poster",
    active: true,
    brand: "BYD THÀNH CÔNG CÀ MAU",
    name: "BYD Atto 2 Premium 2025",
    badge: "ƯU ĐÃI THÁNG 7",
    offerLabel: "Tổng giá trị đến",
    offerValue: "70 triệu",
    description: "SUV điện nhỏ gọn với gói hỗ trợ tiền mặt và phụ kiện sử dụng thực tế.",
    metrics: [
      { label: "Giảm tiền mặt", value: "30 triệu" },
      { label: "Phiên bản", value: "Premium 2025" }
    ],
    note: "Kèm bảo hiểm, thảm sàn và bộ sạc theo điều kiện chương trình.",
    image: "assets/byd-atto-2-thang-7.webp",
    imageAlt: "Ưu đãi BYD Atto 2 Premium 2025 màu xám",
    buttonText: "Nhận ưu đãi Atto 2",
    link: "#contact"
  },
  {
    id: "honda-winner-r",
    category: "motorbike",
    cardType: "vehicle",
    active: true,
    brand: "HONDA",
    name: "Winner R",
    badge: "ƯU ĐÃI CAO NHẤT",
    offerLabel: "Ưu đãi đến",
    offerValue: "6,16 triệu",
    description: "Ưu đãi theo từng phiên bản Winner R trong chương trình tháng 7.",
    variants: [
      { name: "Tiêu chuẩn", value: "5,26 triệu" },
      { name: "Đặc biệt", value: "6,16 triệu" },
      { name: "Thể thao", value: "5,66 triệu" }
    ],
    note: "Có thể áp dụng phương án lãi suất 0% theo điều kiện chương trình.",
    image: "assets/honda-winner-r.webp",
    imageAlt: "Honda Winner R màu đỏ xanh",
    buttonText: "Nhận ưu đãi Winner R",
    link: "#contact"
  },
  {
    id: "yamaha-grande-2023",
    category: "motorbike",
    cardType: "vehicle",
    active: true,
    brand: "YAMAHA",
    name: "Grande 2023",
    badge: "ƯU ĐÃI KÉP",
    offerLabel: "Tổng ưu đãi đến",
    offerValue: "5 triệu",
    description: "Áp dụng các phiên bản Grande đời 2023 còn trong chương trình.",
    variants: [
      { name: "Khuyến mãi khách hàng", value: "3 triệu" },
      { name: "Ưu đãi bổ sung", value: "2 triệu" }
    ],
    note: "Hoặc lựa chọn chính sách lãi suất 0%. Mã xe áp dụng theo tồn kho thực tế.",
    image: "assets/yamaha-grande-2023.webp",
    imageAlt: "Yamaha Grande màu xám",
    buttonText: "Kiểm tra xe Grande",
    link: "#contact"
  },
  {
    id: "sym-naga-150",
    category: "motorbike",
    cardType: "vehicle",
    active: true,
    brand: "SYM",
    name: "Naga 150",
    badge: "GIẢM TRỰC TIẾP",
    offerLabel: "Ưu đãi khách hàng",
    offerValue: "2 triệu",
    description: "Mẫu xe tay ga phong cách mạnh mẽ, áp dụng ưu đãi trong chương trình tháng 7.",
    note: "Số lượng xe ưu đãi phụ thuộc màu sắc và tồn kho tại cửa hàng.",
    image: "assets/sym-naga-150.webp",
    imageAlt: "SYM Naga 150 màu bạc",
    buttonText: "Nhận ưu đãi Naga 150",
    link: "#contact"
  },
  {
    id: "kymco-like-50",
    category: "motorbike",
    cardType: "vehicle",
    active: true,
    brand: "KYMCO",
    name: "Dòng xe 50cc Kymco",
    badge: "KHÔNG CẦN BẰNG LÁI",
    offerLabel: "Ưu đãi đến",
    offerValue: "3 triệu",
    description: "Lựa chọn phù hợp học sinh và nhu cầu di chuyển hằng ngày.",
    variants: [
      { name: "Like 50", value: "3 triệu" },
      { name: "Like 50 FI", value: "1 triệu" },
      { name: "Visar 50", value: "2 triệu" }
    ],
    note: "Ưu đãi áp dụng theo từng mẫu và số lượng thực tế.",
    image: "assets/kymco-like-50.webp",
    imageAlt: "Kymco Like 50 màu trắng",
    buttonText: "Xem xe Kymco 50cc",
    link: "#contact"
  }
];
