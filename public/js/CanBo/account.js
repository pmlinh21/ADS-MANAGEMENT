$(document).on('click', '.toggle-password', function() {
    $(this).toggleClass('fa-eye fa-eye-slash');
    var input = $($(this).attr('toggle'));
    if (input.attr('type') == 'password') {
        input.attr('type', 'text');
    } else {
        input.attr('type', 'password');
    }
});

$(document).ready(function() {
    const role = parseInt(localStorage.getItem('role'));
    var info, email, cbquan, cbphuong
    if (role == 1){
        const storedCBQuan = localStorage.getItem('cbquan');
        cbquan = storedCBQuan ? JSON.parse(storedCBQuan) : [];
        console.log("cbquan:", cbquan );
        email = localStorage.getItem('email');
        info = cbquan.find(item => item[0] === email);
    }
    else if (role == 2){
        const storedCBPhuong = localStorage.getItem('cbphuong');
        cbphuong = storedCBPhuong ? JSON.parse(storedCBPhuong) : [];
        console.log("cbphuong:", cbphuong );
        email = localStorage.getItem('email');
        info = cbphuong.find(item => item[0] === email);
    }
    
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
        if (role == 2)
            $('#address').val('Phường ' + info[5] + ', ' + district[ward[info[5] - 1][2] - 1][1]);
        else if (role == 1)
            $('#address').val(district[info[5] - 1][1]);
        else if (role == 3)
            $('#address').hide();
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

        if (role == 2){
            const indexToUpdate = cbphuong.findIndex(item => item[0] === email);

            cbphuong[indexToUpdate][1] = newFullname;
            cbphuong[indexToUpdate][4] = newBirthdate;
            cbphuong[indexToUpdate][3] = newPhone;

            localStorage.setItem('cbphuong', JSON.stringify(cbphuong));
        }
        else if (role == 1){
            const indexToUpdate = cbquan.findIndex(item => item[0] === email);

            cbquan[indexToUpdate][1] = newFullname;
            cbquan[indexToUpdate][4] = newBirthdate;
            cbquan[indexToUpdate][3] = newPhone;

            localStorage.setItem('cbquan', JSON.stringify(cbquan));            
        }
        
        location.reload();
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

        if (role == 2){
            const indexToUpdate = cbphuong.findIndex(item => item[0] === email);

            cbphuong[indexToUpdate][2] = confirmPass;
            localStorage.setItem('cbphuong', JSON.stringify(cbphuong));
            alert('Mật khẩu đã được cập nhật thành công!');
            setTimeout(function() {
                location.reload();
            }, 1);           
        }
        else if (role == 1){
            const indexToUpdate = cbquan.findIndex(item => item[0] === email);

            cbquan[indexToUpdate][2] = confirmPass;
            localStorage.setItem('cbquan', JSON.stringify(cbquan));
            alert('Mật khẩu đã được cập nhật thành công!');
            setTimeout(function() {
                location.reload();
            }, 1);
        }
    });
  
    $('.btn-forget').on('click', function() {
        const formHtml = `
            <div class="col-md-12">
                <label class="form-label" style="font-weight: 600; font-size: 1rem;">Quên mật khẩu</label>
            </div>
            <div class="col-md-12">
                <label for="otp" class="form-label">Mã OTP</label>
                <input type="text" class="form-control pass-details" id="otp">
                <div class="error-message mt-2" id="otp-error"></div>
            </div>

            <p class="pass-text" >Chúng tôi đã gửi một mã xác minh gồm 6 chữ số đến địa chỉ email của bạn.</p>
            <p class="pass-text" style="text-decoration: underline; color: #0B7B31; margin-top: -1rem; cursor: pointer;">Bạn không nhận được mã? Gửi lại mã OTP</p>
            <button type="button" class="btn style1-button btn-confirm">Xác nhận</button>
            <div style="margin-top: 9rem"></div>
        `;
        const btnBack = `
            <button type="button" class="btn style2-button btn-back" style="margin-left: 26.5rem;">Quay lại</button>
        `
        $('.form-forget').html(formHtml).addClass('visible');
        const pos = document.querySelector('.btn-pass');
        pos.insertAdjacentHTML('afterend', btnBack);

        $('.btn-back').on('click', function() {
            $('.form-forget').removeClass('visible');
            $('.btn-back').remove();
        });

        $('.btn-confirm').on('click', function() {
            const otp = $('#otp').val();
            if (otp.trim() === '') {
                $('#otp-error').text('Vui lòng nhập otp').show();
                return;
            }
            const otpRegex = /^\d+$/;
            if (!otpRegex.test(otp)) {
                $('#otp-error').text('Vui lòng nhập otp chỉ chứa số.').show();
                return;
            }
            if (otp.length != 6) {
                $('#otp-error').text('Mã OTP phải gồm 6 chữ số.').show();
                return;
            }
            $('.form-forget').removeClass('visible');
            const formHtml = `
            <div class="col-md-12">
                <label class="form-label" style="font-weight: 600; font-size: 1rem;">Quên mật khẩu</label>
            </div>
            <div class="col-md-12" style="margin-top: -5px;">
                <label for="pass" class="form-label">Mật khẩu mới</label>
                <input type="password" class="form-control pass-details" id="pass">
                <span toggle="#pass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                <div class="error-message" id="pass-error"></div>
            </div>
    
            <p class="pass-text" style="margin-top: -0.5rem; margin-bottom: -0.5rem;">Mật khẩu phải có ít nhất 8 kí tự</p>
            <button type="button" class="btn style1-button btn-confirm-new">Xác nhận</button>
            <div style="margin-top: 10rem"></div>
            `;
            $('.form-forget').html(formHtml).addClass('visible');

            $('.btn-confirm-new').on('click', function() {
                const forget_new_pass = $('#pass').val();
        
                if (forget_new_pass.length < 8) {
                    $('#pass-error').text('Mật khẩu mới phải có ít nhất 8 kí tự.').show();
                    return;
                } else {
                    $('#pass-error').hide();
                }
                if (role == 2){
                    const indexToUpdate = cbphuong.findIndex(item => item[0] === email);
        
                    cbphuong[indexToUpdate][2] = forget_new_pass;
                    localStorage.setItem('cbphuong', JSON.stringify(cbphuong));
                    alert('Mật khẩu đã được cập nhật thành công!');
                    setTimeout(function() {
                        location.reload();
                    }, 10);           
                }
                else if (role == 1){
                    const indexToUpdate = cbquan.findIndex(item => item[0] === email);
        
                    cbquan[indexToUpdate][2] = forget_new_pass;
                    localStorage.setItem('cbquan', JSON.stringify(cbquan));
                    alert('Mật khẩu đã được cập nhật thành công!');
                    setTimeout(function() {
                        location.reload();
                    }, 10);
                }
            });
        });
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