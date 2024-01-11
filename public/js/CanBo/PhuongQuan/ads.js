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
    document.getElementById("createLicenseButton").style.marginLeft = "78.5em";
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
          '<button data-target="#detail-popup" data-toggle="modal" class="btn-cell btn license-btn"><i class="fa-solid fa-file-signature"></i></i></button>',
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
          let page = $("#example_wrapper .page-item.active a").text();
          console.log(row);
          let path  = "../../../public/image/image-placeholder.jpg"
          if (filter_info[row + 5 * parseInt(page) - 5][10] != "")
            path  = filter_info[row + 5 * parseInt(page) - 5][10]
          $('#view-image .photo').attr('src', path );
          return
        })

        $('#example_wrapper').on('click', '.license-btn', function(){
          let row = $(this).closest('tr').index();
          let page = $("#example_wrapper .page-item.active a").text();

          $.ajax({
            url: `/api/basic/getAdsCreateByAds/${filter_info[row + 5 * parseInt(page) - 5][0]}`,
            type: "GET",
            dataType: "json",
            success: function (data) {
              console.log(data)
              const [info, ...giahan] = data.content
    
              $('#id_license').val(info.id_create);
              $('#board_type_license').val(info.board_type);
              $('#size_license').val(info.width + 'm x ' + info.height + "m");
              $('#quantity_license').val(info.quantity);
              $('#content_license').val(info.content);
              // $('#adsloc_license').val(`${info.address_adsloc}, phường ${info.ward}, ${info.district}`);
              $('#company_license').val(info.company);
              $('#email_license').val(info.email);
              $('#phone_license').val(info.phone);
              $('#address_license').val(info.address);
              $('#start_date_license').val(formatSQLDate_ymd(info.start_date));
              $('#end_date_license').val(formatSQLDate_ymd(info.end_date));
              $('#status_license').val(info.status === true ? "Đã duyệt" : (
                info.status === false ? "Đã từ chối" : "Chưa xét duyệt"));
              $('#officer_license').val(info.officer);
              $('#office_license').val(info.office === 1 ? "Quận" : (info.office === 2 ? "Phường" : ""));
              
              if (info.photo){
                $("#detail-popup .image p").hide()
                $("#detail-popup .image img").show()
                $("#detail-popup .image img").attr("src", info.photo)
              } else{
                $("#detail-popup .image img").hide()
                $("#detail-popup .image p").show()
              }
                
              if (giahan?.length > 0)
                renderGiayPhepGiaHan(giahan);
              
              $("#loading-bg").hide()
            },
            error: function(){
              $("#loading-bg").hide()
            }
          })
          return
        })
      
        $('#example_wrapper').on('click', '.edit-btn', function(e){
          $('button.btn-con').prop('disabled', true);
          var click_row = $(this).closest('tr').index();
          let page = $("#example_wrapper .page-item.active a").text();
          click_row = click_row + 5 * parseInt(page) - 5
          var result = imageData = null, id_adsloc = filter_info[click_row][11]
          console.log(filter_info[click_row])
      
          $("#address").val(`${filter_info[click_row][2]}, phường ${filter_info[click_row][12]} [${filter_info[click_row][13]}, ${filter_info[click_row][14]}]` )

          $('#id_board_type').empty()
          board_type?.forEach(function(type){
            if (filter_info[click_row][15] == type.id_board_type) 
              $('#id_board_type').append(`<option selected value=${type.id_board_type}>${type.board_type}</option>`);
            else
              $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
          })

          const valid_date = filter_info[click_row][6].split('-')
          $('#expired_date').val(`${valid_date[2]}-${valid_date[1]}-${valid_date[0]}`)
          $('#width').val(filter_info[click_row][16])
          $('#height').val(filter_info[click_row][17])
          $('#quantity').val(filter_info[click_row][5])

          $('form.needs-validation').on('change keyup', function () {
            $('button.btn-con').prop('disabled', false);
          });

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [filter_info[click_row][13], filter_info[click_row][14]],
            zoom: 17,
            language: 'vi'
          });

          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);

          map.on('idle',function(){
            map.resize()
          })
      
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
            
            if(id_adsloc === filter_info[click_row][11] && parseInt($('#id_board_type').val()) === parseInt(filter_info[click_row][15]) && parseInt($('#quantity').val()) === parseInt(filter_info[click_row][5]) &&
            parseFloat($('#width').val()) === parseFloat(filter_info[click_row][16]) && parseFloat($('#height').val()) === parseFloat(filter_info[click_row][17]) && $('#expired_date').val() === origin_date
             && imageData == null){
              alert('Không có thông tin nào được thay đổi. Vui lòng chỉnh sửa ít nhất một thông tin để cập nhật.');
              return;
            }
            
            let reason = $('#reason').v
            al();
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

              $("#edit-info form").get(0).reset();
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
    
            map.on('idle',function(){
              map.resize()
            })
    
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

            $("#create-license").modal("hide")
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
          '<button data-target="#view-image" data-toggle="modal" class="btn-cell btn view-btn"><i class="fa-solid fa-image"></i></button>',
          '<button data-target="#edit-info" data-toggle="modal" class="btn-cell btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
          '<button data-target="#detail-popup" data-toggle="modal" class="btn-cell btn license-btn"><i class="fa-solid fa-file-signature"></i></i></button>',
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
              if (info[i][12] == wards[id_ward])
              filter_info.push(info[i]);
            }
          } else {
            var result = []
            for (var i = 0; i < filter_info.length; i++){
              if (filter_info[i][12] != wards[id_ward])
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
          let page = $("#example_wrapper .page-item.active a").text();
          console.log(row, " ", page);
          let path  = "../../../public/image/image-placeholder.jpg"
          if (filter_info[row + 5 * parseInt(page) - 5][10] != "")
            path  = filter_info[row + 5 * parseInt(page) - 5][10]
          $('#view-image .photo').attr('src', path );
          return
        })

        $('#example_wrapper').on('click', '.license-btn', function(){
          let row = $(this).closest('tr').index();
          let page = $("#example_wrapper .page-item.active a").text();

          $.ajax({
            url: `/api/basic/getAdsCreateByAds/${filter_info[row + 5 * parseInt(page) - 5][0]}`,
            type: "GET",
            dataType: "json",
            success: function (data) {
              console.log(data)
              const [info, ...giahan] = data.content
    
              $('#id_license').val(info.id_create);
              $('#board_type_license').val(info.board_type);
              $('#size_license').val(info.width + 'm x ' + info.height + "m");
              $('#quantity_license').val(info.quantity);
              $('#content_license').val(info.content);
              // $('#adsloc_license').val(`${info.address_adsloc}, phường ${info.ward}, ${info.district}`);
              $('#company_license').val(info.company);
              $('#email_license').val(info.email);
              $('#phone_license').val(info.phone);
              $('#address_license').val(info.address);
              $('#start_date_license').val(formatSQLDate_ymd(info.start_date));
              $('#end_date_license').val(formatSQLDate_ymd(info.end_date));
              $('#status_license').val(info.status === true ? "Đã duyệt" : (
                info.status === false ? "Đã từ chối" : "Chưa xét duyệt"));
              $('#officer_license').val(info.officer);
              $('#office_license').val(info.office === 1 ? "Quận" : (info.office === 2 ? "Phường" : ""));
              
              if (info.photo){
                $("#detail-popup .image p").hide()
                $("#detail-popup .image img").show()
                $("#detail-popup .image img").attr("src", info.photo)
              } else{
                $("#detail-popup .image img").hide()
                $("#detail-popup .image p").show()
              }
                
              if (giahan?.length > 0)
                renderGiayPhepGiaHan(giahan);
              
              $("#loading-bg").hide()
            },
            error: function(){
              $("#loading-bg").hide()
            }
          })
          return
        })
      
        $('#example_wrapper').on('click', '.edit-btn', function(e){
          $('button.btn-con').prop('disabled', true);
          var click_row = $(this).closest('tr').index();
          let page = $("#example_wrapper .page-item.active a").text();
          click_row = click_row + 5 * parseInt(page) - 5
          var result = imageData = null, id_adsloc = filter_info[click_row][11]
          console.log(filter_info[click_row])
      
          $("#address").val(`${filter_info[click_row][2]} [${filter_info[click_row][13]}, ${filter_info[click_row][14]}]` )

          $('#id_board_type').empty()
          board_type?.forEach(function(type){
            if (filter_info[click_row][15] == type.id_board_type) 
              $('#id_board_type').append(`<option selected value=${type.id_board_type}>${type.board_type}</option>`);
            else
              $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
          })

          const valid_date = filter_info[click_row][6].split('-')
          $('#expired_date').val(`${valid_date[2]}-${valid_date[1]}-${valid_date[0]}`)
          $('#width').val(filter_info[click_row][16])
          $('#height').val(filter_info[click_row][17])
          $('#quantity').val(filter_info[click_row][5])

          $('form.needs-validation').on('change keyup', function () {
            $('button.btn-con').prop('disabled', false);
          });

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [filter_info[click_row][13], filter_info[click_row][14]],
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
            
            if(id_adsloc === filter_info[click_row][11] && parseInt($('#id_board_type').val()) === parseInt(filter_info[click_row][15]) && parseInt($('#quantity').val()) === parseInt(filter_info[click_row][5]) &&
            parseFloat($('#width').val()) === parseFloat(filter_info[click_row][16]) && parseFloat($('#height').val()) === parseFloat(filter_info[click_row][17]) && $('#expired_date').val() === origin_date
            && imageData == null){
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
            $("#create-license").modal("hide")
            $("#loading-bg").show()
    
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
      alert("Tạo cấp phép thành công")
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

function renderGiayPhepGiaHan(giahan){
  const note = giahan.map(item => {
    if (item.status === true)
      return "Đã duyệt"
    else if (item.status === false)
      return "Đã từ chối"
    else 
      return "Chưa xét duyệt"
  })

  var template = `
    <% for (var i = 0; i < giahan?.length; i++) { %>
      <form class="row form-ads-create-details mb-3">
          <div class="col-md-4">
              <label class="form-label">Ngày bắt đầu hợp đồng</label>
              <input type="date" class="form-control input-details" value = "<%= formatSQLDate_ymd(giahan[i].start_date)%>" readonly>
          </div>
          <div class="col-md-4">
              <label class="form-label">Ngày kết thúc hợp đồng</label>
              <input type="date" class="form-control input-details" value = "<%= formatSQLDate_ymd(giahan[i].end_date)%>" readonly>
          </div>
          <div class="col-md-4">
            <label for="height" class="form-label">Trạng thái cấp phép</label>
            <input type="text" class="form-control input-details" value = "<%= note[i]%>" readonly>
          </div>
      </form>
    <% } %>
    `;

  var rendered = ejs.render(template, { giahan, note });
  $("#detail-popup .giay-phep-gia-han .content").html(rendered);
}