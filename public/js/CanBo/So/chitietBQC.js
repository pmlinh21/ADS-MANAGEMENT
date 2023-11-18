document.querySelector("#chinhsua").classList.add("snb-li-active");

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
];

let districtOfficers = [
    ["nnlien21@clc.fitus.edu.vn", 1],
    ["nthphuc21@clc.fitus.edu.vn", 1],
    ["pmlinh21@clc.fitus.edu.vn", 3],
    ["ncluan21@clc.fitus.edu.vn", 3]
];

let locationTypes = [
    [1, "Đất công/Công viên/Hành lang an toàn giao thông"],
    [2, "Đất tư nhân/Nhà ở riêng lẻ"],
    [3, "Trung tâm thương mại"],
    [4, "Chợ"],
    [5, "Cây xăng"],
    [6, "Nhà chờ xe buýt"]
];

let adsTypes = [
    [1, "Cổ động chính trị"],
    [2, "Quảng cáo thương mại"],
    [3, "Xã hội hóa"]
];

let boardTypes = [
    [1, "Trụ bảng hiflex"],
    [2, "Trụ màn hình điện tử LED"],
    [3, "Trụ hộp đèn"],
    [4, "Bảng hiflex ốp tường"],
    [5, "Trụ treo băng rôn dọc"],
    [6, "Trụ treo băng rôn ngang"],
    [7, "Trụ/Cụm Pano"],
    [8, "Cổng chào"],
    [9, "Trụ bảng Trung tâm thương mại"]
];

let adsUpdateRequests = [
    [1, "21127350@student.hcmus.edu.vn", 1, 12, 20, 9, 5.21, 3.14, 1, "2024-03-12", "2023-08-05", "Thông tin vị trí không chính xác", 1],
    [2, "nthphuc21@clc.fitus.edu.vn", 2, 4, 22, 4, 3.74, 2.73, 1, "2024-01-29", "2023-08-12", "Loại bảng quảng cáo không đúng", 0],
    [3, "21127341@student.hcmus.edu.vn", 1, 18, 21, 6, 2.88, 5.92, 1, "2024-05-05", "2023-08-17", "Sai kích thước", 1],
    [4, "ncluan21@clc.fitus.edu.vn", 2, 9, 25, 2, 4.09, 1.47, 2, "2024-02-15", "2023-08-23", "Số lượng bảng quảng cáo không chính xác", 1],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 22, 18, 8, 1.63, 8.36, 1, "2024-04-09", "2023-08-28", "Ngày hết hạn hợp đồng không chính xác", 0],
    [6, "21127350@student.hcmus.edu.vn", 1, 8, 3, 3, 3.95, 6.88, 1, "2024-01-21", "2023-09-02", "Hình ảnh minh họa hiển thị không đúng", 1],
    [7, "21127672@student.hcmus.edu.vn", 1, 2, 9, 1, 2.31, 4.21, 3, "2024-04-27", "2023-09-08", "Nhiều thông tin bị sai", 0],
    [8, "pmlinh21@clc.fitus.edu.vn", 2, 19, 1, 7, 4.12, 9.63, 1, "2024-05-17", "2023-09-15", "Thông tin về bảng quảng cáo không chính xác", 1],
    [9, "21127672@student.hcmus.edu.vn", 1, 16, 15, 5, 1.97, 7.89, 1, "2024-03-04", "2023-09-21", "Cập nhật thông tin mới về bảng quảng cáo", 0],
    [10, "ncluan21@clc.fitus.edu.vn", 2, 7, 6, 4, 3.5, 2.35, 1, "2024-02-07", "2023-09-26", "Thông tin hiển thị sai chính tả", 1],
    [11, "21127637@student.hcmus.edu.vn", 1, 5, 14, 2, 2.81, 1.99, 1, "2024-04-03", "2023-10-02", "Kích thước bảng quảng cáo sai đơn vị", 0],
    [12, "21127637@student.hcmus.edu.vn", 1, 20, 2, 8, 4.67, 6.75, 2, "2024-01-14", "2023-10-09", "Ngày hết hạn hợp đồng không đúng", 1],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 14, 11, 3, 1.38, 4.5, 1, "2024-05-02", "2023-10-15", "Sai loại bảng quảng cáo", 0],
    [14, "21127341@student.hcmus.edu.vn", 1, 23, 8, 1, 5.02, 3.87, 1, "2024-03-18", "2023-10-21", "Điểm đặt quảng cáo không chính xác", 1],
    [15, "21127350@student.hcmus.edu.vn", 1, 6, 5, 7, 2.46, 5.26, 1, "2024-02-23", "2023-08-14", "Sai kích thước", 1],
    [16, "21127341@student.hcmus.edu.vn", 1, 15, 19, 5, 3.19, 9.14, 2, "2024-04-14", "2023-09-03", "Hình ảnh chưa được cập nhật, vẫn là hình bảng quảng cáo cũ", 0],
    [17, "pmlinh21@clc.fitus.edu.vn", 2, 1, 10, 9, 1.75, 8.01, 1, "2024-03-29", "2023-09-18", "Sai loại bảng quảng cáo", 0],
    [18, "21127350@student.hcmus.edu.vn", 1, 22, 18, 9, 4.89, 7.36, 1, "2024-01-05", "2023-10-08", "Ngày hết hạn hợp đồng đã được gia hạn thêm, vui lòng cập nhật trên hệ thống", 1],
    [19, "pmlinh21@clc.fitus.edu.vn", 2, 10, 1, 4, 2.93, 1.62, 2, "2024-05-23", "2023-08-31", "Cần cập nhật thông tin về quảng cáo", 1],
    [20, "21127637@student.hcmus.edu.vn", 1, 13, 7, 6, 5.11, 4.88, 1, "2024-02-02", "2023-10-03", "Sai kích thước", 0]
];
// id_req 0	officer 1	office 2	id_ads 3	id_ads_location 4	id_board_type 5	width 6	height 7	8	quantity 9	expired_date 10	req_time 11	reason 12	status 
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = 0; i < adsUpdateRequests.length; i++) {
    if (adsUpdateRequests[i][0] == reqid) {
        document.querySelector("#update-ads #id").value = adsUpdateRequests[i][0];
        document.querySelector("#update-ads #id-ads").value = adsUpdateRequests[i][3];
        document.querySelector("#update-ads #id-ads-location").value = adsUpdateRequests[i][4];
        document.querySelector("#update-ads #board-length").value = adsUpdateRequests[i][7];
        document.querySelector("#update-ads #board-width").value = adsUpdateRequests[i][6];
        document.querySelector("#update-ads #quantity").value = adsUpdateRequests[i][8];
        for (let j = 0; j < boardTypes.length; j++) {
            if (adsUpdateRequests[i][5] == boardTypes[j][0]) {
                document.querySelector("#update-ads #board-type").value = boardTypes[j][1];
                break;
            }
        }
        document.querySelector("#update-ads #expired-date").value = adsUpdateRequests[i][9];
        document.querySelector("#update-ads #reason").value = adsUpdateRequests[i][11];
        document.querySelector("#update-ads #req-time").value = adsUpdateRequests[i][10];

        if (adsUpdateRequests[i][2] == 1) {
            for (let k = 0; k < wardOfficers.length; k++) {
              if (adsUpdateRequests[i][1] == wardOfficers[k][0]) {
                for (let l = 0; l < wards.length; l++) {
                  if (wardOfficers[k][1] == wards[l][0]) {
                    document.querySelector("#update-ads #office").value = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
                    document.querySelector("#update-ads #officer").value = adsUpdateRequests[i][1];
                    break;
                  }
                }
                break;
              }
            }
        } else if (adsUpdateRequests[i][2] == 2) {
            for (let k = 0; k < districtOfficers.length; k++) {
              if (adsUpdateRequests[i][1] == districtOfficers[k][0]) {
                for (let l = 0; l < wards.length; l++) {
                  if (districtOfficers[k][1] == wards[l][0]) {
                    document.querySelector("#update-ads #office").value = "Quận " + wards[l][2];
                    document.querySelector("#update-ads #officer").value = adsUpdateRequests[i][1];
                    break;
                  }
                }
                break;
              }
            }
        }
    }
}