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
    const data = {
        email: email
    };
    var area;
    $.ajax({
        url: `/api/basic/findEmail`,
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(res){
            $("#loading-bg").hide()
            // Thay đổi chuỗi query string
            const newQueryString = `?email=${res.content}`;
            const currentPath = window.location.pathname;

            // Tạo URL mới
            const newUrl = currentPath + newQueryString;

            // Thay đổi chuỗi query string mà không điều hướng
            history.replaceState(null, null, newUrl);
        },
        error: function(xhr, status, error) {
          $("#loading-bg").hide()
          if (xhr.status == 400){
            const errorMessage = xhr.responseJSON?.message;
            alert(errorMessage);
          } 
          else{
            alert("Hệ thống bị lỗi");
          }
        }
    });

    // Get account info
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
            if(role == 1){
                $.get(`/api/quan/getDistrictByID/${info.id_district}`, function(data) {
                    area = data.content;
                    console.log("area: ", area);
                    $('#email').val(email);
                    $('#fullname').val(info.fullname);
                    $('#phone').val(info.phone);
                    $('#birthdate').val(info.birthdate);
                    $('#address').val('Quận ' + area.district);
                }).fail(function(error) {
                    console.log(error);
                });
            }
            if(role == 2){
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
            }
            if(role == 3){
                $('#email').val(email);
                $('#fullname').val(info.fullname);
                $('#phone').val(info.phone);
                $('#birthdate').val(info.birthdate);
                $('.manage_area').hide();
            }
        },
        error: function(error) {
          console.log(error);
        }
    });

    // Update info
    $('.btn-info').on('click', function() {
        const newFullname = $('#fullname').val();
        const newBirthdate = $('#birthdate').val();
        const newPhone = $('#phone').val();
        console.log(newFullname);
        console.log(newBirthdate);
        console.log(newPhone);
        if (newFullname === info.fullname && newBirthdate === info.birthdate && newPhone === info.phone) {
            alert('Không có thông tin nào được thay đổi. Vui lòng chỉnh sửa ít nhất một thông tin để cập nhật.');
            return;
        } 

        else{
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
    });

    // Change password
    $('.btn-pass').on('click', function() {
        const curPass = $('#curpass').val();
        const newPass = $('#newpass').val();
        const confirmPass = $('#cfpass').val();

        if (curPass.length < 8) {
            $('#curpass-error').text('Mật khẩu phải có ít nhất 8 kí tự.').show();
            $('#newpass-error').hide();
            $('#cfpass-error').hide();
            return;
        } else {
            $('#curpass-error').hide();
        }

        if (newPass.length < 8) {
            $('#newpass-error').text('Mật khẩu mới phải có ít nhất 8 kí tự.').show();
            $('#cfpass-error').hide();
            return;
        } else {
            $('#newpass-error').hide();
        }

        if (newPass === curPass) {
            $('#newpass-error').text('Mật khẩu mới trùng với mật khẩu hiện tại.').show();
            $('#cfpass-error').hide();
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
            beforeSend: function(){
                $("#loading-bg").show();
            },
            data: {
                cur_password: curPass,
                new_password: newPass
            },
            success: function (data) {
                $("#loading-bg").hide();
                
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

    // Forget password
    $('.btn-forget').on('click', function() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const otp_email = urlParams.get('email');
        const emailData = {email: otp_email};

        $.ajax({
            url: `/api/basic/sendEmail`,
            type: "POST",
            data: JSON.stringify(emailData),
            contentType: 'application/json',
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
          })
        
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
            <a class="pass-text resendmail" style="text-decoration: underline; color: #0B7B31; margin-top: -1rem; margin-bottom: 1rem; cursor: pointer;">Bạn không nhận được mã? Gửi lại mã OTP</a>
            <button type="button" class="btn style1-button btn-confirm">Xác nhận</button>
            <div style="margin-top: 6rem"></div>
        `;

        const btnBack = `
            <button type="button" class="btn style2-button btn-back">Quay lại</button>
        `
        $('.form-forget').html(formHtml).addClass('visible');
        const pos = document.querySelector('.btn-pass');
        pos.insertAdjacentHTML('afterend', btnBack);

        $(".resendmail").on("click",function(){
            console.log("resend")
            $.ajax({
                url: `/api/basic/sendEmail`,
                type: "POST",
                data: JSON.stringify(emailData),
                contentType: 'application/json',
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
            })
        });

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

            const otpData = {
                email: otp_email,
                OTP: otp
            }
              
            $.ajax({
                url: `/api/basic/checkOTP`,
                type: "POST",
                beforeSend: function(){
                    $("#loading-bg").show();
                },
                data: JSON.stringify(otpData),
                contentType: 'application/json',
                success: function(data){
                    $("#loading-bg").hide();
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
                        $.ajax({
                            url: `/api/basic/updatePasswordByOTP/${email}/${role}`,
                            type: 'POST',
                            beforeSend: function(){
                                $("#loading-bg").show();
                            },
                            data: {
                                new_password: forget_new_pass
                            },
                            success: function (data) {
                                $("#loading-bg").hide();
                                
                                alert('Mật khẩu đã được cập nhật thành công!');
                                setTimeout(function() {
                                    location.reload();
                                }, 1);
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    });
                },
                error: function(xhr, status, error) {
                    if (xhr.status == 400){
                        let errorMessage = JSON.parse(xhr.responseText).message; 
                        alert(errorMessage);
                    }else{
                        alert("Hệ thống bảo trì");
                    }
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