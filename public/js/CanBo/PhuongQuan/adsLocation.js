//  lỗi hiển thị map
// standard địa chỉ

$(document).ready(function () {
    // 1 = Quan, 2 = Phuong
    const role = 1; 
    const email = "nnlien21@clc.fitus.edu.vn"
    const id_district = 1;
    mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
    var loc_type, ads_type
    var info, filter_info, wards

    $.get(`http://localhost:8080/api/quan/getLocType`, function(data) {
        loc_type = data.content
        // console.log(loc_type);
      }).fail(function(error) {
        console.log(error);
      });

    $.get(`http://localhost:8080/api/quan/getAdsType`, function(data) {
        ads_type = data.content
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

      $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
        console.log("~");
        info = data.content.map(function(data){
          let {id_ads_location, address, ward, loc_type, ads_type, 
            photo, is_zoning, longitude, latitude} = data
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
          id_ads_location = parseInt(id_ads_location)
          return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, photo, longitude, latitude]
        })
        filter_info = [...info]
        $("#example").DataTable({
          columnDefs: [
            {
                targets: 6, // Last column (Action column)
                data: null,
                width: "2rem",
                className: 'btn-cell',
                defaultContent: '<button data-target="#view-image" data-toggle="modal" class="btn view-btn"><i class="fa-solid fa-eye"></i></button>'
            },
            {
              targets: 7, // Last column (Action column)
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
          return
        });

        $('.view-btn').on('click', function(){
          let row = $(this).closest('tr').index();
          console.log(row);
          $('#view-image .photo').attr('src', `../../../public/image/${info[row][6]}`);
        })

        $('.edit-btn').on('click', function(e){
          var click_row = $(this).closest('tr').index();
          var ward, district, result, longitude, latitude, imageData, photo

          // console.log(click_row);
          loc_type?.forEach(function(type){
            $('#id_loc_type').append(`<option value=${type.id_loc_type}>${type.loc_type}</option>`);
          })
    
          ads_type?.forEach(function(type){
            $('#id_ads_type').append(`<option value=${type.id_ads_type}>${type.ads_type}</option>`);
          })

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [info[click_row][7], info[click_row][8]],
            zoom: 17
          });

          var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
          });

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


                  // Cập nhật tọa độ và zoom của map
                  map.flyTo({
                    center: coordinates,
                    zoom: 17
                  });
                  $("#address").val(`${result} [${coordinates[0]}, ${coordinates[1]}]` )
                  console.log(firstFeature)
                } else {
                  alert('No results found');
                }
              },
              error: function() {
                alert('Error occurred during geocoding');
              }
            });
          }
          
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

          $('#edit-info .style1-button').off('click').on('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            
            // console.log(click_row);
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
              var formData = new FormData();
              formData.append('id_ads_location', click_row + 1);
              formData.append('latitude', null);
              formData.append('longitude', null);
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
    
              // console.log($('#photo').val());
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