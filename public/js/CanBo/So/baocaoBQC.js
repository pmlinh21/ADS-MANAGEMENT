document.querySelector("#baocao").classList.add("snb-li-active");

let adsReports = [
    [1, "21127350@student.hcmus.edu.vn", 1, 1, 1, "Nguyễn Văn Anh", "nvanh@gmail.com", "0912345678", "Biển quảng cáo hiển thị thông điệp chính trị không liên quan đến khu vực này. Mong muốn chính quyền địa phương kiểm tra và đảm bảo rằng quảng cáo trên đường không vi phạm các quy định liên quan.", "2023-08-05", 1, "Kiểm tra thông tin quảng cáo và yêu cầu loại bỏ thông điệp không liên quan. Đảm bảo quảng cáo tuân thủ luật lệ và không gây phiền hà cho cộng đồng."],
    [2, "nthphuc21@clc.fitus.edu.vn", 2, 2, 1, "Lê Thị Bình", "ltb@gmail.com", "0923456789", "Biển quảng cáo chính trị chứa thông điệp không chính xác về chính sách công cộng. Mong muốn chính trị gia hoặc tổ chức liên quan xem xét và điều chỉnh nội dung quảng cáo để tránh thông tin không đúng.", "2023-08-12", 1, "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng."],
    [3, "pmlinh21@clc.fitus.edu.vn", 2, 5, 2, "Trần Minh Châu", "tmc@gmail.com", "0976543210", "Quảng cáo sản phẩm không có thông tin liên hệ hoặc địa chỉ cửa hàng. Mong muốn doanh nghiệp cung cấp thông tin liên lạc để người dùng có thể tìm thấy cửa hàng dễ dàng hơn.", "2023-08-17", 1, "Liên hệ doanh nghiệp để yêu cầu cung cấp thông tin liên hệ và địa chỉ cửa hàng. Đảm bảo rằng quảng cáo chứa thông tin đầy đủ để người dùng dễ dàng liên hệ và đến cửa hàng."],
    [4, "ncluan21@clc.fitus.edu.vn", 2, 21, 3, "Phạm Thị Dung", "ptdung@gmail.com", "0932123456", "Quảng cáo về chiến dịch xã hội hóa thiếu minh bạch về việc quyên góp và cách thức sử dụng các quỹ được huy động. Mong muốn có thêm thông tin về cách mà quỹ sẽ được sử dụng để hỗ trợ cộng đồng.", "2023-08-23", 0, ""],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 9, 4, "Hoàng Đức Em", "hdem@gmail.com", "0798765432", "Quảng cáo có chứa thông tin không rõ ràng về ưu đãi hoặc giảm giá. Mong muốn nhận được giải đáp thắc mắc về các điều kiện và điều khoản của ưu đãi được quảng cáo để tránh nhầm lẫn khi mua hàng.", "2023-08-28", 1, "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo thông tin chi tiết và rõ ràng về sản phẩm hoặc dịch vụ để tránh hiểu lầm."],
    [6, "21127672@student.hcmus.edu.vn", 1, 10, 2, "Võ Thị Hà", "vtha@gmail.com", "0712345678", "Quảng cáo về chiến dịch xã hội hóa cần thêm thông tin về các hoạt động và dự án cụ thể được hỗ trợ. Mong muốn có thông tin chi tiết để hiểu rõ về tác động của việc quyên góp.", "2023-09-02", 1, "Liên hệ chính trị gia hoặc tổ chức chính trị liên quan và yêu cầu sửa đổi thông điệp không chính xác. Đảm bảo quảng cáo không truyền đạt thông tin sai lệch về chính sách công cộng."],
    [7, "21127341@student.hcmus.edu.vn", 1, 22, 3, "Đinh Minh Hiếu", "dmhieu@gmail.com", "0776543210", "Quảng cáo không truyền đạt được ưu điểm đặc biệt của sản phẩm hoặc dịch vụ. Mong muốn doanh nghiệp xem xét việc tăng cường thông tin để người tiêu dùng hiểu rõ về giá trị của sản phẩm.", "2023-09-08", 0, ""],
    [8, "21127672@student.hcmus.edu.vn", 1, 14, 4, "Nguyễn Thị Khánh", "ntkt@gmail.com", "0123456789", "Quảng cáo có chứa thông tin không rõ ràng về các sản phẩm hoặc dịch vụ. Mong muốn nhận được giải đáp thắc mắc về tính năng và đặc điểm chi tiết của sản phẩm để quyết định mua hàng được hiệu quả hơn.", "2023-09-15", 1, "Liên hệ doanh nghiệp để yêu cầu giải đáp thắc mắc của người tiêu dùng. Đảm bảo rằng mọi thông tin về sản phẩm hoặc dịch vụ được truyền đạt rõ ràng và chi tiết để tránh nhầm lẫn."],
    [9, "pmlinh21@clc.fitus.edu.vn", 2, 19, 1, "Lý Văn Long", "lylong@gmail.com", "0987654321", "Nhận thức về biển quảng cáo chính trị trên đường. Nội dung không chính xác, thiên hướng chống đối một đảng. Đề nghị kiểm tra thông tin và đảm bảo công bằng trong quảng cáo.", "2023-09-21", 1, "Kiểm tra và xác minh thông tin quảng cáo. Nếu phát hiện không chính xác, yêu cầu rút quảng cáo và yêu cầu thông tin chính xác từ người đăng."],
    [10, "21127341@student.hcmus.edu.vn", 1, 17, 2, "Trần Thị Mai", "ttmai@gmail.com", "0943210765", "Ghi nhận quảng cáo chính trị với thông tin đầy đủ. Mong muốn biết rõ về nội dung, nguồn gốc và mục tiêu của quảng cáo để hiểu rõ hơn về các chủ đề chính trị đang được thảo luận.", "2023-09-26", 0, ""],
    [11, "nnlien21@clc.fitus.edu.vn", 2, 3, 3, "Bùi Văn Nam", "bvn@gmail.com", "0798234567", "Nhìn thấy quảng cáo sản phẩm mới. Đề xuất thêm thông tin về giá cả và cách sử dụng sản phẩm. Cảm thấy quan tâm và muốn biết thêm để đưa ra quyết định mua hàng.", "2023-10-02", 0, ""],
    [12, "21127341@student.hcmus.edu.vn", 1, 17, 4, "Phan Thị Oanh", "ptoanh@gmail.com", "0732123456", "Quảng cáo một dịch vụ giải quyết vấn đề y tế. Đề xuất cung cấp thông tin chi tiết về cách dịch vụ hoạt động và chi phí liên quan. Đây là một vấn đề quan trọng, nên cần thông tin đầy đủ để đưa ra quyết định.", "2023-10-09", 0, ""],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 15, 3, "Trịnh Văn Phúc", "tvphuc@gmail.com", "0976543021", "Tôi đề xuất thêm thông tin về mục tiêu và lợi ích của chương trình xã hội hóa này để người dân hiểu rõ hơn về mục đích của hoạt động này.", "2023-10-15", 0, ""],
    [14, "nnlien21@clc.fitus.edu.vn", 2, 11, 1, "Đỗ Thị Quỳnh", "dtquynh@gmail.com", "0921765432", "Phát hiện quảng cáo xã hội hóa với thông tin không chính xác về việc hỗ trợ cộng đồng. Đề xuất kiểm tra và xác nhận các dự án xã hội để đảm bảo sự minh bạch và trung thực.", "2023-10-21", 0, ""],
    [15, "21127350@student.hcmus.edu.vn", 1, 7, 2, "Nguyễn Minh Quân", "nmquan@gmail.com", "0712987654", "Nhìn thấy quảng cáo về chương trình xã hội hóa giúp trẻ em. Đề xuất cung cấp thông tin chi tiết về dự án, cách đóng góp và cách giúp đỡ để người dân có thể tham gia tích cực.", "2023-08-14", 0, ""],
    [16, "21127350@student.hcmus.edu.vn", 1, 21, 3, "Lê Văn Sơn", "lson@gmail.com", "0123567890", "Thấy quảng cáo liên quan đến chính sách giáo dục. Gợi ý thêm thông tin về cách áp dụng chính sách và cách hỗ trợ học sinh và giáo viên để tăng cường chất lượng giáo dục.", "2023-09-03", 1, "Ghi chép ý kiến liên quan đến chính sách giáo dục. Chuyển ý kiến đến cấp quản lý để xem xét và áp dụng các đề xuất tích cực vào chính sách hiện tại."],
    [17, "21127637@student.hcmus.edu.vn", 1, 23, 4, "Hồ Thị Thảo", "htthao@gmail.com", "0887654321", "Quảng cáo sản phẩm công nghệ mới. Đề xuất thêm thông tin về tính năng và ưu điểm của sản phẩm để người tiêu dùng có cái nhìn tổng thể trước khi quyết định mua hàng.", "2023-09-10", 0, ""],
    [18, "nnlien21@clc.fitus.edu.vn", 2, 13, 2, "Trương Đình Thắng", "tdthang@gmail.com", "0978654321", "Nhận thức về quảng cáo chính trị trên đường. Đề xuất cung cấp thông tin chi tiết hơn về chủ đề và mục tiêu của chiến dịch để tạo ra sự hiểu biết sâu rộng hơn từ cộng đồng.", "2023-09-17", 1, "Chấp nhận ý kiến và chuyển đến đội ngũ nội dung để xem xét và cải thiện nội dung quảng cáo chính trị."],
    [19, "21127637@student.hcmus.edu.vn", 1, 5, 1, "Phạm Thị Thu", "ptthu@gmail.com", "0789012345", "Nhìn thấy biển quảng cáo với thông điệp tích cực về chính sách xã hội hóa. Đề xuất tăng cường thông tin về cách đóng góp và mức độ ảnh hưởng của mỗi đóng góp đối với cộng đồng.", "2023-09-23", 0, ""],
    [20, "nnlien21@clc.fitus.edu.vn", 2, 18, 4, "Vũ Văn Tiến", "vvtien@gmail.com", "0666123456", "Ghi nhận quảng cáo về sản phẩm công nghệ mới. Đề xuất cung cấp thông tin chi tiết hơn về cách sản phẩm hoạt động và những tiện ích mà nó mang lại để người tiêu dùng có thể đưa ra quyết định mua hàng chính xác.", "2023-09-30", 0, ""],
    [21, "21127350@student.hcmus.edu.vn", 1, 4, 1, "Trần Thị Xuân", "ttxuan@gmail.com", "0712654321", "Biển quảng cáo thương mại này có vẻ chứa thông tin không chính xác về sản phẩm. Đề nghị kiểm tra và chỉnh sửa thông tin để tránh gây hiểu lầm cho người tiêu dùng.", "2023-09-01", 0, ""],
    [22, "21127637@student.hcmus.edu.vn", 1, 14, 2, "Phan Thanh Yến", "ptyen@gmail.com", "0923456701", "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tuân thủ các quy định về quảng cáo thương mại.", "2023-09-07", 0, ""],
    [23, "ncluan21@clc.fitus.edu.vn", 2, 17, 4, "Lưu Thị Ánh", "lanh@gmail.com", "0123123456", "Tôi có một số thắc mắc về sản phẩm được quảng cáo. Đề xuất cung cấp thông tin liên hệ hoặc website để tôi có thể tìm hiểu thêm về sản phẩm này.", "2023-09-14", 1, "Cung cấp thông tin liên hệ chính thức để giải quyết thắc mắc."],
    [24, "21127672@student.hcmus.edu.vn", 1, 1, 1, "Đinh Văn Đức", "dvduc@gmail.com", "0798765432", "Biển quảng cáo xã hội hóa này chứa thông tin không chính xác về tổ chức hoặc sự kiện. Đề nghị kiểm tra và sửa chữa để tránh gây hiểu lầm cho cộng đồng.", "2023-09-22", 0, "Thực hiện kiểm tra thông tin và yêu cầu chỉnh sửa ngay."],
    [25, "nnlien21@clc.fitus.edu.vn", 2, 17, 2, "Nguyễn Thị Hoài", "nthoai@gmail.com", "0712765432", "Biển quảng cáo này cần được đăng ký nội dung để đảm bảo tính minh bạch và tránh vi phạm các quy định về quảng cáo xã hội hóa.", "2023-10-02", 1, "Liên hệ với tổ chức, yêu cầu đăng ký nội dung ngay lập tức."]
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
for (let i = 0; i < adsReports.length; i++) {
    if (adsReports[i][0] == reqid) {
    // id_report	officer	office	id_ads	id_report_type	fullname	email	phone	content	report_time	status	resolve
        document.querySelector("#report-ads #id").value = adsReports[i][0];
        document.querySelector("#report-ads #id-ads").value = adsReports[i][3];
        document.querySelector("#report-ads #reporter").value = adsReports[i][5];
        document.querySelector("#report-ads #email").value = adsReports[i][6];
        document.querySelector("#report-ads #phone").value = adsReports[i][7];
        document.querySelector("#report-ads #report-time").value = adsReports[i][9];
        for (let j = 0; j < reportTypes.length; j++) {
            if (adsReports[j][4] == reportTypes[j][0]) {
                document.querySelector("#report-ads #report-type").value = reportTypes[j][1];
                break;
            }
        }
        document.querySelector("#report-ads #report-content").value = adsReports[i][8];
        if (adsReports[i][10] == 1) {
            document.querySelector("#report-ads #status").value = "Đã xử lý";

            if (adsReports[i][2] == 1) {
                for (let k = 0; k < wardOfficers.length; k++) {
                  if (adsReports[i][1] == wardOfficers[k][0]) {
                    for (let l = 0; l < wards.length; l++) {
                      if (wardOfficers[k][1] == wards[l][0]) {
                        document.querySelector("#report-ads #office").value = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
                        document.querySelector("#report-ads #officer").value = adsReports[i][1];
                        break;
                      }
                    }
                    break;
                  }
                }
            } else if (adsReports[i][2] == 2) {
                for (let k = 0; k < districtOfficers.length; k++) {
                  if (adsReports[i][1] == districtOfficers[k][0]) {
                    for (let l = 0; l < wards.length; l++) {
                      if (districtOfficers[k][1] == wards[l][0]) {
                        document.querySelector("#report-ads #office").value = "Quận " + wards[l][2];
                        document.querySelector("#report-ads #officer").value = adsReports[i][1];
                        break;
                      }
                    }
                    break;
                  }
                }
            }
            document.querySelector("#report-ads #resolve").value = adsReports[i][11];
        } else if (adsReports[i][10] == 0) {
            document.querySelector("#report-ads #status").value = "Chưa xử lý";
            document.querySelector("#report-ads #office").value = "-";
            document.querySelector("#report-ads #officer").value = "-";
            document.querySelector("#report-ads #resolve").value = "-";
        }
        break;
    }
}