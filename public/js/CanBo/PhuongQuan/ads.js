//hard code
$(document).ready(function () {
  const role = 1; 
  const email = "nnlien21@clc.fitus.edu.vn"
  const id_district = 1;
  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
  var board_type = BoardType.content;
  var info, filter_info, wards

  if (role === 2) {
      $(".ward-table").hide();

  }
  else{
      wards = Ward.content.map(ward => ward.ward);
      console.log("!");
      renderWard(wards);

      info = QuanAds.content.map(function(data){
        let {id_ads, id_ads_location, address, ward, loc_type, board_type, photo,
          width, height, quantity, expired_date, longitude, latitude } = data
        id_ads_location = parseInt(id_ads_location)
        id_ads = parseInt(id_ads)
        return [id_ads, board_type, `${address}, phường ${ward}`, loc_type, `${width}m x ${height}m`, quantity, 
        validateSQLDate(expired_date), 
        '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
        '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
        photo, id_ads_location, ward, longitude, latitude]
      })
      filter_info = [...info]
      // console.log(info);
      $("#example.ads-table").DataTable({
        data: filter_info
      });

      $('#example_wrapper').on('click', '.view-btn', function(){
        let row = $(this).closest('tr').index();
        console.log(row);
        let path  = "../../../public/image/image-placeholder.jpg"
        if (filter_info[row][9] != "")
          path  = `../../../../public/image/${filter_info[row][9]}`
        $('#view-image .photo').attr('src', path );
        return
      })

      $('.ward-table input').click(function() {
        var id_ward = $(this).attr('id');
        id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
  
        if ($(this).is(':checked')) {
          for (var i = 0; i < info.length; i++){
            if (info[i][11] == wards[id_ward])
            filter_info.push(info[i]);
          }
        } else {
          var result = []
          for (var i = 0; i < filter_info.length; i++){
            if (filter_info[i][11] != wards[id_ward])
              result.push(filter_info[i]);
          }
          filter_info = [...result]
        }
        $("#example.ads-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
          return a[0] - b[0];
        })).draw();
        
      });

      $('#example_wrapper').on('click', '.edit-btn', function(e){
        var click_row = $(this).closest('tr').index();
        var result = id_adsloc = imageData = null

        board_type?.forEach(function(type){
          $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
        })

        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [info[click_row][12], info[click_row][13]],
          zoom: 17
        });

        let canvas = $('.mapboxgl-canvas')
        canvas.width('100%');

          adsloc = QuanAllAdsLoc.content

          adsloc.forEach(function (item, index) {
            var marker = new mapboxgl.Marker({color: '#0B7B31' })
            .setLngLat([item.longitude, item.latitude]) 
            .addTo(map)
            .getElement();

            marker.id =`marker-${index}`;
          });

          $(document).on('click', '.mapboxgl-marker', function() {
            let markerId = $(this).attr('id');
            index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
            // console.log('Marker clicked:', index);
            id_adsloc = adsloc[index].id_ads_location
            result = adsloc[index].address + ', phường ' + adsloc[index].ward + ', ' + adsloc[index].district;
            $("#address").val(`${result} [${adsloc[index].longitude}, ${adsloc[index].latitude}]` )
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
          e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
          
    //       // console.log(click_row);
          let reason = $('#reason').val();
          if (!reason){
            alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
          }
          else{
            var formData = new FormData();
            formData.append('id_ads', filter_info[click_row][0]);
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
  }

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
//   const role = 1; 
//   const email = "nnlien21@clc.fitus.edu.vn"
//   const id_district = 1;
//   mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
//   var board_type
//   var info, filter_info, wards

//   $.get(`http://localhost:8080/api/quan/getBoardType`, function(data) {
//     board_type = data.content
//     }).fail(function(error) {
//       console.log(error);
//     });

//   if (role === 2) {
//       $(".ward-table").hide();

//   }
//   else{
//     $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
//       wards = data.content.map(ward => ward.ward);
//       console.log("!");
//       renderWard(wards);
//     }).fail(function(error) {
//       console.log(error);
//     });

//     $.get(`http://localhost:8080/api/quan/getAds/${id_district}`, function(data) {
//       console.log("~");
//       info = data.content.map(function(data){
//         let {id_ads, id_ads_location, address, ward, loc_type, board_type, photo,
//           width, height, quantity, expired_date, longitude, latitude } = data
//         id_ads_location = parseInt(id_ads_location)
//         id_ads = parseInt(id_ads)
//         return [id_ads, board_type, `${address}, phường ${ward}`, loc_type, `${width}m x ${height}m`, quantity, 
//         validateSQLDate(expired_date), 
//         '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
//         '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
//         photo, id_ads_location, ward, longitude, latitude]
//       })
//       filter_info = [...info]
//       // console.log(info);
//       $("#example.ads-table").DataTable({
//         data: filter_info
//       });

//       $('#example_wrapper').on('click', '.view-btn', function(){
//         let row = $(this).closest('tr').index();
//         console.log(row);
//         let path  = "../../../public/image/image-placeholder.jpg"
          // if (filter_info[row][9] != "")
          //   path  = `../../../../public/image/${filter_info[row][9]}`
          // $('#view-image .photo').attr('src', path );
//         return
//       })

//       $('.ward-table input').click(function() {
//         var id_ward = $(this).attr('id');
//         id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
  
//         if ($(this).is(':checked')) {
//           for (var i = 0; i < info.length; i++){
//             if (info[i][11] == wards[id_ward])
//             filter_info.push(info[i]);
//           }
//         } else {
//           var result = []
//           for (var i = 0; i < filter_info.length; i++){
//             if (filter_info[i][11] != wards[id_ward])
//               result.push(filter_info[i]);
//           }
//           filter_info = [...result]
//         }
//         $("#example.ads-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
//           return a[0] - b[0];
//         })).draw();
        
//       });

//     }).fail(function(error) {
//       console.log(error);
//     }).always(function() {

      

      

//       $('#example_wrapper').on('click', '.edit-btn', function(e){
//         var click_row = $(this).closest('tr').index();
//         var result = id_adsloc = imageData = null

//         board_type?.forEach(function(type){
//           $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
//         })

//         var map = new mapboxgl.Map({
//           container: 'map',
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: [info[click_row][12], info[click_row][13]],
//           zoom: 17
//         });

//         let canvas = $('.mapboxgl-canvas')
//         canvas.width('100%');

//         $.get(`http://localhost:8080/api/quan/getAllAdsLoc`, function(data) {
//           adsloc = data.content

//           adsloc.forEach(function (item, index) {
//             var marker = new mapboxgl.Marker({color: '#0B7B31' })
//             .setLngLat([item.longitude, item.latitude]) 
//             .addTo(map)
//             .getElement();

//             marker.id =`marker-${index}`;
//           });

//           $(document).on('click', '.mapboxgl-marker', function() {
//             let markerId = $(this).attr('id');
//             index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
//             // console.log('Marker clicked:', index);
//             id_adsloc = adsloc[index].id_ads_location
//             result = adsloc[index].address + ', phường ' + adsloc[index].ward + ', ' + adsloc[index].district;
//             $("#address").val(`${result} [${adsloc[index].longitude}, ${adsloc[index].latitude}]` )
//           });

//         }).fail(function(error) {
//           console.log(error);
//         }); 
        
//         $('#photo').on('change', function(e) {
//           if (e.target.files[0])
//           if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
//             imageData = e.target.files[0]
//           }
//           else if (!e.target.files[0].type.startsWith('image/')){
//             alert('Avatar must be an image file (.jpg, .png, .jpeg)')
//           }
//           else if (!(e.target.files[0].size / 1024 <= 4)){
//             alert('Avatar must not exceed 4MB')
//           }
//         });

//         $('#edit-info .style3-button').off('click').on('click', function(e) {
//           $("#address").val("")
//           $('#id_board_type').val("")
//           $('#expired_date').val("")
//           $('#width').val("")
//           $('#height').val("")
//           $('#photo').val("")
//           $('#quantity').val("")
//           $('#reason').val("")
//         })  

//         $('#edit-info .style1-button').off('click').on('click', function(e) {
//           e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
          
//     //       // console.log(click_row);
//           let reason = $('#reason').val();
//           if (!reason){
//             alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
//           }
//           else{
//             var formData = new FormData();
//             formData.append('id_ads', filter_info[click_row][0]);
//             formData.append('id_ads_location', id_adsloc);
//             formData.append('id_board_type', $('#id_board_type').val());
//             formData.append('quantity', $('#quantity').val());
//             formData.append('width', $('#width').val());
//             formData.append('height', $('#height').val());
//             formData.append('expired_date', $('#expired_date').val() );
//             formData.append('req_time', validateDate(new Date()));
//             formData.append('reason', $('#reason').val());
//             formData.append('office', role);
//             formData.append('file', imageData);
  
//             // console.log(formData);
//             $("form").get(0).reset();
//             $("#edit-info").modal("hide")
  
//             $.ajax({
//               url: `http://localhost:8080/api/quan/updateAds/${email}`,
//               type: 'POST',
//               data: formData,
//               processData: false,
//               contentType: false,
//               success: function(response) {
//                 // Handle the successful response here
//                 console.log(response);
//               },
//               error: function(xhr, status, error) {
//                 // Handle the error here
//                 console.error(error);
//               }
//             });
//           }
//         })
//       })

//     }); 
//   }

//   const manageButton = $('#manage');
//   const manageMenu = $('#manage .manage-menu');

//   manageButton.hover(
//     function () {
//       $(this).addClass('li-hover');
//       $('#manage .nav-link').addClass('nav-link-hover');
//       manageMenu.show();
//       $('.black-bg').show()
//     },
//     function () {
//       $(this).removeClass('li-hover');
//       $('#manage .nav-link').removeClass('nav-link-hover');
//       manageMenu.hide();
//       $('.black-bg').hide()
//     }
//   );
// });