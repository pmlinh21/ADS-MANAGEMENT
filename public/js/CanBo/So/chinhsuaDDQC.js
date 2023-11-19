document.querySelector("#diemdat").classList.add("snb-li-active");

$("form").submit(function(event){
    event.preventDefault();
});

var adsLocTypes = [[1, "Đất công/Công viên/Hành lang an toàn giao thông"], [2, "Đất tư nhân/Nhà ở riêng lẻ"], [3, "Trung tâm thương mại"], [4, "Chợ"], [5, "Cây xăng"], [6, "Nhà chờ xe buýt"]];
var select = document.querySelector("#ads-location-type");

var option = document.createElement("option");
option.value = "";
option.textContent = "Chọn loại vị trí";
select.appendChild(option);

for (let i = 0; i < adsLocTypes.length; i++) {
    option = document.createElement("option");
    option.value = adsLocTypes[i][0];
    option.textContent = adsLocTypes[i][1];
    select.appendChild(option);
}

var adsTypes = [[1, "Cổ động chính trị"], [2, "Quảng cáo thương mại"], [3, "Xã hội hoá"]];
select = document.querySelector("#ads-type");
var option = document.createElement("option");
option.value = "";
option.textContent = "Chọn hình thức quảng cáo";
select.appendChild(option);

for (let i = 0; i < adsTypes.length; i++) {
    option = document.createElement("option");
    option.value = adsTypes[i][0];
    option.textContent = adsTypes[i][1];
    select.appendChild(option);
}

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

// get data from database
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = adslocations.length; i > 0; i--) {
    if (adslocations[i-1][0] == reqid) {
        document.querySelector("#edit-ads-location #id-ads-location").value = adslocations[i-1][0];
        document.querySelector("#edit-ads-location #address-ads-location").value = adslocations[i-1][3];
        let w;
        for (w = 0; w < wards.length; w++) {
            if (wards[w][0] == adslocations[i-1][4]) {
                document.querySelector("#edit-ads-location #ward-ads-location").value = wards[w][1];
                document.querySelector("#edit-ads-location #district-ads-location").value = wards[w][2];
                break;
            }
        }
        document.querySelector("#edit-ads-location #coordinates-ads-location").value = adslocations[i-1][1] + ", " + adslocations[i-1][2];
        document.querySelector("#edit-ads-location #ads-location-type").value = adslocations[i-1][6];
        document.querySelector("#edit-ads-location #ads-type").value = adslocations[i-1][7];
        document.querySelector("#edit-ads-location #zoning-status").value = adslocations[i-1][8];
        document.querySelector("#edit-ads-location #ads-location-image-preview").attributes.src.value = "../../../public/image/image1.png";
        break;
    }
}
document.querySelector("#ads-location-image").addEventListener("change", function() {
    let reader = new FileReader();
    reader.onload = function() {
        document.querySelector("#ads-location-image-preview").attributes.src.value = reader.result;
    }
    reader.readAsDataURL(this.files[0]);
});

// open map popup
function mapPopup(e) {
    let coordinates = e.value;
    let lat = coordinates.split(", ")[0];
    let lng = coordinates.split(", ")[1];

    document.querySelector("#select-location-map").style.display = "block";
    for (let i = 0; i < adslocations.length; i++) {
        if (adslocations[i][1] == lat && adslocations[i][2] == lng) {
            let w, d;
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
    // if (document.querySelector("#select-location-map .chosen-address").textContent == "") {
    //     document.querySelector("#select-location-map .chosen-address").style.display = "none";
    // }

    let div = document.createElement("div");
    div.className = "popup-background";
    div.addEventListener("click", () => {
        div.remove();
        document.querySelector("#select-location-map").style.display = "none";
    });
    document.querySelector("body").appendChild(div);
}