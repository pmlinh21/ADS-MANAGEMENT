let locationType = ["Đất công/Công viên/Hành lang an toàn giao thông", "Đất tư nhân/Nhà ở riêng lẻ", "Trung tâm thương mại", "Chợ", "Cây xăng", "Nhà chờ xe buýt"];
for (let i = locationType.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = i;
    td1.className = "id";
    td2.innerHTML = locationType[i-1];
    td2.className = "name";
    tr.addEventListener("click", editPopup);
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.querySelector("#location-type tbody").prepend(tr);
}

let adsType = ["Cổ động chính trị", "Quảng cáo thương mại", "Xã hội hóa"];
for (let i = adsType.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = i;
    td1.className = "id";
    td2.innerHTML = adsType[i-1];
    td2.className = "name";
    tr.addEventListener("click", editPopup);
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.querySelector("#ads-type tbody").prepend(tr);
}
// ["Tố giác sai phạm", "Đăng ký nội dung", "Đóng góp ý kiến", "Giải đáp thắc mắc"];
let reportType = ["Tố giác sai phạm", "Đăng ký nội dung", "Đóng góp ý kiến", "Giải đáp thắc mắc"];
for (let i = reportType.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = i;
    td1.className = "id";
    td2.innerHTML = reportType[i-1];
    td2.className = "name";
    tr.addEventListener("click", editPopup);
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.querySelector("#report-type tbody").prepend(tr);
}

// ["Tố giác sai phạm", "Đăng ký nội dung", "Đóng góp ý kiến", "Giải đáp thắc mắc"];
let boardType = ["Trụ bảng hiflex", "Trụ màn hình điện tử LED", "Trụ hộp đèn", "Bảng hiflex ốp tường", "Trụ treo băng rôn dọc", "Trụ treo băng rôn ngang", "Trụ/Cụm Pano", "Cổng chào", "Trụ bảng Trung tâm thương mại"];
for (let i = boardType.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = i;
    td1.className = "id";
    td2.innerHTML = boardType[i-1];
    td2.className = "name";
    tr.addEventListener("click", editPopup);
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.querySelector("#board-type tbody").prepend(tr);
}

// open edit popup
function editPopup() {
    let title = this.parentElement.parentElement.querySelector("caption").textContent.slice(14);
    document.querySelector("#edit-popup").style.display = "block";
    document.querySelector("#edit-popup legend").innerHTML = "<i class='far fa-edit'></i> Chỉnh sửa " + title;

    document.querySelector("#edit-popup .input-field:first-of-type label").textContent = "ID " + title;
    document.querySelector("#edit-popup .input-field:first-of-type input").value = this.querySelector(".id").textContent;

    document.querySelector("#edit-popup .input-field:last-of-type label").textContent = "Tên " + title;
    document.querySelector("#edit-popup .input-field:last-of-type input").value = this.querySelector(".name").textContent;

    let div = document.createElement("div");
    div.className = "popup-background";
    div.addEventListener("click", () => {
        div.remove();
        document.querySelector("#edit-popup").style.display = "none";
    });
    document.querySelector("body").appendChild(div);
}
