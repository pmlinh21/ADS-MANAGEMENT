// api get các type
// checkbox ward filter
// gửi form yêu cầu -> api tạo form

$(document).ready(function () {
    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');

    // 2 = Quan, 1 = Phuong
    const role = 2; 
    const id_district = 1;
  
    if (role === 1) {
        $(".ward-table").hide();
    }
    else{

      // lấy data
      $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
        var wards = data.content.map(ward => ward.ward);
        
        // render bảng phường
        renderWard(wards);
      }).fail(function(error) {
        console.log(error);
      });

      var table;

      $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {

        // mảng gồm mảng thông tin theo cột trong bảng
        var info = data.content.map(function(data){
          var {id_ads_location, address, ward, loc_type, ads_type, photo, is_zoning} = data
          var zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
          return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, photo]
        })

        table = $("#example").DataTable({
          // tắt sắp xếp, đổi entries, tắt search bar
          ordering: false,
          lengthChange: false,
          searching: false,
          info: false,
          pageLength: 5,

          // thêm nút vào column 6,7
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

          // render dữ liệu vào các dòng
          data: info
        });

        // không biết
        table.on('page.dt', function() {
          $('html, body').animate({
            scrollTop: $('.ads-location-table').offset().top
          }, 'fast');
        });

        // thêm ảnh vào img khi nhấn view button
        $('.view-btn').on('click', function(e){
          var row = table.row($(this).closest('tr')).index();
          $('#view-image .photo').attr('src', `../../../public/image/${info[row][6]}`);
        })


      }).fail(function(error) {
        console.log(error);
      });
    }


    $('.dropdown-toggle').dropdown()

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