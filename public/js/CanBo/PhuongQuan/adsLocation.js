$(document).ready(function () {
  console.log(role);

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';

  var loc_type, ads_type
  var info, filter_info, wards

  $.get(`/api/basic/getLocType`, function(data) {
    loc_type = data.content
  }).fail(function(error) {
    console.log(error);
  });

  $.get(`/api/basic/getAdsType`, function(data) {
    ads_type = data.content
  }).fail(function(error) {
    console.log(error);
  });
  
  if (role == 2){
    $.ajax({
      url: `/api/quan/getAdsLocationWard/${id_ward}`,
      type: "GET",
      beforeSend: function(){
        $("#loading-bg").show()
      },
      success: function(data) {
        $("#loading-bg").hide()
        info = data.content.map(function(data){
          let {id_ads_location, address, ward, loc_type, ads_type, 
            photo, is_zoning, longitude, latitude, district} = data
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
          id_ads_location = parseInt(id_ads_location)
          return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
            '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
            '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
            photo, longitude, latitude, is_zoning, district]
        })

        filter_info = [...info].sort(function(a, b) {
          return a[0] - b[0];
        })
        console.log(filter_info)

        $("#example").DataTable({
          data: filter_info
        });

        $('#example').DataTable().column(2).visible(false);

        $('#example_wrapper').on('click', ".view-btn", function(){
          let row = $(this).closest('tr').index();
          console.log(filter_info[row][8]);
          let path  = "../../../public/image/image-placeholder.jpg"
          if (filter_info[row][8] != "")
            path  = `../../../../public/image/${filter_info[row][8]}`
          $('#view-image .photo').attr('src', path );
          return
        })
      
        $("#example_wrapper").on('click', '.edit-btn', function(event){
          var click_row = $(event.target).closest('tr').index();
          var imageData = null
          var address = filter_info[click_row][1], ward = filter_info[click_row][2],  district = filter_info[click_row][12] 
          var longitude = filter_info[click_row][9], latitude = filter_info[click_row][10]


          $("#address").val(`${address}, phường ${ward}, ${district} [${longitude},${latitude}]`)
          if (filter_info[click_row][11])
            $("#yes").prop('selected', true);
          else
            $("#no").prop('selected', true);

          loc_type?.forEach(function(type){
            if (filter_info[click_row][3] == type.loc_type) 
              $('#id_loc_type').append(`<option selected value=${type.id_loc_type}>${type.loc_type}</option>`);
            else 
              $('#id_loc_type').append(`<option value=${type.id_loc_type}>${type.loc_type}</option>`);
          })
      
          ads_type?.forEach(function(type){
            if (filter_info[click_row][4] == type.ads_type) 
              $('#id_ads_type').append(`<option selected value=${type.id_ads_type}>${type.ads_type}</option>`);
            else
              $('#id_ads_type').append(`<option value=${type.id_ads_type}>${type.ads_type}</option>`);
          })
      
          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 17,
            language: 'vi'
          });
          // console.log(longitude, latitude);
          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);
      
          var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          });
          geocoder.setLanguage('vi');
      
          let canvas = $('.mapboxgl-canvas')
          canvas.width('100%');
      
          let marker = new mapboxgl.Marker();

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
              url: `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc`,
              type: 'GET',
              data: {
                access_token: mapboxgl.accessToken,
                language: "vi"
              },
              success: function(response) {
                
                const features = response.items[0];
                longitude = features.position.lng;
                latitude = features.position.lat;

                map.flyTo({
                  center: [longitude, latitude],
                  zoom: 17
                });
    
                marker.remove()
                marker = new mapboxgl.Marker( {color: '#0B7B31' })
                .setLngLat([longitude, latitude]) 
                .addTo(map);

                ward = features?.address?.district.substring(7)
                district = features?.address?.city
                address = (features?.address?.houseNumber && features?.address?.street)
                ? features?.address?.houseNumber + " " +  features?.address?.street
                : features?.address?.label.substring(0, features?.address?.label.indexOf(", Phường") )                 
              
                $("#address").val(`${address}, phường ${ward}, ${district} [${longitude}, ${latitude}]` )
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
            marker.remove()
            marker = new mapboxgl.Marker({
              color: '#0B7B31'
            }).setLngLat(lngLat).addTo(map);
            map.flyTo({
              center: lngLat,
              zoom: 17
            })

            $.ajax({
              url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc&lang=vi`,
              method: 'GET',
              success: function(response) {
                // console.log(response)
                const feature = response.items[0].address
                ward = feature?.district.substring(7)
                district = feature?.city
                address = (feature?.houseNumber && feature?.street)
                ? feature?.houseNumber + " " +  feature?.street
                : feature?.label.substring(0, feature?.label.indexOf(", Phường") )
                
                $("#address").val(`${address}, phường ${ward}, ${district} [${longitude}, ${latitude}]`);
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
              alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)){
              alert('Hình ảnh minh họa không được vượt quá 4MB')
            }
          });
      
          $('#edit-info .style3-button').off('click').on('click', function(e) {
            $("#address").val("")
            $('#id_loc_type').val("")
            $('#id_ads_type').val("")
            $('#reason').val("")
            $('#photo').val("")
            $("#yes").prop('selected', false);
            $("#no").prop('selected', false);
          })
      
          $('#edit-info .style1-button').off('click').on('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            
            // console.log(longitude, latitude, filter_info[click_row][0]);
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
              $("#loading-bg").show();
              var formData = new FormData();
              formData.append('id_ads_location',filter_info[click_row][0]);
              formData.append('latitude', latitude);
              formData.append('longitude', longitude);
              formData.append('address', address);
              formData.append('ward', ward);
              formData.append('district', district);
              formData.append('id_loc_type', $('#id_loc_type').val());
              formData.append('file', imageData);
              formData.append('id_ads_type', $('#id_ads_type').val());
              formData.append('is_zoning', $('#is_zoning').val());
              formData.append('req_time', validateDate(new Date()));
              formData.append('reason', $('#reason').val());
              formData.append('office', role);
              
              $("form").get(0).reset();
              $("#edit-info").modal("hide")

              $.ajax({
                url: `/api/quan/updateAdsLoc/${email}`,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                  $("#loading-bg").hide();
                  alert("Yêu cầu chỉnh sửa thành công")
                  console.log(response);
                },
                error: function(xhr, status, error) {
                  $("#loading-bg").hide();
                  alert("Yêu cầu chỉnh sửa thất bại")
                  console.error(error);
                }
              });
      
            }
          })
        })

      }
    })





    
  } else if (role == 1){

    $.get(`/api/quan/getWard/${id_district}`, function(data) {
      wards = data.content.map(ward => ward.ward);
      display_wards = data.content.map(ward => (!isNaN(parseInt(ward.ward))) ? `phường ${ward.ward}` : ward.ward);
      console.log("!");
      renderWard(display_wards);
    }).fail(function(error) {
      console.log(error);
    });

    $.ajax({
      url: `/api/quan/getAdsLocation/${id_district}`,
      type: "GET",
      beforeSend: function(){
        $("#loading-bg").show()
      },
      success: function(data) {
        $("#loading-bg").hide()
        info = data.content.map(function(data){
          let {id_ads_location, address, ward, loc_type, ads_type, 
            photo, is_zoning, longitude, latitude, district} = data
          let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
          id_ads_location = parseInt(id_ads_location)
          return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, 
            '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
            '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
            photo, longitude, latitude, is_zoning, district]
        })

        filter_info = [...info].sort(function(a, b) {
          return a[0] - b[0];
        })
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
      
        $('.ward-table input').on("click", function() {
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
          var imageData = null
          var address = filter_info[click_row][1], ward = filter_info[click_row][2],  district = filter_info[click_row][12] 
          var longitude = filter_info[click_row][9], latitude = filter_info[click_row][10]

          // console.log(filter_info[click_row])

          $("#address").val(`${address}, phường ${ward}, ${district} [${longitude},${latitude}]`)

          if (filter_info[click_row][11])
            $("#yes").prop('selected', true);
          else
            $("#no").prop('selected', true);

          loc_type?.forEach(function(type){
            if (filter_info[click_row][3] == type.loc_type) 
              $('#id_loc_type').append(`<option selected value=${type.id_loc_type}>${type.loc_type}</option>`);
            else 
              $('#id_loc_type').append(`<option value=${type.id_loc_type}>${type.loc_type}</option>`);
          })
      
          ads_type?.forEach(function(type){
            if (filter_info[click_row][4] == type.ads_type) 
              $('#id_ads_type').append(`<option selected value=${type.id_ads_type}>${type.ads_type}</option>`);
            else
              $('#id_ads_type').append(`<option value=${type.id_ads_type}>${type.ads_type}</option>`);
          })
      
          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 17,
            language: 'vi'
          });
          // console.log(longitude, latitude);
          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);
      
          var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          });
          geocoder.setLanguage('vi');
      
          let canvas = $('.mapboxgl-canvas')
          canvas.width('100%');
      
          let marker = new mapboxgl.Marker();

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
              url: `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc`,
              type: 'GET',
              data: {
                access_token: mapboxgl.accessToken,
                language: "vi"
              },
              success: function(response) {
                
                const features = response.items[0];
                longitude = features.position.lng;
                latitude = features.position.lat;

                map.flyTo({
                  center: [longitude, latitude],
                  zoom: 17
                });
    
                marker.remove()
                marker = new mapboxgl.Marker( {color: '#0B7B31' })
                .setLngLat([longitude, latitude]) 
                .addTo(map);

                ward = features?.address?.district.substring(7)
                district = features?.address?.city
                address = (features?.address?.houseNumber && features?.address?.street)
                ? features?.address?.houseNumber + " " +  features?.address?.street
                : features?.address?.label.substring(0, features?.address?.label.indexOf(", Phường") )                 
              
                $("#address").val(`${address}, phường ${ward}, ${district} [${longitude}, ${latitude}]` )
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
            marker.remove()
            marker = new mapboxgl.Marker({
              color: '#0B7B31'
            }).setLngLat(lngLat).addTo(map);
            map.flyTo({
              center: lngLat,
              zoom: 17
            })

            $.ajax({
              url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&apiKey=X0xvqkeSEUDJe7SRWSwJTAm8wx3mJiE6SrN28Y3GVwc&lang=vi`,
              method: 'GET',
              success: function(response) {
                // console.log(response)
                const feature = response.items[0].address
                ward = feature?.district.substring(7)
                district = feature?.city
                address = (feature?.houseNumber && feature?.street)
                ? feature?.houseNumber + " " +  feature?.street
                : feature?.label.substring(0, feature?.label.indexOf(", Phường") )
                
                $("#address").val(`${address}, phường ${ward}, ${district} [${longitude}, ${latitude}]`);
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
              alert('Hình ảnh minh họa phải có dạng .jpg, .png, .jpeg')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)){
              alert('Hình ảnh minh họa không được vượt quá 4MB')
            }
          });
      
          $('#edit-info .style3-button').off('click').on('click', function(e) {
            $("#address").val("")
            $('#id_loc_type').val("")
            $('#id_ads_type').val("")
            $('#reason').val("")
            $('#photo').val("")
            $("#yes").prop('selected', false);
            $("#no").prop('selected', false);
          })
      
          $('#edit-info .style1-button').off('click').on('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            
            // console.log(longitude, latitude, filter_info[click_row][0]);
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
              $("#loading-bg").show();
              var formData = new FormData();
              formData.append('id_ads_location',filter_info[click_row][0]);
              formData.append('latitude', latitude);
              formData.append('longitude', longitude);
              formData.append('address', address);
              formData.append('ward', ward);
              formData.append('district', district);
              formData.append('id_loc_type', $('#id_loc_type').val());
              formData.append('file', imageData);
              formData.append('id_ads_type', $('#id_ads_type').val());
              formData.append('is_zoning', $('#is_zoning').val());
              formData.append('req_time', validateDate(new Date()));
              formData.append('reason', $('#reason').val());
              formData.append('office', role);
              
              $("form").get(0).reset();
              $("#edit-info").modal("hide")

              $.ajax({
                url: `/api/quan/updateAdsLoc/${email}`,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                  $("#loading-bg").hide();
                  alert("Yêu cầu chỉnh sửa thành công")
                  console.log(response);
                },
                error: function(xhr, status, error) {
                  $("#loading-bg").hide();
                  alert("Yêu cầu chỉnh sửa thất bại")
                  console.error(error);
                }
              });
      
            }
          })
        })

      }
    })

  }
});
