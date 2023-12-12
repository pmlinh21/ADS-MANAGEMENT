$(document).ready(function () {
  console.log(role);

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1saW5oMjEiLCJhIjoiY2xueXVlb2ZsMDFrZTJsczMxcWhjbmo5cSJ9.uNguqPwdXkMJwLhu9Cwt6w';
  
  var wards, filter_info

  if (role == "2"){

  } 
  else if (role == "1"){
    $("#loading-bg").show()
    $.get(`/api/quan/getWard/${id_district}`, function(data) {
      
      wards = data.content.map(ward => ward.ward);
      display_wards = data.content.map(ward => (!isNaN(parseInt(ward.ward))) ? `phường ${ward.ward}` : ward.ward);
      console.log("!");
      renderWard(display_wards);
    }).fail(function(error) {
      console.log(error);
    }).always(function(data) { 

      let urlParams = new URLSearchParams(window.location.search);
      let idString = urlParams.get('id');
      let idArray = idString?.split(',').map(Number);
      let wardArray = idArray?.map(function(item){
        return wards[item]
      })
      console.log(idArray)

      $.ajax({
        url: `/api/quan/getAdsCreate/${id_district}`,
        type: "GET",
        success: function(data) {
          $("#loading-bg").hide()
          info = data.content.map(function(item){
            let {id_create, board_type, address, content, company,
              start_date, end_date, status, address_adsloc,district,
              width, height, quantity, photo, email, phone, ward } = item
            let statusText = status ? "Đã xét duyệt" : "Chưa xét duyệt"

            return [id_create, board_type, `${address_adsloc}, phường ${ward}, ${district}`, content, company,
            formatSQLDate_dmy(start_date), formatSQLDate_dmy(end_date), statusText, 
            '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
            width, height, quantity, photo, email, phone, ward]
          })

          filter_info = [...info].sort((a, b) => a[0] - b[0]);

          console.log(filter_info);
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

          $('.ward-table input').on("click",function() {
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

        }
      })

      $("form").get(0).reset();
      var board_type, imageData = result = id_adsloc = null
    
      $.get(`/api/basic/getBoardType`, function(data) {
        board_type = data.content
        board_type?.forEach(function(type){
          $('#id_board_type').append(`<option value=${type.id_board_type}>${type.board_type}</option>`);
        })
      }).fail(function(error) {
        console.log(error);
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
        $.get(`/api/quan/getAdsLocation/${id_district}`, function(data) {
          var select_adsloc = [], index = null
          // console.log(data.content)
          for (let i = 0; i < data.content.length; i++) {
            let {id_ads_location, address, ward, is_zoning, longitude, latitude} =  data.content[i]
            if (is_zoning == 1) 
              select_adsloc.push( {id_ads_location, address, ward, photo, longitude, latitude})
          }
    
          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [select_adsloc[0].longitude, select_adsloc[0].latitude],
            zoom: 17,
            language: 'vi'
          });
    
          var language = new MapboxLanguage({
            defaultLanguage: 'vi'
          });
          map.addControl(language);
    
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
        }).fail(function(error) {
          console.log(error);});
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
          for (let i = 0; i < data.content.length; i++) {
            // console.log(data.content[i].id_ads_location)
            if (data.content[i].id_ads_location == id_adsloc){
              selected_ward = data.content[i].ward;
              break;
            }
          }
    
          const formData = new FormData()
          formData.append("officer", email)
          formData.append("office", role)
          formData.append("id_ads_location", id_adsloc)
          formData.append("id_board_type", parseInt($('#id_board_type').val()))
          formData.append("width", parseFloat($('#width').val()))
          formData.append("height", parseFloat($('#height').val()))
          formData.append("quantity", parseInt($('#quantity').val()))
          formData.append("content", $('#content').val())
          formData.append("company", $('#company').val())
          formData.append("email", $('#email').val())
          formData.append("phone", $('#phone').val())
          formData.append("address", $('#address').val())
          formData.append("start_date", $('#start_date').val())
          formData.append("end_date", $('#end_date').val())
          formData.append("file", imageData)
    
          $("form").get(0).reset();
          
          $.ajax({
            url: `/api/quan/adsCreate/${id_district}`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
              $("#loading-bg").show()
            },
            success: function(response) {
              // Handle the successful response here
              window.location.reload();
              console.log(response);
            },
            error: function(xhr, status, error) {
              // Handle the error here
              $("#loading-bg").hide()
              alert("Tạo cấp phép thất bại")
              console.error(error);
            }
          });
    
        }
      })

    })
  }

});
