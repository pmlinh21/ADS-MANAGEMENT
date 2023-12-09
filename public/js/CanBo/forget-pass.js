$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email');
  $("span.email").val(email);
  
  $(".resend").on("click",function(){
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
  })

  $(".forget-pass-form ").on("click", ".style1-button", function(){
    const OTP = $("#OTP").val()
    if ( OTP == "")
      alert("Bạn chưa nhập OTP")
    else if ( OTP.length != 6)
      alert("OTP không hợp lệ")
    else{
      $("#OTP").val("")

      $.ajax({
        url: `/api/basic/checkOTP/${email}/${OTP}`,
        type: "POST",
        success: function(data){
          $(".new-pass-form ").show()
          $(".forget-pass-form").hide()
          $("#new-pass").val("")
          $("#confirm-pass").val("")
        },
        error: function(xhr, status, error) {
          if (xhr.status == 400){
            let errorMessage = JSON.parse(xhr.responseText).message; // Get the error message from the response
            alert(errorMessage);
          }else{
            alert("Hệ thống bảo trì");
          }
        }

      })
      
    }
  })

  $(".new-pass-form ").on("click", ".style1-button", function(){
    const newPass = $("#new-pass").val()
    const confirmPass = $("#confirm-pass").val()
    if (newPass.length < 8) 
      alert("Mật khẩu phải có ít nhất 8 kí tự")
    else if (newPass !== confirmPass) {
      alert("Mật khẩu xác nhận phải trùng khớp với mật khẩu mới")
    }
    else{
      console.log(email, newPass)

      var passData = {
        email: email,
        password: confirmPass
      };

      $.ajax({
        url: `/api/basic/createNewPwd`,
        type: 'POST',
        data: JSON.stringify(passData),
        contentType: 'application/json',
        success: function(response) {
          window.location.href = "/login"
          console.log(response);
        },
        error: function(xhr, status, error) {
          // Handle the error here
          console.error(error);
        }
      })

      
    }
  })
})