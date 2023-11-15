document.querySelector("#bang").classList.add("snb-li-active");

// id-ads, id-ads-location, board-type, width, height, quantity, exprired date
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

let adslocations = [
    [1, "59 Nguyễn Thị Minh Khai", "Bến Thành", 1],
    [2, "70 Phạm Hồng Thái", "Bến Thành", 1],
    [3, "84 Lê Lai", "Phạm Ngũ Lão", 1],
    [4, "128 Nguyễn Thị Minh Khai", "Võ Thị Sáu", 3],
    [5, "118 Nguyễn Thị Minh Khai", "Võ Thị Sáu", 3],
    [6, "138 Nguyễn Thị Minh Khai", "Võ Thị Sáu", 3],
    [7, "9 Võ Văn Tần", "Võ Thị Sáu", 3],
    [8, "2 Bùi Thị Xuân", "Bến Thành", 1],
    [9, "141 Cách Mạng Tháng 8", 5, 3],
    [10, "70 Cách Mạng Tháng 8", 5, 3],
    [11, "36 Bà Huyện Thanh Quan", "Võ Thị Sáu", 3],
    [12, "55-25 Trương Định", "Võ Thị Sáu", 3],
    [13, "1 Bùi Thị Xuân", "Bến Thành", 1],
    [14, "59 Nguyễn Thị Minh Khai", "Bến Thành", 1],
    [15, "161-141 Nguyễn Du", "Bến Thành", 1],
    [16, "2-10 Trương Định", "Võ Thị Sáu", 3],
    [17, "16 Nguyễn Thị Diệu", "Võ Thị Sáu", 3],
    [18, "66 Trương Định", "Bến Thành", 1],
    [19, "188 Pasteur", "Võ Thị Sáu", 3],
    [20, "14 Alexandre de Rhodes", "Bến Nghé", 1],
    [21, "108 Nguyễn Du", "Bến Thành", 1],
    [22, "55-53 Nguyễn Thị Minh Khai", "Bến Nghé", 1],
    [23, "132 Nam Kỳ Khởi Nghĩa", "Bến Thành", 1],
    [24, "550 Lý Tự Trọng", "Bến Thành", 1],
    [25, "2-10 Trương Định", "Võ Thị Sáu", 3]
]; 
for (let i = ads.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    td1.innerHTML = ads[i-1][0];
    td1.className = "id-ads";
    td2.innerHTML = ads[i-1][1];
    td2.className = "id-ads-location";
    let j;
    for (j = 0; j < adslocations.length; j++) {
        if (adslocations[j][0] == ads[i-1][1]) {
            td3.innerHTML = adslocations[j][1];
            td3.className = "address";
            td4.innerHTML = adslocations[j][2];
            td4.className = "ward";
            td5.innerHTML = adslocations[j][3];
            td5.className = "district";
            break;
        }
    }
    td6.innerHTML = ads[i-1][2];
    td6.className = "board-type";
    td7.innerHTML = ads[i-1][6];
    td7.className = "expired-date";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tr.addEventListener("click", function() {
        window.location = "/bangquangcao/chinhsua?id=" + ads[i-1][0];
    });

    document.querySelector("#ads-table table tbody").prepend(tr);
}