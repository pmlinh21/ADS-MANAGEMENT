document.querySelector("#diemdat").classList.add("snb-li-active");

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
for (let i = adslocations.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    td1.innerHTML = adslocations[i-1][0];
    td1.className = "id";
    td2.innerHTML = adslocations[i-1][3];
    td2.className = "address";
    let j;
    for (j = 0; j < wards.length; j++) {
        if (wards[j][0] == adslocations[i-1][4]) {
            td3.innerHTML = wards[j][1];
            break;
        }
    }
    td3.className = "ward";
    td4.innerHTML = wards[j][2];
    td4.className = "district";
    td5.innerHTML = adslocations[i-1][6];
    td5.className = "location-type";
    td6.innerHTML = adslocations[i-1][7];
    td6.className = "ads-type";
    if (adslocations[i-1][8] == 1) {
        td7.innerHTML = "Đã quy hoạch";
    } else {
        td7.innerHTML = "Chưa quy hoạch";
    }
    td7.className = "zoning";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tr.addEventListener("click", function() {
        window.location = "/diemdatquangcao/chinhsua?id=" + adslocations[i-1][0];
    });

    document.querySelector("#ads-location-table table tbody").prepend(tr);
}