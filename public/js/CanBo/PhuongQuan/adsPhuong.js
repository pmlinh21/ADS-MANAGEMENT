$(document).ready(function(){
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

    // Thêm HTML string cho nút vào hai cột cuối cùng
    ads.forEach(function(row) {
        let addr = ads_location[row[1] - 1][3];
        let loc_type_index = ads_location[row[1] - 1][6] - 1;
        let loc_type_text = loc_type[loc_type_index][1];
        let board_type_index = row[2] - 1;
        let board_type_text = board_type[board_type_index][1];
        let size_text = row[3] + 'm x ' + row[4] + 'm';
    
        row.push(
            loc_type_text,
            size_text
        );
        row[3] = addr;
        row[2] = board_type_text;
    });
    
    $('#example').DataTable({
        data: ads,
        columns: [
            { title: "ID Quảng cáo", data: 0 },
            { title: "Loại bảng quảng cáo", data: 2},
            { title: "Địa chỉ", data: 3 },
            { title: "Loại vị trí", data: 8 },
            { title: "Kích thước", data: 9 },
            { title: "Số lượng", data: 6 },
            { title: "Ngày hết hạn", data: 7 },
            { title: "", render: function() {
                return '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>';
            } },
            { title: "", render: function() {
                return '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>';
            } }
        ]
    });

    $('#example_wrapper').on('click', ".view-btn", function(){
        let table = $('#example').DataTable();
        let row = table.row($(this).closest('tr')).index();
        let rowData = table.row(row).data();
    
        console.log(row);
        console.log(rowData[5]);
    
        $('#view-image .photo').attr('src', `../../../../public/image/${rowData[5]}`);
        return;
    });
    
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    $("#example_wrapper").on('click', '.edit-btn', function(event){
        var click_row = $(event.target).closest('tr').index();
        var result = id_adsloc = imageData = null

        board_type?.forEach(function(type){
          $('#id_board_type').append(`<option value=${type[0]}>${type[1]}</option>`);
        })
        
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [ads_location[ads[click_row][1] - 1][2], ads_location[ads[click_row][1] - 1][1]],
          zoom: 17
        });

        let canvas = $('.mapboxgl-canvas')
        canvas.width('100%');

        ads_location.forEach(function (item, index) {
            var marker = new mapboxgl.Marker({color: '#0B7B31' })
            .setLngLat([item[2], item[1]]) 
            .addTo(map)
            .getElement();

            marker.id =`marker-${index}`;
        });

        $(document).on('click', '.mapboxgl-marker', function() {
            let markerId = $(this).attr('id');
            index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
            // console.log('Marker clicked:', index);
            id_adsloc = ads_location[index][0]
            result = ads_location[index][3] + ', phường ' + ads_location[index][4]+ ', ' + ads_location[index][5];
            $("#address").val(`${result} [${ads_location[index][2]}, ${ads_location[index][1]}]` )
        });

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
  
        $('#edit-info .style3-button').off('click').on('click', function(e) {
            $("#address").val("")
            $('#id_board_type').val("")
            $('#expired_date').val("")
            $('#width').val("")
            $('#height').val("")
            $('#photo').val("")
            $('#quantity').val("")
            $('#reason').val("")
        })

        $('#edit-info .style1-button').off('click').on('click', function(e) {
            e.preventDefault(); 
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
                var formData = new FormData();
                formData.append('id_ads', ads[click_row][0]);
                formData.append('id_ads_location', id_adsloc);
                formData.append('id_board_type', $('#id_board_type').val());
                formData.append('quantity', $('#quantity').val());
                formData.append('width', $('#width').val());
                formData.append('height', $('#height').val());
                formData.append('expired_date', $('#expired_date').val() );
                formData.append('req_time', validateDate(new Date()));
                formData.append('reason', $('#reason').val());
                formData.append('office', role);
                formData.append('file', imageData);
        
                // console.log(formData);
                $("form").get(0).reset();
                $("#edit-info").modal("hide")
    
            }
        })
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
