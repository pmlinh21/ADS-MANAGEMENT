document.querySelector("#capphep").classList.add("snb-li-active");

let adslocations = [
    [1, 10.773695, 106.689636, "59 Nguyễn Thị Minh Khai", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [2, 10.77143, 106.693526, "70 Phạm Hồng Thái", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Xã hội hóa", 0],
    [3, 10.770072, 106.693823, "84 Lê Lai", 9, 1, "Trung tâm thương mại", "Xã hội hóa", 0],
    [4, 10.777637, 106.693007, "128 Nguyễn Thị Minh Khai", 32, 3, "Cây xăng", "Cổ đông chính trị", 1],
    [5, 10.778513, 106.693939, "118 Nguyễn Thị Minh Khai", 32, 3, "Nhà chờ xe buýt", "Quảng cáo thương mại", 1],
    [6, 10.774799, 106.690473, "138 Nguyễn Thị Minh Khai", 32, 3, "Cây xăng", "Cổ đông chính trị", 0],
    [7, 10.775846, 106.689544, "9 Võ Văn Tần", 32, 3, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 0],
    [8, 10.772591, 106.69093, "2 Bùi Thị Xuân", 2, 1, "Cây xăng", "Xã hội hóa", 0],
    [9, 10.774308, 106.688328, "141 Cách Mạng Tháng 8", 25, 3, "Chợ", "Quảng cáo thương mại", 1],
    [10, 10.775101, 106.686973, "70 Cách Mạng Tháng 8", 25, 3, "Trung tâm thương mại", "Quảng cáo thương mại", 1],
    [11, 10.776877, 106.688484, "36 Bà Huyện Thanh Quan", 32, 3, "Cây xăng", "Xã hội hóa", 1],
    [12, 10.776843, 106.690665, "55-25 Trương Định", 32, 3, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [13, 10.772553, 106.691073, "1 Bùi Thị Xuân", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Xã hội hóa", 0],
    [14, 10.774375, 106.690221, "59 Nguyễn Thị Minh Khai", 2, 1, "Trung tâm thương mại", "Cổ đông chính trị", 1],
    [15, 10.772146, 106.69246, "161-141 Nguyễn Du", 2, 1, "Đất tư nhân/Nhà ở riêng lẻ", "Cổ đông chính trị", 1],
    [16, 10.776332, 106.691408, "2-10 Trương Định", 32, 3, "Nhà chờ xe buýt", "Quảng cáo thương mại", 1],
    [17, 10.77632696, 106.6891595, "16 Nguyễn Thị Diệu", 32, 3, "Đất công/Công viên/Hành lang an toàn giao thông", "Cổ đông chính trị", 1],
    [18, 10.7729249, 106.695438, "66 Trương Định", 2, 1, "Trung tâm thương mại", "Quảng cáo thương mại", 1],
    [19, 10.780619, 106.695861, "188 Pasteur", 32, 3, "Trung tâm thương mại", "Cổ đông chính trị", 0],
    [20, 10.77915627, 106.6961993, "14 Alexandre de Rhodes", 1, 1, "Nhà chờ xe buýt", "Cổ đông chính trị", 0],
    [21, 10.775649, 106.697036, "108 Nguyễn Du", 2, 1, "Nhà chờ xe buýt", "Xã hội hóa", 1],
    [22, 10.779572, 106.69514, "55-53 Nguyễn Thị Minh Khai", 1, 1, "Trung tâm thương mại", "Cổ đông chính trị", 1],
    [23, 10.776907, 106.69798, "132 Nam Kỳ Khởi Nghĩa", 2, 1, "Đất công/Công viên/Hành lang an toàn giao thông", "Quảng cáo thương mại", 1],
    [24, 10.771666, 106.693518, "550 Lý Tự Trọng", 2, 1, "Chợ", "Xã hội hóa", 1],
    [25, 10.776379, 106.691306, "2-10 Trương Định", 32, 3, "Cây xăng", "Xã hội hóa", 0]
]; 
var wards = [[1, 'Bến Nghé', 1], [2, 'Bến Thành', 1], [3, 'Cầu Kho', 1], [4, 'Cầu Ông Lãnh', 1], [5, 'Cô Giang', 1], [6, 'Đa Kao', 1], [7, 'Nguyễn Cư Trinh', 1], [8, 'Nguyễn Thái Bình', 1], [9, 'Phạm Ngũ Lão', 1], [10, 'Tân Định', 1], [21, '1', 3], [22, '2', 3], [23, '3', 3], [24, '4', 3], [25, '5', 3], [26, '9', 3], [27, '10', 3], [28, '11', 3], [29, '12', 3], [30, '13', 3], [31, '14', 3], [32, 'Võ Thị Sáu', 3]];

let ads = [
    [1, 1, "Màn hình điện tử ốp tường", 8.97, 3.42, 1, "2023-11-03"],
    [2, 1, "Trụ màn hình điện tử LED", 12.13, 7.88, 1, "2023-11-14"],
    [3, 2, "Trung tâm thương mại", 10.21, 5.75, 2, "2023-12-05"],
    [4, 3, "Trụ màn hình điện tử LED", 2.46, 9.33, 1, "2023-12-22"],
    [5, 3, "Trụ/Cụm pano", 6.59, 14.12, 2, "2024-01-09"],
    [6, 3, "Trụ hộp đèn", 10.05, 4.38, 1, "2024-01-18"],
    [7, 6, "Trụ bảng hiflex", 10.79, 13.54, 1, "2024-02-02"],
    [8, 6, "Trụ/Cụm pano", 8.26, 2.93, 1, "2024-02-15"],
    [9, 8, "Trụ bảng hiflex", 10.84, 6.17, 3, "2024-03-04"],
    [10, 9, "Màn hình điện tử ốp tường", 12.46, 3.65, 1, "2024-03-17"],
    [11, 10, "Trụ/Cụm pano", 9.12, 7.36, 2, "2024-04-01"],
    [12, 19, "Trụ bảng hiflex", 13.01, 5.18, 2, "2024-04-11"],
    [13, 19, "Trung tâm thương mại", 1.57, 2.50, 2, "2024-04-28"],
    [14, 11, "Trụ treo băng rôn dọc", 8.95, 7.89, 1, "2024-05-07"],
    [15, 13, "Cổng chào", 5.26, 2.35, 1, "2024-05-19"],
    [16, 20, "Trụ màn hình điện tử LED", 9.14, 1.99, 2, "2024-06-01"],
    [17, 14, "Trụ bảng hiflex", 8.01, 6.75, 2, "2024-06-14"],
    [18, 15, "Trụ bảng hiflex", 7.36, 4.50, 1, "2024-06-26"],
    [19, 22, "Trụ treo băng rôn dọc", 1.62, 3.87, 1, "2024-07-09"],
    [20, 15, "Trụ treo băng rôn dọc", 4.88, 1.47, 2, "2024-07-22"],
    [21, 17, "Màn hình điện tử ốp tường", 3.09, 8.36, 2, "2024-08-04"],
    [22, 20, "Trung tâm thương mại", 2.20, 6.88, 1, "2024-08-18"],
    [23, 25, "Trụ/Cụm pano", 6.44, 4.21, 1, "2024-08-29"]
];

let createAdsRequests = [ 
    [1, "nnlien21@clc.fitus.edu.vn", 1, 10, 5, 8.12, 1.23, 1, "Vẻ đẹp tự nhiên trong từng món trang sức. Khám phá sự quý phái tại chúng tôi.", "Công ty TNHH Vàng Bạc Đá Quý", "contact@vangbacdaquy.com", "0912345678", "123 Điện Biên Phủ, Phường 7, Quận 3", "2023-08-05", "2023-12-01", 0],
    [2, "nthphuc21@clc.fitus.edu.vn", 2, 5, 3, 3.76, 3.78, 1, "Hương vị tươi mới từ nông trại đến bát. Sự tươi mới trong mỗi khẩu phần.", "FreshHarvest Foods", "info@freshharvestfoods.com", "0712345678", "56 Cao Thắng, Phường 4, Quận 3", "2023-08-10", "2023-12-05", 1],
    [3, "pmlinh21@clc.fitus.edu.vn", 1, 20, 8, 11.23, 5.42, 3, "Xây dựng ước mơ của bạn. Chất lượng đến từng chi tiết.", "Công ty Xây dựng Tiến Đạt", "info@tiendatconstruction.vn", "0123456789", "789 Lê Văn Sỹ, Phường 2, Quận Tân Bình", "2023-08-15", "2023-12-11", 1],
    [4, "ncluan21@clc.fitus.edu.vn", 2, 25, 2, 7.49, 2.95, 1, "Chúng tôi tạo ra giải pháp công nghệ tương lai tại BlueSky Tech Solutions. Từ phần mềm đến phần cứng, chúng tôi đưa bạn đến gần hơn với tương lai kỹ thuật số. Hãy mở cánh cửa của sự đổi mới với chúng tôi!", "BlueSky Tech Solutions", "info@blueskytechsolutions.com", "0976543210", "15 Đinh Công Tráng, Phường Tân Định, Quận 1", "2023-09-01", "2023-12-15", 0],
    [5, "nnlien21@clc.fitus.edu.vn", 2, 22, 7, 9.88, 4.67, 4, "Hương vị tinh tế từ bếp đến bát. Đẳng cấp trong từng giọt mồ hôi.", "Công ty Thực phẩm Hương Thảo", "info@huongthaofoods.com", "0776543210", "222 Hùng Vương, Phường 9, Quận 5", "2023-09-07", "2023-12-20", 1],
    [6, "nnlien21@clc.fitus.edu.vn", 1, 21, 1, 5.34, 6.11, 1, "Sáng tạo không gian xanh. Thiên nhiên sống động trong lòng thành phố.", "EverGreen Landscapes", "info@evergreenlandscapes.com", "0145678901", "432 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1", "2023-09-14", "2023-12-24", 0],
    [7, "nthphuc21@clc.fitus.edu.vn", 1, 10, 6, 13.01, 9.86, 1, "Ở đằng sau mỗi ứng dụng tuyệt vời là một đội ngũ sáng tạo. Công ty Công nghệ Phần mềm Sáng Tạo chú trọng vào việc phát triển các ứng dụng và phần mềm độc đáo, giúp bạn kết nối và làm việc hiệu quả hơn.", "Công ty Công nghệ Phần mềm Sáng Tạo", "info@sangtaosoftware.vn", "0932104765", "76 Lê Lai, Phường Bến Thành, Quận 1", "2023-09-22", "2023-12-30", 0],
    [8, "pmlinh21@clc.fitus.edu.vn", 2, 7, 9, 10.65, 8.33, 2, "Gửi hàng đến mọi nơi. An toàn, đồng hành đáng tin cậy.", "OceanWave Logistics", "info@oceanwavelogistics.com", "0732104765", "321 Võ Văn Tần, Phường 5, Quận 3", "2023-10-02", "2024-01-03", 1],
    [9, "pmlinh21@clc.fitus.edu.vn", 1, 15, 10, 2.97, 10.75, 1, "Sức khỏe không giới hạn. Chăm sóc sức khỏe tại đỉnh.", "Công ty Y tế Hoàn Hảo", "info@hoanhaohealthcare.com", "0112233445", "99 Trần Quang Diệu, Phường 14, Quận 3", "2023-10-09", "2024-01-08", 1],
    [10, "ncluan21@clc.fitus.edu.vn", 2, 9, 4, 12.45, 7.19, 1, "Nắng là nguồn năng lượng vô tận, và chúng tôi biến nó thành điện. Với công nghệ tiên tiến và lòng đam mê bền vững, chúng tôi giúp bạn tiết kiệm năng lượng và giữ cho hành tinh của chúng ta xanh sạch hơn.", "GoldenSun Solar Energy", "info@goldensunsolarenergy.com", "0943216547", "666 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận", "2023-10-15", "2024-01-14", 0],
    [11, "nnlien21@clc.fitus.edu.vn", 1, 14, 2, 6.78, 11.24, 1, "Hỗ Trợ Cộng Đồng, Xây Dựng Tương Lai! Chúng tôi đầu tư vào các dự án xã hội để tạo ra những thay đổi tích cực trong cuộc sống hàng ngày của bạn.", "Công ty Du lịch Phong Cảnh Đẹp", "info@phongcachdeptravel.com", "0743216547", "444 Lê Quang Định, Phường 11, Quận Bình Thạnh", "2023-10-22", "2024-01-18", 1],
    [12, "nthphuc21@clc.fitus.edu.vn", 1, 21, 7, 14.20, 12.68, 2, "Quản lý tài chính, xây dựng tương lai. Đối tác tài chính đáng tin cậy.", "SilverLine Financial Services", "info@silverlinefinancials.com", "0134567890", "777 Phan Xích Long, Phường 3, Quận Phú Nhuận", "2023-11-01", "2024-01-23", 0],
    [13, "ncluan21@clc.fitus.edu.vn", 2, 20, 1, 1.54, 13.91, 3, "Nội thất độc đáo, phản ánh cá nhân. Không gian sống đẳng cấp.", "Công ty Trang trí Nội thất Mỹ Ngọc", "info@myngocinteriors.com", "0965432101", "101 Hoàng Sa, Phường Đa Kao, Quận 1", "2023-11-08", "2024-01-27", 1],
    [14, "nnlien21@clc.fitus.edu.vn", 1, 19, 6, 4.89, 14.54, 1, "Đóng gói thân thiện với môi trường. Bảo vệ hành tinh, bắt đầu từ chiếc hộp.", "EcoFriendly Packaging Co.", "info@ecofriendlypackagingco.com", "0765432101", "888 Cách Mạng Tháng Tám, Phường 15, Quận 10", "2023-11-15", "2024-02-02", 0],
    [15, "nthphuc21@clc.fitus.edu.vn", 1, 18, 8, 15.00, 6.78, 1, "Học ngoại ngữ, mở cánh cửa thế giới. Giáo viên chất lượng, học viên tự tin.", "Công ty Đào tạo Ngoại ngữ Quốc tế", "info@quocnuguageschool.com", "0156789012", "222 Lê Thị Riêng, Phường Bến Thành, Quận 1", "2023-11-21", "2024-02-06", 1],
    [16, "nnlien21@clc.fitus.edu.vn", 1, 17, 10, 9.33, 9.11, 2, "Kiến trúc đẳng cấp, không gian độc đáo. Biến ý tưởng thành hiện thực.", "RedStone Architecture & Design", "info@redstonead.com", "0998765432", "555 Nguyễn Đình Chính, Phường 8, Quận Phú Nhuận", "2023-12-03", "2024-02-11", 1],
    [17, "pmlinh21@clc.fitus.edu.vn", 2, 12, 9, 3.21, 10.43, 1, "Đồ chơi sáng tạo, tương tác thông minh. Nụ cười và học hỏi trong mỗi chiếc đồ chơi.", "Công ty Sản xuất Đồ chơi Sáng Tạo", "info@creativetoymanufacturing.com", "0798765432", "111 Điện Biên Phủ, Phường Đa Kao, Quận 1", "2023-12-11", "2024-02-15", 0],
    [18, "ncluan21@clc.fitus.edu.vn", 1, 11, 5, 6.75, 3.57, 1, "Giải pháp IT tiên tiến. Kết nối kỹ thuật số, tương lai không giới hạn.", "TechVista IT Solutions", "info@techvistaitsolutions.com", "0187654321", "999 Phan Đình Phùng, Phường 2, Quận Phú Nhuận", "2023-12-18", "2024-02-20", 0],
    [19, "pmlinh21@clc.fitus.edu.vn", 2, 3, 3, 11.98, 2.89, 1, "Thể thao đỉnh cao, niềm vui không ngừng. Thiết bị chất lượng, niềm đam mê không giới hạn.", "Công ty Thể thao Đỉnh Cao", "info@dinhhaothethao.vn", "0911112222", "666 Cách Mạng Tháng Tám, Phường 6, Quận Tân Bình", "2023-12-24", "2024-02-24", 1],
    [20, "nnlien21@clc.fitus.edu.vn", 1, 16, 4, 2.36, 8.01, 1, "Hoa tươi độc đáo, tinh tế. Biến mọi dịp trở nên đặc biệt với vẻ đẹp của chúng tôi.", "PurplePetal Floral Design", "info@purplepetalfloraldesign.com", "0711112222", "333 Phan Xích Long, Phường 7, Quận Phú Nhuận", "2023-12-30", "2024-03-01", 1]
];
// id_create 0	officer 1	office 2	id_ads_location 3	id_board_type 4	width 5	height 6	quantity 7	content 8	company 9	email 10	phone 11	address 12	start_date 13	end_date 14	status 15

for (let i = createAdsRequests.length; i > 0; i--) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");

    td1.innerHTML = createAdsRequests[i-1][0];
    td1.className = "id";
    td2.innerHTML = createAdsRequests[i-1][2];
    td2.className = "id-ads-location";
    let k;
    for (let j = 0; j < adslocations.length; j++) {
        if (adslocations[j][0] == createAdsRequests[i-1][2]) {
            for (k = 0; k < wards.length; k++) {
                if (adslocations[j][4] == wards[k][0]) {
                    td3.innerHTML = adslocations[j][3] + ", Phường " + wards[k][1] + ", Quận " + wards[k][2];
                    td3.className = "address";
                    break;
                }
            }
            break;
        }
    }
    td4.innerHTML = createAdsRequests[i-1][9];
    td4.className = "company";
    td5.innerHTML = createAdsRequests[i-1][13];
    td5.className = "start-date";
    td6.innerHTML = createAdsRequests[i-1][14];
    td6.className = "end-date";

    if (createAdsRequests[i-1][2] == 1) {
        td7.innerHTML = "Phường " + wards[k][1];
        td7.className = "office";
    } else if (createAdsRequests[i-1][2] == 2) {
        td7.innerHTML = "Quận " + wards[k][2];
        td7.className = "office";
    }

    if (createAdsRequests[i-1][15] == 1) {
        td8.innerHTML = "Đã quy hoạch";
        td8.className = "zoning";
    } else if (createAdsRequests[i-1][15] == 0) {
        td8.innerHTML = "Chưa quy hoạch";
        td8.className = "zoning";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    tr.addEventListener("click", function() {
        window.location = "/yeucaucapphep/chitiet?id=" + createAdsRequests[i-1][0];
    });
    document.querySelector("#create-ads-table table tbody").prepend(tr);
}