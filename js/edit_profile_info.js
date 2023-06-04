document.forms.editProfileForm.onsubmit = function (e) {
    e.preventDefault();

    let fd = new FormData(document.forms.editProfileForm);
    fd.append('userEmail', localStorage.getItem("user_email"));

    $.ajax({
        url: '/php/edit_profile_info.php',
        type: 'POST',
        cache: false,
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $("#editProfileForm").prop('disabled', true);
        },
        success: function (data) {
            console.log(data);
            if (data.includes("Your data has been updated!")) {
                if (data.split(';').length > 1) {
                    localStorage.setItem("profile_pic", data.split(';')[0]);
                }
                localStorage.setItem('language',
                    document.forms.editProfileForm.languageSelect.value);

                myAlert(language === 'en' ?
                    "Your data has been updated!" : 'Ваши данные были обновлены!');
                setTimeout(function () {
                    window.open('/html/my_profile.html', '_self');
                }, 1500);
            } else {
                alert(data);
            }
        }
    })
};

document.forms.editProfileForm.cancelProfileEdit.onclick = function () {
    history.back();
}
