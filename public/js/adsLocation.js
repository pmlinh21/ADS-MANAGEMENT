// gửi form yêu cầu -> api tạo form

$(document).ready(function () {
    // 2 = Quan, 1 = Phuong
    const role = 2; 
    const id_district = 1;
  
    var loc_type, ads_type;
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

    if (role === 1) {
        $(".ward-table").hide();
    }
    else{

      // lấy data
      $.get(`http://localhost:8080/api/quan/getWard/${id_district}`, function(data) {
        var wards = data.content.map(ward => ward.ward);
        // render bảng phường
        console.log("!");
        renderWard(wards);

        $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
            console.log("~");
            // mảng gồm mảng thông tin theo cột trong bảng
            var info = data.content.map(function(data){
              let {id_ads_location, address, ward, loc_type, ads_type, photo, is_zoning} = data
              let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
              return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, photo]
            })
            var filter_info = [...info]

            var table = $("#example").DataTable({
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

            $('.view-btn').on('click', function(e){
              let row = $(this).closest('tr').index();
              console.log(row);
              $('#view-image .photo').attr('src', `../../../public/image/${info[row][6]}`);
            })

            loc_type?.forEach(function(type){
              $('#id_loc_type').append(`<option value="type.id_loc_type">${type.loc_type}</option>`);
            })
    
            ads_type?.forEach(function(type){
              $('#id_ads_type').append(`<option value="type.id_ads_type">${type.ads_type}</option>`);
            })

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

              $("#example").DataTable().clear().rows.add(filter_info).draw();
              // console.log(filter_info)
            });
        })

      }).fail(function(error) {
        console.log(error);
      });

    //   $.get(`http://localhost:8080/api/quan/getAdsLocation/${id_district}`, function(data) {
    //     // console.log("1");
    //     // mảng gồm mảng thông tin theo cột trong bảng
    //     let info = data.content.map(function(data){
    //       let {id_ads_location, address, ward, loc_type, ads_type, photo, is_zoning} = data
    //       let zoning_text = (is_zoning) ? "Đã quy hoạch" : "Chưa quy hoạch"
    //       return [id_ads_location, address, ward, loc_type, ads_type,zoning_text, photo]
    //     })

    //     let table = $("#example").DataTable({
    //       // tắt sắp xếp, đổi entries, tắt search bar
    //       ordering: false,
    //       lengthChange: false,
    //       searching: false,
    //       info: false,
    //       pageLength: 5,

    //       // thêm nút vào column 6,7
    //       columnDefs: [
    //         {
    //             targets: 6, // Last column (Action column)
    //             data: null,
    //             width: "2rem",
    //             className: 'btn-cell',
    //             defaultContent: '<button data-target="#view-image" data-toggle="modal" class="btn view-btn"><i class="fa-solid fa-eye"></i></button>'
    //         },
    //         {
    //           targets: 7, // Last column (Action column)
    //           data: null,
    //           width: "2rem",
    //           className: 'btn-cell',
    //           defaultContent: '<button data-target="#edit-info" data-toggle="modal" class="btn edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>'
    //         }
    //       ],

    //       // render dữ liệu vào các dòng
    //       data: info
    //     });

    //     // không biết
    //     table.on('page.dt', function() {
    //       $('html, body').animate({
    //         scrollTop: $('.ads-location-table').offset().top
    //       }, 'fast');
    //     });


    //     // thêm ảnh vào img khi nhấn view button
    //     $('.view-btn').on('click', function(e){
    //       let row = table.row($(this).closest('tr')).index();
    //       $('#view-image .photo').attr('src', `../../../public/image/${info[row][6]}`);
    //     })

    //     loc_type?.forEach(function(type){
    //       $('#id_loc_type').append(`<option value="type.id_loc_type">${type.loc_type}</option>`);
    //     })

    //     ads_type?.forEach(function(type){
    //       $('#id_ads_type').append(`<option value="type.id_ads_type">${type.ads_type}</option>`);
    //     })

    //   }).fail(function(error) {
    //     console.log(error);
    //   });
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