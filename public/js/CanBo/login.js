$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const status = urlParams.get('status');

  if (status === "unsuccessful") {
    alert("Login unsuccessfully");
  }

  const loginBtn = $('#login-button');
  loginBtn.on('click', function (e) {
      e.preventDefault();

      const email = $('#email').val();
      const password = $('#password').val();

      if (!email) {
          alert('Email không được để trống');
          return;
      }
      else if (email.indexOf('@') == -1 || (email.indexOf('@') == email.length - 1)) {
          alert('Email không hợp lệ');
          return;
      }
      else if (!password) {
          alert('Mật khẩu không được để trống');
          return;
      }
      else{
          $("#loading-bg").show()
          const loginInfo = new FormData();
          loginInfo.append('email', email);
          loginInfo.append('pwd', password);

          $.ajax({
            url: `/api/basic/login`,
            type: 'POST',
            data: loginInfo,
            processData: false,
            contentType: false,
            success: function(response) {
              console.log(response);
              $("#loading-bg").hide()
              var date = new Date();
              date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
              expires = "; expires=" + date.toUTCString();

              document.cookie = "token" + "=" + response.content + expires + "; path=/";
              window.location.href = "/"
            },
            error: function(xhr, status, error) {
              if (xhr.status === 400 || xhr.status === 500) {
                $("#loading-bg").hide()
                // Handle specific 400 error
                const errorMessage = xhr.responseJSON?.message;
                $('#email').val("");
                $('#password').val("");
                alert(errorMessage);
              } 
            }
          });

            
          // window.location.href = "/";
      }
      
  });

  $("a.forget-pass").on("click", function(){
    const email = $('#email').val();

    if (email != ""){
      
      $('#email').val("");
      $(".user-icon").hide()
      $('#enter-email').val("");
      window.location.href = '/forget-pass?email=' + email;

    } else if (email == ""){
      $(".login-form").hide()
      $(".user-icon").hide()
      $(".enter-email-form").show()
      $(".key-icon").show()
    }

  })

  $(".enter-email-form").on("click", " .style2-button", function(){
    $(".login-form").show()
    $(".user-icon").show()
    $(".enter-email-form ").hide()
    $(".key-icon").hide()
    $('#enter-email').val("")
  })

  $(".enter-email-form ").on("click", ".style1-button", function(){
    const email = $('#enter-email').val();
    if (email == "")
      alert ("Nhập email để thay đổi mật khẩu")
    else{
      $("#loading-bg").show()
      $('#enter-email').val("");
          window.location.href = '/forget-pass?email=' + email;
    } 
  })
});