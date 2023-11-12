let locationType = ["Đất công/Công viên/Hành lang an toàn giao thông", "Đất tư nhân/Nhà ở riêng lẻ", "Trung tâm thương mại", "Chợ", "Cây xăng", "Nhà chờ xe buýt"];
for (let i = locationType.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = i;
    td1.className = "id";
    td2.innerHTML = locationType[i-1];
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.querySelector("#location-type tbody").prepend(tr);
}

{/* <tr><td class="id">1</td><td>Cổ động chính trị</td></tr>
<tr><td class="id">2</td><td>Quảng cáo thương mại</td></tr>
<tr><td class="id">3</td><td>Xã hội hóa</td></tr> */}
let adsType = ["Cổ động chính trị", "Quảng cáo thương mại", "Xã hội hóa"];
for (let i = adsType.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = i;
    td1.className = "id";
    td2.innerHTML = adsType[i-1];
    tr.appendChild(td1);
    tr.appendChild(td2);

    document.querySelector("#ads-type tbody").prepend(tr);
}
// ["Tố giác sai phạm", "Đăng ký nội dung", "Đóng góp ý kiến", "Giải đáp thắc mắc"];