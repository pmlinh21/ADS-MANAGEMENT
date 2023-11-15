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