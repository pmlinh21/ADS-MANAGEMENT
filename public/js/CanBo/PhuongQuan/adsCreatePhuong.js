$(document).ready(function(){
    const role = 2; 
    const email = "phuong@gmail.com"
    const id_ward = 2;
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

    const storedAdsCreate = localStorage.getItem('ads_create');
    let ads_create = storedAdsCreate ? JSON.parse(storedAdsCreate) : [];
    console.log("ads_create:", ads_create );

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
        // console.log(filtered_ads_loc)
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
