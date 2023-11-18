document.querySelector("#baocao").classList.add("snb-li-active");


let adslocationReports = [
    [1, "nnlien21@clc.fitus.edu.vn", 2, 20, 1, "Nguyễn Thị Lan Anh", "ntlananh@gmail.com", "0901234567", "Tôi nhận thấy có một quảng cáo không liên quan tại đây. Mong sở kiểm tra và loại bỏ quảng cáo này để giữ cho bản đồ chất lượng hơn.", "2023-08-05", 0, ""],
    [2, "21127672@student.hcmus.edu.vn", 1, 10, 2, "Trần Văn Tuấn", "tvtuan@gmail.com", "0912345678", "Tôi muốn đăng ký quảng cáo cho cửa hàng của mình tại đây. Xin vui lòng liên hệ để biết thêm thông tin và xác nhận việc đăng ký.", "2023-08-12", 1, "Xác nhận thông tin và yêu cầu hình ảnh của quảng cáo. Hỗ trợ chủ quảng cáo cập nhật thông tin và hình ảnh theo yêu cầu."],
    [3, "21127672@student.hcmus.edu.vn", 1, 25, 3, "Phạm Thị Hồng", "pthong@gmail.com", "0923456789", "Tôi nghĩ rằng việc thêm một tính năng tìm kiếm địa điểm trên trang web sẽ giúp người dùng tìm thấy thông tin nhanh chóng hơn. Đây là một gợi ý để cải thiện trải nghiệm người dùng.", "2023-08-17", 0, ""],
    [4, "21127637@student.hcmus.edu.vn", 1, 22, 4, "Lê Minh Tuấn", "lmtuan@gmail.com", "0934567890", "Tôi có một câu hỏi liên quan đến việc đăng ký quảng cáo. Làm thế nào để tôi có thể thay đổi hình ảnh và thông tin trên quảng cáo của mình? Mong nhận được sự hỗ trợ.", "2023-08-23", 1, "Hướng dẫn người dùng cách thay đổi thông tin và hình ảnh trên quảng cáo của họ. Cung cấp hỗ trợ kỹ thuật hoặc liên hệ công ty quảng cáo nếu cần."],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 24, 1, "Võ Ngọc Mai", "vnmai@gmail.com", "0945678901", "Tôi phát hiện một quảng cáo không hợp lý tại khu vực công cộng gần công viên. Xin hãy kiểm tra và loại bỏ quảng cáo này để bảo vệ vẻ đẹp của khu vực công cộng này.", "2023-08-28", 1, "Xác minh và loại bỏ quảng cáo không phù hợp gần công viên. Thông báo việc xử lý này cho người báo cáo để họ biết rằng vấn đề đã được giải quyết."],
    [6, "21127637@student.hcmus.edu.vn", 1, 21, 1, "Hoàng Đức Long", "hdl@gmail.com", "0956789012", "Phát hiện quảng cáo không phù hợp trên bảng quảng cáo công cộng. Mong muốn công việc kiểm tra và xử lý để duy trì trật tự và vẻ đẹp của khu vực.", "2023-09-02", 0, ""],
    [7, "nthphuc21@clc.fitus.edu.vn", 2, 16, 3, "Bùi Thị Thu Hà", "btth@gmail.com", "0967890123", "Góp ý về việc cải thiện dịch vụ wifi công cộng. Sự cải thiện này sẽ giúp tăng cường tiện ích cho người dân và du khách.", "2023-09-08", 0, ""],
    [8, "pmlinh21@clc.fitus.edu.vn", 2, 8, 4, "Nguyễn Văn Hoàng", "nvh@gmail.com", "0978901234", "Cần thông tin về các sự kiện nghệ thuật và văn hóa diễn ra trong tháng tại khu vực này. Xin hãy cung cấp lịch trình và địa điểm để thuận tiện tham gia.", "2023-09-15", 0, ""],
    [9, "21127637@student.hcmus.edu.vn", 1, 3, 2, "Đặng Quang Minh", "dqminh@gmail.com", "0989012345", "Cần đăng ký quảng cáo cho sự kiện tại địa điểm công cộng trong tuần tới. Rất mong nhận được hướng dẫn về thủ tục và yêu cầu cần thiết.", "2023-09-21", 0, ""],
    [10, "ncluan21@clc.fitus.edu.vn", 2, 10, 2, "Lê Thị Ngọc Trâm", "ltntram@gmail.com", "0990123456", "Muốn đăng ký quảng cáo cho sự kiện tại địa điểm công cộng.", "2023-09-26", 0, ""],
    [11, "nnlien21@clc.fitus.edu.vn", 2, 17, 4, "Trần Thanh Hải", "tthai@gmail.com", "0881122334", "Biển quảng cáo gần khu vực chợ không rõ ràng về giá cả sản phẩm. Mong muốn có thông tin giải đáp để người tiêu dùng hiểu rõ hơn.", "2023-10-02", 0, ""],
    [12, "nthphuc21@clc.fitus.edu.vn", 2, 6, 1, "Mai Thị Phương", "mtphuong@gmail.com", "0872233445", "Tôi báo cáo một biển quảng cáo gần công viên với hình ảnh không phù hợp, vi phạm chuẩn mực đạo đức.", "2023-10-09", 1, "Liên hệ công ty quảng cáo, đòi hỏi thay đổi hình ảnh không phù hợp ngay lập tức và kiểm tra tuân thủ các nguyên tắc đạo đức."],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 11, 3, "Vũ Thị Thu Hường", "vtthuong@gmail.com", "0863344556", "Tôi đề xuất thêm biển chỉ dẫn đến các trung tâm y tế gần những điểm quảng cáo để cung cấp hướng dẫn hữu ích cho người dân.", "2023-10-15", 0, ""],
    [14, "21127637@student.hcmus.edu.vn", 1, 18, 2, "Hoàng Văn Thắng", "hvthang@gmail.com", "0854455667", "Biển quảng cáo chứa thông tin không chính xác về một sự kiện sắp tới. Mong được sửa chữa.", "2023-10-21", 1, "Thông báo lỗi đến công ty quảng cáo, yêu cầu cập nhật thông tin chính xác về sự kiện và theo dõi việc điều chỉnh."],
    [15, "21127341@student.hcmus.edu.vn", 1, 1, 4, "Nguyễn Thị Thanh Nga", "nttn@gmail.com", "0845566778", "Cần biết rõ về quy định liên quan đến việc treo bảng quảng cáo tại các khu dân cư. Xin cung cấp thông tin chi tiết để hiểu rõ hơn.", "2023-08-14", 1, "Gửi tài liệu chính thức về quy định liên quan đến việc treo bảng quảng cáo tại khu dân cư, bao gồm các hướng dẫn cụ thể."],
    [16, "nnlien21@clc.fitus.edu.vn", 2, 20, 1, "Lê Văn Đức", "lvduc@gmail.com", "0836677889", "Quảng cáo tại góc đường thiếu ánh sáng ban đêm, tạo ra tình trạng an toàn không tốt. Yêu cầu sửa chữa để tránh tai nạn giao thông.", "2023-09-03", 1, "Gửi thông báo cho công ty quảng cáo, yêu cầu tăng cường ánh sáng xung quanh quảng cáo để đảm bảo an toàn giao thông."],
    [17, "21127341@student.hcmus.edu.vn", 1, 13, 2, "Phan Thị Quỳnh", "ptquynh@gmail.com", "0827788990", "Đề xuất thay đổi vị trí của quảng cáo gần trường học để tránh gây xao lãng cho học sinh và tăng cường an toàn giao thông.", "2023-09-18", 1, "Liên hệ với công ty quảng cáo, thảo luận về việc thay đổi vị trí quảng cáo gần trường học để tăng cường an toàn và tránh gây xao lãng."],
    [18, "21127341@student.hcmus.edu.vn", 1, 18, 3, "Đinh Minh Tâm", "dmtam@gmail.com", "0818899001", "Đề xuất tạo quy định rõ ràng về kích thước quảng cáo tại trung tâm thương mại để giữ gìn vẻ đẹp của thành phố.", "2023-10-08", 0, ""],
    [19, "21127341@student.hcmus.edu.vn", 1, 22, 4, "Trần Thị Quỳnh Trang", "ttqtrang@gmail.com", "0809900112", "Tôi muốn biết về quy định cụ thể liên quan đến việc đặt bảng quảng cáo tại các cửa hàng nhỏ trong khu vực dân cư. Xin thông tin chi tiết về kích thước, hình dạng, và các bước đăng ký.", "2023-08-31", 0, ""],
    [20, "21127350@student.hcmus.edu.vn", 1, 4, 1, "Nguyễn Văn Hoa", "nvnhoa@gmail.com", "0781122334", "Phát hiện quảng cáo không phù hợp về sản phẩm thức uống sô-cô-la gần trường học. Mong muốn kiểm tra và chuyển đổi thành quảng cáo thân thiện với trẻ em.", "2023-10-03", 1, "Liên hệ công ty quảng cáo, yêu cầu điều chỉnh nội dung quảng cáo về sản phẩm thức uống sô-cô-la gần trường học theo hướng thân thiện với trẻ em."],
    [21, "21127350@student.hcmus.edu.vn", 1, 25, 2, "Lê Thị Bích Ngọc", "ltbngoc@gmail.com", "0772233445", "Xin phép đăng ký quảng cáo về sự kiện thiền định. Rất mong được chấp thuận.", "2023-09-01", 1, "Phê duyệt đơn đăng ký quảng cáo về sự kiện thiền định, gửi thông báo và hướng dẫn về việc thiết lập quảng cáo."],
    [22, "pmlinh21@clc.fitus.edu.vn", 2, 16, 1, "Võ Minh Khánh", "vmkhanh@gmail.com", "0763344556", "Quảng cáo xấu hổ và không lành mạnh gần trường học, gây ảnh hưởng đến học sinh nhỏ tuổi.", "2023-09-07", 0, ""],
    [23, "21127350@student.hcmus.edu.vn", 1, 20, 1, "Đỗ Thị Kim Ngân", "dtkngan@gmail.com", "0754455667", "Quảng cáo vi phạm văn hóa gần công viên, chứa hình ảnh không phù hợp với trẻ em và gia đình.", "2023-09-14", 0, ""],
    [24, "21127350@student.hcmus.edu.vn", 1, 21, 2, "Phạm Đức Hải", "pdhai@gmail.com", "0745566778", "Xin phép đăng ký quảng cáo về triển lãm nghệ thuật vào cuối tháng này.", "2023-09-22", 0, ""],
    [25, "nnlien21@clc.fitus.edu.vn", 2, 19, 3, "Hoàng Thị Diệu Linh", "htdlinh@gmail.com", "0736677889", "Đề xuất cải thiện văn hóa giao thông bằng việc thiết lập các bảng chỉ dẫn giao thông rõ ràng và hợp lý trên các tuyến đường chính.", "2023-10-02", 1, "Tổ chức cuộc họp với các cơ quan chức năng để đánh giá ý kiến đề xuất. Tiến hành thiết kế và lắp đặt bảng chỉ dẫn giao thông mới trên các tuyến đường chính, nhằm tăng cường an toàn và giảm ùn tắc giao thông. Cảm ơn người dân đã góp ý và thông báo về việc triển khai ý kiến đóng góp."]
];

let reportTypes = [[1, "Tố giác sai phạm"], [2, "Đăng ký nội dung"], [3, "Đóng góp ý kiến"], [4, "Giải đáp thắc mắc"]];
let wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];

let wardOfficers = [
    ["21127672@student.hcmus.edu.vn", 2],
    ["21127637@student.hcmus.edu.vn", 9],
    ["21127341@student.hcmus.edu.vn", 25],
    ["21127350@student.hcmus.edu.vn", 32],
    ["cbphuong1@gmail.com", 1],
    ["cbphuong2@gmail.com", 3],
    ["cbphuong3@gmail.com", 4],
    ["cbphuong4@gmail.com", 5]
]

let districtOfficers = [
    ["nnlien21@clc.fitus.edu.vn", 1],
    ["nthphuc21@clc.fitus.edu.vn", 1],
    ["pmlinh21@clc.fitus.edu.vn", 3],
    ["ncluan21@clc.fitus.edu.vn", 3]
];

// get data from database
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = 0; i < adslocationReports.length; i++) {
    if (adslocationReports[i][0] == reqid) {
        // id_report	officer	office	id_ads_location	id_report_type	fullname	email	phone	content	report_time	status	resolve
        document.querySelector("#report-ads-location #id").value = adslocationReports[i][0];
        document.querySelector("#report-ads-location #id-ads-location").value = adslocationReports[i][3];
        document.querySelector("#report-ads-location #reporter").value = adslocationReports[i][5];
        document.querySelector("#report-ads-location #email").value = adslocationReports[i][6];
        document.querySelector("#report-ads-location #phone").value = adslocationReports[i][7];
        document.querySelector("#report-ads-location #report-time").value = adslocationReports[i][9];
        for (let j = 0; j < reportTypes.length; j++) {
            if (adslocationReports[j][4] == reportTypes[j][0]) {
                document.querySelector("#report-ads-location #report-type").value = reportTypes[j][1];
                break;
            }
        }
        document.querySelector("#report-ads-location #report-content").value = adslocationReports[i][8];
        if (adslocationReports[i][10] == 1) {
            document.querySelector("#report-ads-location #status").value = "Đã xử lý";

            if (adslocationReports[i][2] == 1) {
                for (let k = 0; k < wardOfficers.length; k++) {
                  if (adslocationReports[i][1] == wardOfficers[k][0]) {
                    for (let l = 0; l < wards.length; l++) {
                      if (wardOfficers[k][1] == wards[l][0]) {
                        document.querySelector("#report-ads-location #office").value = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
                        document.querySelector("#report-ads-location #officer").value = adslocationReports[i][1];
                        break;
                      }
                    }
                    break;
                  }
                }
            } else if (adslocationReports[i][2] == 2) {
                for (let k = 0; k < districtOfficers.length; k++) {
                  if (adslocationReports[i][1] == districtOfficers[k][0]) {
                    for (let l = 0; l < wards.length; l++) {
                      if (districtOfficers[k][1] == wards[l][0]) {
                        document.querySelector("#report-ads-location #office").value = "Quận " + wards[l][2];
                        document.querySelector("#report-ads-location #officer").value = adslocationReports[i][1];
                        break;
                      }
                    }
                    break;
                  }
                }
            }
            document.querySelector("#report-ads-location #resolve").value = adslocationReports[i][11];
        } else if (adslocationReports[i][10] == 0) {
            document.querySelector("#report-ads-location #status").value = "Chưa xử lý";
            document.querySelector("#report-ads-location #office").value = "-";
            document.querySelector("#report-ads-location #officer").value = "-";
            document.querySelector("#report-ads-location #resolve").value = "-";
        }
        break;
    }
}