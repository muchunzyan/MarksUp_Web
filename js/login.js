document.forms.loginForm.onsubmit = function (e) {
    e.preventDefault();

    let userEmailInput = document.forms.loginForm.emailInput.value;
    let userPasswordInput = document.forms.loginForm.passwordInput.value;

    $.ajax({
        url: '/php/login.php',
        type: 'POST',
        cache: false,
        data: {
            'userEmailInput': userEmailInput,
        },
        dataType: 'html',
        beforeSend: function () {
            $("#loginForm").prop('disabled', true);
        },
        success: function (data) {
            if (data === '0 results') {
                myAlert(language === 'en' ? "No such e-mail registered" :
                    "Такой e-mail не зарегистрирован");
                setTimeout(() => function () {
                    closeAlert();
                }, 1500);
            } else if (userPasswordInput === data.split(';')[0]) {
                localStorage.setItem("user_email", userEmailInput);
                localStorage.setItem("user_id", data.split(';')[1]);
                localStorage.setItem("profile_pic", data.split(';')[2]);
                localStorage.setItem("language", data.split(';')[3]);
                window.open('/index.html', '_self');
            } else {
                myAlert(language === 'en' ? "Wrong password" :
                    "Неверный пароль");
                setTimeout(() => function () {
                    closeAlert();
                }, 1500);
            }
            $("#loginForm").prop('disabled', false);
        }
    })
};
