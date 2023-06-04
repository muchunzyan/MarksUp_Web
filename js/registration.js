document.getElementById('languageSelect').value = localStorage.getItem('language');

document.forms.registrationForm.onsubmit = function (e) {
    e.preventDefault();

    let registrationFd = new FormData();
    registrationFd.append('userNameInput', document.forms.registrationForm.nameInput.value);
    registrationFd.append('userEmailInput', document.forms.registrationForm.emailInput.value);
    registrationFd.append('userPasswordInput', document.forms.registrationForm.passwordInput.value);
    registrationFd.append('userLanguageInput', document.forms.registrationForm.languageSelect.value);

    $.ajax({
        url: '/php/registration.php',
        type: 'POST',
        cache: false,
        data: registrationFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        beforeSend: function () {
            $("#registrationForm").prop('disabled', true);
        },
        success: function (data) {
            if (data === "New record created successfully") {
                window.open('/html/login.html', '_self')
            } else {
                alert(data);
            }
        }
    })
};
