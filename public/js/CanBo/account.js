$(document).ready(function() {
    const storedCBPhuong = localStorage.getItem('cbphuong');
    let cbphuong = storedCBPhuong ? JSON.parse(storedCBPhuong) : [];
    console.log("cbphuong:", cbphuong );
    const email = localStorage.getItem('email');
    let info = cbphuong.find(item => item[0] === email);
    console.log("info:", info );

    let district = [
        [1, 'Quận 1'], [2, 'Quận 2'], [3, 'Quận 3'], [4, 'Quận 4'], [5, 'Quận 5'], [6, 'Quận 6'], [7, 'Quận 7'],
        [8, 'Quận 8'], [9, 'Quận 9'], [10, 'Quận 10'], [11, 'Quận 11'], [12, 'Quận 12'],
    ];

    let ward = [
        [1, 'Bến Nghé', '1'], [2, 'Bến Thành', '1'], [3, 'Cầu Kho', '1'], [4, 'Cầu Ông Lãnh', '1'], [5, 'Cô Giang', '1'], 
        [6, 'Đa Kao', '1'], [7, 'Nguyễn Cư Trinh', '1'], [8, 'Nguyễn Thái Bình', '1'], [9, 'Phạm Ngũ Lão', '1'], [10, 'Tân Định', '1'], 
        [11, 'An Khánh', '2'], [12, 'An Lợi Đông', '2'], [13, 'An Phú', '2'], [14, 'Bình An', '2'], [15, 'Bình Khánh', '2'], 
        [16, 'Cát Lái', '2'], [17, 'Thạnh Mỹ Lợi', '2'], [18, 'Thảo Điền', '2'], [19, 'Thủ Thiêm', '2'], [20, 'Bình Trưng Đông', '2'], 
        [21, '1', '3'], [22, '2', '3'], [23, '3', '3'], [24, '4', '3'], [25, '5', '3'], [26, '9', '3'], [27, '10', '3'],
        [28, '11', '3'], [29, '12', '3'], [30, '13', '3'], [31, '14', '3'], [32, 'Võ Thị Sáu', '3'],
        [33, '1', '4'], [34, '2', '4'], [35, '3', '4'], [36, '4', '4'], [37, '6', '4'], [38, '8', '4'], [39, '9', '4'], [40, '10', '4'],
        [41, '13', '4'], [42, '14', '4'], [43, '15', '4'], [44, '16', '4'], [45, '18', '4']
    ];

    if (info.length > 0) {
        $('#email').val(info[0]);
        $('#fullname').val(info[1]);
        $('#phone').val(info[3]);
        $('#birthdate').val(info[4]);
        $('#address').val('Phường ' + info[5] + ', ' + district[ward[info[5] - 1][2]][1]);
    }
  
    // Update info
    $('.btn-info').on('click', function() {
        const newFullname = $('#fullname').val();
        const newBirthdate = $('#birthdate').val();
        const newPhone = $('#phone').val();
        
        if (newFullname.trim() === '') {
            $('#fullname-error').text('Vui lòng nhập họ và tên.').show();
            return;
        } else {
            $('#fullname-error').hide();
        }
      
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (newBirthdate.trim() === '' || !birthdateRegex.test(newBirthdate)) {
            $('#birthdate-error').text('Vui lòng nhập ngày tháng năm sinh đúng định dạng.').show();
            return;
        } else {
            $('#birthdate-error').hide();
        }
      
        const phoneRegex = /^\d+$/;
        if (newPhone.trim() === '' || !phoneRegex.test(newPhone)) {
            $('#phone-error').text('Vui lòng nhập số điện thoại chỉ chứa số.').show();
            return;
        } else {
            $('#phone-error').hide();
        }

        const indexToUpdate = cbphuong.findIndex(item => item[0] === email);

        cbphuong[indexToUpdate][1] = newFullname;
        cbphuong[indexToUpdate][4] = newBirthdate;
        cbphuong[indexToUpdate][3] = newPhone;

        localStorage.setItem('cbphuong', JSON.stringify(cbphuong));
        location.reload();
    });

    $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // Change password
    $('.btn-pass').on('click', function() {
        const curPass = $('#curpass').val();
        const newPass = $('#newpass').val();
        const confirmPass = $('#cfpass').val();
        
        const storedPassword = info[2]; 
        if (curPass !== storedPassword) {
            $('#curpass-error').text('Mật khẩu hiện tại không chính xác.').show();
            return;
        } else {
            $('#curpass-error').hide();
        }

        if (newPass.length < 8) {
            $('#newpass-error').text('Mật khẩu mới phải có ít nhất 8 kí tự.').show();
            return;
        } else {
            $('#newpass-error').hide();
        }

        if (newPass !== confirmPass) {
            $('#cfpass-error').text('Xác nhận mật khẩu mới không khớp.').show();
            return;
        } else {
            $('#cfpass-error').hide();
        }
        const indexToUpdate = cbphuong.findIndex(item => item[0] === email);

        cbphuong[indexToUpdate][2] = confirmPass;
        localStorage.setItem('cbphuong', JSON.stringify(cbphuong));
        alert('Mật khẩu đã được cập nhật thành công!');
        setTimeout(function() {
            location.reload();
        }, 1000);
    });
  
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
  })