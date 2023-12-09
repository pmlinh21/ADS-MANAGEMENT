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
          const loginInfo = new FormData();
          loginInfo.append('email', email);
          loginInfo.append('pwd', password);
          
          $('#email').val("");
          $('#password').val("");

          $.ajax({
            url: `/api/basic/login`,
            type: 'POST',
            data: loginInfo,
            processData: false,
            contentType: false,
            success: function(response) {
              console.log(response);

              var date = new Date();
              date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
              expires = "; expires=" + date.toUTCString();

              document.cookie = "token" + "=" + response.content + expires + "; path=/";

              // const role = response.content.role
              // localStorage.setItem('email', response.content.info.email)
              // localStorage.setItem('role', role)
              // if (role == "1")
              //   localStorage.setItem('id_district', response.content.info.id_district)
              // if (role == "2")
              //   localStorage.setItem('id_ward', response.content.info.id_ward)
              window.location.href = "/"
            },
            error: function(xhr, status, error) {
              if (xhr.status === 400 || xhr.status === 500) {
                // Handle specific 400 error
                const errorMessage = xhr.responseJSON?.message;
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
      $.ajax({
        url: `/api/basic/sendEmail/${email}`,
        type: "POST",
        beforeSend: function (data) {
        },
        success: function(data){
          $(".login-form").hide()
          $(".user-icon").hide()
          $('#enter-email').val("");
          window.location.href = '/forget-pass?email=' + email;
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
      $.ajax({
        url: `/api/basic/sendEmail/${email}`,
        type: "POST",
        beforeSend: function (data) {
        },
        success: function(data){
          $('#enter-email').val("");
          window.location.href = '/forget-pass?email=' + email;
        },
        error: function(xhr, status, error) {
          if (xhr.status == 400){
            let errorMessage = JSON.parse(xhr.responseText).message; // Get the error message from the response
            alert(errorMessage);
          }else{
            // console.log(status, error, xhr.responseText)
            alert("Gửi mail thất bại");
          }
        }
      })
    } 
  })
});