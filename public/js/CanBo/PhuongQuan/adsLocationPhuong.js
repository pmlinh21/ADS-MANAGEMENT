$(document).ready(function(){
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

  let loc_type = [
    [1, "Đất công/Công viên/Hành lang an toàn giao thông"], [2, "Đất tư nhân/Nhà ở riêng lẻ"], 
    [3, "Trung tâm thương mại"], [4, "Chợ"], [5, "Cây xăng"], [6, "Nhà chờ xe buýt"]
  ];

  let ads_type = [[1, "Cổ động chính trị"], [2, "Quảng cáo thương mại"], [3, "Xã hội hóa"]];

  // Thêm HTML string cho nút vào hai cột cuối cùng
  ads_location.forEach(function(row) {
    let loc_type_index = row[6] - 1;
    let loc_type_text = loc_type[loc_type_index][1];
    let ads_type_index = row[8] - 1;
    let ads_type_text = ads_type[ads_type_index][1];
    let zoning_text = row[9] === 1 ? "Đã quy hoạch" : "Chưa quy hoạch";

    row[6] = loc_type_text;
    row[8] = ads_type_text;
    row[9] = zoning_text;
  });

  $('#example').DataTable({
    data: ads_location,
    columns: [
      { title: "ID Điểm đặt", data: 0 },
      { title: "Địa chỉ", data: 3 },
      { title: "Loại vị trí", data: 6 },
      { title: "Hình thức quảng cáo", data: 8 },
      { title: "Quy hoạch", data: 9 },
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
    
    $('#view-image .photo').attr('src', `../../../../public/image/${rowData[7]}`);
    return;
  });
    
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  $("#example_wrapper").on('click', '.edit-btn', function(event){
    var click_row = $(event.target).closest('tr').index();
    var ward = district = result = longitude = latitude = imageData = null
        
    loc_type?.forEach(function(type){
      $('#id_loc_type').append(`<option value=${type[0]}>${type[1]}</option>`);
    })
  
    ads_type?.forEach(function(type){
      $('#id_ads_type').append(`<option value=${type[0]}>${type[1]}</option>`);
    })

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ads_location[click_row][2], ads_location[click_row][1]],
      zoom: 17
    });

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    let canvas = $('.mapboxgl-canvas')
    canvas.width('100%');

    $('#search').append(geocoder.onAdd(map));

    $(".header-map i").on('click', geocoding);
    $('#search').on('keydown', function(event) {
      if (event.keyCode === 13) { 
        geocoding();
      }
    });

    function geocoding(){
      var address = $('#search').val()

      $.ajax({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json',
        type: 'GET',
        data: {
          access_token: mapboxgl.accessToken
        },
        success: function(response) {
          // Xử lý kết quả geocoding
          var features = response.features;
          if (features.length > 0) {
            var firstFeature = features[0];
            var coordinates = firstFeature.center;

            result = firstFeature.place_name;
            longitude = coordinates[0];
            latitude= coordinates[1]
            
            // Cập nhật tọa độ và zoom của map
            map.flyTo({
              center: coordinates,
              zoom: 17
            });

            new mapboxgl.Marker( {color: '#0B7B31' })
              .setLngLat(coordinates) // Specify the marker longitude and latitude
              .addTo(map);

              $("#address").val(`${result} [${coordinates[0]}, ${coordinates[1]}]` );
                
          } else {
            alert('No results found');
          }
        }, error: function() {
          alert('Error occurred during geocoding');
        }
      });
    }

    map.on('click', function(e) {
      let lngLat = e.lngLat;
      longitude = lngLat.lng;
      latitude = lngLat.lat;
        
      $.ajax({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
        method: 'GET',
        data: {
          access_token: mapboxgl.accessToken
        },
        success: function(response) {
          // Lấy địa chỉ từ kết quả Geocoding
          result = response.features[0].place_name;
        
          // Gán địa chỉ vào phần tử HTML
          $("#address").val(`${result} [${longitude}, ${latitude}]`);
        }, error: function(error) {
          console.log(error);
        }
      });
    });

    // Lắng nghe sự kiện mousedown trên bản đồ
    map.on('mousedown', function() {
      // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
      map.getCanvas().style.cursor = 'grab';
    });

    // Lắng nghe sự kiện mouseup trên bản đồ
    map.on('mouseup', function() {
      // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
      map.getCanvas().style.cursor = 'pointer';
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
      $('#id_loc_type').val("")
      $('#id_ads_type').val("")
      $('#is_zoning').val("")
      $('#reason').val("")
      $('#photo').val("")
    })

    $('#edit-info .style1-button').off('click').on('click', function(e) {
      e.preventDefault(); 
          
      let reason = $('#reason').val();
      if (!reason){
        alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
      }
      else{
        var formData = new FormData();
        formData.append('id_ads_location',ads_location[click_row][0]);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('address', null);
        formData.append('id_ward', null);
        formData.append('id_district', null);
        formData.append('id_loc_type', $('#id_loc_type').val());
        formData.append('file', imageData);
        formData.append('id_ads_type', $('#id_ads_type').val());
        formData.append('is_zoning', $('#is_zoning').val());
        formData.append('req_time', validateDate(new Date()));
        formData.append('reason', $('#reason').val());
        formData.append('office', role);
            
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
