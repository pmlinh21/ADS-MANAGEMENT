document.querySelector("#baocao").classList.add("snb-li-active");

let locationReports = [
    [1, "nnlien21@clc.fitus.edu.vn", 2, 10.7762, 106.6985, "131 Nam Kỳ Khởi Nghĩa", 2, 1, "Trần Thị Hương Giang", "thgiang@gmail.com", "0901122334", "Tôi phát hiện một quảng cáo không hợp pháp tại địa chỉ này. Xin kiểm tra và loại bỏ nó khỏi trang web của bạn.", "2023-08-05", 0, ""],
    [2, "21127637@student.hcmus.edu.vn", 1, 10.7751, 106.7002, "103 Lê Thánh Tôn", 1, 4, "Lê Văn Đức", "lvduc@gmail.com", "0934567890", "Tôi muốn đăng ký quảng cáo tại đây. Xin hướng dẫn tôi qua quy trình đăng ký và các bước cần thực hiện để quảng cáo của tôi xuất hiện trên bản đồ.", "2023-08-12", 1, "Để đăng ký quảng cáo, vui lòng truy cập trang chính thức của chúng tôi và làm theo hướng dẫn đăng ký. Nếu gặp vấn đề, liên hệ với bộ phận hỗ trợ."],
    [3, "21127341@student.hcmus.edu.vn", 1, 10.7775, 106.699, "95 Pasteur", 1, 1, "Nguyễn Thị Mai Anh", "ntmanh@gmail.com", "0987654321", "Bản đồ hiển thị địa chỉ không chính xác. Đề nghị cập nhật để tránh nhầm lẫn từ người dùng.", "2023-08-17", 0, ""],
    [4, "21127672@student.hcmus.edu.vn", 1, 10.7809, 106.6863, "46 Trương Định", 32, 3, "Bùi Minh Tuấn", "bmtuan@gmail.com", "0912345678", "Khu vực này có lượng người qua lại lớn. Tôi đề xuất thêm điểm quảng cáo để tăng hiển thị thông tin về cộng đồng và doanh nghiệp địa phương.", "2023-08-23", 0, ""],
    [5, "21127350@student.hcmus.edu.vn", 1, 10.7815, 106.6869, "18A Tú Xương", 32, 3, "Hoàng Thị Lan Anh", "htlanh@gmail.com", "0978877665", "Khu vực này thường xuyên có trẻ em đi lại. Mong muốn các quảng cáo ở đây được thiết kế để phù hợp với độ tuổi của họ, giúp tạo ra một môi trường an toàn và thân thiện hơn.", "2023-08-28", 0, ""],
    [6, "pmlinh21@clc.fitus.edu.vn", 2, 10.7787, 106.6852, "280 Điện Biên Phủ", 32, 4, "Võ Văn Phúc", "vvphuc@gmail.com", "0965123456", "Ở đây có các bảng quảng cáo nhưng vì sao không có điểm đặt quảng cáo hiển thị trên bản đồ?", "2023-09-02", 1, "Kiểm tra và xác nhận rằng điểm quảng cáo tại địa điểm này đã được thêm vào bản đồ. Cảm ơn người dân đã chú ý và báo cáo vấn đề này."],
    [7, "nthphuc21@clc.fitus.edu.vn", 2, 10.76158915, 106.692004, "51 Hồ Hảo Hớn", 5, 1, "Đỗ Thị Thanh Thảo", "dtthao@gmail.com", "0921122334", "Địa điểm có gắn quảng cáo trái phép, chưa đăng ký hợp pháp", "2023-09-08", 0, ""]
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
for (let i = 0; i < locationReports.length; i++) {
    if (locationReports[i][0] == reqid) {
    // id_report 0	officer 1	office 2	latitude 3	longtitude 4	address 5	id_ward 6	id_report_type 7	fullname 8	email 9	phone 10	content 11	report_time 12	status 13	resolve 14
        document.querySelector("#report-location #id").value = locationReports[i][0];
        for (let j = 0; j < wards.length; j++) {
            if (locationReports[i][6] == wards[j][0]) {
                document.querySelector("#report-location #address").value = locationReports[i][5] + ", Phường " + wards[j][1] + ", Quận " + wards[j][2] + " [" + locationReports[i][3] + ", " + locationReports[i][4] +  "]";
                break;
            }
        }
        
        document.querySelector("#report-location #reporter").value = locationReports[i][8];
        document.querySelector("#report-location #email").value = locationReports[i][9];
        document.querySelector("#report-location #phone").value = locationReports[i][10];
        document.querySelector("#report-location #report-time").value = locationReports[i][12];
        for (let j = 0; j < reportTypes.length; j++) {
            if (locationReports[j][7] == reportTypes[j][0]) {
                document.querySelector("#report-location #report-type").value = reportTypes[j][1];
                break;
            }
        }
        document.querySelector("#report-location #report-content").value = locationReports[i][11];
        if (locationReports[i][13] == 1) {
            document.querySelector("#report-location #status").value = "Đã xử lý";

            if (locationReports[i][2] == 1) {
                for (let k = 0; k < wardOfficers.length; k++) {
                  if (locationReports[i][1] == wardOfficers[k][0]) {
                    for (let l = 0; l < wards.length; l++) {
                      if (wardOfficers[k][1] == wards[l][0]) {
                        document.querySelector("#report-location #office").value = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
                        document.querySelector("#report-location #officer").value = locationReports[i][1];
                        break;
                      }
                    }
                    break;
                  }
                }
            } else if (locationReports[i][2] == 2) {
                for (let k = 0; k < districtOfficers.length; k++) {
                  if (locationReports[i][1] == districtOfficers[k][0]) {
                    for (let l = 0; l < wards.length; l++) {
                      if (districtOfficers[k][1] == wards[l][0]) {
                        document.querySelector("#report-location #office").value = "Quận " + wards[l][2];
                        document.querySelector("#report-location #officer").value = locationReports[i][1];
                        break;
                      }
                    }
                    break;
                  }
                }
            }
            document.querySelector("#report-location #resolve").value = locationReports[i][14];
        } else if (locationReports[i][13] == 0) {
            document.querySelector("#report-location #status").value = "Chưa xử lý";
            document.querySelector("#report-location #office").value = "-";
            document.querySelector("#report-location #officer").value = "-";
            document.querySelector("#report-location #resolve").value = "-";
        }
        break;
    }
}