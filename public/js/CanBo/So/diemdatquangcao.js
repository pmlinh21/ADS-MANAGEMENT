document.querySelector("#diemdat").classList.add("snb-li-active");

let latitude = 0, longtitude = 0;
let adslocations = [
    [1, "59 Nguyễn Thị Minh Khai", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [2, "70 Phạm Hồng Thái", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Xã hội hóa", 0],
    [3, "84 Lê Lai", 9, 1, "Trung tâm thương mại", "Xã hội hóa", 0],
    [4, "128 Nguyễn Thị Minh Khai", 32, 3, "Cây xăng", "Cổ đông chính trị", 1],
    [5, "118 Nguyễn Thị Minh Khai", 32, 3, "Nhà chờ xe buýt", "Quảng cáo thương mại", 1],
    [6, "138 Nguyễn Thị Minh Khai", 32, 3, "Cây xăng", "Cổ đông chính trị", 0],
    [7, "9 Võ Văn Tần", 32, 3, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 0],
    [8, "2 Bùi Thị Xuân", 2, 1, "Cây xăng", "Xã hội hóa", 0],
    [9, "141 Cách Mạng Tháng 8", 25, 3, "Chợ", "Quảng cáo thương mại", 1],
    [10, "70 Cách Mạng Tháng 8", 25, 3, "Trung tâm thương mại", "Quảng cáo thương mại", 1],
    [11, "36 Bà Huyện Thanh Quan", 32, 3, "Cây xăng", "Xã hội hóa", 1],
    [12, "55-25 Trương Định", 32, 3, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [13, "1 Bùi Thị Xuân", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Xã hội hóa", 0],
    [14, "59 Nguyễn Thị Minh Khai", 2, 1, "Trung tâm thương mại", "Cổ đông chính trị", 1],
    [15, "161-141 Nguyễn Du", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [16, "2-10 Trương Định", 32, 3, "Nhà chờ xe buýt", "Quảng cáo thương mại", 1],
    [17, "16 Nguyễn Thị Diệu", 32, 3, "Đất công/Công viên/Hành lang an toàn giao thông", "Cổ đông chính trị", 1],
    [18, "66 Trương Định", 2, 1, "Trung tâm thương mại", "Quảng cáo thương mại", 1],
    [19, "188 Pasteur", 32, 3, "Trung tâm thương mại", "Cổ đông chính trị", 0],
    [20, "14 Alexandre de Rhodes", 1, 1, "Nhà chờ xe buýt", "Cổ đông chính trị", 0],
    [21, "108 Nguyễn Du", 2, 1, "Nhà chờ xe buýt", "Xã hội hóa", 1],
    [22, "55-53 Nguyễn Thị Minh Khai", 1, 1, "Trung tâm thương mại", "Cổ đông chính trị", 1],
    [23, "132 Nam Kỳ Khởi Nghĩa", 2, 1, "Đất công/Công viên/Hành lang an toàn giao thông", "Quảng cáo thương mại", 1],
    [24, "550 Lý Tự Trọng", 2, 1, "Chợ", "Xã hội hóa", 1],
    [25, "2-10 Trương Định", 32, 3, "Cây xăng", "Xã hội hóa", 0]
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
    td2.innerHTML = adslocations[i-1][1];
    td2.className = "address";
    let j;
    for (j = 0; j < wards.length; j++) {
        if (wards[j][0] == adslocations[i-1][2]) {
            td3.innerHTML = wards[j][1];
            break;
        }
    }
    td3.className = "ward";
    td4.innerHTML = wards[j][2];
    td4.className = "district";
    td5.innerHTML = adslocations[i-1][4];
    td5.className = "location-type";
    td6.innerHTML = adslocations[i-1][5];
    td6.className = "ads-type";
    if (adslocations[i-1][6] == 1) {
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