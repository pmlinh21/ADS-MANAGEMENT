$(document).ready(function () {
  console.log(role);

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
  var board_type
  var info, filter_info, wards

  $.get(`/api/basic/getBoardType`, function(data) {
    board_type = data.content
  }).fail(function(error) {
    console.log(error);
  });

  if (role == "2"){
    $.ajax({
      url:`/api/quan/getAdsWard/${id_ward}`,
      type: 'GET',
      beforeSend: function(){
        $("#loading-bg").show()
      },
      success: function(data) {
        $("#loading-bg").hide()

        info = data.content.map(function(data){
          let {id_ads, id_ads_location, address, ward, loc_type, board_type, photo,
            width, height, quantity, expired_date, longitude, latitude, id_board_type } = data
          return [parseInt(id_ads), board_type, `${address}`, loc_type, `${width}m x ${height}m`, quantity, 
          formatSQLDate_dmy(expired_date), 
          '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
          '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
          photo, parseInt(id_ads_location), ward, longitude, latitude, parseInt(id_board_type), width, height]
        })

        filter_info = [...info].sort(function(a, b) {
          return a[0] - b[0];
        })

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

        
      
        $('#example_wrapper').on('click', '.edit-btn', function(e){
          var click_row = $(this).closest('tr').index();
          var result = imageData = null, id_adsloc = filter_info[click_row][10]
          console.log(filter_info[click_row])
      
          $("#address").val(`${filter_info[click_row][2]} [${filter_info[click_row][12]}, ${filter_info[click_row][13]}]` )

          board_type?.forEach(function(type){
            if (filter_info[click_row][14] == type.id_board_type) 
              $('#id_board_type').append(`<option selected value=${type.id_board_type}>${type.board_type}</option>`);
            else
              $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
          })

          const valid_date = filter_info[click_row][6].split('-')
          $('#expired_date').val(`${valid_date[2]}-${valid_date[1]}-${valid_date[0]}`)
          $('#width').val(filter_info[click_row][15])
          $('#height').val(filter_info[click_row][16])
          $('#quantity').val(filter_info[click_row][5])

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [filter_info[click_row][12], filter_info[click_row][13]],
            zoom: 17,
            language: 'vi'
          });

          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);
      
          let canvas = $('.mapboxgl-canvas')
          canvas.width('100%');
      
          $.get(`/api/quan/getAllAdsLoc`, function(data) {
            adsloc = data.content
      
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
              console.log(adsloc[index].district);
              id_adsloc = adsloc[index].id_ads_location
              result = adsloc[index].address + ', phường ' + adsloc[index].ward + ', quận' + adsloc[index].district;
              $("#address").val(`${result} [${adsloc[index].longitude}, ${adsloc[index].latitude}]` )
            });

          }).fail(function(error) {
            console.log(error);
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
            $('#id_board_type').val("")
            $('#expired_date').val("")
            $('#width').val("")
            $('#height').val("")
            $('#photo').val("")
            $('#quantity').val("")
            $('#reason').val("")
          })  
      
          $('#edit-info .style1-button').off('click').on('click', async function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            
      //       // console.log(click_row);
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
              $("#loading-bg").show();

              const formData = {
                id_ads: filter_info[click_row][0],
                id_ads_location: id_adsloc,
                id_board_type: $('#id_board_type').val(),
                quantity: $('#quantity').val(),
                width: $('#width').val(),
                height: $('#height').val(),
                expired_date: $('#expired_date').val() ,
                req_time: validateDate(new Date()),
                reason: $('#reason').val(),
                office: role,
                photo: ""
              }

              $("form").get(0).reset();
              $("#edit-info").modal("hide")

                const signResponse = await fetch('/api/basic/uploadImage');
                const signData = await signResponse.json();
  
                const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
  
                const cloudinaryData = new FormData();
                cloudinaryData.append("file", imageData);
                cloudinaryData.append("api_key", signData.apikey);
                cloudinaryData.append("timestamp", signData.timestamp);
                cloudinaryData.append("signature", signData.signature);
                cloudinaryData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
                cloudinaryData.append("folder", "image");
  
                fetch(url, {
                  method: "POST",
                  body: cloudinaryData
                })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    const photo = JSON.parse(data).secure_url
                    formData.photo = photo ? photo : "";            
                })
                .finally(() => {
                  sendUpdateRequest( `/api/quan/updateAds/${email}`, formData)
                })
            }
          })
        })

      },
      error: function(error) {
        console.log(error);
      }
    })





    
  } else if (role == "1"){
    $.get(`/api/quan/getWard/${id_district}`, function(data) {
      wards = data.content.map(ward => ward.ward).sort(sortWard);
      display_wards = wards.map(ward => (!isNaN(parseInt(ward))) ? `phường ${ward}` : ward);
      console.log("!");
      renderWard(display_wards);
    }).fail(function(error) {
      console.log(error);
    });

    $.ajax({
      url:`/api/quan/getAds/${id_district}`,
      type: 'GET',
      beforeSend: function(){
        $("#loading-bg").show()
      },
      success: function(data) {
        $("#loading-bg").hide()

        info = data.content.map(function(data){
          let {id_ads, id_ads_location, address, ward, loc_type, board_type, photo,
            width, height, quantity, expired_date, longitude, latitude, id_board_type } = data
          return [parseInt(id_ads), board_type, `${address}, phường ${ward}`, loc_type, `${width}m x ${height}m`, quantity, 
          formatSQLDate_dmy(expired_date), 
          '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-eye"></i></button>',
          '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
          photo, parseInt(id_ads_location), ward, longitude, latitude, parseInt(id_board_type), width, height]
        })

        filter_info = [...info].sort(function(a, b) {
          return a[0] - b[0];
        })

        $("#example.ads-table").DataTable({
          data: filter_info
        });

        $('.ward-table input').on("click",function() {
          var id_ward = $(this).attr('id');
          id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
          console.log(id_ward)

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

          console.log(filter_info)
          $("#example.ads-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
          
        });

        $('#example_wrapper').on('click', '.view-btn', function(){
          let row = $(this).closest('tr').index();
          console.log(row);
          let path  = "../../../public/image/image-placeholder.jpg"
          if (filter_info[row][9] != "")
            path  = filter_info[row][9]
          $('#view-image .photo').attr('src', path );
          return
        })

        
      
        $('#example_wrapper').on('click', '.edit-btn', function(e){
          var click_row = $(this).closest('tr').index();
          var result = imageData = null, id_adsloc = filter_info[click_row][10]
          console.log(filter_info[click_row])
      
          $("#address").val(`${filter_info[click_row][2]} [${filter_info[click_row][12]}, ${filter_info[click_row][13]}]` )

          board_type?.forEach(function(type){
            if (filter_info[click_row][14] == type.id_board_type) 
              $('#id_board_type').append(`<option selected value=${type.id_board_type}>${type.board_type}</option>`);
            else
              $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
          })

          const valid_date = filter_info[click_row][6].split('-')
          $('#expired_date').val(`${valid_date[2]}-${valid_date[1]}-${valid_date[0]}`)
          $('#width').val(filter_info[click_row][15])
          $('#height').val(filter_info[click_row][16])
          $('#quantity').val(filter_info[click_row][5])

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [filter_info[click_row][12], filter_info[click_row][13]],
            zoom: 17,
            language: 'vi'
          });

          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);
      
          let canvas = $('.mapboxgl-canvas')
          canvas.width('100%');
      
          $.get(`/api/quan/getAllAdsLoc`, function(data) {
            adsloc = data.content
      
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
              result = adsloc[index].address + ', phường ' + adsloc[index].ward + ', quận ' + adsloc[index].district;
              $("#address").val(`${result} [${adsloc[index].longitude}, ${adsloc[index].latitude}]` )
            });

          }).fail(function(error) {
            console.log(error);
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
            $('#id_board_type').val("")
            $('#expired_date').val("")
            $('#width').val("")
            $('#height').val("")
            $('#photo').val("")
            $('#quantity').val("")
            $('#reason').val("")
          })  
      
          $('#edit-info .style1-button').off('click').on('click', async function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            console.log(id_adsloc)
            let reason = $('#reason').val();
            if (!reason){
              alert("Trường 'Lí do chỉnh sửa' bắt buộc.")
            }
            else{
              $("#loading-bg").show();

              
              const formData = {
                id_ads: filter_info[click_row][0],
                id_ads_location: id_adsloc,
                id_board_type: $('#id_board_type').val(),
                quantity: $('#quantity').val(),
                width: $('#width').val(),
                height: $('#height').val(),
                expired_date: $('#expired_date').val() ,
                req_time: validateDate(new Date()),
                reason: $('#reason').val(),
                office: role,
                photo: ""
              }

              $("form").get(0).reset();
              $("#edit-info").modal("hide")

                const signResponse = await fetch('/api/basic/uploadImage');
                const signData = await signResponse.json();
  
                const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
  
                const cloudinaryData = new FormData();
                cloudinaryData.append("file", imageData);
                cloudinaryData.append("api_key", signData.apikey);
                cloudinaryData.append("timestamp", signData.timestamp);
                cloudinaryData.append("signature", signData.signature);
                cloudinaryData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
                cloudinaryData.append("folder", "image");
  
                fetch(url, {
                  method: "POST",
                  body: cloudinaryData
                })
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    const photo = JSON.parse(data).secure_url
                    formData.photo = photo ? photo : "";            
                })
                .finally(() => {
                  sendUpdateRequest( `/api/quan/updateAds/${email}`, formData)
                })
            }
          })
        })

      },
      error: function(error) {
        console.log(error);
      }
    })
  }
})

function sendUpdateRequest(url, formData) {
  $.ajax({
    url:url,
    type: 'POST',
    data: JSON.stringify(formData),
    contentType: "application/json",
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

