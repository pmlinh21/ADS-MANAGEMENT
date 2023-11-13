$(document).ready(function(){
    const role = 2; 
    const email = "phuong@gmail.com"
    const id_ward = 2;

    let ads_report = [
        [1, 'nnlien21@clc.fitus.edu.vn', 1, 1, 1, 'Nguyễn Văn Anh', 'nvanh@gmail.com', '0912345678', 'Biển quảng cáo hiển thị thông điệp chính trị không liên quan đến khu vực này. Mong muốn chính quyền địa phương kiểm tra và đảm bảo rằng quảng cáo trên đường không vi phạm các quy định liên quan.', '', '', "2023-08-05 00:00:00", 1, 'Kiểm tra thông tin quảng cáo và yêu cầu loại bỏ thông điệp không liên quan. Đảm bảo quảng cáo tuân thủ luật lệ và không gây phiền hà cho cộng đồng.'],
        [2, 'nthphuc21@clc.fitus.edu.vn', 2, 2,	1, 'Lê Thị Bình', 'ltb@gmail.com', '0923456789', 'Biển quảng cáo chính trị chứa thông điệp không chính xác về chính sách công cộng. Mong muốn chính trị gia hoặc tổ chức liên quan xem xét và điều chỉnh nội dung quảng cáo để tránh thông tin không đúng.', '', '', "2023-08-12 00:00:00", 1, 'Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng.'],
        [3, 'pmlinh21@clc.fitus.edu.vn', 2,	5, 2, 'Trần Minh Châu',	'tmc@gmail.com', '0976543210', 'Quảng cáo sản phẩm không có thông tin liên hệ hoặc địa chỉ cửa hàng. Mong muốn doanh nghiệp cung cấp thông tin liên lạc để người dùng có thể tìm thấy cửa hàng dễ dàng hơn.', '', '', "2023-08-17 00:00:00", 1, 'Liên hệ doanh nghiệp để yêu cầu cung cấp thông tin liên hệ và địa chỉ cửa hàng. Đảm bảo rằng quảng cáo chứa thông tin đầy đủ để người dùng dễ dàng liên hệ và đến cửa hàng.'],
        [4, '', null, 21, 3, 'Phạm Thị Dung', 'ptdung@gmail.com', '0932123456', 'Quảng cáo về chiến dịch xã hội hóa thiếu minh bạch về việc quyên góp và cách thức sử dụng các quỹ được huy động. Mong muốn có thêm thông tin về cách mà quỹ sẽ được sử dụng để hỗ trợ cộng đồng.', '', '',	"2023-08-23 00:00:00", 0, ''],
        [5, 'nnlien21@clc.fitus.edu.vn', 2,	9, 4, 'Hoàng Đức Em', 'hdem@gmail.com',	'0798765432', 'Quảng cáo có chứa thông tin không rõ ràng về ưu đãi hoặc giảm giá. Mong muốn nhận được giải đáp thắc mắc về các điều kiện và điều khoản của ưu đãi được quảng cáo để tránh nhầm lẫn khi mua hàng.', '', '',	"2023-08-28 00:00:00", 1, 'Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo thông tin chi tiết và rõ ràng về sản phẩm hoặc dịch vụ để tránh hiểu lầm.'],
        [6, 'nnlien21@clc.fitus.edu.vn', 1,	10,	2, 'Võ Thị Hà',	'vtha@gmail.com', '0712345678',	'Quảng cáo về chiến dịch xã hội hóa cần thêm thông tin về các hoạt động và dự án cụ thể được hỗ trợ. Mong muốn có thông tin chi tiết để hiểu rõ về tác động của việc quyên góp.', '', '', "2023-09-02 00:00:00", 1, 'Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng.'],
        [7, '', null, 22, 3, 'Đinh Minh Hiếu', 'dmhieu@gmail.com', '0776543210', 'Quảng cáo không truyền đạt được ưu điểm đặc biệt của sản phẩm hoặc dịch vụ. Mong muốn doanh nghiệp xem xét việc tăng cường thông tin để người tiêu dùng hiểu rõ về giá trị của sản phẩm.', '', '', "2023-09-08 00:00:00", 0, ''],
        [8, 'pmlinh21@clc.fitus.edu.vn', 1,	14,	4, 'Nguyễn Thị Khánh', 'ntkt@gmail.com', '0123456789', 'Quảng cáo có chứa thông tin không rõ ràng về các sản phẩm hoặc dịch vụ. Mong muốn nhận được giải đáp thắc mắc về tính năng và đặc điểm chi tiết của sản phẩm để quyết định mua hàng được hiệu quả hơn.', '', '', "2023-09-15 00:00:00", 1, 'Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo rằng mọi thông tin về sản phẩm hoặc dịch vụ được truyền đạt rõ ràng và chi tiết để tránh nhầm lẫn'],
        [9, 'pmlinh21@clc.fitus.edu.vn', 2, 19,	1, 'Lý Văn Long', 'lylong@gmail.com', '0987654321',	'Nhận thức về biển quảng cáo chính trị trên đường. Nội dung không chính xác, thiên hướng chống đối một đảng. Đề nghị kiểm tra thông tin và đảm bảo công bằng trong quảng cáo.', '', '', "2023-09-21 00:00:00", 1, 'Kiểm tra và xác minh thông tin quảng cáo. Nếu phát hiện không chính xác, yêu cầu rút quảng cáo và yêu cầu thông tin chính xác từ người đăng.'],
        [10, '', null, 17, 2, 'Trần Thị Mai', 'ttmai@gmail.com', '0943210765', 'Ghi nhận quảng cáo chính trị với thông tin đầy đủ. Mong muốn biết rõ về nội dung, nguồn gốc và mục tiêu của quảng cáo để hiểu rõ hơn về các chủ đề chính trị đang được thảo luận.', '', '', "2023-09-26 00:00:00", 0, ''],
        [11, '', null, 3, 3, 'Bùi Văn Nam', 'bvn@gmail.com', '0798234567', 'Nhìn thấy quảng cáo sản phẩm mới. Đề xuất thêm thông tin về giá cả và cách sử dụng sản phẩm. Cảm thấy quan tâm và muốn biết thêm để đưa ra quyết định mua hàng.', '', '', "2023-10-02 00:00:00", 0, ''],
        [12, '', null, 17, 4, 'Phan Thị Oanh', 'ptoanh@gmail.com', '0732123456', 'Quảng cáo một dịch vụ giải quyết vấn đề y tế. Đề xuất cung cấp thông tin chi tiết về cách dịch vụ hoạt động và chi phí liên quan. Đây là một vấn đề quan trọng, nên cần thông tin đầy đủ để đưa ra quyết định.', '', '', "2023-10-09 00:00:00", 0, ''],
        [13, '', null, 15, 3, 'Trịnh Văn Phúc', 'tvphuc@gmail.com', '0976543021', 'Tôi đề xuất thêm thông tin về mục tiêu và lợi ích của chương trình xã hội hóa này để người dân hiểu rõ hơn về mục đích của hoạt động này.', '', '', "2023-10-15 00:00:00", 0, ''],
        [14, '', null, 11, 1, 'Đỗ Thị Quỳnh', 'dtquynh@gmail.com', '0921765432', 'Phát hiện quảng cáo xã hội hóa với thông tin không chính xác về việc hỗ trợ cộng đồng. Đề xuất kiểm tra và xác nhận các dự án xã hội để đảm bảo sự minh bạch và trung thực.', '', '', "2023-10-21 00:00:00", 0, ''],
        [15, '', null, 7, 2, 'Nguyễn Minh Quân', 'nmquan@gmail.com', '0712987654', 'Nhìn thấy quảng cáo về chương trình xã hội hóa giúp trẻ em. Đề xuất cung cấp thông tin chi tiết về dự án, cách đóng góp và cách giúp đỡ để người dân có thể tham gia tích cực.', '', '', "2023-08-14 00:00:00", 0, ''],
        [16, 'nnlien21@clc.fitus.edu.vn', 1,	21,	3, 'Lê Văn Sơn', 'lson@gmail.com', '0123567890', 'Thấy quảng cáo liên quan đến chính sách giáo dục. Gợi ý thêm thông tin về cách áp dụng chính sách và cách hỗ trợ học sinh và giáo viên để tăng cường chất lượng giáo dục.', '', '', "2023-09-03 00:00:00", 1, 'Ghi chép ý kiến liên quan đến chính sách giáo dục. Chuyển ý kiến đến cấp quản lý để xem xét và áp dụng các đề xuất tích cực vào chính sách hiện tại.'],
        [17, 'pmlinh21@clc.fitus.edu.vn', 1,	23,	4, 'Hồ Thị Thảo', 'htthao@gmail.com', '0798987654',	'Quảng cáo về sản phẩm công nghệ mới. Đề xuất cung cấp thông tin về tính năng, hiệu suất và hỗ trợ kỹ thuật để người tiêu dùng có thể đưa ra quyết định mua hàng.', '', '', "2023-09-18 00:00:00", 1, 'Cung cấp thông tin chi tiết về sản phẩm công nghệ mới. Hỗ trợ khách hàng giải quyết thắc mắc về tính năng và giá cả để họ có thể đưa ra quyết định mua hàng.'],
        [18, 'ncluan21@clc.fitus.edu.vn', 1,	1, 1, 'Mai Văn Tiến', 'mvtien@gmail.com', '0912765432',	'Tôi nhận thấy một biển quảng cáo chính trị trên đường với nội dung không chính xác. Biển này chứa thông tin sai lệch về ứng cử viên và chính sách, cần được kiểm tra và sửa chữa.', '', '', "2023-10-08 00:00:00", 1, 'Kiểm tra thông tin và yêu cầu chỉnh sửa ngay lập tức.'],
        [19, 'pmlinh21@clc.fitus.edu.vn', 1,	20,	2, 'Vũ Thị Uyên', 'vtuyen@gmail.com', '0776543890',	'Biển quảng cáo chính trị này cần phải đăng ký nội dung để đảm bảo tính chính xác và minh bạch của thông điệp được truyền đạt.', '', '', "2023-08-31 00:00:00", 1, 'Liên hệ với chủ quảng cáo, yêu cầu đăng ký ngay.'],
        [20, 'nnlien21@clc.fitus.edu.vn', 2,	6, 3, 'Nguyễn Minh Vương', 'nmvuong@gmail.com',	'0932123456', 'Tôi muốn đóng góp ý kiến về nội dung của biển quảng cáo chính trị này. Đề xuất cung cấp thông tin chi tiết hơn về chính sách và kế hoạch cụ thể của ứng cử viên để người dân hiểu rõ hơn.', '', '', "2023-10-03 00:00:00", 1, 'Ghi nhận ý kiến, đề xuất yêu cầu thêm thông tin chi tiết.'],
        [21, '', null, 4, 1, 'Trần Thị Xuân', 'ttxuan@gmail.com', '0712654321', 'Biển quảng cáo thương mại này có vẻ chứa thông tin không chính xác về sản phẩm. Đề nghị kiểm tra và chỉnh sửa thông tin để tránh gây hiểu lầm cho người tiêu dùng.', '', '', "2023-09-01 00:00:00", 0, ''],
        [22, '', null, 14, 2, 'Phan Thanh Yến', 'ptyen@gmail.com', '0923456701', 'Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tuân thủ các quy định về quảng cáo thương mại.', '', '', "2023-09-07 00:00:00", 0, ''],
        [23, 'ncluan21@clc.fitus.edu.vn', 2,	17,	4, 'Lưu Thị Ánh', 'lanh@gmail.com',	'0123123456', 'Tôi có một số thắc mắc về sản phẩm được quảng cáo. Đề xuất cung cấp thông tin liên hệ hoặc website để tôi có thể tìm hiểu thêm về sản phẩm này.', '', '', "2023-09-14 00:00:00", 1, 'Cung cấp thông tin liên hệ chính thức để giải quyết thắc mắc.'],
        [24, 'pmlinh21@clc.fitus.edu.vn', 1,	1, 1, 'Đinh Văn Đức', 'dvduc@gmail.com', '0798765432', 'Biển quảng cáo xã hội hóa này chứa thông tin không chính xác về tổ chức hoặc sự kiện. Đề nghị kiểm tra và sửa chữa để tránh gây hiểu lầm cho cộng đồng.', '', '', "2023-09-22 00:00:00", 1, 'Thực hiện kiểm tra thông tin và yêu cầu chỉnh sửa ngay.'],
        [25, 'nnlien21@clc.fitus.edu.vn', 2,	17,	2, 'Nguyễn Thị Hoài', 'nthoai@gmail.com', '0712765432',	'Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tránh vi phạm các quy định về quảng cáo xã hội hóa.', '', '', "2023-10-02 00:00:00", 1, 'Liên hệ với tổ chức, yêu cầu đăng ký nội dung ngay lập tức.']
    ];

    let ads = [
        [1, 1, 5, 8.97, 3.42, 'image1.png', 1, '2023-11-03'],
        [2, 1, 2, 12.13, 7.88, '', 1, '2023-11-14'],
        [3, 2, 10, 10.21, 5.75, '', 2, '2023-12-05'],
        [4, 3, 2, 2.46, 9.33, '', 1, '2023-12-22'],
        [5, 3, 8, 6.59, 14.12, '', 2, '2024-01-09'],
        [6, 3, 3, 10.05, 4.38, '', 1, '2024-01-18'],
        [7, 6, 1, 10.79, 13.54, '', 1, '2024-02-02'],
        [8, 6, 8, 8.26, 2.93, '', 1, '2024-02-15'],
        [9, 8, 1, 10.84, 6.17, '', 3, '2024-03-04'],
        [10, 9, 5, 12.46, 3.65, '', 1, '2024-03-17'],
        [11, 10, 8, 9.12, 7.36, '', 2, '2024-04-01'],
        [12, 19, 1, 13.01, 5.18, '', 2, '2024-04-11'],
        [13, 19, 10, 1.57, 2.5, '', 2, '2024-04-28'],
        [14, 11, 6, 8.95, 7.89, '', 1, '2024-05-07'],
        [15, 13, 9, 5.26, 2.35, '', 1, '2024-05-19'],
        [16, 20, 2, 9.14, 1.99, '', 2, '2024-06-01'],
        [17, 14, 1, 8.01, 6.75, '', 2, '2024-06-14'],
        [18, 15, 1, 7.36, 4.5, '', 1, '2024-06-26'],
        [19, 22, 6, 1.62, 3.87, '', 1, '2024-07-09'],
        [20, 15, 6, 4.88, 1.47, '', 2, '2024-07-22'],
        [21, 17, 5, 3.09, 8.36, '', 2, '2024-08-04'],
        [22, 20, 10, 2.2, 6.88, '', 1, '2024-08-18'],
        [23, 25, 8, 6.44, 4.21, '', 1, '2024-08-29']
    ];

    let ads_loc_report = [
        [1, '', null, 20, 1, 'Nguyễn Thị Lan Anh', 'ntlananh@gmail.com', '0901234567', 'Tôi nhận thấy có một quảng cáo không liên quan tại đây. Mong sở kiểm tra và loại bỏ quảng cáo này để giữ cho bản đồ chất lượng hơn.', '', '', "2023-08-05 00:00:00", 0, ''],
        [2, 'nthphuc21@clc.fitus.edu.vn', 1, 10, 2, 'Trần Văn Tuấn', 'tvtuan@gmail.com', '0912345678', 'Tôi muốn đăng ký quảng cáo cho cửa hàng của mình tại đây. Xin vui lòng liên hệ để biết thêm thông tin và xác nhận việc đăng ký.', '', '', "2023-08-12 00:00:00", 1, 'Xác nhận thông tin và yêu cầu hình ảnh của quảng cáo. Hỗ trợ chủ quảng cáo cập nhật thông tin và hình ảnh theo yêu cầu.'],
        [3, '', null,	25, 3, 'Phạm Thị Hồng',	'pthong@gmail.com',	'0923456789', 'Tôi nghĩ rằng việc thêm một tính năng tìm kiếm địa điểm trên trang web sẽ giúp người dùng tìm thấy thông tin nhanh chóng hơn. Đây là một gợi ý để cải thiện trải nghiệm người dùng.', '', '', "2023-08-17 00:00:00", 0, ''],
        [4, 'ncluan21@clc.fitus.edu.vn', 1,	22,	4, 'Lê Minh Tuấn', 'lmtuan@gmail.com', '0934567890', 'Tôi có một câu hỏi liên quan đến việc đăng ký quảng cáo. Làm thế nào để tôi có thể thay đổi hình ảnh và thông tin trên quảng cáo của mình? Mong nhận được sự hỗ trợ.', '', '', "2023-08-23 00:00:00", 1, 'Hướng dẫn người dùng cách thay đổi thông tin và hình ảnh trên quảng cáo của họ. Cung cấp hỗ trợ kỹ thuật hoặc liên hệ công ty quảng cáo nếu cần.'],
        [5, 'nnlien21@clc.fitus.edu.vn', 2,	24, 1, 'Võ Ngọc Mai', 'vnmai@gmail.com', '0945678901', 'Tôi phát hiện một quảng cáo không hợp lý tại khu vực công cộng gần công viên. Xin hãy kiểm tra và loại bỏ quảng cáo này để bảo vệ vẻ đẹp của khu vực công cộng này.', '', '', "2023-08-28 00:00:00", 1, 'Xác minh và loại bỏ quảng cáo không phù hợp gần công viên. Thông báo việc xử lý này cho người báo cáo để họ biết rằng vấn đề đã được giải quyết.'],
        [6, '', null,	21,	1, 'Hoàng Đức Long', 'hdl@gmail.com', '0956789012', 'Phát hiện quảng cáo không phù hợp trên bảng quảng cáo công cộng. Mong muốn công việc kiểm tra và xử lý để duy trì trật tự và vẻ đẹp của khu vực.', '', '', "2023-09-02 00:00:00", 0, ''],
        [7, '', null, 16, 3,	'Bùi Thị Thu Hà', 'btth@gmail.com',	'0967890123', 'Góp ý về việc cải thiện dịch vụ wifi công cộng. Sự cải thiện này sẽ giúp tăng cường tiện ích cho người dân và du khách.', '', '', "2023-09-08 00:00:00", 0, ''],
        [8, '', null,	8, 4, 'Nguyễn Văn Hoàng', 'nvh@gmail.com',	'0978901234', 'Cần thông tin về các sự kiện nghệ thuật và văn hóa diễn ra trong tháng tại khu vực này. Xin hãy cung cấp lịch trình và địa điểm để thuận tiện tham gia.', '', '', "2023-09-15 00:00:00", 0, ''],
        [9, '', null, 3, 2, 'Đặng Quang Minh', 'dqminh@gmail.com', '0989012345', 'Cần đăng ký quảng cáo cho sự kiện tại địa điểm công cộng trong tuần tới. Rất mong nhận được hướng dẫn về thủ tục và yêu cầu cần thiết.', '', '', "2023-09-21 00:00:00", 0, ''],
        [10, '', null,	10,	2, 'Lê Thị Ngọc Trâm', 'ltntram@gmail.com',	'0990123456', 'Muốn đăng ký quảng cáo cho sự kiện tại địa điểm công cộng.', '', '', "2023-09-26 00:00:00", 0, ''],
        [11, '', null,	17, 4, 'Trần Thanh Hải', 'tthai@gmail.com',	'0881122334', 'Biển quảng cáo gần khu vực chợ không rõ ràng về giá cả sản phẩm. Mong muốn có thông tin giải đáp để người tiêu dùng hiểu rõ hơn.', '', '', "2023-10-02 00:00:00", 0, ''],
        [12, 'nthphuc21@clc.fitus.edu.vn', 2, 6, 1,	'Mai Thị Phương', 'mtphuong@gmail.com', '0872233445', 'Tôi báo cáo một biển quảng cáo gần công viên với hình ảnh không phù hợp, vi phạm chuẩn mực đạo đức.', '', '', "2023-10-09 00:00:00", 1, 'Liên hệ công ty quảng cáo, đòi hỏi thay đổi hình ảnh không phù hợp ngay lập tức và kiểm tra tuân thủ các nguyên tắc đạo đức.'],
        [13, '', null, 11,	3, 'Vũ Thị Thu Hường', 'vtthuong@gmail.com', '0863344556', 'Tôi đề xuất thêm biển chỉ dẫn đến các trung tâm y tế gần những điểm quảng cáo để cung cấp hướng dẫn hữu ích cho người dân.', '', '', "2023-10-15 00:00:00", 0, ''],
        [14, 'nnlien21@clc.fitus.edu.vn', 1,	18,	2, 'Hoàng Văn Thắng', 'hvthang@gmail.com', '0854455667', 'Biển quảng cáo chứa thông tin không chính xác về một sự kiện sắp tới. Mong được sửa chữa.', '', '', "2023-10-21 00:00:00", 1, 'Thông báo lỗi đến công ty quảng cáo, yêu cầu cập nhật thông tin chính xác về sự kiện và theo dõi việc điều chỉnh.'],
        [15, 'nthphuc21@clc.fitus.edu.vn', 1, 1,	4, 'Nguyễn Thị Thanh Nga', 'nttn@gmail.com', '0845566778', 'Cần biết rõ về quy định liên quan đến việc treo bảng quảng cáo tại các khu dân cư. Xin cung cấp thông tin chi tiết để hiểu rõ hơn.', '', '', "2023-08-14 00:00:00", 1, 'Gửi tài liệu chính thức về quy định liên quan đến việc treo bảng quảng cáo tại khu dân cư, bao gồm các hướng dẫn cụ thể.'],
        [16, 'nnlien21@clc.fitus.edu.vn', 2,	20,	1, 'Lê Văn Đức', 'lvduc@gmail.com',	'0836677889', 'Quảng cáo tại góc đường thiếu ánh sáng ban đêm, tạo ra tình trạng an toàn không tốt. Yêu cầu sửa chữa để tránh tai nạn giao thông.', '', '', "2023-09-03 00:00:00", 1, 'Gửi thông báo cho công ty quảng cáo, yêu cầu tăng cường ánh sáng xung quanh quảng cáo để đảm bảo an toàn giao thông.'],
        [17, 'pmlinh21@clc.fitus.edu.vn', 1,	13,	2, 'Phan Thị Quỳnh', 'ptquynh@gmail.com', '0827788990', 'Đề xuất thay đổi vị trí của quảng cáo gần trường học để tránh gây xao lãng cho học sinh và tăng cường an toàn giao thông.', '', '', "2023-09-18 00:00:00", 1, 'Liên hệ với công ty quảng cáo, thảo luận về việc thay đổi vị trí quảng cáo gần trường học để tăng cường an toàn và tránh gây xao lãng.'],
        [18, '', null,	18, 3, 'Đinh Minh Tâm',	'dmtam@gmail.com', '0818899001', 'Đề xuất tạo quy định rõ ràng về kích thước quảng cáo tại trung tâm thương mại để giữ gìn vẻ đẹp của thành phố.', '', '', "2023-10-08 00:00:00", 0, ''],
        [19, '', null,	22,	4, 'Trần Thị Quỳnh Trang', 'ttqtrang@gmail.com', '0809900112', 'Tôi muốn biết về quy định cụ thể liên quan đến việc đặt bảng quảng cáo tại các cửa hàng nhỏ trong khu vực dân cư. Xin thông tin chi tiết về kích thước, hình dạng, và các bước đăng ký.', '', '', "2023-08-31 00:00:00", 0, ''],
        [20, 'nnlien21@clc.fitus.edu.vn', 1,	4, 1, 'Nguyễn Văn Hoa',	'nvnhoa@gmail.com',	'0781122334', 'Phát hiện quảng cáo không phù hợp về sản phẩm thức uống sô-cô-la gần trường học. Mong muốn kiểm tra và chuyển đổi thành quảng cáo thân thiện với trẻ em.', '', '', "2023-10-03 00:00:00", 1, 'Liên hệ công ty quảng cáo, yêu cầu điều chỉnh nội dung quảng cáo về sản phẩm thức uống sô-cô-la gần trường học theo hướng thân thiện với trẻ em.'],
        [21, 'nnlien21@clc.fitus.edu.vn', 1,	25, 2, 'Lê Thị Bích Ngọc', 'ltbngoc@gmail.com',	'0772233445', 'Xin phép đăng ký quảng cáo về sự kiện thiền định. Rất mong được chấp thuận.', '', '', "2023-09-01 00:00:00", 1, 'Phê duyệt đơn đăng ký quảng cáo về sự kiện thiền định, gửi thông báo và hướng dẫn về việc thiết lập quảng cáo.'],
        [22, '', null,	16,	1, 'Võ Minh Khánh',	'vmkhanh@gmail.com', '0763344556', 'Quảng cáo xấu hổ và không lành mạnh gần trường học, gây ảnh hưởng đến học sinh nhỏ tuổi.', '', '', "2023-09-07 00:00:00", 0, ''],
        [23, '', null,	20,	1, 'Đỗ Thị Kim Ngân', 'dtkngan@gmail.com', '0754455667', 'Quảng cáo vi phạm văn hóa gần công viên, chứa hình ảnh không phù hợp với trẻ em và gia đình.', '', '', "2023-09-14 00:00:00", 0, ''],
        [24, '', null,	21, 2, 'Phạm Đức Hải', 'pdhai@gmail.com', '0745566778',	'Xin phép đăng ký quảng cáo về triển lãm nghệ thuật vào cuối tháng này.', '', '', "2023-09-22 00:00:00", 0, ''],
        [25, 'nnlien21@clc.fitus.edu.vn', 2,	19,	3, 'Hoàng Thị Diệu Linh', 'htdlinh@gmail.com', '0736677889', 'Đề xuất cải thiện văn hóa giao thông bằng việc thiết lập các bảng chỉ dẫn giao thông rõ ràng và hợp lý trên các tuyến đường chính.', '', '', "2023-10-02 00:00:00", 1, 'Tổ chức cuộc họp với các cơ quan chức năng để đánh giá ý kiến đề xuất. Tiến hành thiết kế và lắp đặt bảng chỉ dẫn giao thông mới trên các tuyến đường chính, nhằm tăng cường an toàn và giảm ùn tắc giao thông. Cảm ơn người dân đã góp ý và thông báo về việc triển khai ý kiến đóng góp.']
    ];

    let ads_location = [
        [1, 10.773695, 106.689636, '59 Nguyễn Thị Minh Khai', 2, 1, 2, 'image1.png', 1, 1],
        [2, 10.77143, 106.693526, '70 Phạm Hồng Thái', 2, 1, 2, 'image2.png', 3, 0],
        [3, 10.770072, 106.693823, '84 Lê Lai', 9, 1, 3, 'image3.png', 3, 0],
        [4, 10.777637, 106.693007, '128 Nguyễn Thị Minh Khai', 32, 3, 5, '', 1, 1],
        [5, 10.778513, 106.693939, '118 Nguyễn Thị Minh Khai', 32, 3, 6, '', 2, 1],
        [6, 10.774799, 106.690473, '138 Nguyễn Thị Minh Khai', 32, 3, 5, '', 1, 0],
        [7, 10.775846, 106.689544, '9 Võ Văn Tần', 32, 3, 2, '', 1, 0],
        [8, 10.772591, 106.69093, '2 Bùi Thị Xuân', 2, 1, 5, 'image1.png', 3, 0],
        [9, 10.774308, 106.688328, '141 Cách Mạng Tháng 8', 25, 3, 4, '', 2, 1],
        [10, 10.775101, 106.686973, '70 Cách Mạng Tháng 8', 25, 3, 3, '', 2, 1],
        [11, 10.776877, 106.688484, '36 Bà Huyện Thanh Quan', 32, 3, 5, '', 3, 1],
        [12, 10.776843, 106.690665, '55-25 Trương Định', 32, 3, 2, '', 1, 1],
        [13, 10.772553, 106.691073, '1 Bùi Thị Xuân', 2, 1, 2, 'image2.png', 3, 0],
        [14, 10.774375, 106.690221, '59 Nguyễn Thị Minh Khai', 2, 1, 3, 'image3.png', 1, 1],
        [15, 10.772146, 106.69246, '161-141 Nguyễn Du', 2, 1, 2, 'image1.png', 1, 1],
        [16, 10.776332, 106.691408, '2-10 Trương Định', 32, 3, 6, '', 2, 1],
        [17, 10.77632696, 106.6891595, '16 Nguyễn Thị Diệu', 32, 3, 1, '', 1, 1],
        [18, 10.7729249, 106.695438, '66 Trương Định', 2, 1, 3, 'image2.png', 2, 1],
        [19, 10.780619, 106.695861, '188 Pasteur', 32, 3, 3, '', 1, 0],
        [20, 10.77915627, 106.6961993, '14 Alexandre de Rhodes', 1, 1, 6, 'image3.png', 1, 0],
        [21, 10.775649, 106.697036, '108 Nguyễn Du', 2, 1, 6, 'image1.png', 3, 1],
        [22, 10.779572, 106.69514, '55-53 Nguyễn Thị Minh Khai', 1, 1, 3, 'image2.png', 1, 1],
        [23, 10.776907, 106.69798, '132 Nam Kỳ Khởi Nghĩa', 2, 1, 1, 'image3.png', 2, 1],
        [24, 10.771666, 106.693518, '550 Lý Tự Trọng', 2, 1, 4, 'image1.png', 3, 1],
        [25, 10.776379, 106.691306, '2-10 Trương Định', 32, 3, 5, '', 3, 0]
    ];
    
    let loc_report = [
        [1, '', null, 10.7762, 106.699, 1, 'Trần Thị Hương Giang', 'thgiang@gmail.com', '0901122334', 'Tôi phát hiện một quảng cáo không hợp pháp tại địa chỉ này. Xin kiểm tra và loại bỏ nó khỏi trang web của bạn.', '', '', "2023-08-05 00:00:00", 0, '', 2],
        [2, 'nthphuc21@clc.fitus.edu.vn', 1, 10.7751, 106.7, 4, 'Lê Văn Đức', 'lvduc@gmail.com', '0934567890', 'Tôi muốn đăng ký quảng cáo tại đây. Xin hướng dẫn tôi qua quy trình đăng ký và các bước cần thực hiện để quảng cáo của tôi xuất hiện trên bản đồ.', '', '', "2023-08-12 00:00:00", 1, 'Để đăng ký quảng cáo, vui lòng truy cập trang chính thức của chúng tôi và làm theo hướng dẫn đăng ký. Nếu gặp vấn đề, liên hệ với bộ phận hỗ trợ.', 1],
        [3, '', null,	10.7775, 106.699, 1, 'Nguyễn Thị Mai Anh', 'ntmanh@gmail.com', '0987654321', 'Bản đồ hiển thị địa chỉ không chính xác. Đề nghị cập nhật để tránh nhầm lẫn từ người dùng.', '', '', "2023-08-17 00:00:00", 0, '', 1],
        [4, '', null,	10.7809, 106.686, 3, 'Bùi Minh Tuấn', 'bmtuan@gmail.com', '0912345678', 'Khu vực này có lượng người qua lại lớn. Tôi đề xuất thêm điểm quảng cáo để tăng hiển thị thông tin về cộng đồng và doanh nghiệp địa phương.', '', '', "2023-08-23 00:00:00", 0, '', 32],
        [5, '', null,	10.7815, 106.687, 3, 'Hoàng Thị Lan Anh', 'htlanh@gmail.com', '0978877665', 'Khu vực này thường xuyên có trẻ em đi lại. Mong muốn các quảng cáo ở đây được thiết kế để phù hợp với độ tuổi của họ, giúp tạo ra một môi trường an toàn và thân thiện hơn.', '', '', "2023-08-28 00:00:00", 0, '', 32],
        [6, 'nnlien21@clc.fitus.edu.vn', 2,	10.7787, 106.685, 4, 'Võ Văn Phúc', 'vvphuc@gmail.com', '0965123456', 'Ở đây có các bảng quảng cáo nhưng vì sao không có điểm đặt quảng cáo hiển thị trên bản đồ?', '', '', "2023-09-02 00:00:00", 1, 'Kiểm tra và xác nhận rằng điểm quảng cáo tại địa điểm này đã được thêm vào bản đồ. Cảm ơn người dân đã chú ý và báo cáo vấn đề này.', 32],
        [7, '', null, 10.9448, 106.818,	1, 'Đỗ Thị Thanh Thảo',	'dtthao@gmail.com', '0921122334', 'Địa điểm có gắn quảng cáo trái phép, chưa đăng ký hợp pháp', '', '', "2023-09-08 00:00:00", 0, '', 5]
    ];

    let report_type = [[1, "Tố giác sai phạm"], [2, "Đăng ký nội dung"], [3, "Đóng góp ý kiến"], [4, "Giải đáp thắc mắc"]]
    
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // tháng bắt đầu từ 0
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }

    const filtered_ads_report = ads_report.filter(row => ads_location[ads[row[3] - 1][1] - 1][4] == id_ward);

    filtered_ads_report.forEach(function(row) {
        let report_type_index = row[4] - 1;
        let report_type_text = report_type[report_type_index][1];
    
        row[4] = report_type_text;
        row[11] = formatDate(row[11]);
        row[12] = row[12] === 1 ? "Đã xử lý" : "Chưa xử lý";
    });
    
    $('#example1').DataTable({
        data: filtered_ads_report,
        columns: [
            { title: "ID Báo cáo", data: 0 },
            { title: "ID Quảng cáo", data: 3 },
            { title: "Loại hình báo cáo", data: 4 },
            { title: "Người báo cáo", data: 5 },
            { title: "Email", data: 6 },
            { title: "Số điện thoại", data: 7 },
            { title: "Thời điểm gửi", data: 11 },
            { title: "Trạng thái", data: 12 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });
    
    $("#example1_wrapper").on('click', '.ads-report-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let id_report = filtered_ads_report[row][0], table = "ads"
        window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
        console.log(row);
    })

    const filtered_ads_loc_report = ads_loc_report.filter(row => ads_location[row[3] - 1][4] == id_ward);
    filtered_ads_loc_report.forEach(function(row) {
        let report_type_index = row[4] - 1;
        let report_type_text = report_type[report_type_index][1];
    
        row[4] = report_type_text;
        row[11] = formatDate(row[11]);
        row[12] = row[12] === 1 ? "Đã xử lý" : "Chưa xử lý";
    });
    
    $('#example2').DataTable({
        data: filtered_ads_loc_report,
        columns: [
            { title: "ID Báo cáo", data: 0 },
            { title: "ID Điểm đặt", data: 3 },
            { title: "Loại hình báo cáo", data: 4 },
            { title: "Người báo cáo", data: 5 },
            { title: "Email", data: 6 },
            { title: "Số điện thoại", data: 7 },
            { title: "Thời điểm gửi", data: 11 },
            { title: "Trạng thái", data: 12 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });
    
    $("#example2_wrapper").on('click', '.adsloc-report-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let id_report = filtered_ads_loc_report[row][0], table = "adsloc"
        window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
        console.log(row);
    })
    
    function getAddressFromCoordinates(latitude, longitude, callback) {
        const accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                // Kiểm tra xem dữ liệu có tồn tại và có thuộc tính features không
                if (data.features && data.features.length > 0) {
                    // Kiểm tra xem feature đầu tiên có thuộc tính place_name không
                    if (data.features[0].place_name) {
                        // Lấy địa chỉ từ dữ liệu trả về

                        const fullAddress = data.features[0].place_name;

                        // Tách địa chỉ thành các phần
                        const addressComponents = fullAddress.split(', ');

                        // Lấy phần của địa chỉ mà bạn quan tâm
                        const simplifiedAddress = addressComponents.slice(0, 2).join(', ');

                        callback(simplifiedAddress);
                    } else {
                        console.error('Dữ liệu không chứa thuộc tính "place_name".', data.features[0]);
                        callback('Địa chỉ không khả dụng');
                    }
                } else {
                    console.error('Dữ liệu không đúng định dạng hoặc không chứa thuộc tính "features".', data);
                    callback('Địa chỉ không khả dụng');
                }
            },
            error: function(error) {
                console.error('Error fetching address:', error);
                callback('Địa chỉ không khả dụng');
            }
        });
    }
    
    const filtered_loc_report = loc_report.filter(row => row[15] === id_ward);
    filtered_loc_report.forEach(function(row) {
        let report_type_index = row[5] - 1;
        let report_type_text = report_type[report_type_index][1];
    
        getAddressFromCoordinates(row[3], row[4], function(address) {
            row[3] = address; // Cập nhật giá trị địa chỉ trong mảng
    
            row[5] = report_type_text;
            row[12] = formatDate(row[12]);
            row[13] = row[13] === 1 ? "Đã xử lý" : "Chưa xử lý";
    
            // Sau khi cập nhật giá trị địa chỉ, cập nhật dữ liệu cho DataTable
            $('#example3').DataTable().clear().rows.add(filtered_loc_report).draw();
        });
    });
    
    $('#example3').DataTable({
        data: filtered_loc_report,
        columns: [
            { title: "ID Báo cáo", data: 0 },
            { title: "Địa chỉ", class: "diachi", data: 3 },
            { title: "Loại hình báo cáo", class: "diachi", data: 5 },
            { title: "Người báo cáo", data: 6 },
            { title: "Email", data: 7 },
            // { title: "Số điện thoại", data: 8 },
            { title: "Thời điểm gửi", class: "diachi", data: 12 },
            { title: "Trạng thái", class: "diachi", data: 13 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });
    
    $("#example3_wrapper").on('click', '.loc-report-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let id_report = filtered_loc_report[row][0], table = "loc"
        window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
        console.log(row);
    })
    
    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');

    manageButton.hover(
        function () {
        $(this).addClass('li-hover');
        $('#manage .nav-link').addClass('nav-link-hover');
        manageMenu.show();
        $('.black-bg').show()
        },
        function () {
        $(this).removeClass('li-hover');
        $('#manage .nav-link').removeClass('nav-link-hover');
        manageMenu.hide();
        $('.black-bg').hide()
        }
    );
});
