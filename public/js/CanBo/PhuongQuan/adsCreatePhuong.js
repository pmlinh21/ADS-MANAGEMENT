$(document).ready(function(){
    const role = 2; 
    const email = "phuong@gmail.com"
    const id_ward = 2;
    
    let ads_create = [
        [1, 'nnlien21@clc.fitus.edu.vn', 1,	10,	5, 8.12, 1.23, 1, 'Vẻ đẹp tự nhiên trong từng món trang sức. Khám phá sự quý phái tại chúng tôi.', '', 'Công ty TNHH Vàng Bạc Đá Quý', 'contact@vangbacdaquy.com', '0912345678', '123 Điện Biên Phủ, Phường 7, Quận 3', '2023-08-05', '2023-12-01', 0],
        [2, 'nthphuc21@clc.fitus.edu.vn', 2, 5,	3, 3.76, 3.78, 1, 'Hương vị tươi mới từ nông trại đến bát. Sự tươi mới trong mỗi khẩu phần.', '',	'FreshHarvest Foods', 'info@freshharvestfoods.com',	'0712345678', '56 Cao Thắng, Phường 4, Quận 3', '2023-08-10',	'2023-12-05', 1],
        [3, 'pmlinh21@clc.fitus.edu.vn', 1,	20,	8, 11.23, 5.42,	3, 'Xây dựng ước mơ của bạn. Chất lượng đến từng chi tiết.', '', 'Công ty Xây dựng Tiến Đạt', 'info@tiendatconstruction.vn', '0123456789', '789 Lê Văn Sỹ, Phường 2, Quận Tân Bình', '2023-08-15',	'2023-12-11', 1],
        [4, 'ncluan21@clc.fitus.edu.vn', 2,	25,	2, 7.49, 2.95, 1, 'Chúng tôi tạo ra giải pháp công nghệ tương lai tại BlueSky Tech Solutions. Từ phần mềm đến phần cứng, chúng tôi đưa bạn đến gần hơn với tương lai kỹ thuật số. Hãy mở cánh cửa của sự đổi mới với chúng tôi!', '', 'BlueSky Tech Solutions', 'info@blueskytechsolutions.com', '0976543210', '15 Đinh Công Tráng, Phường Tân Định, Quận 1', '2023-09-01', '2023-12-15', 0],
        [5, 'nnlien21@clc.fitus.edu.vn', 2,	22,	7, 9.88, 4.67, 4, 'Hương vị tinh tế từ bếp đến bát. Đẳng cấp trong từng giọt mồ hôi.', '', 'Công ty Thực phẩm Hương Thảo', 'info@huongthaofoods.com', '0776543210', '222 Hùng Vương, Phường 9, Quận 5',	'2023-09-07', '2023-12-20', 1],
        [6, 'nnlien21@clc.fitus.edu.vn', 1,	21,	1, 5.34, 6.11, 1, 'Sáng tạo không gian xanh. Thiên nhiên sống động trong lòng thành phố.', '', 'EverGreen Landscapes', 'info@evergreenlandscapes.com', '0145678901', '432 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1', '2023-09-14', '2023-12-24', 0],
        [7, 'nthphuc21@clc.fitus.edu.vn', 1, 10, 6,	13.01, 9.86, 1,	'Ở đằng sau mỗi ứng dụng tuyệt vời là một đội ngũ sáng tạo. Công ty Công nghệ Phần mềm Sáng Tạo chú trọng vào việc phát triển các ứng dụng và phần mềm độc đáo, giúp bạn kết nối và làm việc hiệu quả hơn.', '', 'Công ty Công nghệ Phần mềm Sáng Tạ', 'info@sangtaosoftware.vn', '0932104765', '76 Lê Lai, Phường Bến Thành, Quận 1',	'2023-09-22', '2023-12-30', 0],
        [8, 'pmlinh21@clc.fitus.edu.vn', 2,	7, 9, 10.65, 8.33, 2, 'Gửi hàng đến mọi nơi. An toàn, đồng hành đáng tin cậy.', '', 'OceanWave Logistics', 'info@oceanwavelogistics.com', '0732104765', '321 Võ Văn Tần, Phường 5, Quận 3', '2023-10-02', '2024-01-03', 1],
        [9, 'pmlinh21@clc.fitus.edu.vn', 1,	15,	10,	2.97, 10.75, 1,	'Sức khỏe không giới hạn. Chăm sóc sức khỏe tại đỉnh.', '', 'Công ty Y tế Hoàn Hảo', 'info@hoanhaohealthcare.com',	'0112233445', '99 Trần Quang Diệu, Phường 14, Quận 3', '2023-10-09',	'2024-01-08', 1],
        [10, 'ncluan21@clc.fitus.edu.vn', 2,	9, 4, 12.45, 7.19, 1, 'Nắng là nguồn năng lượng vô tận, và chúng tôi biến nó thành điện. Với công nghệ tiên tiến và lòng đam mê bền vững, chúng tôi giúp bạn tiết kiệm năng lượng và giữ cho hành tinh của chúng ta xanh sạch hơn.', '', 'GoldenSun Solar Energy', 'info@goldensunsolarenergy.com', '0943216547', '666 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận', '2023-10-15', '2024-01-14', 0],
        [11, 'nnlien21@clc.fitus.edu.vn', 1,	14,	2, 6.78, 11.24,	1,	'Hỗ Trợ Cộng Đồng, Xây Dựng Tương Lai! Chúng tôi đầu tư vào các dự án xã hội để tạo ra những thay đổi tích cực trong cuộc sống hàng ngày của bạn.', '', 'Công ty Du lịch Phong Cảnh Đẹp', 'info@phongcachdeptravel.com',	'0743216547', '444 Lê Quang Định, Phường 11, Quận Bình Thạnh', '2023-10-22', '2024-01-18', 0],
        [12, 'nthphuc21@clc.fitus.edu.vn', 1, 21, 7,	14.20, 12.68, 2, 'Quản lý tài chính, xây dựng tương lai. Đối tác tài chính đáng tin cậy.', '', 'SilverLine Financial Services', 'info@silverlinefinancials.com', '0134567890', '777 Phan Xích Long, Phường 3, Quận Phú Nhuận', '2023-11-01',	'2024-01-23', 1],
        [13, 'ncluan21@clc.fitus.edu.vn', 2,	20,	1, 1.54, 13.91,	3, 'Nội thất độc đáo, phản ánh cá nhân. Không gian sống đẳng cấp.', '', 'Công ty Trang trí Nội thất Mỹ Ngọc',	'info@myngocinteriors.com',	'0965432101', '101 Hoàng Sa, Phường Đa Kao, Quận 1', '2023-11-08', '2024-01-27', 1],
        [14, 'nnlien21@clc.fitus.edu.vn', 1,	19,	6, 4.89, 14.54,	1, 'Đóng gói thân thiện với môi trường. Bảo vệ hành tinh, bắt đầu từ chiếc hộp.', '', 'EcoFriendly Packaging Co.',	'info@ecofriendlypackagingco.com', '0765432101', '888 Cách Mạng Tháng Tám, Phường 15, Quận 10', '2023-11-15', '2024-02-02', 0],
        [15, 'nthphuc21@clc.fitus.edu.vn', 1, 18, 8,	15.00, 6.78, 1,	'Học ngoại ngữ, mở cánh cửa thế giới. Giáo viên chất lượng, học viên tự tin.', '', 'Công ty Đào tạo Ngoại ngữ Quốc tế', 'info@quocnuguageschool.com', '0156789012', '222 Lê Thị Riêng, Phường Bến Thành, Quận 1',	'2023-11-21', '2024-02-06', 1],
        [16, 'nnlien21@clc.fitus.edu.vn', 1,	17, 10,	9.33, 9.11,	2, 'Kiến trúc đẳng cấp, không gian độc đáo. Biến ý tưởng thành hiện thực.', '', 'RedStone Architecture & Design', 'info@redstonead.com', '0998765432', '555 Nguyễn Đình Chính, Phường 8, Quận Phú Nhuận', '2023-12-03', '2024-02-11', 1],
        [17, 'pmlinh21@clc.fitus.edu.vn', 2,	12,	9, 3.21, 10.43,	1, 'Đồ chơi sáng tạo, tương tác thông minh. Nụ cười và học hỏi trong mỗi chiếc đồ chơi.', '', 'Công ty Sản xuất Đồ chơi Sáng Tạo', 'info@creativetoymanufacturing.com', '0798765432', '111 Điện Biên Phủ, Phường Đa Kao, Quận 1', '2023-12-11', '2024-02-15', 0],
        [18, 'ncluan21@clc.fitus.edu.vn', 1,	11,	5, 6.75, 3.57, 1, 'Giải pháp IT tiên tiến. Kết nối kỹ thuật số, tương lai không giới hạn.', '', 'TechVista IT Solutions', 'info@techvistaitsolutions.com', '0187654321', '999 Phan Đình Phùng, Phường 2, Quận Phú Nhuận', '2023-12-18', '2024-02-20', 0],
        [19, 'pmlinh21@clc.fitus.edu.vn', 2,	3, 3, 11.98, 2.89, 1, 'Thể thao đỉnh cao, niềm vui không ngừng. Thiết bị chất lượng, niềm đam mê không giới hạn.', '', 'Công ty Thể thao Đỉnh Cao', 'info@dinhhaothethao.vn', '0911112222',	'666 Cách Mạng Tháng Tám, Phường 6, Quận Tân Bình', '2023-12-24', '2024-02-24', 1],
        [20, 'nnlien21@clc.fitus.edu.vn', 1,	16,	4, 2.36, 8.01, 1, 'Hoa tươi độc đáo, tinh tế. Biến mọi dịp trở nên đặc biệt với vẻ đẹp của chúng tôi.', '', 'PurplePetal Floral Design', 'info@purplepetalfloraldesign.com',	'0711112222', '333 Phan Xích Long, Phường 7, Quận Phú Nhuận', '2023-12-30', '2024-03-01', 1]
    ];
    
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
    
    let loc_type = [[1, "Đất công/Công viên/Hành lang an toàn giao thông"], [2, "Đất tư nhân/Nhà ở riêng lẻ"], 
    [3, "Trung tâm thương mại"], [4, "Chợ"], [5, "Cây xăng"], [6, "Nhà chờ xe buýt"]];

    let board_type = [[1, "Trụ bảng hiflex"], [2, "Trụ màn hình điện tử LED"], [3, "Trụ hộp đèn"], 
    [4, "Bảng hiflex ốp tường"], [5, "Màn hình điện tử ốp tường"], [6, "Trụ treo băng rôn dọc"],
    [7, "Trụ treo băng rôn ngang"], [8, "Trụ/Cụm pano"], [9, "Cổng chào"], [10, "Trung tâm thương mại"]];

    const filtered_ads_create = ads_create.filter(row => ads_location[row[3] - 1][4] === id_ward);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // tháng bắt đầu từ 0
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }

    // Thêm HTML string cho nút vào hai cột cuối cùng
    filtered_ads_create.forEach(function(row) {
        let addr = ads_location[row[3] - 1][3];
        let board_type_index = row[4] - 1;
        let board_type_text = board_type[board_type_index][1];
        
        row[3] = addr;
        row[4] = board_type_text;
        row[14] = formatDate(row[14]);
        row[15] = formatDate(row[15]);
        row[16] = row[16] === 1 ? "Đã xét duyệt" : "Chưa xét duyệt";
    });
    
    
    $('#example').DataTable({
        data: filtered_ads_create,
        columns: [
            { title: "ID", data: 0 },
            { title: "Loại bảng quảng cáo", data: 4},
            { title: "Điểm đặt", data: 3 },
            { title: "Nội dung quảng cáo", data: 8 },
            { title: "Công ty", data: 10 },
            { title: "Ngày bắt đầu", data: 14 },
            { title: "Ngày kết thúc", data: 15 },
            { title: "Xét duyệt", data: 16 },
            { title: "", render: function() {
                return '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });

    $('#example_wrapper').on('click', ".ads-create-table .view-btn", function(){
        let row = $(this).closest('tr').index();
        let id_create = filtered_ads_create[row][0]
        window.location.href = '/detailAdsCreate?id_create=' + id_create;
        console.log(row);
    });
    
    var imageData = result = id_adsloc = null
    // render form
    board_type?.forEach(function(type){
        $('#id_board_type').append(`<option value=${type[0]}>${type[1]}</option>`);
    })
    
    $('#photo').on('change', function(e) {
        if (e.target.files[0])
        if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
          imageData = e.target.files[0]
        }
        else if (!e.target.files[0].type.startsWith('image/')){
          alert('Avatar must be an image file (.jpg, .png, .jpeg)')
        }
        else if (!(e.target.files[0].size / 1024 <= 4)){
          alert('Avatar must not exceed 4MB')
        }
    });

    // reinitialize the form
    $('.form-ads-create.style3-button').off('click').on('click', function(e) {
        $("#id_ads_location").val("")
        $('#id_board_type').val("")
        $('#content').val("")
        $('#width').val("")
        $('#height').val("")
        $('#photo').val("")
        $('#quantity').val("")
        $('#reason').val("")
        $('#company').val("")
        $('#address').val("")
        $('#email').val("")
        $('#phone').val("")
        $('#start_date').val("")
        $('#end_date').val("")
    })  

    // click "Chọn điểm đặt"
    $('.form-ads-create .input-group button').on('click', function(){
        const filtered_ads_loc = ads_location.filter(row => row[4] === id_ward && row[9] == 1);
  
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [filtered_ads_loc[0][2], filtered_ads_loc[0][1]],
            zoom: 17
        });
  
        let canvas = $('.mapboxgl-canvas')
        canvas.width('100%');
        canvas.height('100%');
  
        filtered_ads_loc.forEach(function (item, index) {
            var marker = new mapboxgl.Marker({color: '#0B7B31' })
            .setLngLat([item[2], item[1]]) 
            .addTo(map)
            .getElement();
  
            marker.id =`marker-${index}`;
        });
  
        // click marker 
        $(document).on('click', '.mapboxgl-marker', function() {
            let markerId = $(this).attr('id');
            index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
            id_adsloc = filtered_ads_loc[index][0];
            result = filtered_ads_loc[index][3] + ', phường ' + id_ward;
            $(".id_ads_location").val(`${result} [${filtered_ads_loc[index][2]}, ${filtered_ads_loc[index][1]}]` )
        });
  
        // click confirm button
        $('#choose-adsloc .style1-button').off('click').on('click', function(e) {
            e.preventDefault(); 
            $("#id_ads_location").val(`${result} [${filtered_ads_loc[index][2]}, ${filtered_ads_loc[index][1]}]` )
        })
    })

    // click "tạo cấp phép"
    $('.form-ads-create .button-group .style1-button').off('click').on('click', function(e) {
        e.preventDefault(); 
        if ($('#id_board_type').val() === "(Trống)") {
          alert('Vui lòng chọn loại bảng quảng cáo.');
        } else if (id_adsloc === null) {
          alert('Vui lòng chọn điểm đặt quảng cáo.');
        } else if ($('#width').val() === "") {
          alert('Vui lòng nhập chiều dài.');
        } else if ($('#height').val() === "") {
          alert('Vui lòng nhập chiều rộng.');
        } else if ($('#quantity').val() === "") {
          alert('Vui lòng nhập số lượng.');
        } else if (imageData == null) {
          alert('Vui lòng tải hình ảnh minh họa.');
        } else if ($('#content').val() === "") {
          alert('Vui lòng nhập nội dung.');
        } else if ($('#company').val() === "") {
          alert('Vui lòng nhập tên công ty.');
        } else if ($('#address').val() === "") {
          alert('Vui lòng nhập địa chỉ.');
        } else if ($('#email').val() === "") {
          alert('Vui lòng nhập địa chỉ email.');
        } else if ($('#phone').val() === "") {
          alert('Vui lòng nhập số điện thoại.');
        } else if ($('#start_date').val() === "") {
          alert('Vui lòng nhập ngày bắt đầu.');
        } else if ($('#end_date').val() === "") {
          alert('Vui lòng nhập ngày kết thúc.');
        } else if ($('#start_date').val() > $('#end_date').val()) {
          alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
        }else{
            var formData = new FormData();
            formData.append('id_ads_location', id_adsloc);
            formData.append('id_board_type', $('#id_board_type').val());
            formData.append('quantity', $('#quantity').val());
            formData.append('width', $('#width').val());
            formData.append('height', $('#height').val());
            formData.append('start_date', $('#start_date').val() );
            formData.append('end_date', $('#end_date').val() );
            formData.append('company', $('#company').val());
            formData.append('address', $('#address').val());
            formData.append('email', $('#email').val() );
            formData.append('phone', $('#phone').val() );          
            formData.append('content', $('#content').val());
            formData.append('officer', email);
            formData.append('office', role);
            formData.append('file', imageData);
    
            // console.log(formData);
            $("form").get(0).reset();
        }
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
