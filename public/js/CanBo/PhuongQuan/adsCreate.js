// hard code
$(document).ready(function () {
  const role = 1; 
  const email = "quan@gmail.com"
  const id_district = 1;
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
  const storedAdsCreate = localStorage.getItem('ads_create');
  let ads_create = storedAdsCreate ? JSON.parse(storedAdsCreate) : [];
  console.log("ads_create:", ads_create );
  var wards, filter_info

  wards = Ward.content.map(ward => ward.ward);
  // console.log("!");
  renderWard(wards);

  info = ads_create.map(function(item){
    let statusText = item[16] ? "Đã xét duyệt" : "Chưa xét duyệt"

    return [item[0], item[17], `${item[13]}, phường ${item[18]}`, item[8], item[10],
    formatSQLDate_dmy(item[14]), formatSQLDate_dmy(item[15]), statusText, 
    '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
    item[5], item[6], item[7], item[9], item[11], item[12], item[18]]
  })

  let urlParams = new URLSearchParams(window.location.search);
  let idString = urlParams.get('id');
  let idArray = idString?.split(',').map(Number);
  let wardArray = idArray?.map(function(item){
    return wards[item]
  })
  console.log(idArray)

  filter_info = [...info].sort((a, b) => a[0] - b[0]);

  if (wardArray?.length > 0){
    let result = []
    for (let i = 0; i < filter_info.length; i++){
      if (!wardArray.includes(filter_info[i][15]))
        result.push(filter_info[i]);
    }
    filter_info = [...result]

    for (let i = 0; i < idArray.length; i++){
      $(`#ward-${idArray[i]}`).prop('checked', false)
    }
  }

  console.log(filter_info);

      $(".ads-create-table").DataTable({
        pageLength: 6,
        data: filter_info
        });

      $("#example_wrapper").on('click', '.ads-create-table .view-btn', function(){
        let row = $(this).closest('tr').index();
        let page = $("#example_wrapper .page-item.active a").text()
        let id_create = filter_info[row + 6 * (parseInt(page) - 1)][0]
        window.location.href = '/detailAdsCreate?id_create=' + id_create;
        console.log(row);
      })

      $('.ward-table input').click(function() {
        let id_ward = $(this).attr('id');
        id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
        console.log(id_ward)

        if ($(this).is(':checked')) {
          for (var i = 0; i < info.length; i++){
            if (info[i][15] == wards[id_ward])
            filter_info.push(info[i]);
          }
        } else {
          console.log("hihi")
          let result = []
          for (var i = 0; i < filter_info.length; i++){
            if (filter_info[i][15] != wards[id_ward])
              result.push(filter_info[i]);
          }
          filter_info = [...result]
        }

        $(".ads-create-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
          return a[0] - b[0];
        })).draw()

        var checkboxes = $('.ward-table input[type="checkbox"]');
        var checkboxStates = []; 
        checkboxes.each(function() {
          if (!this.checked){
            let id = parseInt(this.id.substring(this.id.indexOf("-") + 1))
            checkboxStates.push(id);
          }
        });

        let newURL = window.location.href.split('?')[0]; 
        if (checkboxStates.length > 0){
          newURL += '?id=' + encodeURIComponent(checkboxStates.join(","));
          history.replaceState(null, null, newURL);
        } else{
          history.replaceState(null, null, newURL);
        }

      })
  // }

  // render form
    $("form").get(0).reset();
    var board_type = BoardType.content, imageData = result = id_adsloc = null

    board_type?.forEach(function(type){
      $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
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
      console.log("a");

      // get ads location
        var select_adsloc = [], index = null
        for (let i = 0; i < QuanAdsLocation.content.length; i++) {
          let {id_ads_location, address, ward, is_zoning, longitude, latitude} = QuanAdsLocation.content[i]
          if (is_zoning == 1) 
            select_adsloc.push( {id_ads_location, address, ward, photo, longitude, latitude})
        }

        console.log(select_adsloc);

        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [select_adsloc[0].longitude, select_adsloc[0].latitude],
          zoom: 17
        });

        let canvas = $('.mapboxgl-canvas')
        canvas.width('100%');
        canvas.height('100%');

        select_adsloc.forEach(function (item, index) {
          var marker = new mapboxgl.Marker({color: '#0B7B31' })
          .setLngLat([item.longitude, item.latitude]) 
          .addTo(map)
          .getElement();

          marker.id =`marker-${index}`;
        });

        // click marker 
        $(document).on('click', '.mapboxgl-marker', function() {
          let markerId = $(this).attr('id');
          index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
          // console.log('Marker clicked:', index);
          id_adsloc = select_adsloc[index].id_ads_location
          result = select_adsloc[index].address + ', phường ' + select_adsloc[index].ward + ', quận ' + id_district;
          $(".id_ads_location").val(`${result} [${select_adsloc[index].longitude}, ${select_adsloc[index].latitude}]` )
        });

        // click confirm button
        $('#choose-adsloc .style1-button').off('click').on('click', function(e) {
          e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
          $("#id_ads_location").val(`${result} [${select_adsloc[index].longitude}, ${select_adsloc[index].latitude}]` )
        })
    })

    // click "tạo cấp phép"
    $('.form-ads-create .button-group .style1-button').off('click').on('click', function(e) {
      e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
      // console.log($('#quantity').val() )
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
        var selected_ward = null;
        for (let i = 0; i < QuanAdsLocation.content.length; i++) {
          // console.log(QuanAdsLocation.content[i].id_ads_location)
          if (QuanAdsLocation.content[i].id_ads_location == id_adsloc){
            selected_ward = QuanAdsLocation.content[i].ward;
            break;
          }
        }
        // console.log(selected_ward)
        let formData = [25 ,email, role, id_adsloc, parseInt($('#id_board_type').val()),
        parseFloat($('#width').val()), parseFloat($('#height').val()), parseInt($('#quantity').val()), 
        $('#content').val(), "", $('#company').val(), $('#email').val(), 
        $('#phone').val(), $('#address').val(), $('#start_date').val(), 
        $('#end_date').val(), 0, board_type[$('#id_board_type').val() - 1].board_type,
        selected_ward]

        let updateInfo = [...ads_create, formData]
        localStorage.setItem('ads_create', JSON.stringify(updateInfo));
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

// api
// $(document).ready(function () {
//     // 1 = Quan, 2 = Phuong
//     const role = 1; 
//     const email = "nnlien21@clc.fitus.edu.vn"
//     const id_district = 1;
//     mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    
//     var info, wards, filter_info

//     if (role === 2) {
//         $(".ward-table").hide();

//     }
//     else{
//       // render ward table
//       $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
//         wards = data.content.map(ward => ward.ward);
//         console.log("!");
//         renderWard(wards);
//       }).fail(function(error) {
//         console.log(error);
//       })

//       // get ads create table
//       $.get(`http://localhost:8080/api/quan/getAdsCreate/${id_district}`, function(data) {
//         console.log("~");
//         info = data.content.map(function(data){
//           let {id_create, board_type, address, content, company,
//             start_date, end_date, status,
//             width, height, quantity, photo, email, phone, ward } = data
//           let statusText = status ? "Đã xét duyệt" : "Chưa xét duyệt"

//           return [id_create, board_type, `${address}, phường ${ward}`, content, company,
//           validateSQLDate(start_date), validateSQLDate(end_date), statusText, 
//           '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
//           width, height, quantity, photo, email, phone, ward]
//         })

//         filter_info = [...info].sort((a, b) => a[0] - b[0]);
//         // console.log(info);

//         $(".ads-create-table").DataTable({
//           pageLength: 6,
//           data: filter_info
//           });

//         $("#example_wrapper").on('click', '.ads-create-table .view-btn', function(){
//           let row = $(this).closest('tr').index();
//           let id_create = filter_info[row][0]
//           window.location.href = '/detailAdsCreate?id_create=' + id_create;
//           console.log(row);
//         })

//         $('.ward-table input').click(function() {
//           let id_ward = $(this).attr('id');
//           id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
//           console.log(id_ward)

//           if ($(this).is(':checked')) {
//             for (var i = 0; i < info.length; i++){
//               if (info[i][15] == wards[id_ward])
//               filter_info.push(info[i]);
//             }
//           } else {
//             console.log("hihi")
//             let result = []
//             for (var i = 0; i < filter_info.length; i++){
//               if (filter_info[i][15] != wards[id_ward])
//                 result.push(filter_info[i]);
//             }
//             filter_info = [...result]
//           }

//           $(".ads-create-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
//             return a[0] - b[0];
//           })).draw()

//         })
//       }).fail(function(error) {
//         console.log(error);
//       })
//     }

//     // render form
//     $.get(`http://localhost:8080/api/quan/getBoardType`, function(data) {
//       var board_type = data.content, imageData = result = id_adsloc = null

//       board_type?.forEach(function(type){
//         $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
//       })

//       $('#photo').on('change', function(e) {
//         if (e.target.files[0])
//         if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
//           imageData = e.target.files[0]
//         }
//         else if (!e.target.files[0].type.startsWith('image/')){
//           alert('Avatar must be an image file (.jpg, .png, .jpeg)')
//         }
//         else if (!(e.target.files[0].size / 1024 <= 4)){
//           alert('Avatar must not exceed 4MB')
//         }
//       });

//       // reinitialize the form
//       $('.form-ads-create.style3-button').off('click').on('click', function(e) {
//         $("#id_ads_location").val("")
//         $('#id_board_type').val("")
//         $('#content').val("")
//         $('#width').val("")
//         $('#height').val("")
//         $('#photo').val("")
//         $('#quantity').val("")
//         $('#reason').val("")
//         $('#company').val("")
//         $('#address').val("")
//         $('#email').val("")
//         $('#phone').val("")
//         $('#start_date').val("")
//         $('#end_date').val("")
//       })  

//       // click "Chọn điểm đặt"
//       $('.form-ads-create .input-group button').on('click', function(){
//         console.log("a");

//         // get ads location
//         $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
//           var info = [], index = null
//           for (let i = 0; i < data.content.length; i++) {
//             let {id_ads_location, address, ward, is_zoning, longitude, latitude} = data.content[i]
//             if (is_zoning == 1) 
//               info.push( {id_ads_location, address, ward, photo, longitude, latitude})
//           }

//           console.log(info);

//           var map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [info[0].longitude, info[0].latitude],
//             zoom: 17
//           });

//           let canvas = $('.mapboxgl-canvas')
//           canvas.width('100%');
//           canvas.height('100%');

//           info.forEach(function (item, index) {
//             var marker = new mapboxgl.Marker({color: '#0B7B31' })
//             .setLngLat([item.longitude, item.latitude]) 
//             .addTo(map)
//             .getElement();

//             marker.id =`marker-${index}`;
//           });

//           // click marker 
//           $(document).on('click', '.mapboxgl-marker', function() {
//             let markerId = $(this).attr('id');
//             index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
//             // console.log('Marker clicked:', index);
//             id_adsloc = info[index].id_ads_location
//             result = info[index].address + ', phường ' + info[index].ward + ', quận ' + id_district;
//             $(".id_ads_location").val(`${result} [${info[index].longitude}, ${info[index].latitude}]` )
//           });

//           // click confirm button
//           $('#choose-adsloc .style1-button').off('click').on('click', function(e) {
//             e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
//             $("#id_ads_location").val(`${result} [${info[index].longitude}, ${info[index].latitude}]` )
//           })

//       }).fail(function(error) {
//         console.log(error);});

//       })

//       // click "tạo cấp phép"
//       $('.form-ads-create .button-group .style1-button').off('click').on('click', function(e) {
//         e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
//         // console.log($('#quantity').val() )
//         if ($('#id_board_type').val() === "(Trống)") {
//           alert('Vui lòng chọn loại bảng quảng cáo.');
//         } else if (id_adsloc === null) {
//           alert('Vui lòng chọn điểm đặt quảng cáo.');
//         } else if ($('#width').val() === "") {
//           alert('Vui lòng nhập chiều dài.');
//         } else if ($('#height').val() === "") {
//           alert('Vui lòng nhập chiều rộng.');
//         } else if ($('#quantity').val() === "") {
//           alert('Vui lòng nhập số lượng.');
//         } else if (imageData == null) {
//           alert('Vui lòng tải hình ảnh minh họa.');
//         } else if ($('#content').val() === "") {
//           alert('Vui lòng nhập nội dung.');
//         } else if ($('#company').val() === "") {
//           alert('Vui lòng nhập tên công ty.');
//         } else if ($('#address').val() === "") {
//           alert('Vui lòng nhập địa chỉ.');
//         } else if ($('#email').val() === "") {
//           alert('Vui lòng nhập địa chỉ email.');
//         } else if ($('#phone').val() === "") {
//           alert('Vui lòng nhập số điện thoại.');
//         } else if ($('#start_date').val() === "") {
//           alert('Vui lòng nhập ngày bắt đầu.');
//         } else if ($('#end_date').val() === "") {
//           alert('Vui lòng nhập ngày kết thúc.');
//         } else if ($('#start_date').val() > $('#end_date').val()) {
//           alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
//         }else{
//           var formData = new FormData();
//           formData.append('id_ads_location', id_adsloc);
//           formData.append('id_board_type', $('#id_board_type').val());
//           formData.append('quantity', $('#quantity').val());
//           formData.append('width', $('#width').val());
//           formData.append('height', $('#height').val());
//           formData.append('start_date', $('#start_date').val() );
//           formData.append('end_date', $('#end_date').val() );
//           formData.append('company', $('#company').val());
//           formData.append('address', $('#address').val());
//           formData.append('email', $('#email').val() );
//           formData.append('phone', $('#phone').val() );          
//           formData.append('content', $('#content').val());
//           formData.append('officer', email);
//           formData.append('office', role);
//           formData.append('file', imageData);

//           // console.log(formData);
//           $("form").get(0).reset();

//           $.ajax({
//             url: `http://localhost:8080/api/quan/adsCreate/${id_district}`,
//             type: 'POST',
//             data: formData,
//             processData: false,
//             contentType: false,
//             success: function(response) {
//               // Handle the successful response here
//               window.location.reload();
//               console.log(response);
//             },
//             error: function(xhr, status, error) {
//               // Handle the error here
//               console.error(error);
//             }
//           });
//         }
//       })
//   }).fail(function(error) {
//     console.log(error);
//   });

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
//   });