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

// let wards
var wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];
var select2 = document.querySelector("#work-for-ward");

var option2 = document.createElement("option");
option2.value = "";
option2.textContent = "Chọn phường";
select2.appendChild(option2);

// for (let i = 0; i < wards.length; i++) {
//     if (wards[i][0] == wardOfficers[indexOfficer-1][5]) {
//         option2 = document.createElement("option");
//         option2.value = wards[i][0];
//         option2.textContent = wards[i][1];
//         select2.appendChild(option2);
//     }
// }

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
});