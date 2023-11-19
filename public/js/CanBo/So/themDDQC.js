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

document.querySelector("#ads-location-image").addEventListener("change", function() {
    let reader = new FileReader();
    reader.onload = function() {
        document.querySelector("#ads-location-image-preview").attributes.src.value = reader.result;
    }
    reader.readAsDataURL(this.files[0]);
});


// open map popup
function mapPopup(e) {
    // let coordinates = e.value;
    // let lat = coordinates.split(", ")[0];
    // let lng = coordinates.split(", ")[1];

    document.querySelector("#select-location-map").style.display = "block";
    // for (let i = 0; i < adslocations.length; i++) {
    //     if (adslocations[i][1] == lat && adslocations[i][2] == lng) {
    //         let w, d;
    //         for (let j = 0; j < wards.length; j++) {
    //             if (wards[j][0] == adslocations[i][4]) {
    //                 w = wards[j][1];
    //                 d = wards[j][2];
    //                 break;
    //             }
    //         }
    //         document.querySelector("#select-location-map .chosen-address").textContent = "[" + lat + ", " + lng + "] " + adslocations[i][3] + ", Phường" + w + ", Quận" + d;
    //         break;
    //     }
    // }

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