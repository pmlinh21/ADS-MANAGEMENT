$(document).ready(function(){
    $("#chinhsua").addClass("snb-li-active");

    let allYeuCauChinhSuaDDQC;
})

let adslocations = [
    [1, 10.773695, 106.689636, "59 Nguyễn Thị Minh Khai", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [2, 10.77143, 106.693526, "70 Phạm Hồng Thái", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Xã hội hóa", 0],
    [3, 10.770072, 106.693823, "84 Lê Lai", 9, 1, "Trung tâm thương mại", "Xã hội hóa", 0],
    [4, 10.777637, 106.693007, "128 Nguyễn Thị Minh Khai", 32, 3, "Cây xăng", "Cổ đông chính trị", 1],
    [5, 10.778513, 106.693939, "118 Nguyễn Thị Minh Khai", 32, 3, "Nhà chờ xe buýt", "Quảng cáo thương mại", 1],
    [6, 10.774799, 106.690473, "138 Nguyễn Thị Minh Khai", 32, 3, "Cây xăng", "Cổ đông chính trị", 0],
    [7, 10.775846, 106.689544, "9 Võ Văn Tần", 32, 3, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 0],
    [8, 10.772591, 106.69093, "2 Bùi Thị Xuân", 2, 1, "Cây xăng", "Xã hội hóa", 0],
    [9, 10.774308, 106.688328, "141 Cách Mạng Tháng 8", 25, 3, "Chợ", "Quảng cáo thương mại", 1],
    [10, 10.775101, 106.686973, "70 Cách Mạng Tháng 8", 25, 3, "Trung tâm thương mại", "Quảng cáo thương mại", 1],
    [11, 10.776877, 106.688484, "36 Bà Huyện Thanh Quan", 32, 3, "Cây xăng", "Xã hội hóa", 1],
    [12, 10.776843, 106.690665, "55-25 Trương Định", 32, 3, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [13, 10.772553, 106.691073, "1 Bùi Thị Xuân", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Xã hội hóa", 0],
    [14, 10.774375, 106.690221, "59 Nguyễn Thị Minh Khai", 2, 1, "Trung tâm thương mại", "Cổ đông chính trị", 1],
    [15, 10.772146, 106.69246, "161-141 Nguyễn Du", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [16, 10.776332, 106.691408, "2-10 Trương Định", 32, 3, "Nhà chờ xe buýt", "Quảng cáo thương mại", 1],
    [17, 10.77632696, 106.6891595, "16 Nguyễn Thị Diệu", 32, 3, "Đất công/Công viên/Hành lang an toàn giao thông", "Cổ đông chính trị", 1],
    [18, 10.7729249, 106.695438, "66 Trương Định", 2, 1, "Trung tâm thương mại", "Quảng cáo thương mại", 1],
    [19, 10.780619, 106.695861, "188 Pasteur", 32, 3, "Trung tâm thương mại", "Cổ đông chính trị", 0],
    [20, 10.77915627, 106.6961993, "14 Alexandre de Rhodes", 1, 1, "Nhà chờ xe buýt", "Cổ đông chính trị", 0],
    [21, 10.775649, 106.697036, "108 Nguyễn Du", 2, 1, "Nhà chờ xe buýt", "Xã hội hóa", 1],
    [22, 10.779572, 106.69514, "55-53 Nguyễn Thị Minh Khai", 1, 1, "Trung tâm thương mại", "Cổ đông chính trị", 1],
    [23, 10.776907, 106.69798, "132 Nam Kỳ Khởi Nghĩa", 2, 1, "Đất công/Công viên/Hành lang an toàn giao thông", "Quảng cáo thương mại", 1],
    [24, 10.771666, 106.693518, "550 Lý Tự Trọng", 2, 1, "Chợ", "Xã hội hóa", 1],
    [25, 10.776379, 106.691306, "2-10 Trương Định", 32, 3, "Cây xăng", "Xã hội hóa", 0]
]; 
var wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];

let ads = [
    [1, 1, "Màn hình điện tử ốp tường", 8.97, 3.42, 1, "2023-11-03"],
    [2, 1, "Trụ màn hình điện tử LED", 12.13, 7.88, 1, "2023-11-14"],
    [3, 2, "Trung tâm thương mại", 10.21, 5.75, 2, "2023-12-05"],
    [4, 3, "Trụ màn hình điện tử LED", 2.46, 9.33, 1, "2023-12-22"],
    [5, 3, "Trụ/Cụm pano", 6.59, 14.12, 2, "2024-01-09"],
    [6, 3, "Trụ hộp đèn", 10.05, 4.38, 1, "2024-01-18"],
    [7, 6, "Trụ bảng hiflex", 10.79, 13.54, 1, "2024-02-02"],
    [8, 6, "Trụ/Cụm pano", 8.26, 2.93, 1, "2024-02-15"],
    [9, 8, "Trụ bảng hiflex", 10.84, 6.17, 3, "2024-03-04"],
    [10, 9, "Màn hình điện tử ốp tường", 12.46, 3.65, 1, "2024-03-17"],
    [11, 10, "Trụ/Cụm pano", 9.12, 7.36, 2, "2024-04-01"],
    [12, 19, "Trụ bảng hiflex", 13.01, 5.18, 2, "2024-04-11"],
    [13, 19, "Trung tâm thương mại", 1.57, 2.50, 2, "2024-04-28"],
    [14, 11, "Trụ treo băng rôn dọc", 8.95, 7.89, 1, "2024-05-07"],
    [15, 13, "Cổng chào", 5.26, 2.35, 1, "2024-05-19"],
    [16, 20, "Trụ màn hình điện tử LED", 9.14, 1.99, 2, "2024-06-01"],
    [17, 14, "Trụ bảng hiflex", 8.01, 6.75, 2, "2024-06-14"],
    [18, 15, "Trụ bảng hiflex", 7.36, 4.50, 1, "2024-06-26"],
    [19, 22, "Trụ treo băng rôn dọc", 1.62, 3.87, 1, "2024-07-09"],
    [20, 15, "Trụ treo băng rôn dọc", 4.88, 1.47, 2, "2024-07-22"],
    [21, 17, "Màn hình điện tử ốp tường", 3.09, 8.36, 2, "2024-08-04"],
    [22, 20, "Trung tâm thương mại", 2.20, 6.88, 1, "2024-08-18"],
    [23, 25, "Trụ/Cụm pano", 6.44, 4.21, 1, "2024-08-29"]
];

let adslocationUpdateRequests = [
    [1, "nnlien21@clc.fitus.edu.vn", 1, 15, 10.778311, 106.691779, "25-11 Võ Văn Tần", 32, 3, 2, 2, 1, "2023-08-02", "Thông tin vị trí không chính xác", 1],
    [2, "nthphuc21@clc.fitus.edu.vn", 2, 8, 10.772591, 106.69093, "5-1 Bùi Thị Xuân", 2, 1, 4, 3, 0, "2023-08-08", "Hình ảnh minh họa không đúng", 0],
    [3, "pmlinh21@clc.fitus.edu.vn", 1, 20, 10.776877, 106.688484, "30-36 Bà Huyện Thanh Quan", 32, 3, 1, 1, 1, "2023-08-12", "Sai địa chỉ điểm đặt", 1],
    [4, "ncluan21@clc.fitus.edu.vn", 2, 25, 10.770072, 106.693823, "Lê Lai", 9, 1, 3, 2, 0, "2023-08-18", "Thông tin loại hình quảng cáo sai lệch", 0],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 22, 10.77143, 106.693526, "139 Nguyễn Du", 2, 1, 6, 1, 1, "2023-08-23", "Thông tin điểm đặt có nhiều sai lệch", 0],
    [6, "nnlien21@clc.fitus.edu.vn", 1, 21, 10.774375, 106.690221, "59 Nguyễn Thị Minh Khai", 2, 1, 5, 3, 0, "2023-09-01", "Sai chính tả địa chỉ điểm đặt", 1],
    [7, "nthphuc21@clc.fitus.edu.vn", 1, 7, 10.775846, 106.689544, "9 Võ Văn Tần", 32, 3, 1, 2, 1, "2023-09-05", "Hình ảnh minh họa quá cũ, chưa được cập nhật", 1],
    [8, "pmlinh21@clc.fitus.edu.vn", 2, 16, 10.776332, 106.691408, "2-10 Trương Định", 32, 3, 3, 1, 0, "2023-09-11", "Khu vực đã quy hoạch nhưng chưa được cập nhật thông tin", 0],
    [9, "pmlinh21@clc.fitus.edu.vn", 1, 12, 10.776843, 106.690665, "55-25 Trương Định", 32, 3, 6, 3, 1, "2023-09-15", "Sai tên đường", 1],
    [10, "ncluan21@clc.fitus.edu.vn", 2, 6, 10.774799, 106.690473, "138 Nguyễn Thị Minh Khai", 32, 3, 2, 3, 0, "2023-09-21", "Sai quận", 1],
    [11, "nnlien21@clc.fitus.edu.vn", 1, 9, 10.774308, 106.688328, "147-141 Cách Mạng Tháng 8", 25, 3, 4, 2, 0, "2023-09-27", "Sai phường", 0],
    [12, "nthphuc21@clc.fitus.edu.vn", 1, 19, 10.773695, 106.689636, "59 Nguyễn Thị Minh Khai", 2, 1, 5, 1, 1, "2023-10-03", "Sai loại hình quảng cáo", 0],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 13, 10.772553, 106.691073, "Bùi Thị Xuân", 9, 1, 1, 2, 1, "2023-10-07", "Hình ảnh điểm đặt bị nhầm với hình ảnh điểm đặt bên cạnh", 1],
    [14, "nnlien21@clc.fitus.edu.vn", 1, 4, 10.777637, 106.693007, "128 Nguyễn Thị Minh Khai", 32, 3, 6, 3, 1, "2023-10-13", "Hình ảnh mờ, nhòe, không thấy rõ", 0],
    [15, "nthphuc21@clc.fitus.edu.vn", 1, 18, 10.77632696, 106.6891595, "16 Bà Huyện Thanh Quan", 32, 3, 2, 1, 0, "2023-10-17", "Tên phường vừa được thay đổi, yêu cầu cập nhật", 1],
    [16, "nnlien21@clc.fitus.edu.vn", 1, 5, 10.778513, 106.693939, "118 Nguyễn Thị Minh Khai", 32, 3, 3, 2, 0, "2023-10-22", "Sai chính tả tên đường", 1],
    [17, "pmlinh21@clc.fitus.edu.vn", 2, 10, 10.775101, 106.686973, "70 Cách Mạng Tháng 8", 25, 3, 4, 1, 1, "2023-10-28", "Hình ảnh minh họa bị lỗi, không hiển thị", 0],
    [18, "ncluan21@clc.fitus.edu.vn", 1, 18, 10.7729249, 106.695438, "66 Trương Định", 2, 1, 5, 3, 0, "2023-10-31", "Thiếu hình ảnh minh họa", 0],
    [19, "pmlinh21@clc.fitus.edu.vn", 2, 1, 10.77425105, 106.688502, "56 Cách Mạng Tháng 8", 32, 3, 1, 2, 1, "2023-08-27", "Địa chỉ điểm đặt thiếu thông tin", 1],
    [20, "nnlien21@clc.fitus.edu.vn", 1, 8, 10.772591, 106.69093, "2 Bùi Thị Xuân", 9, 1, 6, 1, 1, "2023-09-30", "Nhiều thông tin sai lệch", 1]
];
// id_req	officer	office	id_ads_location	latitude	longitude	address	ward	district	id_loc_type id_ads_type	is_zoning	req_time	reason	status

for (let i = adslocationUpdateRequests.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");

    td1.innerHTML = adslocationUpdateRequests[i-1][0];
    td1.className = "id";
    td2.innerHTML = adslocationUpdateRequests[i-1][3];
    td2.className = "id-ads-location";
    let j;
    for (j = 0; j < adslocations.length; j++) {
        if (adslocations[j][0] == adslocationUpdateRequests[i-1][3]) {
            td3.innerHTML = adslocations[j][3];
            td3.className = "address";
            break;
        }
    }
    let k;
    for (k = 0; k < wards.length; k++) {
        if (adslocations[j][4] == wards[k][0]) {
            td4.innerHTML = wards[k][1];
            td4.className = "ward";
            td5.innerHTML = wards[k][2];
            td5.className = "district";
            break;
        }
    }
    td6.innerHTML = adslocationUpdateRequests[i-1][12];
    td6.className = "req-time";
    if (adslocationUpdateRequests[i-1][2] == 1) {
        td7.innerHTML = "Phường " + wards[k][1];
        td7.className = "office";
    } else if (adslocationUpdateRequests[i-1][2] == 2) {
        td7.innerHTML = "Quận " + wards[k][2];
        td7.className = "office";
    }

    if (adslocationUpdateRequests[i-1][14] == 1) {
        td8.innerHTML = "Đã quy hoạch";
        td8.className = "zoning";
    } else if (adslocationUpdateRequests[i-1][14] == 0) {
        td8.innerHTML = "Chưa quy hoạch";
        td8.className = "zoning";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    tr.addEventListener("click", function() {
        window.location = "/yeucauchinhsua/ddqc?id=" + adslocationUpdateRequests[i-1][0];
    });
    document.querySelector("#update-ads-location-table table tbody").prepend(tr);
}


let adsUpdateRequests = [
    [1, "nnlien21@clc.fitus.edu.vn", 1, 12, 20, 9, 5.21, 3.14, 1, "2024-03-12", "2023-08-05", "Thông tin vị trí không chính xác", 1],
    [2, "nthphuc21@clc.fitus.edu.vn", 2, 4, 22, 4, 3.74, 2.73, 1, "2024-01-29", "2023-08-12", "Loại bảng quảng cáo không đúng", 0],
    [3, "pmlinh21@clc.fitus.edu.vn", 1, 18, 21, 6, 2.88, 5.92, 1, "2024-05-05", "2023-08-17", "Sai kích thước", 1],
    [4, "ncluan21@clc.fitus.edu.vn", 2, 9, 25, 2, 4.09, 1.47, 2, "2024-02-15", "2023-08-23", "Số lượng bảng quảng cáo không chính xác", 1],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 22, 18, 8, 1.63, 8.36, 1, "2024-04-09", "2023-08-28", "Ngày hết hạn hợp đồng không chính xác", 0],
    [6, "nnlien21@clc.fitus.edu.vn", 1, 8, 3, 3, 3.95, 6.88, 1, "2024-01-21", "2023-09-02", "Hình ảnh minh họa hiển thị không đúng", 1],
    [7, "nthphuc21@clc.fitus.edu.vn", 1, 2, 9, 1, 2.31, 4.21, 3, "2024-04-27", "2023-09-08", "Nhiều thông tin bị sai", 0],
    [8, "pmlinh21@clc.fitus.edu.vn", 2, 19, 1, 7, 4.12, 9.63, 1, "2024-05-17", "2023-09-15", "Thông tin về bảng quảng cáo không chính xác", 1],
    [9, "pmlinh21@clc.fitus.edu.vn", 1, 16, 15, 5, 1.97, 7.89, 1, "2024-03-04", "2023-09-21", "Cập nhật thông tin mới về bảng quảng cáo", 0],
    [10, "ncluan21@clc.fitus.edu.vn", 2, 7, 6, 10, 3.5, 2.35, 1, "2024-02-07", "2023-09-26", "Thông tin hiển thị sai chính tả", 1],
    [11, "nnlien21@clc.fitus.edu.vn", 1, 5, 14, 2, 2.81, 1.99, 1, "2024-04-03", "2023-10-02", "Kích thước bảng quảng cáo sai đơn vị", 0],
    [12, "nthphuc21@clc.fitus.edu.vn", 1, 20, 2, 8, 4.67, 6.75, 2, "2024-01-14", "2023-10-09", "Ngày hết hạn hợp đồng không đúng", 1],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 14, 11, 3, 1.38, 4.5, 1, "2024-05-02", "2023-10-15", "Sai loại bảng quảng cáo", 0],
    [14, "nnlien21@clc.fitus.edu.vn", 1, 23, 8, 1, 5.02, 3.87, 1, "2024-03-18", "2023-10-21", "Điểm đặt quảng cáo không chính xác", 1],
    [15, "nthphuc21@clc.fitus.edu.vn", 1, 6, 5, 7, 2.46, 5.26, 1, "2024-02-23", "2023-08-14", "Sai kích thước", 1],
    [16, "nnlien21@clc.fitus.edu.vn", 1, 15, 19, 5, 3.19, 9.14, 2, "2024-04-14", "2023-09-03", "Hình ảnh chưa được cập nhật, vẫn là hình bảng quảng cáo cũ", 0],
    [17, "pmlinh21@clc.fitus.edu.vn", 2, 1, 10, 10, 1.75, 8.01, 1, "2024-03-29", "2023-09-18", "Sai loại bảng quảng cáo", 0],
    [18, "ncluan21@clc.fitus.edu.vn", 1, 22, 18, 9, 4.89, 7.36, 1, "2024-01-05", "2023-10-08", "Ngày hết hạn hợp đồng đã được gia hạn thêm, vui lòng cập nhật trên hệ thống", 1],
    [19, "pmlinh21@clc.fitus.edu.vn", 2, 10, 1, 4, 2.93, 1.62, 2, "2024-05-23", "2023-08-31", "Cần cập nhật thông tin về quảng cáo", 1],
    [20, "nnlien21@clc.fitus.edu.vn", 1, 13, 7, 6, 5.11, 4.88, 1, "2024-02-02", "2023-10-03", "Sai kích thước", 0]
];
// id_req	officer	office	id_ads	id_ads_location	id_board_type	width	height	photo	quantity	expired_date	req_time	reason	status

for (let i = adsUpdateRequests.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");
    let td9 = document.createElement("td");

    td1.innerHTML = adsUpdateRequests[i-1][0];
    td1.className = "id";
    td2.innerHTML = adsUpdateRequests[i-1][3];
    td2.className = "id-ads";
    td3.innerHTML = adsUpdateRequests[i-1][4];
    td3.className = "id-ads-location";
    let j;
    for (j = 0; j < adslocations.length; j++) {
        if (adslocations[j][0] == adsUpdateRequests[i-1][4]) {
            td4.innerHTML = adslocations[j][3];
            td4.className = "address";
            break;
        }
    }
    let k;
    for (k = 0; k < wards.length; k++) {
        if (adslocations[j][4] == wards[k][0]) {
            td5.innerHTML = wards[k][1];
            td5.className = "ward";
            td6.innerHTML = wards[k][2];
            td6.className = "district";
            break;
        }
    }
    td7.innerHTML = adsUpdateRequests[i-1][10];
    td7.className = "req-time";
    if (adsUpdateRequests[i-1][2] == 1) {
        td8.innerHTML = "Phường " + wards[k][1];
        td8.className = "office";
    } else if (adsUpdateRequests[i-1][2] == 2) {
        td8.innerHTML = "Quận " + wards[k][2];
        td8.className = "office";
    }

    if (adsUpdateRequests[i-1][12] == 1) {
        td9.innerHTML = "Đã quy hoạch";
        td9.className = "zoning";
    } else if (adsUpdateRequests[i-1][12] == 0) {
        td9.innerHTML = "Chưa quy hoạch";
        td9.className = "zoning";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);

    tr.addEventListener("click", function() {
        window.location = "/yeucauchinhsua/bqc?id=" + adsUpdateRequests[i-1][0];
    });
    document.querySelector("#update-ads-table table tbody").prepend(tr);
}