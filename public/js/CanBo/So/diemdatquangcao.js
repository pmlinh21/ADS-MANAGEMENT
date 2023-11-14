document.querySelector("#diemdat").classList.add("snb-li-active");


let adslocations = [
    ["59 Nguyễn Thị Minh Khai", 2, 1, 2, 1, 1],
    ["70 Phạm Hồng Thái", 2, 1, 2, 3, 0],
    ["84 Lê Lai", 9, 1, 3, 3, 0],
    ["128 Nguyễn Thị Minh Khai", 32, 3, 5, 1, 1],
    ["118 Nguyễn Thị Minh Khai", 32, 3, 6, 2, 1],
    ["138 Nguyễn Thị Minh Khai", 32, 3, 5, 1, 0],
    ["9 Võ Văn Tần", 32, 3, 2, 1, 0],
    ["2 Bùi Thị Xuân", 2, 1, 5, 3, 0],
    ["141 Cách Mạng Tháng 8", 25, 3, 4, 2, 1],
    ["70 Cách Mạng Tháng 8", 25, 3, 3, 2, 1],
    ["36 Bà Huyện Thanh Quan", 32, 3, 5, 3, 1],
    ["55-25 Trương Định", 32, 3, 2, 1, 1],
    ["1 Bùi Thị Xuân", 2, 1, 2, 3, 0],
    ["59 Nguyễn Thị Minh Khai", 2, 1, 3, 1, 1],
    ["161-141 Nguyễn Du", 2, 1, 2, 1, 1],
    ["2-10 Trương Định", 32, 3, 6, 2, 1],
    ["16 Nguyễn Thị Diệu", 32, 3, 1, 1, 1],
    ["66 Trương Định", 2, 1, 3, 2, 1],
    ["188 Pasteur", 32, 3, 3, 1, 0],
    ["14 Alexandre de Rhodes", 1, 1, 6, 1, 0],
    ["108 Nguyễn Du", 2, 1, 6, 3, 1],
    ["55-53 Nguyễn Thị Minh Khai", 1, 1, 3, 1, 1],
    ["132 Nam Kỳ Khởi Nghĩa", 2, 1, 1, 2, 1],
    ["550 Lý Tự Trọng", 2, 1, 4, 3, 1],
    ["2-10 Trương Định", 32, 3, 5, 3, 0]
];  
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
    td2.className = "name";
    td3.innerHTML = adslocations[i-1][2];
    td3.className = "birthday";
    td4.innerHTML = adslocations[i-1][3];
    td4.className = "email";
    td5.innerHTML = adslocations[i-1][4];
    td5.className = "phone-number";
    td6.innerHTML = adslocations[i-1][5];
    td6.className = "belong-to-ward";
    td7.innerHTML = adslocations[i-1][6];
    td7.className = "belong-to-district";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    document.querySelector("#ward-officer-table table tbody").prepend(tr);
}