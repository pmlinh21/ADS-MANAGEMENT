$(document).ready(function () {
  //console.log(role);

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
  var board_type
  var info, filter_info, wards

  $.get(`/api/basic/getBoardType`, function(data) {
    board_type = data.content
  }).fail(function(error) {
    console.log(error);
  });

  if (role == "1") {
    document.getElementById("createLicenseButton").style.marginLeft = "78em";
  } else if (role == "2") {
    document.getElementById("createLicenseButton").style.marginLeft = "76.3em";
  }

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
          $('button.btn-con').prop('disabled', true);
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

          $('form.needs-validation').on('change keyup', function () {
            $('button.btn-con').prop('disabled', false);
          });

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
            
            const origin_valid_date = filter_info[click_row][6].split('-')
            var origin_date = origin_valid_date[2] + "-" + origin_valid_date[1] + "-" + origin_valid_date[0]; 
            
            if(id_adsloc === filter_info[click_row][10] && parseInt($('#id_board_type').val()) === parseInt(filter_info[click_row][14]) && parseInt($('#quantity').val()) === parseInt(filter_info[click_row][5]) &&
            parseFloat($('#width').val()) === parseFloat(filter_info[click_row][15]) && parseFloat($('#height').val()) === parseFloat(filter_info[click_row][16]) && $('#expired_date').val() === origin_date){
              alert('Không có thông tin nào được thay đổi. Vui lòng chỉnh sửa ít nhất một thông tin để cập nhật.');
              return;
            }
            
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
        });

        $('#createLicenseButton').on('click', function () {
          $('#create-license').modal('show');
        });

        var imageCreate = result = id_adsloc = null

        board_type?.forEach(function (type) {
          $('#id_board_type_create').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
        })
        

        $('#photo_create').on('change', function (e) {
          if (e.target.files[0])
            if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
              imageCreate = e.target.files[0]
            }
            else if (!e.target.files[0].type.startsWith('image/')) {
              alert('Avatar must be an image file (.jpg, .png, .jpeg)')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)) {
              alert('Avatar must not exceed 4MB')
            }
        });

        $('.form-create .style3-button').off('click').on('click', function (e) {
          $("#id_ads_location_create").val("")
          $('#id_board_type_create .default').prop('selected', true)
          $('#content_create').val("")
          $('#width_create').val("")
          $('#height_create').val("")
          $('#photo_create').val("")
          $('#quantity_create').val("")
          $('#company_create').val("")
          $('#address_create').val("")
          $('#email_create').val("")
          $('#phone_create').val("")
          $('#start_date_create').val("")
          $('#end_date_create').val("")
          $('#create-license').modal('hide');
        });

        $('.form-create .input-group button').on('click', function () {
          $.get(`/api/quan/getAdsLocationWard/${id_ward}`, function (data) {
            var select_adsloc = [], index = null
            console.log(data.content)
            for (let i = 0; i < data.content.length; i++) {
              let { id_ads_location, district, address, ward, is_zoning, longitude, latitude } = data.content[i]
              if (is_zoning == 1)
                select_adsloc.push({ id_ads_location, district, address, ward, photo, longitude, latitude })
            }
            console.log(select_adsloc)
            var map_create = new mapboxgl.Map({
              container: 'map_create',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [select_adsloc[0].longitude, select_adsloc[0].latitude],
              zoom: 17,
              language: 'vi'
            });
    
            var language = new MapboxLanguage({
              defaultLanguage: 'vi'
            });
            map_create.addControl(language);
    
            let canvas = $('.mapboxgl-canvas')
            canvas.width('100%');
            canvas.height('100%');
    
            select_adsloc.forEach(function (item, index) {
              var marker = new mapboxgl.Marker({ color: '#0B7B31' })
                .setLngLat([item.longitude, item.latitude])
                .addTo(map_create)
                .getElement();
    
              marker.id = `marker-${index}`;
            });
    
            // click marker 
            $(document).on('click', '.mapboxgl-marker', function () {
              let markerId = $(this).attr('id');
              index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
              // console.log('Marker clicked:', index);
              id_adsloc = select_adsloc[index].id_ads_location;
              result = select_adsloc[index].address + ', phường ' + select_adsloc[index].ward + ', quận ' + select_adsloc[index].district;
              $(".id_ads_location").val(`${result} [${select_adsloc[index].longitude}, ${select_adsloc[index].latitude}]`)
            });
    
            // click confirm button
            $('#choose-adsloc .style1-button').off('click').on('click', function (e) {
              e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
              $("#id_ads_location").val(`${result} [${select_adsloc[index].longitude}, ${select_adsloc[index].latitude}]`)
            })
          }).fail(function (error) {
            console.log(error);
          });
        })
    
        // click "tạo cấp phép"
        $('.form-create .modal-footer .style1-button').off('click').on('click', async function (e) {
          e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
          // console.log($('#quantity').val() )
          if ($('#id_board_type_create').val() === "(Trống)") {
            alert('Vui lòng chọn loại bảng quảng cáo.');
          } else if (id_adsloc === null) {
            alert('Vui lòng chọn điểm đặt quảng cáo.');
          } else if ($('#width_create').val() === "") {
            alert('Vui lòng nhập chiều dài.');
          } else if ($('#height_create').val() === "") {
            alert('Vui lòng nhập chiều rộng.');
          } else if ($('#quantity_create').val() === "") {
            alert('Vui lòng nhập số lượng.');
          } else if ($('#content_create').val() === "") {
            alert('Vui lòng nhập nội dung.');
          } else if ($('#company_create').val() === "") {
            alert('Vui lòng nhập tên công ty.');
          } else if ($('#address_create').val() === "") {
            alert('Vui lòng nhập địa chỉ.');
          } else if ($('#email_create').val() === "") {
            alert('Vui lòng nhập địa chỉ email.');
          } else if ($('#phone_create').val() === "") {
            alert('Vui lòng nhập số điện thoại.');
          } else if ($('#start_date_create').val() === "") {
            alert('Vui lòng nhập ngày bắt đầu.');
          } else if ($('#end_date_create').val() === "") {
            alert('Vui lòng nhập ngày kết thúc.');
          } else if ($('#start_date_create').val() > $('#end_date_create').val()) {
            alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
          } else {
            $("#loading-bg").show()
            
            var createData = {
              officer: email,
              office: role,
              id_ads_location: id_adsloc,
              id_board_type: parseInt($('#id_board_type_create').val()),
              width: parseFloat($('#width_create').val()),
              height: parseFloat($('#height_create').val()),
              quantity: parseInt($('#quantity_create').val()),
              content: $('#content_create').val(),
              company: $('#company_create').val(),
              email: $('#email_create').val(),
              phone: $('#phone_create').val(),
              address: $('#address_create').val(),
              start_date: $('#start_date_create').val(),
              end_date: $('#end_date_create').val(),
              photo: null
            }

            $(".form-create").get(0).reset();
    
            const signResponse = await fetch('/api/basic/uploadImage');
            const signData = await signResponse.json();

            const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";

            const cloudinaryData = new FormData();
            cloudinaryData.append("file", imageCreate);
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
              createData.photo = photo;
            })
            .catch(error => {
              // console.log("Error:", error);
            })
            .finally(() => {
              sendCreateRequest(`/api/quan/createAdsWard`, createData)
            });
    
          }
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
          $('button.btn-con').prop('disabled', true);
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

          $('form.needs-validation').on('change keyup', function () {
            $('button.btn-con').prop('disabled', false);
          });

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
            const origin_valid_date = filter_info[click_row][6].split('-')
            var origin_date = origin_valid_date[2] + "-" + origin_valid_date[1] + "-" + origin_valid_date[0]; 
            
            if(id_adsloc === filter_info[click_row][10] && parseInt($('#id_board_type').val()) === parseInt(filter_info[click_row][14]) && parseInt($('#quantity').val()) === parseInt(filter_info[click_row][5]) &&
            parseFloat($('#width').val()) === parseFloat(filter_info[click_row][15]) && parseFloat($('#height').val()) === parseFloat(filter_info[click_row][16]) && $('#expired_date').val() === origin_date){
              alert('Không có thông tin nào được thay đổi. Vui lòng chỉnh sửa ít nhất một thông tin để cập nhật.');
              return;
            }
            
            // console.log(id_adsloc)
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
        });

        $('#createLicenseButton').on('click', function () {
          $('#create-license').modal('show');
        });

        var imageCreate = result = id_adsloc = null

        board_type?.forEach(function (type) {
          $('#id_board_type_create').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
        })
        

        $('#photo_create').on('change', function (e) {
          if (e.target.files[0])
            if (e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024) {
              imageCreate = e.target.files[0]
            }
            else if (!e.target.files[0].type.startsWith('image/')) {
              alert('Avatar must be an image file (.jpg, .png, .jpeg)')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)) {
              alert('Avatar must not exceed 4MB')
            }
        });

        $('.form-create .style3-button').off('click').on('click', function (e) {
          $("#id_ads_location_create").val("")
          $('#id_board_type_create .default').prop('selected', true)
          $('#content_create').val("")
          $('#width_create').val("")
          $('#height_create').val("")
          $('#photo_create').val("")
          $('#quantity_create').val("")
          $('#company_create').val("")
          $('#address_create').val("")
          $('#email_create').val("")
          $('#phone_create').val("")
          $('#start_date_create').val("")
          $('#end_date_create').val("")
          $('#create-license').modal('hide');
        });

        $.get(`/api/quan/getAdsLocation/${id_district}`, function (data) {
          var select_adsloc = [], index = null
          console.log(data.content)
          for (let i = 0; i < data.content.length; i++) {
            let { id_ads_location, address, ward, is_zoning, longitude, latitude, district } = data.content[i]
            if (is_zoning)
              select_adsloc.push({ id_ads_location, address, ward, district, photo, longitude, latitude })
          }
    
          var map_create = new mapboxgl.Map({
            container: 'map_create',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [select_adsloc[0].longitude, select_adsloc[0].latitude],
            zoom: 17,
            language: 'vi'
          });
  
          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map_create.addControl(language);
    
          let canvas = $('.mapboxgl-canvas')
          canvas.width('100%');
          canvas.height('100%');
    
          select_adsloc.forEach(function (item, index) {
            var marker = new mapboxgl.Marker({ color: '#0B7B31' })
            .setLngLat([item.longitude, item.latitude])
            .addTo(map_create)
            .getElement();
  
            marker.id = `marker-${index}`;
          });
    
          // click marker 
          $(document).on('click', '.mapboxgl-marker', function () {
            let markerId = $(this).attr('id');
            index = parseInt(markerId.substring(markerId.indexOf("-") + 1))
            // console.log('Marker clicked:', index);
            id_adsloc = select_adsloc[index].id_ads_location
            result = select_adsloc[index].address + ', phường ' + select_adsloc[index].ward + ', quận ' + id_district;
            $(".id_ads_location").val(`${result} [${select_adsloc[index].longitude}, ${select_adsloc[index].latitude}]`)
          });
    
          // click confirm button
          $('#choose-adsloc .style1-button').off('click').on('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
            $("#id_ads_location").val(`${result} [${select_adsloc[index].longitude}, ${select_adsloc[index].latitude}]`)
          })
        }).fail(function (error) {
          console.log(error);
        });
    
        // click "tạo cấp phép"
        $('.form-create .modal-footer .style1-button').off('click').on('click', async function (e) {
          e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit
          // console.log($('#quantity').val() )
          if ($('#id_board_type_create').val() === "(Trống)") {
            alert('Vui lòng chọn loại bảng quảng cáo.');
          } else if (id_adsloc === null) {
            alert('Vui lòng chọn điểm đặt quảng cáo.');
          } else if ($('#width_create').val() === "") {
            alert('Vui lòng nhập chiều dài.');
          } else if ($('#height_create').val() === "") {
            alert('Vui lòng nhập chiều rộng.');
          } else if ($('#quantity_create').val() === "") {
            alert('Vui lòng nhập số lượng.');
          } else if ($('#content_create').val() === "") {
            alert('Vui lòng nhập nội dung.');
          } else if ($('#company_create').val() === "") {
            alert('Vui lòng nhập tên công ty.');
          } else if ($('#address_create').val() === "") {
            alert('Vui lòng nhập địa chỉ.');
          } else if ($('#email_create').val() === "") {
            alert('Vui lòng nhập địa chỉ email.');
          } else if ($('#phone_create').val() === "") {
            alert('Vui lòng nhập số điện thoại.');
          } else if ($('#start_date_create').val() === "") {
            alert('Vui lòng nhập ngày bắt đầu.');
          } else if ($('#end_date_create').val() === "") {
            alert('Vui lòng nhập ngày kết thúc.');
          } else if ($('#start_date_create').val() > $('#end_date_create').val()) {
            alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
          } else { 
            $("#loading-bg").show()
            
            var createData = {
              officer: email,
              office: role,
              id_ads_location: id_adsloc,
              id_board_type: parseInt($('#id_board_type_create').val()),
              width: parseFloat($('#width_create').val()),
              height: parseFloat($('#height_create').val()),
              quantity: parseInt($('#quantity_create').val()),
              content: $('#content_create').val(),
              company: $('#company_create').val(),
              email: $('#email_create').val(),
              phone: $('#phone_create').val(),
              address: $('#address_create').val(),
              start_date: $('#start_date_create').val(),
              end_date: $('#end_date_create').val(),
              photo: null
            }

            $(".form-create").get(0).reset();
    
            const signResponse = await fetch('/api/basic/uploadImage');
            const signData = await signResponse.json();

            const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";

            const cloudinaryData = new FormData();
            cloudinaryData.append("file", imageCreate);
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
              createData.photo = photo;
            })
            .catch(error => {
              // console.log("Error:", error);
            })
            .finally(() => {
              sendCreateRequest(`/api/quan/createAds`, createData)
            });
    
          }
        });

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

function sendCreateRequest(url, formData) {
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(formData),
    contentType: "application/json",
    success: function (response) {
      // Handle the successful response here
      window.location.reload();
      console.log(response);
    },
    error: function (xhr, status, error) {
      // Handle the error here
      $("#loading-bg").hide()
      alert("Tạo cấp phép thất bại")
      console.error(error);
    }
  });
}