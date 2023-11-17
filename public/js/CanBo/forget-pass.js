$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email');
  $("span.email").val(email);
  
  $(".forget-pass-form ").on("click", ".style1-button", function(){
    const OTP = $("#OTP").val()
    if ( OTP == "")
      alert("Bạn chưa nhập OTP")
    else{
      $(".new-pass-form ").show()
      $(".forget-pass-form").hide()
      $("#new-pass").val("")
      $("#confirm-pass").val("")
    }
  })

  $(".new-pass-form ").on("click", ".style2-button", function(){
    $(".forget-pass-form ").show()
    $("#OTP").val("")
    $(".new-pass-form").hide()
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
    // update db
      window.location.href = "/login"
    }
  })
})