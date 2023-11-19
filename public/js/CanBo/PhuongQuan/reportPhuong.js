$(document).ready(function(){
    const storedEmail = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const id_ward = 2;

    const storedAdsReport = localStorage.getItem('ads_report');
    let ads_report = storedAdsReport ? JSON.parse(storedAdsReport) : [];
    console.log("ads_report:", ads_report );

    let ads = [
        [1, 1, 5, 8.97, 3.42, 'image1.png', 1, '2023-11-03'],
        [2, 1, 2, 12.13, 7.88, '', 1, '2023-11-14'],
        [3, 2, 10, 10.21, 5.75, '', 2, '2023-12-05'],
        [4, 3, 2, 2.46, 9.33, '', 1, '2023-12-22'],
        [5, 3, 8, 6.59, 14.12, '', 2, '2024-01-09'],
        [6, 3, 3, 10.05, 4.38, '', 1, '2024-01-18'],
        [7, 6, 1, 10.79, 13.54, '', 1, '2024-02-02'],
        [8, 6, 8, 8.26, 2.93, '', 1, '2024-02-15'],
        [9, 8, 1, 10.84, 6.17, '', 3, '2024-03-04'],
        [10, 9, 5, 12.46, 3.65, '', 1, '2024-03-17'],
        [11, 10, 8, 9.12, 7.36, '', 2, '2024-04-01'],
        [12, 19, 1, 13.01, 5.18, '', 2, '2024-04-11'],
        [13, 19, 10, 1.57, 2.5, '', 2, '2024-04-28'],
        [14, 11, 6, 8.95, 7.89, '', 1, '2024-05-07'],
        [15, 13, 9, 5.26, 2.35, '', 1, '2024-05-19'],
        [16, 20, 2, 9.14, 1.99, '', 2, '2024-06-01'],
        [17, 14, 1, 8.01, 6.75, '', 2, '2024-06-14'],
        [18, 15, 1, 7.36, 4.5, '', 1, '2024-06-26'],
        [19, 22, 6, 1.62, 3.87, '', 1, '2024-07-09'],
        [20, 15, 6, 4.88, 1.47, '', 2, '2024-07-22'],
        [21, 17, 5, 3.09, 8.36, '', 2, '2024-08-04'],
        [22, 20, 10, 2.2, 6.88, '', 1, '2024-08-18'],
        [23, 25, 8, 6.44, 4.21, '', 1, '2024-08-29']
    ];

    const storedAdsLocReport = localStorage.getItem('ads_loc_report');
    let ads_loc_report = storedAdsLocReport ? JSON.parse(storedAdsLocReport) : [];
    console.log("ads_loc_report:", ads_loc_report );

    let ads_location = [
        [1, 10.773695, 106.689636, '59 Nguyễn Thị Minh Khai', 2, 1, 2, 'image1.png', 1, 1],
        [2, 10.77143, 106.693526, '70 Phạm Hồng Thái', 2, 1, 2, 'image2.png', 3, 0],
        [3, 10.770072, 106.693823, '84 Lê Lai', 9, 1, 3, 'image3.png', 3, 0],
        [4, 10.777637, 106.693007, '128 Nguyễn Thị Minh Khai', 32, 3, 5, '', 1, 1],
        [5, 10.778513, 106.693939, '118 Nguyễn Thị Minh Khai', 32, 3, 6, '', 2, 1],
        [6, 10.774799, 106.690473, '138 Nguyễn Thị Minh Khai', 32, 3, 5, '', 1, 0],
        [7, 10.775846, 106.689544, '9 Võ Văn Tần', 32, 3, 2, '', 1, 0],
        [8, 10.772591, 106.69093, '2 Bùi Thị Xuân', 2, 1, 5, 'image1.png', 3, 0],
        [9, 10.774308, 106.688328, '141 Cách Mạng Tháng 8', 25, 3, 4, '', 2, 1],
        [10, 10.775101, 106.686973, '70 Cách Mạng Tháng 8', 25, 3, 3, '', 2, 1],
        [11, 10.776877, 106.688484, '36 Bà Huyện Thanh Quan', 32, 3, 5, '', 3, 1],
        [12, 10.776843, 106.690665, '55-25 Trương Định', 32, 3, 2, '', 1, 1],
        [13, 10.772553, 106.691073, '1 Bùi Thị Xuân', 2, 1, 2, 'image2.png', 3, 0],
        [14, 10.774375, 106.690221, '59 Nguyễn Thị Minh Khai', 2, 1, 3, 'image3.png', 1, 1],
        [15, 10.772146, 106.69246, '161-141 Nguyễn Du', 2, 1, 2, 'image1.png', 1, 1],
        [16, 10.776332, 106.691408, '2-10 Trương Định', 32, 3, 6, '', 2, 1],
        [17, 10.77632696, 106.6891595, '16 Nguyễn Thị Diệu', 32, 3, 1, '', 1, 1],
        [18, 10.7729249, 106.695438, '66 Trương Định', 2, 1, 3, 'image2.png', 2, 1],
        [19, 10.780619, 106.695861, '188 Pasteur', 32, 3, 3, '', 1, 0],
        [20, 10.77915627, 106.6961993, '14 Alexandre de Rhodes', 1, 1, 6, 'image3.png', 1, 0],
        [21, 10.775649, 106.697036, '108 Nguyễn Du', 2, 1, 6, 'image1.png', 3, 1],
        [22, 10.779572, 106.69514, '55-53 Nguyễn Thị Minh Khai', 1, 1, 3, 'image2.png', 1, 1],
        [23, 10.776907, 106.69798, '132 Nam Kỳ Khởi Nghĩa', 2, 1, 1, 'image3.png', 2, 1],
        [24, 10.771666, 106.693518, '550 Lý Tự Trọng', 2, 1, 4, 'image1.png', 3, 1],
        [25, 10.776379, 106.691306, '2-10 Trương Định', 32, 3, 5, '', 3, 0]
    ];
    
    const storedLocReport = localStorage.getItem('loc_report');
    let loc_report = storedLocReport ? JSON.parse(storedLocReport) : [];
    console.log("loc_report:", loc_report );

    let report_type = [[1, "Tố giác sai phạm"], [2, "Đăng ký nội dung"], [3, "Đóng góp ý kiến"], [4, "Giải đáp thắc mắc"]];
    
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // tháng bắt đầu từ 0
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }

    const filtered_ads_report = ads_report.filter(row => ads_location[ads[row[3] - 1][1] - 1][4] == id_ward);

    filtered_ads_report.forEach(function(row) {
        let report_type_index = row[4] - 1;
        let report_type_text = report_type[report_type_index][1];
    
        row[4] = report_type_text;
        row[11] = formatDate(row[11]);
        row[12] = row[12] === 1 ? "Đã xử lý" : "Chưa xử lý";
    });
    
    $('#example1').DataTable({
        data: filtered_ads_report,
        columns: [
            { title: "ID Báo cáo", data: 0 },
            { title: "ID Quảng cáo", data: 3 },
            { title: "Loại hình báo cáo", data: 4 },
            { title: "Người báo cáo", data: 5 },
            { title: "Email", data: 6 },
            { title: "Số điện thoại", data: 7 },
            { title: "Thời điểm gửi", data: 11 },
            { title: "Trạng thái", data: 12 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });
    
    $("#example1_wrapper").on('click', '.ads-report-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let id_report = filtered_ads_report[row][0], table = "ads"
        window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
        console.log(row);
    })

    const filtered_ads_loc_report = ads_loc_report.filter(row => ads_location[row[3] - 1][4] == id_ward);
    filtered_ads_loc_report.forEach(function(row) {
        let report_type_index = row[4] - 1;
        let report_type_text = report_type[report_type_index][1];
    
        row[4] = report_type_text;
        row[11] = formatDate(row[11]);
        row[12] = row[12] === 1 ? "Đã xử lý" : "Chưa xử lý";
    });
    
    $('#example2').DataTable({
        data: filtered_ads_loc_report,
        columns: [
            { title: "ID Báo cáo", data: 0 },
            { title: "ID Điểm đặt", data: 3 },
            { title: "Loại hình báo cáo", data: 4 },
            { title: "Người báo cáo", data: 5 },
            { title: "Email", data: 6 },
            { title: "Số điện thoại", data: 7 },
            { title: "Thời điểm gửi", data: 11 },
            { title: "Trạng thái", data: 12 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });
    
    $("#example2_wrapper").on('click', '.adsloc-report-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let id_report = filtered_ads_loc_report[row][0], table = "adsloc"
        window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
        console.log(row);
    })
    
    function getAddressFromCoordinates(latitude, longitude, callback) {
        const accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
    
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                // Kiểm tra xem dữ liệu có tồn tại và có thuộc tính features không
                if (data.features && data.features.length > 0) {
                    // Kiểm tra xem feature đầu tiên có thuộc tính place_name không
                    if (data.features[0].place_name) {
                        // Lấy địa chỉ từ dữ liệu trả về

                        const fullAddress = data.features[0].place_name;

                        // Tách địa chỉ thành các phần
                        const addressComponents = fullAddress.split(', ');

                        // Lấy phần của địa chỉ mà bạn quan tâm
                        const simplifiedAddress = addressComponents.slice(0, 2).join(', ');

                        callback(simplifiedAddress);
                    } else {
                        console.error('Dữ liệu không chứa thuộc tính "place_name".', data.features[0]);
                        callback('Địa chỉ không khả dụng');
                    }
                } else {
                    console.error('Dữ liệu không đúng định dạng hoặc không chứa thuộc tính "features".', data);
                    callback('Địa chỉ không khả dụng');
                }
            },
            error: function(error) {
                console.error('Error fetching address:', error);
                callback('Địa chỉ không khả dụng');
            }
        });
    }
    
    const filtered_loc_report = loc_report.filter(row => row[16] === id_ward);
    filtered_loc_report.forEach(function(row) {
        let report_type_index = row[6] - 1;
        let report_type_text = report_type[report_type_index][1];
    
        row[6] = report_type_text;
        row[13] = formatDate(row[13]);
        row[14] = row[14] === 1 ? "Đã xử lý" : "Chưa xử lý";
    });
    
    $('#example3').DataTable({
        data: filtered_loc_report,
        columns: [
            { title: "ID Báo cáo", data: 0 },
            { title: "Địa chỉ", class: "diachi", data: 5 },
            { title: "Loại hình báo cáo", class: "diachi", data: 6 },
            { title: "Người báo cáo", data: 7 },
            { title: "Email", data: 8 },
            // { title: "Số điện thoại", data: 9 },
            { title: "Thời điểm gửi", class: "diachi", data: 13 },
            { title: "Trạng thái", class: "diachi", data: 14 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });
    
    $("#example3_wrapper").on('click', '.loc-report-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let id_report = filtered_loc_report[row][0], table = "loc"
        window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
        console.log(row);
    })
    
    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');

    manageButton.hover(
        function () {
        $(this).addClass('li-hover');
        $('#manage .nav-link').addClass('nav-link-hover');
        manageMenu.show();
        $('.black-bg').show()
        },
        function () {
        $(this).removeClass('li-hover');
        $('#manage .nav-link').removeClass('nav-link-hover');
        manageMenu.hide();
        $('.black-bg').hide()
        }
    );
});
