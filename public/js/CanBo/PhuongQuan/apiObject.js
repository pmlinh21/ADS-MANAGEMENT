// QUẬN

let getAdsLocation = {
    message: "Get thành công",
    content: [
      {
        id_ads_location: 1,
        address: "59 Nguyễn Thị Minh Khai",
        ward: "Bến Thành",
        loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
        ads_type: "Cổ động chính trị",
        is_zoning: 1,
        photo: "image1.png",
        longitude: 106.69,
        latitude: 10.7737
      },
      {
        id_ads_location: 2,
        address: "70 Phạm Hồng Thái",
        ward: "Bến Thành",
        loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
        ads_type: "Xã hội hoá",
        is_zoning: 0,
        photo: "image2.png",
        longitude: 106.694,
        latitude: 10.7714
      },
      {
        id_ads_location: 3,
        address: "84 Lê Lai",
        ward: "Phạm Ngũ Lão",
        loc_type: "Trung tâm thương mại",
        ads_type: "Xã hội hoá",
        is_zoning: 0,
        photo: "image3.png",
        longitude: 106.694,
        latitude: 10.7701
      },
      {
        id_ads_location: 8,
        address: "2 Bùi Thị Xuân",
        ward: "Bến Thành",
        loc_type: "Cây xăng",
        ads_type: "Xã hội hoá",
        is_zoning: 0,
        photo: "image1.png",
        longitude: 106.691,
        latitude: 10.7726
      },
      {
        id_ads_location: 13,
        address: "1 Bùi Thị Xuân",
        ward: "Bến Thành",
        loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
        ads_type: "Xã hội hoá",
        is_zoning: 0,
        photo: "image2.png",
        longitude: 106.691,
        latitude: 10.7726
      },
      {
        id_ads_location: 14,
        address: "59 Nguyễn Thị Minh Khai",
        ward: "Bến Thành",
        loc_type: "Trung tâm thương mại",
        ads_type: "Cổ động chính trị",
        is_zoning: 1,
        photo: "image3.png",
        longitude: 106.69,
        latitude: 10.7744
      },
      {
        id_ads_location: 15,
        address: "161-141 Nguyễn Du",
        ward: "Bến Thành",
        loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
        ads_type: "Cổ động chính trị",
        is_zoning: 1,
        photo: "image1.png",
        longitude: 106.692,
        latitude: 10.7721
      },
      {
        id_ads_location: 18,
        address: "66 Trương Định",
        ward: "Bến Thành",
        loc_type: "Trung tâm thương mại",
        ads_type: "Quảng cáo thương mại",
        is_zoning: 1,
        photo: "image2.png",
        longitude: 106.695,
        latitude: 10.7729
      },
      {
        id_ads_location: 20,
        address: "14 Alexandre de Rhodes",
        ward: "Bến Nghé",
        loc_type: "Nhà chờ xe buýt",
        ads_type: "Cổ động chính trị",
        is_zoning: 0,
        photo: "image3.png",
        longitude: 106.696,
        latitude: 10.7792
      },
      {
        id_ads_location: 21,
        address: "108 Nguyễn Du",
        ward: "Bến Thành",
        loc_type: "Nhà chờ xe buýt",
        ads_type: "Xã hội hoá",
        is_zoning: 1,
        photo: "image1.png",
        longitude: 106.697,
        latitude: 10.7756
      },
      {
        id_ads_location: 22,
        address: "55-53 Nguyễn Thị Minh Khai",
        ward: "Bến Nghé",
        loc_type: "Trung tâm thương mại",
        ads_type: "Cổ động chính trị",
        is_zoning: 1,
        photo: "image2.png",
        longitude: 106.695,
        latitude: 10.7796
      },
      {
        id_ads_location: 23,
        address: "132 Nam Kỳ Khởi Nghĩa",
        ward: "Bến Thành",
        loc_type: "Đất công/Công viên/Hành lang an toàn giao thông",
        ads_type: "Quảng cáo thương mại",
        is_zoning: 1,
        photo: "image3.png",
        longitude: 106.698,
        latitude: 10.7769
      },
      {
        id_ads_location: 24,
        address: "550 Lý Tự Trọng",
        ward: "Bến Thành",
        loc_type: "Chợ",
        ads_type: "Xã hội hoá",
        is_zoning: 1,
        photo: "image1.png",
        longitude: 106.694,
        latitude: 10.7717
      }
    ]
}

let getAds = {
  message: "Get thành công",
  content: [
    {
      id_ads: 1,
      id_ads_location: 1,
      id_board_type: 5,
      width: 8.97,
      height: 3.42,
      photo: "image1.png",
      quantity: 1,
      expired_date: "2023-11-03T00:00:00.000Z",
      address: "59 Nguyễn Thị Minh Khai",
      longitude: 106.69,
      latitude: 10.7737,
      ward: "Bến Thành",
      loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
      board_type: "Màn hình điện tử ốp tường"
    },
    {
      id_ads: 2,
      id_ads_location: 1,
      id_board_type: 2,
      width: 12.13,
      height: 7.88,
      photo: "image2.png",
      quantity: 1,
      expired_date: "2023-11-14T00:00:00.000Z",
      address: "59 Nguyễn Thị Minh Khai",
      longitude: 106.69,
      latitude: 10.7737,
      ward: "Bến Thành",
      loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
      board_type: "Trụ màn hình điện tử LED"
    },
    {
      id_ads: 3,
      id_ads_location: 2,
      id_board_type: 10,
      width: 10.21,
      height: 5.75,
      photo: "image3.png",
      quantity: 2,
      expired_date: "2023-12-05T00:00:00.000Z",
      address: "70 Phạm Hồng Thái",
      longitude: 106.694,
      latitude: 10.7714,
      ward: "Bến Thành",
      loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
      board_type: "Trung tâm thương mại"
    },
    {
      id_ads: 4,
      id_ads_location: 3,
      id_board_type: 2,
      width: 2.46,
      height: 9.33,
      photo: "",
      quantity: 1,
      expired_date: "2023-12-22T00:00:00.000Z",
      address: "84 Lê Lai",
      longitude: 106.694,
      latitude: 10.7701,
      ward: "Phạm Ngũ Lão",
      loc_type: "Trung tâm thương mại",
      board_type: "Trụ màn hình điện tử LED"
    },
    {
      id_ads: 5,
      id_ads_location: 3,
      id_board_type: 8,
      width: 6.59,
      height: 14.12,
      photo: "",
      quantity: 2,
      expired_date: "2024-01-09T00:00:00.000Z",
      address: "84 Lê Lai",
      longitude: 106.694,
      latitude: 10.7701,
      ward: "Phạm Ngũ Lão",
      loc_type: "Trung tâm thương mại",
      board_type: "Trụ/Cụm pano"
    },
    {
      id_ads: 6,
      id_ads_location: 3,
      id_board_type: 3,
      width: 10.05,
      height: 4.38,
      photo: "",
      quantity: 1,
      expired_date: "2024-01-18T00:00:00.000Z",
      address: "84 Lê Lai",
      longitude: 106.694,
      latitude: 10.7701,
      ward: "Phạm Ngũ Lão",
      loc_type: "Trung tâm thương mại",
      board_type: "Trụ hộp đèn"
    },
    {
      id_ads: 9,
      id_ads_location: 8,
      id_board_type: 1,
      width: 10.84,
      height: 6.17,
      photo: "image3.png",
      quantity: 3,
      expired_date: "2024-03-04T00:00:00.000Z",
      address: "2 Bùi Thị Xuân",
      longitude: 106.691,
      latitude: 10.7726,
      ward: "Bến Thành",
      loc_type: "Cây xăng",
      board_type: "Trụ bảng hiflex"
    },
    {
      id_ads: 15,
      id_ads_location: 13,
      id_board_type: 9,
      width: 5.26,
      height: 2.35,
      photo: "image3.png",
      quantity: 1,
      expired_date: "2024-05-19T00:00:00.000Z",
      address: "1 Bùi Thị Xuân",
      longitude: 106.691,
      latitude: 10.7726,
      ward: "Bến Thành",
      loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
      board_type: "Cổng chào"
    },
    {
      id_ads: 17,
      id_ads_location: 14,
      id_board_type: 1,
      width: 8.01,
      height: 6.75,
      photo: "",
      quantity: 2,
      expired_date: "2024-06-14T00:00:00.000Z",
      address: "59 Nguyễn Thị Minh Khai",
      longitude: 106.69,
      latitude: 10.7744,
      ward: "Bến Thành",
      loc_type: "Trung tâm thương mại",
      board_type: "Trụ bảng hiflex"
    },
    {
      id_ads: 18,
      id_ads_location: 15,
      id_board_type: 1,
      width: 7.36,
      height: 4.5,
      photo: "",
      quantity: 1,
      expired_date: "2024-06-26T00:00:00.000Z",
      address: "161-141 Nguyễn Du",
      longitude: 106.692,
      latitude: 10.7721,
      ward: "Bến Thành",
      loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
      board_type: "Trụ bảng hiflex"
    },
    {
      id_ads: 20,
      id_ads_location: 15,
      id_board_type: 6,
      width: 4.88,
      height: 1.47,
      photo: "image2.png",
      quantity: 2,
      expired_date: "2024-07-22T00:00:00.000Z",
      address: "161-141 Nguyễn Du",
      longitude: 106.692,
      latitude: 10.7721,
      ward: "Bến Thành",
      loc_type: "Đất tư nhân/Nhà ở riêng lẻ",
      board_type: "Trụ treo băng rôn dọc"
    },
    {
      id_ads: 16,
      id_ads_location: 20,
      id_board_type: 2,
      width: 9.14,
      height: 1.99,
      photo: "",
      quantity: 2,
      expired_date: "2024-06-01T00:00:00.000Z",
      address: "14 Alexandre de Rhodes",
      longitude: 106.696,
      latitude: 10.7792,
      ward: "Bến Nghé",
      loc_type: "Nhà chờ xe buýt",
      board_type: "Trụ màn hình điện tử LED"
    },
    {
      id_ads: 22,
      id_ads_location: 20,
      id_board_type: 10,
      width: 2.2,
      height: 6.88,
      photo: "",
      quantity: 1,
      expired_date: "2024-08-18T00:00:00.000Z",
      address: "14 Alexandre de Rhodes",
      longitude: 106.696,
      latitude: 10.7792,
      ward: "Bến Nghé",
      loc_type: "Nhà chờ xe buýt",
      board_type: "Trung tâm thương mại"
    },
    {
      id_ads: 19,
      id_ads_location: 22,
      id_board_type: 6,
      width: 1.62,
      height: 3.87,
      photo: "image1.png",
      quantity: 1,
      expired_date: "2024-07-09T00:00:00.000Z",
      address: "55-53 Nguyễn Thị Minh Khai",
      longitude: 106.695,
      latitude: 10.7796,
      ward: "Bến Nghé",
      loc_type: "Trung tâm thương mại",
      board_type: "Trụ treo băng rôn dọc"
    }
  ]
}

let getAdsReport = {
  message: "Get thành công",
  content: [
    {
      id_report: 1,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 1,
      id_ads: 1,
      id_report_type: 1,
      fullname: "Nguyễn Văn Anh",
      email: "nvanh@gmail.com",
      phone: "0912345678",
      content: "Biển quảng cáo hiển thị thông điệp chính trị không liên quan đến khu vực này. Mong muốn chính quyền địa phương kiểm tra và đảm bảo rằng quảng cáo trên đường không vi phạm các quy định liên quan.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-05T00:00:00.000Z",
      status: 1,
      resolve: "Kiểm tra thông tin quảng cáo và yêu cầu loại bỏ thông điệp không liên quan. Đảm bảo quảng cáo tuân thủ luật lệ và không gây phiền hà cho cộng đồng.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 18,
      officer: "ncluan21@clc.fitus.edu.vn",
      office: 1,
      id_ads: 1,
      id_report_type: 1,
      fullname: "Mai Văn Tiến",
      email: "mvtien@gmail.com",
      phone: "0912765432",
      content: "Tôi nhận thấy một biển quảng cáo chính trị trên đường với nội dung không chính xác. Biển này chứa thông tin sai lệch về ứng cử viên và chính sách, cần được kiểm tra và sửa chữa.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-08T00:00:00.000Z",
      status: 1,
      resolve: "Kiểm tra thông tin và yêu cầu chỉnh sửa ngay lập tức.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 24,
      officer: "pmlinh21@clc.fitus.edu.vn",
      office: 1,
      id_ads: 1,
      id_report_type: 1,
      fullname: "Đinh Văn Đức",
      email: "dvduc@gmail.com",
      phone: "0798765432",
      content: "Biển quảng cáo xã hội hóa này chứa thông tin không chính xác về tổ chức hoặc sự kiện. Đề nghị kiểm tra và sửa chữa để tránh gây hiểu lầm cho cộng đồng.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-22T00:00:00.000Z",
      status: 1,
      resolve: "Thực hiện kiểm tra thông tin và yêu cầu chỉnh sửa ngay.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 2,
      officer: "nthphuc21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 2,
      id_report_type: 1,
      fullname: "Lê Thị Bình",
      email: "ltb@gmail.com",
      phone: "0923456789",
      content: "Biển quảng cáo chính trị chứa thông điệp không chính xác về chính sách công cộng. Mong muốn chính trị gia hoặc tổ chức liên quan xem xét và điều chỉnh nội dung quảng cáo để tránh thông tin không đúng.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-12T00:00:00.000Z",
      status: 1,
      resolve: "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 11,
      officer: "",
      office: null,
      id_ads: 3,
      id_report_type: 3,
      fullname: "Bùi Văn Nam",
      email: "bvn@gmail.com",
      phone: "0798234567",
      content: "Nhìn thấy quảng cáo sản phẩm mới. Đề xuất thêm thông tin về giá cả và cách sử dụng sản phẩm. Cảm thấy quan tâm và muốn biết thêm để đưa ra quyết định mua hàng.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-02T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đóng góp ý kiến",
      ward: "Bến Thành"
    },
    {
      id_report: 21,
      officer: "",
      office: null,
      id_ads: 4,
      id_report_type: 1,
      fullname: "Trần Thị Xuân",
      email: "ttxuan@gmail.com",
      phone: "0712654321",
      content: "Biển quảng cáo thương mại này có vẻ chứa thông tin không chính xác về sản phẩm. Đề nghị kiểm tra và chỉnh sửa thông tin để tránh gây hiểu lầm cho người tiêu dùng.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-01T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Tố giác sai phạm",
      ward: "Phạm Ngũ Lão"
    },
    {
      id_report: 3,
      officer: "pmlinh21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 5,
      id_report_type: 2,
      fullname: "Trần Minh Châu",
      email: "tmc@gmail.com",
      phone: "0976543210",
      content: "Quảng cáo sản phẩm không có thông tin liên hệ hoặc địa chỉ cửa hàng. Mong muốn doanh nghiệp cung cấp thông tin liên lạc để người dùng có thể tìm thấy cửa hàng dễ dàng hơn.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-17T00:00:00.000Z",
      status: 1,
      resolve: "Liên hệ doanh nghiệp để yêu cầu cung cấp thông tin liên hệ và địa chỉ cửa hàng. Đảm bảo rằng quảng cáo chứa thông tin đầy đủ để người dùng dễ dàng liên hệ và đến cửa hàng.",
      report_type: "Đăng ký nội dung",
      ward: "Phạm Ngũ Lão"
    },
    {
      id_report: 20,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 6,
      id_report_type: 3,
      fullname: "Nguyễn Minh Vương",
      email: "nmvuong@gmail.com",
      phone: "0932123456",
      content: "Tôi muốn đóng góp ý kiến về nội dung của biển quảng cáo chính trị này. Đề xuất cung cấp thông tin chi tiết hơn về chính sách và kế hoạch cụ thể của ứng cử viên để người dân hiểu rõ hơn.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-03T00:00:00.000Z",
      status: 1,
      resolve: "Ghi nhận ý kiến, đề xuất yêu cầu thêm thông tin chi tiết.",
      report_type: "Đóng góp ý kiến",
      ward: "Phạm Ngũ Lão"
    },
    {
      id_report: 5,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 9,
      id_report_type: 4,
      fullname: "Hoàng Đức Em",
      email: "hdem@gmail.com",
      phone: "0798765432",
      content: "Quảng cáo có chứa thông tin không rõ ràng về ưu đãi hoặc giảm giá. Mong muốn nhận được giải đáp thắc mắc về các điều kiện và điều khoản của ưu đãi được quảng cáo để tránh nhầm lẫn khi mua hàng.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-28T00:00:00.000Z",
      status: 1,
      resolve: "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo thông tin chi tiết và rõ ràng về sản phẩm hoặc dịch vụ để tránh hiểu lầm.",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Thành"
    },
    {
      id_report: 13,
      officer: "",
      office: null,
      id_ads: 15,
      id_report_type: 3,
      fullname: "Trịnh Văn Phúc",
      email: "tvphuc@gmail.com",
      phone: "0976543021",
      content: "Tôi đề xuất thêm thông tin về mục tiêu và lợi ích của chương trình xã hội hóa này để người dân hiểu rõ hơn về mục đích của hoạt động này.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-15T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đóng góp ý kiến",
      ward: "Bến Thành"
    },
    {
      id_report: 10,
      officer: "",
      office: null,
      id_ads: 17,
      id_report_type: 2,
      fullname: "Trần Thị Mai",
      email: "ttmai@gmail.com",
      phone: "0943210765",
      content: "Ghi nhận quảng cáo chính trị với thông tin đầy đủ. Mong muốn biết rõ về nội dung, nguồn gốc và mục tiêu của quảng cáo để hiểu rõ hơn về các chủ đề chính trị đang được thảo luận.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-26T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đăng ký nội dung",
      ward: "Bến Thành"
    },
    {
      id_report: 12,
      officer: "",
      office: null,
      id_ads: 17,
      id_report_type: 4,
      fullname: "Phan Thị Oanh",
      email: "ptoanh@gmail.com",
      phone: "0732123456",
      content: "Quảng cáo một dịch vụ giải quyết vấn đề y tế. Đề xuất cung cấp thông tin chi tiết về cách dịch vụ hoạt động và chi phí liên quan. Đây là một vấn đề quan trọng, nên cần thông tin đầy đủ để đưa ra quyết định.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-09T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Thành"
    },
    {
      id_report: 23,
      officer: "ncluan21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 17,
      id_report_type: 4,
      fullname: "Lưu Thị Ánh",
      email: "lanh@gmail.com",
      phone: "0123123456",
      content: "Tôi có một số thắc mắc về sản phẩm được quảng cáo. Đề xuất cung cấp thông tin liên hệ hoặc website để tôi có thể tìm hiểu thêm về sản phẩm này.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-14T00:00:00.000Z",
      status: 1,
      resolve: "Cung cấp thông tin liên hệ chính thức để giải quyết thắc mắc.",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Thành"
    },
    {
      id_report: 25,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 17,
      id_report_type: 2,
      fullname: "Nguyễn Thị Hoài",
      email: "nthoai@gmail.com",
      phone: "0712765432",
      content: "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tránh vi phạm các quy định về quảng cáo xã hội hóa.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-02T00:00:00.000Z",
      status: 1,
      resolve: "Liên hệ với tổ chức, yêu cầu đăng ký nội dung ngay lập tức.",
      report_type: "Đăng ký nội dung",
      ward: "Bến Thành"
    },
    {
      id_report: 19,
      officer: "pmlinh21@clc.fitus.edu.vn",
      office: 1,
      id_ads: 20,
      id_report_type: 2,
      fullname: "Vũ Thị Uyên",
      email: "vtuyen@gmail.com",
      phone: "0776543890",
      content: "Biển quảng cáo chính trị này cần phải đăng ký nội dung để đảm bảo tính chính xác và minh bạch của thông điệp được truyền đạt.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-31T00:00:00.000Z",
      status: 1,
      resolve: "Liên hệ với chủ quảng cáo, yêu cầu đăng ký ngay.",
      report_type: "Đăng ký nội dung",
      ward: "Bến Thành"
    },
    {
      id_report: 7,
      officer: "",
      office: null,
      id_ads: 22,
      id_report_type: 3,
      fullname: "Đinh Minh Hiếu",
      email: "dmhieu@gmail.com",
      phone: "0776543210",
      content: "Quảng cáo không truyền đạt được ưu điểm đặc biệt của sản phẩm hoặc dịch vụ. Mong muốn doanh nghiệp xem xét việc tăng cường thông tin để người tiêu dùng hiểu rõ về giá trị của sản phẩm.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-08T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đóng góp ý kiến",
      ward: "Bến Nghé"
    },
    {
      id_report: 9,
      officer: "pmlinh21@clc.fitus.edu.vn",
      office: 2,
      id_ads: 19,
      id_report_type: 1,
      fullname: "Lý Văn Long",
      email: "lylong@gmail.com",
      phone: "0987654321",
      content: "Nhận thức về biển quảng cáo chính trị trên đường. Nội dung không chính xác, thiên hướng chống đối một đảng. Đề nghị kiểm tra thông tin và đảm bảo công bằng trong quảng cáo.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-21T00:00:00.000Z",
      status: 1,
      resolve: "Kiểm tra và xác minh thông tin quảng cáo. Nếu phát hiện không chính xác, yêu cầu rút quảng cáo và yêu cầu thông tin chính xác từ người đăng.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Nghé"
    }
  ]
}

let getAdsLocReport = {
  message: "Get thành công",
  content: [
    {
      id_report: 1,
      officer: "",
      office: null,
      id_ads_location: 20,
      id_report_type: 1,
      fullname: "Nguyễn Thị Lan Anh",
      email: "ntlananh@gmail.com",
      phone: "0901234567",
      content: "Tôi nhận thấy có một quảng cáo không liên quan tại đây. Mong sở kiểm tra và loại bỏ quảng cáo này để giữ cho bản đồ chất lượng hơn.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-05T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Tố giác sai phạm",
      ward: "Bến Nghé"
    },
    {
      id_report: 5,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 2,
      id_ads_location: 24,
      id_report_type: 1,
      fullname: "Võ Ngọc Mai",
      email: "vnmai@gmail.com",
      phone: "0945678901",
      content: "Tôi phát hiện một quảng cáo không hợp lý tại khu vực công cộng gần công viên. Xin hãy kiểm tra và loại bỏ quảng cáo này để bảo vệ vẻ đẹp của khu vực công cộng này.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-28T00:00:00.000Z",
      status: 1,
      resolve: "Xác minh và loại bỏ quảng cáo không phù hợp gần công viên. Thông báo việc xử lý này cho người báo cáo để họ biết rằng vấn đề đã được giải quyết.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 6,
      officer: "",
      office: null,
      id_ads_location: 21,
      id_report_type: 1,
      fullname: "Hoàng Đức Long",
      email: "hdl@gmail.com",
      phone: "0956789012",
      content: "Phát hiện quảng cáo không phù hợp trên bảng quảng cáo công cộng. Mong muốn công việc kiểm tra và xử lý để duy trì trật tự và vẻ đẹp của khu vực.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-02T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 16,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 2,
      id_ads_location: 20,
      id_report_type: 1,
      fullname: "Lê Văn Đức",
      email: "lvduc@gmail.com",
      phone: "0836677889",
      content: "Quảng cáo tại góc đường thiếu ánh sáng ban đêm, tạo ra tình trạng an toàn không tốt. Yêu cầu sửa chữa để tránh tai nạn giao thông.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-03T00:00:00.000Z",
      status: 1,
      resolve: "Gửi thông báo cho công ty quảng cáo, yêu cầu tăng cường ánh sáng xung quanh quảng cáo để đảm bảo an toàn giao thông.",
      report_type: "Tố giác sai phạm",
      ward: "Bến Nghé"
    },
    {
      id_report: 23,
      officer: "",
      office: null,
      id_ads_location: 20,
      id_report_type: 1,
      fullname: "Đỗ Thị Kim Ngân",
      email: "dtkngan@gmail.com",
      phone: "0754455667",
      content: "Quảng cáo vi phạm văn hóa gần công viên, chứa hình ảnh không phù hợp với trẻ em và gia đình.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-14T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Tố giác sai phạm",
      ward: "Bến Nghé"
    },
    {
      id_report: 9,
      officer: "",
      office: null,
      id_ads_location: 3,
      id_report_type: 2,
      fullname: "Đặng Quang Minh",
      email: "dqminh@gmail.com",
      phone: "0989012345",
      content: "Cần đăng ký quảng cáo cho sự kiện tại địa điểm công cộng trong tuần tới. Rất mong nhận được hướng dẫn về thủ tục và yêu cầu cần thiết.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-21T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đăng ký nội dung",
      ward: "Phạm Ngũ Lão"
    },
    {
      id_report: 14,
      officer: "nnlien21@clc.fitus.edu.vn",
      office: 1,
      id_ads_location: 18,
      id_report_type: 2,
      fullname: "Hoàng Văn Thắng",
      email: "hvthang@gmail.com",
      phone: "0854455667",
      content: "Biển quảng cáo chứa thông tin không chính xác về một sự kiện sắp tới. Mong được sửa chữa.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-21T00:00:00.000Z",
      status: 1,
      resolve: "Thông báo lỗi đến công ty quảng cáo, yêu cầu cập nhật thông tin chính xác về sự kiện và theo dõi việc điều chỉnh.",
      report_type: "Đăng ký nội dung",
      ward: "Bến Thành"
    },
    {
      id_report: 17,
      officer: "pmlinh21@clc.fitus.edu.vn",
      office: 1,
      id_ads_location: 13,
      id_report_type: 2,
      fullname: "Phan Thị Quỳnh",
      email: "ptquynh@gmail.com",
      phone: "0827788990",
      content: "Đề xuất thay đổi vị trí của quảng cáo gần trường học để tránh gây xao lãng cho học sinh và tăng cường an toàn giao thông.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-18T00:00:00.000Z",
      status: 1,
      resolve: "Liên hệ với công ty quảng cáo, thảo luận về việc thay đổi vị trí quảng cáo gần trường học để tăng cường an toàn và tránh gây xao lãng.",
      report_type: "Đăng ký nội dung",
      ward: "Bến Thành"
    },
    {
      id_report: 24,
      officer: "",
      office: null,
      id_ads_location: 21,
      id_report_type: 2,
      fullname: "Phạm Đức Hải",
      email: "pdhai@gmail.com",
      phone: "0745566778",
      content: "Xin phép đăng ký quảng cáo về triển lãm nghệ thuật vào cuối tháng này.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-22T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đăng ký nội dung",
      ward: "Bến Thành"
    },
    {
      id_report: 18,
      officer: "",
      office: null,
      id_ads_location: 18,
      id_report_type: 3,
      fullname: "Đinh Minh Tâm",
      email: "dmtam@gmail.com",
      phone: "0818899001",
      content: "Đề xuất tạo quy định rõ ràng về kích thước quảng cáo tại trung tâm thương mại để giữ gìn vẻ đẹp của thành phố.",
      photo1: "",
      photo2: "",
      report_time: "2023-10-08T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Đóng góp ý kiến",
      ward: "Bến Thành"
    },
    {
      id_report: 4,
      officer: "ncluan21@clc.fitus.edu.vn",
      office: 1,
      id_ads_location: 22,
      id_report_type: 4,
      fullname: "Lê Minh Tuấn",
      email: "lmtuan@gmail.com",
      phone: "0934567890",
      content: "Tôi có một câu hỏi liên quan đến việc đăng ký quảng cáo. Làm thế nào để tôi có thể thay đổi hình ảnh và thông tin trên quảng cáo của mình? Mong nhận được sự hỗ trợ.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-23T00:00:00.000Z",
      status: 1,
      resolve: "Hướng dẫn người dùng cách thay đổi thông tin và hình ảnh trên quảng cáo của họ. Cung cấp hỗ trợ kỹ thuật hoặc liên hệ công ty quảng cáo nếu cần.",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Nghé"
    },
    {
      id_report: 8,
      officer: "",
      office: null,
      id_ads_location: 8,
      id_report_type: 4,
      fullname: "Nguyễn Văn Hoàng",
      email: "nvh@gmail.com",
      phone: "0978901234",
      content: "Cần thông tin về các sự kiện nghệ thuật và văn hóa diễn ra trong tháng tại khu vực này. Xin hãy cung cấp lịch trình và địa điểm để thuận tiện tham gia.",
      photo1: "",
      photo2: "",
      report_time: "2023-09-15T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Thành"
    },
    {
      id_report: 15,
      officer: "nthphuc21@clc.fitus.edu.vn",
      office: 1,
      id_ads_location: 1,
      id_report_type: 4,
      fullname: "Nguyễn Thị Thanh Nga",
      email: "nttn@gmail.com",
      phone: "0845566778",
      content: "Cần biết rõ về quy định liên quan đến việc treo bảng quảng cáo tại các khu dân cư. Xin cung cấp thông tin chi tiết để hiểu rõ hơn.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-14T00:00:00.000Z",
      status: 1,
      resolve: "Gửi tài liệu chính thức về quy định liên quan đến việc treo bảng quảng cáo tại khu dân cư, bao gồm các hướng dẫn cụ thể.",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Thành"
    },
    {
      id_report: 19,
      officer: "",
      office: null,
      id_ads_location: 22,
      id_report_type: 4,
      fullname: "Trần Thị Quỳnh Trang",
      email: "ttqtrang@gmail.com",
      phone: "0809900112",
      content: "Tôi muốn biết về quy định cụ thể liên quan đến việc đặt bảng quảng cáo tại các cửa hàng nhỏ trong khu vực dân cư. Xin thông tin chi tiết về kích thước, hình dạng, và các bước đăng ký.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-31T00:00:00.000Z",
      status: 0,
      resolve: "",
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Nghé"
    }
  ]
}

let getLocReport = {
  message: "Get thành công",
  content: [
    {
      id_report: 1,
      officer: "",
      office: null,
      longitude: 10.7762,
      latitude: 106.699,
      id_report_type: 1,
      fullname: "Trần Thị Hương Giang",
      email: "thgiang@gmail.com",
      phone: "0901122334",
      content: "Tôi phát hiện một quảng cáo không hợp pháp tại địa chỉ này. Xin kiểm tra và loại bỏ nó khỏi trang web của bạn.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-05T00:00:00.000Z",
      status: 0,
      resolve: "",
      id_ward: 2,
      report_type: "Tố giác sai phạm",
      ward: "Bến Thành"
    },
    {
      id_report: 2,
      officer: "nthphuc21@clc.fitus.edu.vn",
      office: 1,
      longitude: 10.7751,
      latitude: 106.7,
      id_report_type: 4,
      fullname: "Lê Văn Đức",
      email: "lvduc@gmail.com",
      phone: "0934567890",
      content: "Tôi muốn đăng ký quảng cáo tại đây. Xin hướng dẫn tôi qua quy trình đăng ký và các bước cần thực hiện để quảng cáo của tôi xuất hiện trên bản đồ.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-12T00:00:00.000Z",
      status: 1,
      resolve: "Để đăng ký quảng cáo, vui lòng truy cập trang chính thức của chúng tôi và làm theo hướng dẫn đăng ký. Nếu gặp vấn đề, liên hệ với bộ phận hỗ trợ.",
      id_ward: 1,
      report_type: "Giải đáp thắc mắc",
      ward: "Bến Nghé"
    },
    {
      id_report: 3,
      officer: "",
      office: null,
      longitude: 10.7775,
      latitude: 106.699,
      id_report_type: 1,
      fullname: "Nguyễn Thị Mai Anh",
      email: "ntmanh@gmail.com",
      phone: "0987654321",
      content: "Bản đồ hiển thị địa chỉ không chính xác. Đề nghị cập nhật để tránh nhầm lẫn từ người dùng.",
      photo1: "",
      photo2: "",
      report_time: "2023-08-17T00:00:00.000Z",
      status: 0,
      resolve: "",
      id_ward: 1,
      report_type: "Tố giác sai phạm",
      ward: "Bến Nghé"
    },
    {
      id_report: 7,
      officer: "",
      office: null,
      longitude: 10.9448,
      latitude: 106.818,
      id_report_type: 1,
      fullname: "Đỗ Thị Thanh Thảo",
      email: "dtthao@gmail.com",
      phone: "0921122334",
      content: "Địa điểm có gắn quảng cáo trái phép, chưa đăng ký hợp pháp",
      photo1: "",
      photo2: "",
      report_time: "2023-09-08T00:00:00.000Z",
      status: 0,
      resolve: "",
      id_ward: 5,
      report_type: "Tố giác sai phạm",
      ward: "Cô Giang"
    }
  ]
}

let getAdsCreate = null