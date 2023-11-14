// hard code
$(document).ready(function () {
  // const role = 1; 
  // const email = "nnlien21@clc.fitus.edu.vn"
  const id_district = 1;
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

  var loc_type = LocType.content, ads_type = AdsType.content
  var info, filter_info, wards

  wards = Ward.content.map(ward => ward.ward);
  console.log("!");
  renderWard(wards);

  info = QuanAdsLocation.content.map(function(data){
    let {id_ads_location, address, ward, loc_type, ads_type, 
      photo, is_zoning, longitude, latitude} = data
    let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
    id_ads_location = parseInt(id_ads_location)
    return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
      '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
      '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
      photo, longitude, latitude]
  })
  filter_info = [...info]
  console.log(filter_info)
  $("#example").DataTable({
    data: filter_info
  });

  $('#example_wrapper').on('click', ".view-btn", function(){
    let row = $(this).closest('tr').index();
    console.log(filter_info[row][8]);
    let path  = "../../../public/image/image-placeholder.jpg"
    if (filter_info[row][8] != "")
      path  = `../../../../public/image/${filter_info[row][8]}`
    $('#view-image .photo').attr('src', path );
    return
  })

  $('.ward-table input').click(function() {
    var id_ward = $(this).attr('id');
    id_ward = id_ward.slice(id_ward.indexOf("-") + 1)

    if ($(this).is(':checked')) {
      for (var i = 0; i < info.length; i++){
        if (info[i][2] == wards[id_ward])
        filter_info.push(info[i]);
      }
    } else {
      var result = []
      for (var i = 0; i < filter_info.length; i++){
        if (filter_info[i][2] != wards[id_ward])
          result.push(filter_info[i]);
      }
      filter_info = [...result]
    }

    $("#example").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
      return a[0] - b[0];
    })).draw();
    // return
  });

  $("#example_wrapper").on('click', '.edit-btn', function(event){
    var click_row = $(event.target).closest('tr').index();
    var ward = district = result = longitude = latitude = imageData = null
    
    // console.log(filter_info[click_row][0])
    loc_type?.forEach(function(type){
      $('#id_loc_type').append(`<option value=${type.id_loc_type}>${type.loc_type}</option>`);
    })

    ads_type?.forEach(function(type){
      $('#id_ads_type').append(`<option value=${type.id_ads_type}>${type.ads_type}</option>`);
    })

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [filter_info[click_row][9], filter_info[click_row][10]],
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
      if (event.keyCode === 13) { // Kiểm tra phím Enter
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
            // ward = firstFeature.context[0];
            // district = firstFeature.context[1];
            longitude = coordinates[0];
            latitude= coordinates[1]
            // console.log(firstFeature)

            // Cập nhật tọa độ và zoom của map
            map.flyTo({
              center: coordinates,
              zoom: 17
            });

            new mapboxgl.Marker( {color: '#0B7B31' })
            .setLngLat(coordinates) // Specify the marker longitude and latitude
            .addTo(map);

            $("#address").val(`${result} [${coordinates[0]}, ${coordinates[1]}]` )
            
          } else {
            alert('No results found');
          }
        },
        error: function() {
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
        },
        error: function(error) {
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
      e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
      
      // console.log(longitude, latitude, filter_info[click_row][0]);
      let reason = $('#reason').val();
      if (!reason){
        alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
      }
      else{
        var formData = new FormData();
        formData.append('id_ads_location',filter_info[click_row][0]);
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

// gọi api
// $(document).ready(function () {
//     // 1 = Quan, 2 = Phuong
//     const role = 1; 
//     const email = "nnlien21@clc.fitus.edu.vn"
//     const id_district = 1;
//     mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
//     var loc_type, ads_type
//     var info, filter_info, wards

//     $.get(`http://localhost:8080/api/quan/getLocType`, function(data) {
//         loc_type = data.content
//         // console.log(loc_type);
//       }).fail(function(error) {
//         console.log(error);
//       });

//     $.get(`http://localhost:8080/api/quan/getAdsType`, function(data) {
//         ads_type = data.content
//       }).fail(function(error) {
//         console.log(error);
//       });

//     if (role === 2) {
//         $(".ward-table").hide();

//     }
//     else{
//       $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
//         wards = data.content.map(ward => ward.ward);
//         console.log("!");
//         renderWard(wards);
//       }).fail(function(error) {
//         console.log(error);
//       });

//       $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
//         console.log("~");
//         info = data.content.map(function(data){
//           let {id_ads_location, address, ward, loc_type, ads_type, 
//             photo, is_zoning, longitude, latitude} = data
//           let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
//           id_ads_location = parseInt(id_ads_location)
//           return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
//             '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
//             '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
//             photo, longitude, latitude]
//         })
//         filter_info = [...info]
//         console.log(filter_info)
//         $("#example").DataTable({
//           data: filter_info
//         });

//         $('#example_wrapper').on('click', ".view-btn", function(){
//           let row = $(this).closest('tr').index();
  //         let path  = "../../../public/image/image-placeholder.jpg"
  //         if (filter_info[row][8] != "")
  //           path  = `../../../../public/image/${filter_info[row][8]}`
  //         $('#view-image .photo').attr('src', path );
//           return
//         })

//         $('.ward-table input').click(function() {
//           var id_ward = $(this).attr('id');
//           id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
    
//           if ($(this).is(':checked')) {
//             for (var i = 0; i < info.length; i++){
//               if (info[i][2] == wards[id_ward])
//               filter_info.push(info[i]);
//             }
//           } else {
//             var result = []
//             for (var i = 0; i < filter_info.length; i++){
//               if (filter_info[i][2] != wards[id_ward])
//                 result.push(filter_info[i]);
//             }
//             filter_info = [...result]
//           }

//           $("#example").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
//             return a[0] - b[0];
//           })).draw();
//           // return
//         });

//         $("#example_wrapper").on('click', '.edit-btn', function(event){
//           var click_row = $(event.target).closest('tr').index();
//           var ward = district = result = longitude = latitude = imageData = null
          
//           // console.log(filter_info[click_row][0])
//           loc_type?.forEach(function(type){
//             $('#id_loc_type').append(`<option value=${type.id_loc_type}>${type.loc_type}</option>`);
//           })
    
//           ads_type?.forEach(function(type){
//             $('#id_ads_type').append(`<option value=${type.id_ads_type}>${type.ads_type}</option>`);
//           })

//           var map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [filter_info[click_row][9], filter_info[click_row][10]],
//             zoom: 17
//           });

//           var geocoder = new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken,
//             mapboxgl: mapboxgl,
//           });

//           let canvas = $('.mapboxgl-canvas')
//           canvas.width('100%');

//           $('#search').append(geocoder.onAdd(map));

//           $(".header-map i").on('click', geocoding);
//           $('#search').on('keydown', function(event) {
//             if (event.keyCode === 13) { // Kiểm tra phím Enter
//               geocoding();
//             }
//           });

//           function geocoding(){
//             var address = $('#search').val()

//             $.ajax({
//               url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json',
//               type: 'GET',
//               data: {
//                 access_token: mapboxgl.accessToken
//               },
//               success: function(response) {
//                 // Xử lý kết quả geocoding
//                 var features = response.features;
//                 if (features.length > 0) {
//                   var firstFeature = features[0];
//                   var coordinates = firstFeature.center;

//                   result = firstFeature.place_name;
//                   // ward = firstFeature.context[0];
//                   // district = firstFeature.context[1];
//                   longitude = coordinates[0];
//                   latitude= coordinates[1]
//                   // console.log(firstFeature)

//                   // Cập nhật tọa độ và zoom của map
//                   map.flyTo({
//                     center: coordinates,
//                     zoom: 17
//                   });

//                  new mapboxgl.Marker( {color: '#0B7B31' })
//                   .setLngLat(coordinates) // Specify the marker longitude and latitude
//                   .addTo(map);

//                   $("#address").val(`${result} [${coordinates[0]}, ${coordinates[1]}]` )
                  
//                 } else {
//                   alert('No results found');
//                 }
//               },
//               error: function() {
//                 alert('Error occurred during geocoding');
//               }
//             });
//           }

//           map.on('click', function(e) {
//             let lngLat = e.lngLat;
//             longitude = lngLat.lng;
//             latitude = lngLat.lat;
          
//             $.ajax({
//               url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
//               method: 'GET',
//               data: {
//                 access_token: mapboxgl.accessToken
//               },
//               success: function(response) {
//                 // Lấy địa chỉ từ kết quả Geocoding
//                 result = response.features[0].place_name;
          
//                 // Gán địa chỉ vào phần tử HTML
//                 $("#address").val(`${result} [${longitude}, ${latitude}]`);
//               },
//               error: function(error) {
//                 console.log(error);
//               }
//             });
//           });

//           // Lắng nghe sự kiện mousedown trên bản đồ
//           map.on('mousedown', function() {
//             // Đặt kiểu con trỏ thành 'grab' khi nhấn chuột
//             map.getCanvas().style.cursor = 'grab';
//           });

//           // Lắng nghe sự kiện mouseup trên bản đồ
//           map.on('mouseup', function() {
//             // Đặt kiểu con trỏ thành 'pointer' khi nhả chuột
//             map.getCanvas().style.cursor = 'pointer';
//           });
          
//           $('#photo').on('change', function(e) {
//             if (e.target.files[0])
//             if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
//               imageData = e.target.files[0]
//             }
//             else if (!e.target.files[0].type.startsWith('image/')){
//               alert('Avatar must be an image file (.jpg, .png, .jpeg)')
//             }
//             else if (!(e.target.files[0].size / 1024 <= 4)){
//               alert('Avatar must not exceed 4MB')
//             }
//           });

//           $('#edit-info .style3-button').off('click').on('click', function(e) {
//             $("#address").val("")
//             $('#id_loc_type').val("")
//             $('#id_ads_type').val("")
//             $('#is_zoning').val("")
//             $('#reason').val("")
//             $('#photo').val("")
//           })

//           $('#edit-info .style1-button').off('click').on('click', function(e) {
//             e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            
//             // console.log(longitude, latitude, filter_info[click_row][0]);
//             let reason = $('#reason').val();
//             if (!reason){
//               alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
//             }
//             else{
//               var formData = new FormData();
//               formData.append('id_ads_location',filter_info[click_row][0]);
//               formData.append('latitude', latitude);
//               formData.append('longitude', longitude);
//               formData.append('address', null);
//               formData.append('id_ward', null);
//               formData.append('id_district', null);
//               formData.append('id_loc_type', $('#id_loc_type').val());
//               formData.append('file', imageData);
//               formData.append('id_ads_type', $('#id_ads_type').val());
//               formData.append('is_zoning', $('#is_zoning').val());
//               formData.append('req_time', validateDate(new Date()));
//               formData.append('reason', $('#reason').val());
//               formData.append('office', role);
              
//               $("form").get(0).reset();
//               $("#edit-info").modal("hide")
    
//               $.ajax({
//                 url: `http://localhost:8080/api/quan/updateAdsLoc/${email}`,
//                 type: 'POST',
//                 data: formData,
//                 processData: false,
//                 contentType: false,
//                 success: function(response) {
//                   // Handle the successful response here
//                   console.log(response);
//                 },
//                 error: function(xhr, status, error) {
//                   // Handle the error here
//                   console.error(error);
//                 }
//               });
//             }
//           })
//         })

//       }).fail(function(error) {
//         console.log(error);
//       })
//     }

//     const manageButton = $('#manage');
//     const manageMenu = $('#manage .manage-menu');

//     manageButton.hover(
//       function () {
//         $(this).addClass('li-hover');
//         $('#manage .nav-link').addClass('nav-link-hover');
//         manageMenu.show();
//         $('.black-bg').show()
//       },
//       function () {
//         $(this).removeClass('li-hover');
//         $('#manage .nav-link').removeClass('nav-link-hover');
//         manageMenu.hide();
//         $('.black-bg').hide()
//       }
//     );
// });

