// caption cho bảng

$(document).ready(function () {
    // 1 = Quan, 2 = Phuong
    const role = 1; 
    const email = "nnlien21@clc.fitus.edu.vn"
    const id_district = 1;
    
    var info, wards
    var filter_info

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

      $.get(`http://localhost:8080/api/quan/getAdsCreate/${id_district}`, function(data) {
        console.log("~");
        info = data.content.map(function(data){
          let {id_create, board_type, address, content, company,
            start_date, end_date, status,
            width, height, quantity, photo, email, phone, ward } = data
          let statusText = status ? "Đã xét duyệt" : "Chưa xét duyệt"

          return [id_create, board_type, address, content, company,
          validateSQLDate(start_date), validateSQLDate(end_date), statusText, 
          '<button class="btn view-btn"><i class="fa-solid fa-pen-to-square"></i></button>', 
          width, height, quantity, photo, email, phone, ward]
        })

        filter_info = [...info].sort((a, b) => a[0] - b[0]);
        // console.log(info);

        $(".ads-create-table").DataTable({
          pageLength: 6,
          data: filter_info
          });
        
      }).fail(function(error) {
        console.log(error);
      }).always(function() {

        $('.ads-create-table .view-btn').on('click', function(){
          let row = $(this).closest('tr').index();
          console.log(row);
          return
        })

        $('.ward-table input').click(function() {
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
            var result = []
            for (var i = 0; i < filter_info.length; i++){
              if (filter_info[i][15] != wards[id_ward])
                result.push(filter_info[i]);
            }
            filter_info = [...result]
          }

          $(".ads-create-table").DataTable().clear().rows.add(filter_info.sort(function(a, b) {
            return a[0] - b[0];
          })).draw()

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