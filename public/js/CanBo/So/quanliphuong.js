document.querySelector("#phuong").classList.add("snb-li-active");

let wards = [[1, 'Bến Nghé', 1, 5, 12, 2], [2, 'Bến Thành', 1, 7, 14, 2], [3, 'Cầu Kho', 1, 4, 9, 1], [4, 'Cầu Ông Lãnh', 1, 3, 6, 1], [5, 'Cô Giang', 1, 16, 18, 2], [6, 'Đa Kao', 1, 11, 14, 3], [7, 'Nguyễn Cư Trinh', 1, 9, 13, 1], [8, 'Nguyễn Thái Bình', 1, 8, 12, 1], [9, 'Phạm Ngũ Lão', 1, 9, 8, 1], [10, 'Tân Định', 1, 7, 4, 1], [21, '1', 3, 5, 8, 2], [22, '2', 3, 12, 5, 1], [23, '3', 3, 15, 12, 2], [24, '4', 3, 4, 10, 1], [25, '5', 3, 9, 16, 2], [26, '9', 3, 12, 15, 1], [27, '10', 3, 14, 6, 1], [28, '11', 3, 8, 4, 2], [29, '12', 3, 6, 13, 1], [30, '13', 3, 12, 3, 2], [31, '14', 3, 17, 15, 2], [32, 'Võ Thị Sáu', 3, 12, 26, 3]];
for (let i = wards.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td1.innerHTML = wards[i-1][0];
    td1.className = "id";
    td1.classList.add("center");
    td2.innerHTML = wards[i-1][1];
    td2.className = "name";
    td2.classList.add("center");
    td3.innerHTML = wards[i-1][2];
    td3.className = "in-district";
    td3.classList.add("center");
    td4.innerHTML = wards[i-1][3];
    td4.className = "number-of-ads-locations";
    td4.classList.add("center");
    td5.innerHTML = wards[i-1][4];
    td5.className = "number-of-ads";
    td5.classList.add("center");
    td6.innerHTML = wards[i-1][5];
    td6.className = "number-of-officers";
    td6.classList.add("center");
    tr.addEventListener("click", editPopup);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    document.querySelector("#ward-table table tbody").prepend(tr);
}

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

function addPopup(e) {
    let title = e.parentElement.parentElement.parentElement.querySelector("caption").textContent.slice(14);
    alert(title);
    document.querySelector("#add-popup").style.display = "block";
    document.querySelector("#add-popup legend").innerHTML = "<i class='fas fa-plus-square'></i> Thêm " + title;
    document.querySelector("#add-popup .input-field label").textContent = "Tên " + title;

    let div = document.createElement("div");
    div.className = "popup-background";
    div.addEventListener("click", () => {
        div.remove();
        document.querySelector("#add-popup").style.display = "none";
    });
    document.querySelector("body").appendChild(div);
}