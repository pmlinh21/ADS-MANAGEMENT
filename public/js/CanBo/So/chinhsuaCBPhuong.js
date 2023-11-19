document.querySelector("#canbo").classList.add("snb-li-active");

$("form").submit(function(event){
    event.preventDefault();
});

var districts = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12]];
var select = document.querySelector("#of-district");

var option = document.createElement("option");
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
var wardOfficers = [[1, "Nguyễn Trần Hồng Phúc", "1995-04-01", "21127672@student.hcmus.edu.vn", "0900012345", 2, 1], [2, "Phan Mỹ Linh", "1998-08-06", "21127637@student.hcmus.edu.vn", "0781122345", 9, 1], [3, "Ngô Ngọc Liên", "2002-06-25", "21127341@student.hcmus.edu.vn", "0903342521", 25, 3], [4, "Nguyễn Cao Luận", "1989-05-02", "21127350@student.hcmus.edu.vn", "0987654321", 32, 3], [5, "Trần Đăng Khôi", "1986-10-14", "cbphuong1@gmail.com", "0903112233", 1, 1], [6, "Phạm Ngọc Nga", "1993-08-30", "cbphuong2@gmail.com", "0978543210", 3, 1], [7, "Nguyễn Hải Đăng", "1992-03-05", "cbphuong3@gmail.com", "0912345678", 4, 1], [8, "Nguyễn Minh Huy", "1990-04-23", "cbphuong4@gmail.com", "0945321654", 5, 1]];
var reqid = window.location.href.split('?')[1].split('=')[1];
var indexOfficer;
for (indexOfficer = wardOfficers.length; indexOfficer > 0; indexOfficer--) {
    if (wardOfficers[indexOfficer-1][0] == reqid) {
        document.querySelector("#edit-ward-officer #id-officer").value = wardOfficers[indexOfficer-1][0];
        document.querySelector("#edit-ward-officer #name-officer").value = wardOfficers[indexOfficer-1][1];
        document.querySelector("#edit-ward-officer #dob-officer").value = wardOfficers[indexOfficer-1][2];
        document.querySelector("#edit-ward-officer #email-officer").value = wardOfficers[indexOfficer-1][3];
        document.querySelector("#edit-ward-officer #phone-officer").value = wardOfficers[indexOfficer-1][4];
        document.querySelector("#edit-ward-officer #of-district").value = wardOfficers[indexOfficer-1][6];
        break;
    }
}

// let wards
var wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];
var select2 = document.querySelector("#work-for-ward");

var option2 = document.createElement("option");
option2.value = "";
option2.textContent = "Chọn phường";
select2.appendChild(option2);

for (let i = 0; i < wards.length; i++) {
    if (wards[i][0] == wardOfficers[indexOfficer-1][5]) {
        option2 = document.createElement("option");
        option2.value = wards[i][0];
        option2.textContent = "Phường " + wards[i][1];
        select2.appendChild(option2);
    }
}

// add wards for current officer's district
document.querySelector("#work-for-ward").value = wardOfficers[indexOfficer-1][5];

select.addEventListener("change", () => {
    let newDistrict = document.querySelector("#of-district");
    for (let i = select2.options.length - 1; i >= 0; i--) {
        select2.remove(i);
    }
    option2 = document.createElement("option");
    option2.value = "";
    option2.textContent = "Chọn phường";
    select2.appendChild(option2);
    for (let i = 0; i < wards.length; i++) {
        if (wards[i][2] == newDistrict.value) {
            option2 = document.createElement("option");
            option2.value = wards[i][0];
            option2.textContent = "Phường " + wards[i][1];
            select2.appendChild(option2);
        }
    }

    document.querySelector("#work-for-ward").value = "";
});
