// caption cho từng bảng

$(document).ready(function () {
    // 1 = Quan, 2 = Phuong
    const role = 1; 
    const email = "nnlien21@clc.fitus.edu.vn"
    const id_district = 1;
    
    var info1, info2, info3, wards
    var ads_info, adsloc_info, loc_info

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
      })

      $.get(`http://localhost:8080/api/quan/getAdsReport/${id_district}`, function(data) {
        console.log("~");
        info1 = data.content.map(function(data){
          let {id_report, id_ads, report_type, fullname, email, phone, content,
            photo1, photo2, report_time, status, resolve, ward } = data
          let statusText = status ? "Đã xử lí" : "Chưa xử lí"
          return [id_report, id_ads, report_type, fullname, email, phone, 
          validateSQLDate(report_time), statusText, 
          '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
          content,  photo1, photo2, resolve, status, ward]
        })

        ads_info = [...info1].sort((a, b) => a[0] - b[0]);
        // console.log(info);

        $(".ads-report-table").DataTable({
          pageLength: 6,
          data: ads_info
          });
        
        $("#example1_wrapper").on('click', '.ads-report-table .view-btn', function(){
          let row = $(this).closest('tr').index();
          let id_report = ads_info[row][0], table = "ads"
          window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
          console.log(row);
        })

        $('.ward-table input').click(function() {
          let id_ward = $(this).attr('id');
          id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
          console.log(id_ward)

          if ($(this).is(':checked')) {
            for (var i = 0; i < info1.length; i++){
              if (info1[i][14] == wards[id_ward])
              ads_info.push(info1[i]);
            }
          } else {
            console.log("hihi")
            var result = []
            for (var i = 0; i < ads_info.length; i++){
              if (ads_info[i][14] != wards[id_ward])
                result.push(ads_info[i]);
            }
            ads_info = [...result]
          }

          $(".ads-report-table").DataTable().clear().rows.add(ads_info.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
        })
        
      }).fail(function(error) {
        console.log(error);
      })

      $.get(`http://localhost:8080/api/quan/getAdsLocReport/${id_district}`, function(data) {
        console.log("~");
        info2 = data.content.map(function(data){
          let {id_report, id_ads_location, report_type, fullname, email, phone, content,
            photo1, photo2, report_time, status, resolve, ward } = data
          let statusText = status ? "Đã xử lí" : "Chưa xử lí"
          id_report = parseInt(id_report);
          // console.log(id_report);
          return [id_report, id_ads_location, report_type, fullname, email, phone, 
          validateSQLDate(report_time), statusText, 
          '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
          content,  photo1, photo2, resolve, status, ward]
        })

        adsloc_info = [...info2].sort((a, b) => a[0] - b[0]);

        $(".adsloc-report-table").DataTable({
          pageLength: 6,
          data: adsloc_info
          });

        $('#example2_wrapper').on('click', '.adsloc-report-table .view-btn', function(){
          let row = $(this).closest('tr').index();
          let id_report = adsloc_info[row][0], table = "adsloc"
          window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
          console.log(row);
        })

        $('.ward-table input').click(function() {
          let id_ward = $(this).attr('id');
          id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
    
          if ($(this).is(':checked')) {
            for (var i = 0; i < info2.length; i++){
              if (info2[i][14] == wards[id_ward])
              adsloc_info.push(info2[i]);
            }
          } else {
            console.log("hihi")
            var result = []
            for (var i = 0; i < adsloc_info.length; i++){
              if (adsloc_info[i][14] != wards[id_ward])
                result.push(adsloc_info[i]);
            }
            adsloc_info = [...result]
          }

          $(".adsloc-report-table").DataTable().clear().rows.add(adsloc_info.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
        }); 

      }).fail(function(error) {
        console.log(error);
      })

      $.get(`http://localhost:8080/api/quan/getLocReport/${id_district}`, function(data) {
        console.log("~");
        info3 = data.content.map(function(data){
          let {id_report, id_ads_location, report_type, fullname, email, phone, content,
            photo1, photo2, report_time, status, resolve, ward, longitude, latitue } = data
          let statusText = status ? "Đã xử lí" : "Chưa xử lí"
          id_report = parseInt(id_report);
          // console.log(id_report);
          return [id_report, "địa chỉ", report_type, fullname, email, phone, 
          validateSQLDate(report_time), statusText, 
          '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
          content,  photo1, photo2, resolve, status, ward, longitude, latitue]
        })

        loc_info = [...info3].sort((a, b) => a[0] - b[0]);
        // console.log(info);

        $("#example3.loc-report-table").DataTable({
          pageLength: 6,
          data: loc_info
          });

        $("#example3_wrapper").on('click', '.loc-report-table .view-btn', function(){
          let row = $(this).closest('tr').index();
          let id_report = loc_info[row][0], table = "loc"
          window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
          console.log(row);
        })

        $('.ward-table input').click(function() {
          let id_ward = $(this).attr('id');
          id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
    
          if ($(this).is(':checked')) {
            for (var i = 0; i < info3.length; i++){
              if (info3[i][14] == wards[id_ward])
              loc_info.push(info3[i]);
            }
          } else {
            console.log("hihi")
            var result = []
            for (var i = 0; i < loc_info.length; i++){
              if (loc_info[i][14] != wards[id_ward])
                result.push(loc_info[i]);
            }
            loc_info = [...result]
          }

          $(".loc-report-table").DataTable().clear().rows.add(adsloc_info.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
        });

      }).fail(function(error) {
        console.log(error);
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