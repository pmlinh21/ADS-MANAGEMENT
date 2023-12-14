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
    var info;

    if (role == 1){
        
    }
    else if (role == 2){
        $.ajax({
            url:`/api/basic/getAccountInfo/${email}/${role}`,
            type: 'GET',
            beforeSend: function(){
              $("#loading-bg").show()
            },
            success: function(data) {
                $("#loading-bg").hide();
                info = data.content;
                console.log("info: ", info );
                var area;
                $.get(`/api/quan/getWardAndDistrict/${info.id_ward}`, function(data) {
                    area = data.content;
                    console.log("area: ", area);
                    $('#email').val(email);
                    $('#fullname').val(info.fullname);
                    $('#phone').val(info.phone);
                    $('#birthdate').val(info.birthdate);
                    $('#address').val('Phường ' + area.ward + ', Quận ' + area.district);
                }).fail(function(error) {
                    console.log(error);
                });

                
            },
            error: function(error) {
              console.log(error);
            }
        })
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
            $.ajax({
                url: `/api/basic/updateInfo/${email}/${role}`,
                type: 'POST',
                data: {
                    fullname: newFullname,
                    birthdate: newBirthdate,
                    phone: newPhone
                },
                beforeSend: function () {
                    $("#loading-bg").show()
                },
                success: function (data) {
                    $("#loading-bg").hide();
                    location.reload();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
        else if (role == 1){
                     
        }
        
        
    });

    // Change password
    $('.btn-pass').on('click', function() {
        const curPass = $('#curpass').val();
        const newPass = $('#newpass').val();
        const confirmPass = $('#cfpass').val();
        
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

        $.ajax({
            url: `/api/basic/updatePwd/${email}/${role}`,
            type: 'POST',
            data: {
                cur_password: curPass,
                new_password: newPass
            },
            success: function (data) {
                console.log(data.message);
                if(data.message == "Update thành công"){
                    $('#curpass-error').hide();
                    alert('Mật khẩu đã được cập nhật thành công!');
                    setTimeout(function() {
                        location.reload();
                    }, 1);
                }
                else if(data.message == "Mật khẩu hiện tại không chính xác"){
                    $('#curpass-error').text('Mật khẩu hiện tại không chính xác.').show();
                    return;
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
  
    $('.btn-forget').on('click', function() {
        $.ajax({
            url: `/api/basic/sendEmail/${email}`,
            type: "POST",
            success: function(data){
              
            },
            error: function(xhr, status, error) {
              if (xhr.status == 400){
                let errorMessage = JSON.parse(xhr.responseText).message;
                alert(errorMessage);
              }else{
                alert("Gửi mail thất bại");
              }
            }
        });
        
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
            <a class="pass-text resendmail" style="text-decoration: underline; color: #0B7B31; margin-top: -1rem; cursor: pointer;">Bạn không nhận được mã? Gửi lại mã OTP</a>
            <button type="button" class="btn style1-button btn-confirm">Xác nhận</button>
            <div style="margin-top: 9rem"></div>
        `;
        
        $(".resendmail").on("click",function(){
            console.log("resend")
            $.ajax({
              url: `/api/basic/sendEmail/${email}`,
              type: "POST",
              beforeSend: function (data) {
              },
              success: function(data){
              },
              error: function(xhr, status, error) {
                
                if (xhr.status == 400){
                  let errorMessage = JSON.parse(xhr.responseText).message; // Get the error message from the response
                  alert(errorMessage);
                }else{
                  alert("Gửi mail thất bại");
                }
              }
            })
        });

        const btnBack = `
            <button type="button" class="btn style2-button btn-back" style="margin-left: 27.9rem;">Quay lại</button>
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