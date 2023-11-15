document.querySelector("#canbo").classList.add("snb-li-active");

let districts = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12]];
let select = document.querySelector("#work-for-district");

let option = document.createElement("option");
option.value = "";
option.textContent = "Chọn quận";
select.appendChild(option);

for (let i = 0; i < districts.length; i++) {
    let option = document.createElement("option");
    option.value = districts[i][0];
    option.textContent = "Quận " + districts[i][1];
    select.appendChild(option);
}

// get data from database
let districtOfficers = [[1, "Nguyễn Trần Minh Anh", "1998-02-12", "nnlien21@gmail.com", "0901234567", 1], [2, "Phan Đức Long", "1990-11-04", "nthphuc21@clc.fitus.edu.vn", "0907654321", 1], [3, "Ngô Minh Tuấn", "1997-09-22", "pmlinh21@clc.fitus.edu.vn", "0902828282", 3], [4, "Nguyễn Hồng Nhung", "2000-01-30", "ncluan21@clc.fitus.edu.vn", "0903737373", 3]];
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = districtOfficers.length; i > 0; i--) {
    if (districtOfficers[i-1][0] == reqid) {
        document.querySelector("#edit-district-officer #id-officer").value = districtOfficers[i-1][0];
        document.querySelector("#edit-district-officer #name-officer").value = districtOfficers[i-1][1];
        document.querySelector("#edit-district-officer #dob-officer").value = districtOfficers[i-1][2];
        document.querySelector("#edit-district-officer #email-officer").value = districtOfficers[i-1][3];
        document.querySelector("#edit-district-officer #phone-officer").value = districtOfficers[i-1][4];
        document.querySelector("#edit-district-officer #work-for-district").value = districtOfficers[i-1][5];
    }
}