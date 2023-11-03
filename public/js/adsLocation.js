

$(document).ready(function () {
    const manageButton = $('#manage');
    const manageMenu = $('#manage .manage-menu');

    // 2 = Quan, 1 = Phuong
    const role = 2; 
  
    if (role === 1) {
        $(".ward-table").hide();
    }
    else{
      var checkboxes = [
        'Bến Nghé',
        'Bến Thành',
        'Cầu Kho',
        'Cầu Ông Lãnh',
        'Nguyễn Thái Bình',
        'Nguyễn Cư Trinh',
        'Đa Kao',
        'Cô Giang',
        'Tân Định',
        'Phạm Ngũ Lão'
      ];
        renderWard(checkboxes, );
    }

    // $(".form-check-input").on('click', function(e){
    //   console.log(e.target.id);
    // })

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