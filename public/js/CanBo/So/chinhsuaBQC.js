document.querySelector("#bang").classList.add("snb-li-active");

var boardTypes = [
    [1, "Trụ bảng hiflex"], 
    [2, "Trụ màn hình điện tử LED"], 
    [3, "Trụ hộp đèn"], 
    [4, "Bảng hiflex ốp tường"], 
    [5, "Màn hình điện tử ốp tường"], 
    [6, "Trụ treo băng rôn dọc"], 
    [7, "Trụ treo băng rôn ngang"], 
    [8, "Trụ/Cụm pano"], 
    [9, "Cổng chào"], 
    [10, "Trung tâm thương mại"]
];
var select = document.querySelector("#board-type");

var option = document.createElement("option");
option.value = "";
option.textContent = "Chọn loại bảng";
select.appendChild(option);

for (let i = 0; i < boardTypes.length; i++) {
    option = document.createElement("option");
    option.value = boardTypes[i][0];
    option.textContent = boardTypes[i][1];
    select.appendChild(option);
}s

let adslocations = [
    [1, 10.773695, 106.689636, "59 Nguyễn Thị Minh Khai", 2, 1, 2, 1, 1],
    [2, 10.77143, 106.693526, "70 Phạm Hồng Thái", 2, 1, 2, 3, 0],
    [3, 10.770072, 106.693823, "84 Lê Lai", 9, 1, 3, 3, 0],
    [4, 10.777637, 106.693007, "128 Nguyễn Thị Minh Khai", 32, 3, 5, 1, 1],
    [5, 10.778513, 106.693939, "118 Nguyễn Thị Minh Khai", 32, 3, 6, 2, 1],
    [6, 10.774799, 106.690473, "138 Nguyễn Thị Minh Khai", 32, 3, 5, 1, 0],
    [7, 10.775846, 106.689544, "9 Võ Văn Tần", 32, 3, 2, 1, 0],
    [8, 10.772591, 106.69093, "2 Bùi Thị Xuân", 2, 1, 5, 3, 0],
    [9, 10.774308, 106.688328, "141 Cách Mạng Tháng 8", 25, 3, 4, 2, 1],
    [10, 10.775101, 106.686973, "70 Cách Mạng Tháng 8", 25, 3, 3, 2, 1],
    [11, 10.776877, 106.688484, "36 Bà Huyện Thanh Quan", 32, 3, 5, 3, 1],
    [12, 10.776843, 106.690665, "55-25 Trương Định", 32, 3, 2, 1, 1],
    [13, 10.772553, 106.691073, "1 Bùi Thị Xuân", 2, 1, 2, 3, 0],
    [14, 10.774375, 106.690221, "59 Nguyễn Thị Minh Khai", 2, 1, 3, 1, 1],
    [15, 10.772146, 106.69246, "161-141 Nguyễn Du", 2, 1, 2, 1, 1],
    [16, 10.776332, 106.691408, "2-10 Trương Định", 32, 3, 6, 2, 1],
    [17, 10.77632696, 106.6891595, "16 Nguyễn Thị Diệu", 32, 3, 1, 1, 1],
    [18, 10.7729249, 106.695438, "66 Trương Định", 2, 1, 3, 2, 1],
    [19, 10.780619, 106.695861, "188 Pasteur", 32, 3, 3, 1, 0],
    [20, 10.77915627, 106.6961993, "14 Alexandre de Rhodes", 1, 1, 6, 1, 0],
    [21, 10.775649, 106.697036, "108 Nguyễn Du", 2, 1, 6, 3, 1],
    [22, 10.779572, 106.69514, "55-53 Nguyễn Thị Minh Khai", 1, 1, 3, 1, 1],
    [23, 10.776907, 106.69798, "132 Nam Kỳ Khởi Nghĩa", 2, 1, 1, 2, 1],
    [24, 10.771666, 106.693518, "550 Lý Tự Trọng", 2, 1, 4, 3, 1],
    [25, 10.776379, 106.691306, "2-10 Trương Định", 32, 3, 5, 3, 0]
];

var wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];



let ads = [
    [1, 1, 5, 8.97, 3.42, 1, "2023-11-03"],
    [2, 1, 2, 12.13, 7.88, 1, "2023-11-14"],
    [3, 2, 10, 10.21, 5.75, 2, "2023-12-05"],
    [4, 3, 2, 2.46, 9.33, 1, "2023-12-22"],
    [5, 3, 8, 6.59, 14.12, 2, "2024-01-09"],
    [6, 3, 3, 10.05, 4.38, 1, "2024-01-18"],
    [7, 6, 1, 10.79, 13.54, 1, "2024-02-02"],
    [8, 6, 8, 8.26, 2.93, 1, "2024-02-15"],
    [9, 8, 1, 10.84, 6.17, 3, "2024-03-04"],
    [10, 9, 5, 12.46, 3.65, 1, "2024-03-17"],
    [11, 10, 8, 9.12, 7.36, 2, "2024-04-01"],
    [12, 19, 1, 13.01, 5.18, 2, "2024-04-11"],
    [13, 19, 10, 1.57, 2.50, 2, "2024-04-28"],
    [14, 11, 6, 8.95, 7.89, 1, "2024-05-07"],
    [15, 13, 9, 5.26, 2.35, 1, "2024-05-19"],
    [16, 20, 2, 9.14, 1.99, 2, "2024-06-01"],
    [17, 14, 1, 8.01, 6.75, 2, "2024-06-14"],
    [18, 15, 1, 7.36, 4.50, 1, "2024-06-26"],
    [19, 22, 6, 1.62, 3.87, 1, "2024-07-09"],
    [20, 15, 6, 4.88, 1.47, 2, "2024-07-22"],
    [21, 17, 5, 3.09, 8.36, 2, "2024-08-04"],
    [22, 20, 10, 2.20, 6.88, 1, "2024-08-18"],
    [23, 25, 8, 6.44, 4.21, 1, "2024-08-29"]
];

// get data from database
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = 0; i < ads.length; i++) {
    if (ads[i][0] == reqid) {
        document.querySelector("#edit-ads #id-ads").value = ads[i][0];
        document.querySelector("#edit-ads #id-ads-location").value = ads[i][1];
        document.querySelector("#edit-ads #board-type").value = ads[i][2];
        document.querySelector("#edit-ads #board-length").value = ads[i][3];
        document.querySelector("#edit-ads #board-width").value = ads[i][4];
        document.querySelector("#edit-ads #quantity").value = ads[i][5];
        document.querySelector("#edit-ads #expired-date").value = ads[i][6];
        break;
    }
}

document.querySelector("#ads-image").addEventListener("change", function() {
    let reader = new FileReader();
    reader.onload = function() {
        document.querySelector("#ads-image-preview").attributes.src.value = reader.result;
    }
    reader.readAsDataURL(this.files[0]);
});


// open map popup
function mapPopup(e) {
    let id_adsLocation = e.value;

    document.querySelector("#select-location-map").style.display = "block";
    for (let i = 0; i < adslocations.length; i++) {
        if (id_adsLocation == adslocations[i][0]) {
            let w, d, lat, lng;
            lat = adslocations[i][1];
            lng = adslocations[i][2];
            for (let j = 0; j < wards.length; j++) {
                if (wards[j][0] == adslocations[i][4]) {
                    w = wards[j][1];
                    d = wards[j][2];
                    break;
                }
            }
            document.querySelector("#select-location-map .chosen-address").textContent = "[" + lat + ", " + lng + "] " + adslocations[i][3] + ", Phường " + w + ", Quận " + d;
            break;
        }
    }
    if (document.querySelector("#select-location-map .chosen-address").textContent == "") {
        document.querySelector("#select-location-map .chosen-address").style.display = "none";
    }

    let div = document.createElement("div");
    div.className = "popup-background";
    div.addEventListener("click", () => {
        div.remove();
        document.querySelector("#select-location-map").style.display = "none";
    });
    document.querySelector("body").appendChild(div);
}