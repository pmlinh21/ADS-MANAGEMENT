$(document).ready(function () {
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
            if (email == "quan@gmail.com")
                localStorage.setItem('role', '1');
            if (email == "phuong@gmail.com")
                localStorage.setItem('role', '2');
            if (email == "so@gmail.com")
                localStorage.setItem('role', '3');
            window.location.href = "/";
        }
        
    });
});