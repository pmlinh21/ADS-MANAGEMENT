document.querySelector("#canbo").classList.add("snb-li-active");

let districtOfficers = [[1, "Nguyễn Trần Minh Anh", "1998-02-12", "nnlien21@gmail.com", "0901234567", 1], [2, "Phan Đức Long", "1990-11-04", "nthphuc21@clc.fitus.edu.vn", "0907654321", 1], [3, "Ngô Minh Tuấn", "1997-09-22", "pmlinh21@clc.fitus.edu.vn", "0902828282", 3], [4, "Nguyễn Hồng Nhung", "2000-01-30", "ncluan21@clc.fitus.edu.vn", "0903737373", 3]];
for (let i = districtOfficers.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td1.innerHTML = districtOfficers[i-1][0];
    td1.className = "id";
    td2.innerHTML = districtOfficers[i-1][1];
    td2.className = "name";
    td3.innerHTML = districtOfficers[i-1][2];
    td3.className = "birthday";
    td4.innerHTML = districtOfficers[i-1][3];
    td4.className = "email";
    td5.innerHTML = districtOfficers[i-1][4];
    td5.className = "phone-number";
    td6.innerHTML = districtOfficers[i-1][5];
    td6.className = "belong-to-district";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tr.addEventListener("click", function() {
        window.location = "/quanlicanbo/chinhsuacbquan?id=" + districtOfficers[i-1][0];
    });

    document.querySelector("#district-officer-table table tbody").prepend(tr);
}

let wardOfficers = [[1, "Nguyễn Trần Hồng Phúc", "1995-04-01", "21127672@student.hcmus.edu.vn", "0900012345", 2, 1], [2, "Phan Mỹ Linh", "1998-08-06", "21127637@student.hcmus.edu.vn", "0781122345", 9, 1], [3, "Ngô Ngọc Liên", "2002-06-25", "21127341@student.hcmus.edu.vn", "0903342521", 25, 3], [4, "Nguyễn Cao Luận", "1989-05-02", "21127350@student.hcmus.edu.vn", "0987654321", 32, 3], [5, "Trần Đăng Khôi", "1986-10-14", "cbphuong1@gmail.com", "0903112233", 1, 1], [6, "Phạm Ngọc Nga", "1993-08-30", "cbphuong2@gmail.com", "0978543210", 3, 1], [7, "Nguyễn Hải Đăng", "1992-03-05", "cbphuong3@gmail.com", "0912345678", 4, 1], [8, "Nguyễn Minh Huy", "1990-04-23", "cbphuong4@gmail.com", "0945321654", 5, 1]];
for (let i = wardOfficers.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    td1.innerHTML = wardOfficers[i-1][0];
    td1.className = "id";
    td2.innerHTML = wardOfficers[i-1][1];
    td2.className = "name";
    td3.innerHTML = wardOfficers[i-1][2];
    td3.className = "birthday";
    td4.innerHTML = wardOfficers[i-1][3];
    td4.className = "email";
    td5.innerHTML = wardOfficers[i-1][4];
    td5.className = "phone-number";
    td6.innerHTML = wardOfficers[i-1][5];
    td6.className = "belong-to-ward";
    td7.innerHTML = wardOfficers[i-1][6];
    td7.className = "belong-to-district";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    tr.addEventListener("click", function() {
        window.location = "/quanlicanbo/chinhsuacbphuong?id=" + wardOfficers[i-1][0];
    });

    document.querySelector("#ward-officer-table table tbody").prepend(tr);
}