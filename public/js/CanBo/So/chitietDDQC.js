document.querySelector("#chinhsua").classList.add("snb-li-active");

let wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];

let wardOfficers = [
    ["21127672@student.hcmus.edu.vn", 2],
    ["21127637@student.hcmus.edu.vn", 9],
    ["21127341@student.hcmus.edu.vn", 25],
    ["21127350@student.hcmus.edu.vn", 32],
    ["cbphuong1@gmail.com", 1],
    ["cbphuong2@gmail.com", 3],
    ["cbphuong3@gmail.com", 4],
    ["cbphuong4@gmail.com", 5]
];

let districtOfficers = [
    ["nnlien21@clc.fitus.edu.vn", 1],
    ["nthphuc21@clc.fitus.edu.vn", 1],
    ["pmlinh21@clc.fitus.edu.vn", 3],
    ["ncluan21@clc.fitus.edu.vn", 3]
];

let locationTypes = [
    [1, "Đất công/Công viên/Hành lang an toàn giao thông"],
    [2, "Đất tư nhân/Nhà ở riêng lẻ"],
    [3, "Trung tâm thương mại"],
    [4, "Chợ"],
    [5, "Cây xăng"],
    [6, "Nhà chờ xe buýt"]
];

let adsTypes = [
    [1, "Cổ động chính trị"],
    [2, "Quảng cáo thương mại"],
    [3, "Xã hội hóa"]
];

let adslocationUpdateRequests = [
    [1, "21127672@student.hcmus.edu.vn", 1, 15, 10.778311, 106.691779, "25-11 Võ Văn Tần", 32, 3, 2, 2, 1, "2023-08-02", "Thông tin vị trí không chính xác", 1],
    [2, "nthphuc21@clc.fitus.edu.vn", 2, 8, 10.772591, 106.69093, "5-1 Bùi Thị Xuân", 2, 1, 4, 3, 0, "2023-08-08", "Hình ảnh minh họa không đúng", 0],
    [3, "21127672@student.hcmus.edu.vn", 1, 20, 10.776877, 106.688484, "30-36 Bà Huyện Thanh Quan", 32, 3, 1, 1, 1, "2023-08-12", "Sai địa chỉ điểm đặt", 1],
    [4, "ncluan21@clc.fitus.edu.vn", 2, 25, 10.770072, 106.693823, "Lê Lai", 9, 1, 3, 2, 0, "2023-08-18", "Thông tin loại hình quảng cáo sai lệch", 0],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 22, 10.77143, 106.693526, "139 Nguyễn Du", 2, 1, 6, 1, 1, "2023-08-23", "Thông tin điểm đặt có nhiều sai lệch", 0],
    [6, "21127637@student.hcmus.edu.vn", 1, 21, 10.774375, 106.690221, "59 Nguyễn Thị Minh Khai", 2, 1, 5, 3, 0, "2023-09-01", "Sai chính tả địa chỉ điểm đặt", 1],
    [7, "21127637@student.hcmus.edu.vn", 1, 7, 10.775846, 106.689544, "9 Võ Văn Tần", 32, 3, 1, 2, 1, "2023-09-05", "Hình ảnh minh họa quá cũ, chưa được cập nhật", 1],
    [8, "pmlinh21@clc.fitus.edu.vn", 2, 16, 10.776332, 106.691408, "2-10 Trương Định", 32, 3, 3, 1, 0, "2023-09-11", "Khu vực đã quy hoạch nhưng chưa được cập nhật thông tin", 0],
    [9, "21127637@student.hcmus.edu.vn", 1, 12, 10.776843, 106.690665, "55-25 Trương Định", 32, 3, 6, 3, 1, "2023-09-15", "Sai tên đường", 1],
    [10, "ncluan21@clc.fitus.edu.vn", 2, 6, 10.774799, 106.690473, "138 Nguyễn Thị Minh Khai", 32, 3, 2, 3, 0, "2023-09-21", "Sai quận", 1],
    [11, "21127341@student.hcmus.edu.vn", 1, 9, 10.774308, 106.688328, "147-141 Cách Mạng Tháng 8", 25, 3, 4, 2, 0, "2023-09-27", "Sai phường", 0],
    [12, "21127341@student.hcmus.edu.vn", 1, 19, 10.773695, 106.689636, "59 Nguyễn Thị Minh Khai", 2, 1, 5, 1, 1, "2023-10-03", "Sai loại hình quảng cáo", 0],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 13, 10.772553, 106.691073, "Bùi Thị Xuân", 9, 1, 1, 2, 1, "2023-10-07", "Hình ảnh điểm đặt bị nhầm với hình ảnh điểm đặt bên cạnh", 1],
    [14, "21127341@student.hcmus.edu.vn", 1, 4, 10.777637, 106.693007, "128 Nguyễn Thị Minh Khai", 32, 3, 6, 3, 1, "2023-10-13", "Hình ảnh mờ, nhòe, không thấy rõ", 0],
    [15, "21127350@student.hcmus.edu.vn", 1, 18, 10.77632696, 106.6891595, "16 Bà Huyện Thanh Quan", 32, 3, 2, 1, 0, "2023-10-17", "Tên phường vừa được thay đổi, yêu cầu cập nhật", 1],
    [16, "21127350@student.hcmus.edu.vn", 1, 5, 10.778513, 106.693939, "118 Nguyễn Thị Minh Khai", 32, 3, 3, 2, 0, "2023-10-22", "Sai chính tả tên đường", 1],
    [17, "pmlinh21@clc.fitus.edu.vn", 2, 10, 10.775101, 106.686973, "70 Cách Mạng Tháng 8", 25, 3, 4, 1, 1, "2023-10-28", "Hình ảnh minh họa bị lỗi, không hiển thị", 0],
    [18, "21127350@student.hcmus.edu.vn", 1, 18, 10.7729249, 106.695438, "66 Trương Định", 2, 1, 5, 3, 0, "2023-10-31", "Thiếu hình ảnh minh họa", 0],
    [19, "pmlinh21@clc.fitus.edu.vn", 2, 1, 10.77425105, 106.688502, "56 Cách Mạng Tháng 8", 32, 3, 1, 2, 1, "2023-08-27", "Địa chỉ điểm đặt thiếu thông tin", 1],
    [20, "21127672@student.hcmus.edu.vn", 1, 8, 10.772591, 106.69093, "2 Bùi Thị Xuân", 9, 1, 6, 1, 1, "2023-09-30", "Nhiều thông tin sai lệch", 1]
];
// id_req 0	officer	1 office 2	id_ads_location 3	latitude 4	longitude 5	address 6	ward 7	district 8	id_loc_type 9 id_ads_type 10	is_zoning 11	req_time 12	reason 13	status 14
let reqid = window.location.href.split('?')[1].split('=')[1];
for (let i = 0; i < adslocationUpdateRequests.length; i++) {
    if (adslocationUpdateRequests[i][0] == reqid) {
        document.querySelector("#update-ads-location #id").value = adslocationUpdateRequests[i][0];
        document.querySelector("#update-ads-location #id-ads-location").value = adslocationUpdateRequests[i][3];
        document.querySelector("#update-ads-location #coordinates").value = "[" + adslocationUpdateRequests[i][4] + ", " + adslocationUpdateRequests[i][5] + "]";
        document.querySelector("#update-ads-location #address").value = adslocationUpdateRequests[i][6];
        for (let j = 0; j < wards.length; j++) {
            if (adslocationUpdateRequests[i][7] == wards[j][0]) {
                document.querySelector("#update-ads-location #ward").value = wards[j][1];
                document.querySelector("#update-ads-location #district").value = wards[j][2];
                break;
            }
        }
        for (let j = 0; j < locationTypes.length; j++) {
            if (adslocationUpdateRequests[i][9] == locationTypes[j][0]) {
                document.querySelector("#update-ads-location #location-type").value = locationTypes[j][1];
                break;
            }
        } 
        for (let j = 0; j < adsTypes.length; j++) {
            if (adslocationUpdateRequests[i][10] == adsTypes[j][0]) {
                document.querySelector("#update-ads-location #ads-type").value = adsTypes[j][1];
                break;
            }
        }
        if (adslocationUpdateRequests[i][11] == 1) {
            document.querySelector("#update-ads-location #zoning-status").value = "Đã quy hoạch";
        } else if (adslocationUpdateRequests[i][11] == 0) {
            document.querySelector("#update-ads-location #zoning-status").value = "Chưa quy hoạch";
        }
        document.querySelector("#update-ads-location #reason").value = adslocationUpdateRequests[i][13];
        document.querySelector("#update-ads-location #req-time").value = adslocationUpdateRequests[i][12];

        if (adslocationUpdateRequests[i][2] == 1) {
            for (let k = 0; k < wardOfficers.length; k++) {
              if (adslocationUpdateRequests[i][1] == wardOfficers[k][0]) {
                for (let l = 0; l < wards.length; l++) {
                  if (wardOfficers[k][1] == wards[l][0]) {
                    document.querySelector("#update-ads-location #office").value = "Phường " + wards[l][1] + ", Quận " + wards[l][2];
                    document.querySelector("#update-ads-location #officer").value = adslocationUpdateRequests[i][1];
                    break;
                  }
                }
                break;
              }
            }
        } else if (adslocationUpdateRequests[i][2] == 2) {
            for (let k = 0; k < districtOfficers.length; k++) {
              if (adslocationUpdateRequests[i][1] == districtOfficers[k][0]) {
                for (let l = 0; l < wards.length; l++) {
                  if (districtOfficers[k][1] == wards[l][0]) {
                    document.querySelector("#update-ads-location #office").value = "Quận " + wards[l][2];
                    document.querySelector("#update-ads-location #officer").value = adslocationUpdateRequests[i][1];
                    break;
                  }
                }
                break;
              }
            }
        }
        break;
    }
}