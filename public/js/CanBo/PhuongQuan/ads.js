//  lỗi hiển thị map
// standard địa chỉ

$(document).ready(function () {
    // 1 = Quan, 2 = Phuong
    const role = 1; 
    const email = "nnlien21@clc.fitus.edu.vn"
    const id_district = 1;
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
    
    var board_type
    var info, filter_info, wards

    $.get(`http://localhost:8080/api/quan/getBoardType`, function(data) {
      board_type = data.content
      }).fail(function(error) {
        console.log(error);
      });

    if (role === 2) {
        $(".ward-table").hide();

    }
    else{
      $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
        wards = data.content.map(ward => ward.ward);
        console.log("!");
        renderWard(wards);
      }).fail(function(error) {
        console.log(error);
      });

      $.get(`http://localhost:8080/api/quan/getAds/${id_district}`, function(data) {
        console.log("~");
        info = data.content.map(function(data){
          let {id_ads, id_ads_location, address, ward, loc_type, board_type, photo,
            width, height, quantity, expired_date, longitude, latitude } = data
          id_ads_location = parseInt(id_ads_location)
          id_ads = parseInt(id_ads)
          return [id_ads, board_type, `${address}, phường ${ward}`, loc_type, `${width}m x ${height}m`, quantity, 
          validateSQLDate(expired_date), photo, id_ads_location, ward, longitude, latitude]
        })
        filter_info = [...info]
        console.log(info);
        $("#example.ads-table").DataTable({
          ordering: false,
          lengthChange: false,
          searching: false,
          info: false,
          pageLength: 5,
          columnDefs: [
            {
                targets: 7, // Last column (Action column)
                data: null,
                width: "2rem",
                className: 'btn-cell',
                defaultContent: '<button data-target="#view-image" data-toggle="modal" class="btn view-btn"><i class="fa-solid fa-eye"></i></button>'
            },
            {
              targets: 8, // Last column (Action column)
              data: null,
              width: "2rem",
              className: 'btn-cell',
              defaultContent: '<button data-target="#edit-info" data-toggle="modal" class="btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>'
            }
          ],
          data: info
          });
      }).fail(function(error) {
        console.log(error);
      }).always(function() {

        $('.ward-table input').click(function() {
          var id_ward = $(this).attr('id');
          id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
    
          if ($(this).is(':checked')) {
            for (var i = 0; i < info.length; i++){
              if (info[i][9] == wards[id_ward])
              filter_info.push(info[i]);
            }
          } else {
            var result = []
            for (var i = 0; i < filter_info.length; i++){
              if (filter_info[i][9] != wards[id_ward])
                result.push(filter_info[i]);
            }
            filter_info = [...result]
          }
          $("#example.ads-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
          return
        });

        $('.view-btn').on('click', function(){
          let row = $(this).closest('tr').index();
          console.log(row);
          $('#view-image .photo').attr('src', `../../../../public/image/${info[row][7]}`);
        })

        $('.edit-btn').on('click', function(e){
          var click_row = $(this).closest('tr').index();
          // var ward, district, result, longitude, latitude

          board_type?.forEach(function(type){
            $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
          })

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [info[click_row][10], info[click_row][11]],
            zoom: 17
          });

          var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
          });

          // $('#search').append(geocoder.onAdd(map));

          // $(".header-map i").on('click', geocoding);
          // $('#search').on('keydown', function(event) {
          //   if (event.keyCode === 13) { // Kiểm tra phím Enter
          //     geocoding();
          //   }
          // });

      //     function geocoding(){
      //       var address = $('#search').val()

      //       $.ajax({
      //         url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json',
      //         type: 'GET',
      //         data: {
      //           access_token: mapboxgl.accessToken
      //         },
      //         success: function(response) {
      //           // Xử lý kết quả geocoding
      //           var features = response.features;
      //           if (features.length > 0) {
      //             var firstFeature = features[0];
      //             var coordinates = firstFeature.center;

      //             result = firstFeature.place_name;
      //             // ward = firstFeature.context[0];
      //             // district = firstFeature.context[1];
      //             longitude = coordinates[0];
      //             latitude= coordinates[1]


      //             // Cập nhật tọa độ và zoom của map
      //             map.flyTo({
      //               center: coordinates,
      //               zoom: 17
      //             });
      //             $("#address").val(`${result} [${coordinates[0]}, ${coordinates[1]}]` )
      //             console.log(firstFeature)
      //           } else {
      //             alert('No results found');
      //           }
      //         },
      //         error: function() {
      //           alert('Error occurred during geocoding');
      //         }
      //       });
      //     }
          
          $('#edit-info .style1-button').off('click').on('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            
      //       // console.log(click_row);
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
              var formData = new FormData();
              formData.append('id_ads', click_row + 1);
              formData.append('id_ads_location', null);
              formData.append('id_board_type', $('#id_board_type').val());
              formData.append('quantity', $('#quantity').val());
              formData.append('width', $('#width').val());
              formData.append('height', $('#height').val());
              formData.append('expired_date', $('#expired_date').val() );
              formData.append('req_time', validateDate(new Date()));
              formData.append('reason', $('#reason').val());
              formData.append('office', role);
    
              console.log(formData);
              $("form").get(0).reset();
              $("#edit-info").modal("hide")
    
              $.ajax({
                url: `http://localhost:8080/api/quan/updateAdsLoc/${email}`,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                  // Handle the successful response here
                  console.log(response);
                },
                error: function(xhr, status, error) {
                  // Handle the error here
                  console.error(error);
                }
              });
            }
          })
        })

      }); 
    }

    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');

    manageButton.hover(
      function () {
        $(this).addClass('li-hover');
        $('#manage .nav-link').addClass('nav-link-hover');
        manageMenu.show();
      },
      function () {
        $(this).removeClass('li-hover');
        $('#manage .nav-link').removeClass('nav-link-hover');
        manageMenu.hide();
      }
    );
  });