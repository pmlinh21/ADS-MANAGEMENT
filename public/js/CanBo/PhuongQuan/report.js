$(document).ready(function () {

  if (role == 2){






    
  } else if (role == 1){
    var ads_report, ads_loc_report, loc_report
    var info1, info2, info3, wards, wardArray = [], idArray = []

    $.get(`/api/quan/getWard/${id_district}`, function(data) {
      wards = data.content.map(ward => ward.ward);
      display_wards = data.content.map(ward => (!isNaN(parseInt(ward.ward))) ? `phường ${ward.ward}` : ward.ward);
      console.log("!");
      renderWard(display_wards);

      $('.ward-table input').prop('checked', true)

      let urlParams = new URLSearchParams(window.location.search);
      let idString = urlParams.get('id');
      idArray = idString?.split(',').map(Number);
      wardArray = idArray?.map(function(item){
        return wards[item]
      })

    }).fail(function(error) {
      console.log(error);
    });


    $.ajax({
      url: `/api/quan/getAdsReport/${id_district}`,
      type: 'GET',
      cache: false, // Tắt caching
      dataType: 'json',
      success: function(data) {
        console.log(data)
        info1 = data.content.map(function(data){
          let {id_report, id_ads, report_type, fullname, email, phone, content,
            photo1, photo2, report_time, status, resolve, ward } = data
          let statusText = status ? "Đã xử lí" : "Chưa xử lí"
          return [id_report, id_ads, report_type, fullname, email, phone, 
            formatSQLDate_dmy(report_time), statusText, 
          '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
          content,  photo1, photo2, resolve, status, ward]
        })

        ads_report = [...info1].sort((a, b) => a[0] - b[0]);

        if (wardArray?.length > 0){
          let result = []
          for (let i = 0; i < ads_report.length; i++){
            if (!wardArray.includes(ads_report[i][14]))
              result.push(ads_report[i]);
          }
          ads_report = [...result]
        }

        $(".ads-report-table").DataTable({
          pageLength: 6,
          data: ads_report
          });

        $("#example1_wrapper").on('click', '.ads-report-table .view-btn', function(){
          let row = $(this).closest('tr').index();
          let page = $("#example1_wrapper .page-item.active a").text();
          // console.log(page);
          let id_report = ads_report[row + 6 * parseInt(page) - 6][0], table = "ads"
          window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
          // console.log(id_report);
        })

        console.log(ads_report);
      }
    })

    $.ajax({
      url: `/api/quan/getAdsLocReport/${id_district}`,
      type: "GET",
      cache: false,
      dataType: "json",
      success: function (data){
        info2 = data.content.map(function(data){
          let {id_report, id_ads_location, report_type, fullname, email, phone, content,
            photo1, photo2, report_time, status, resolve, ward } = data
          let statusText = status ? "Đã xử lí" : "Chưa xử lí"
          id_report = parseInt(id_report);
          // console.log(id_report);
          return [id_report, id_ads_location, report_type, fullname, email, phone, 
            formatSQLDate_dmy(report_time), statusText, 
          '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
          content,  photo1, photo2, resolve, status, ward]
        })

        ads_loc_report = [...info2].sort((a, b) => a[0] - b[0]);

        if (wardArray?.length > 0){
          result = []
          for (let i = 0; i < ads_loc_report.length; i++){
            if (!wardArray.includes(ads_loc_report[i][14]))
              result.push(ads_loc_report[i]);
          }
          ads_loc_report = [...result]
        }

        $(".adsloc-report-table").DataTable({
          pageLength: 6,
          data: ads_loc_report
          });

        $('#example2_wrapper').on('click', '.adsloc-report-table .view-btn', function(){
          let row = $(this).closest('tr').index();
          let page = $("#example2_wrapper .page-item.active a").text();
          console.log(page);
          let id_report = ads_loc_report[row + 6 * parseInt(page) - 6][0], table = "adsloc"
          window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
          console.log(row);
        })

        console.log(ads_loc_report);

      }
    })

    $.ajax({
      url: `/api/quan/getLocReport/${id_district}`, 
      type: "GET",
      cache: false,
      dataType: "json",
      success: function(data) {
      info3 = data.content.map(function(data){
        let {id_report, address, report_type, fullname, email, phone, content,
          photo1, photo2, report_time, status, resolve, ward, longitude, latitue } = data
        let statusText = status ? "Đã xử lí" : "Chưa xử lí"
        id_report = parseInt(id_report);
        // console.log(id_report);
        return [id_report, address, report_type, fullname, email, phone, 
          formatSQLDate_dmy(report_time), statusText, 
        '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>',
        content,  photo1, photo2, resolve, status, ward, longitude, latitue]
      })

      loc_report = [...info3].sort((a, b) => a[0] - b[0]);

      if (wardArray?.length > 0){
        result = []
        for (let i = 0; i < loc_report.length; i++){
          if (!wardArray.includes(loc_report[i][14]))
            result.push(loc_report[i]);
        }
        loc_report = [...result]
  
        for (let i = 0; i < idArray.length; i++){
          $(`#ward-${idArray[i]}`).prop('checked', false)
        }
      }

        
    $("#example3.loc-report-table").DataTable({
      pageLength: 6,
      data: loc_report
      });

    $("#example3_wrapper").on('click', '.loc-report-table .view-btn', function(){
      let row = $(this).closest('tr').index();
      let page = $("#example3_wrapper .page-item.active a").text();
      console.log(page);
      let id_report = loc_report[row + 6 * parseInt(page) - 6][0], table = "loc"
      window.location.href = '/detailReport?id_report=' + id_report + '&table=' + table;
      console.log(id_report);
    })

      },
      complete: function(data){
        $('.ward-table input').on('click', function() {
          let id_ward = $(this).attr('id');
          id_ward = id_ward.slice(id_ward.indexOf("-") + 1)
          console.log(id_ward)
    
          if ($(this).is(':checked')) {
            for (var i = 0; i < info1.length; i++){
              if (info1[i][14] == wards[id_ward])
              ads_report.push(info1[i]);
            }
            for (var i = 0; i < info2.length; i++){
              if (info2[i][14] == wards[id_ward])
              ads_loc_report.push(info2[i]);
            }
            for (var i = 0; i < info3.length; i++){
              if (info3[i][14] == wards[id_ward])
              loc_report.push(info3[i]);
            }
          } else {
    
            var result = []
            for (var i = 0; i < ads_report.length; i++){
              if (ads_report[i][14] != wards[id_ward])
                result.push(ads_report[i]);
            }
            ads_report = [...result]
            result = []
            for (var i = 0; i < ads_loc_report.length; i++){
              if (ads_loc_report[i][14] != wards[id_ward])
                result.push(ads_loc_report[i]);
            }
            ads_loc_report = [...result]
            result = []
            for (var i = 0; i < loc_report.length; i++){
              if (loc_report[i][14] != wards[id_ward])
                result.push(loc_report[i]);
            }
            loc_report = [...result]
          }
    
          $(".ads-report-table").DataTable().clear().rows.add(ads_report.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
    
          $(".adsloc-report-table").DataTable().clear().rows.add(ads_loc_report.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
    
          $(".loc-report-table").DataTable().clear().rows.add(loc_report.sort(function(a, b) {
            return a[0] - b[0];
          })).draw();
    
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

      
  }

});