document.querySelector("#quan").classList.add("snb-li-active");

$("form").submit(function(event){
    event.preventDefault();
});

let districts = [[1, 1, 10, 20, 32, 1], [2, 2, 12, 23, 21, 3], [3, 3, 10, 30, 26, 3], [4, 4, 15, 16, 12, 4], [5, 5, 9, 23, 18, 2], [6, 6, 11, 14, 21, 2], [7, 7, 8, 30, 25, 2], [8, 8, 10, 15, 10, 2], [9, 9, 10, 12, 15, 1], [10, 10, 10, 27, 38, 2], [11, 11, 14, 27, 35, 3], [12, 12, 13, 16, 22, 1]];
for (let i = districts.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td1.innerHTML = districts[i-1][0];
    td1.className = "id";
    td2.innerHTML = districts[i-1][1];
    td2.className = "name";
    td3.innerHTML = districts[i-1][2];
    td3.className = "number-of-wards";
    td4.innerHTML = districts[i-1][3];
    td4.className = "number-of-ads-locations";
    td5.innerHTML = districts[i-1][4];
    td5.className = "number-of-ads";
    td6.innerHTML = districts[i-1][5];
    td6.className = "number-of-officers";
    tr.addEventListener("click", editPopup);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    document.querySelector("#district-table table tbody").prepend(tr);
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