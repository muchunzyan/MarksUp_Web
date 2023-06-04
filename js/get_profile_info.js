function deleteProfilePicture() {
    let picPathArr = localStorage.getItem('profile_pic').split('/');
    let picName = picPathArr[picPathArr.length - 1];

    $.ajax({
        url: '/php/delete_profile_pic.php',
        type: 'POST',
        cache: false,
        data: {
            'userEmail': localStorage.getItem('user_email'),
            'picName': picName,
        },
        dataType: 'html',
        success: function (data) {
            if (data === "The picture was deleted successfully!") {
                localStorage.removeItem("profile_pic");
                myAlert(language === 'en' ?
                    data : "Фотография была успешно удалена!");
                setTimeout(function () {
                    window.open('/html/edit_profile.html', '_self');
                }, 1500);
            } else {
                alert(language === 'en' ? data :
                    "Произошла ошибка при удалении файла из базы данных.");
            }
        }
    });
}

let userInfoFd = new FormData();
if ((document.title === "My profile" || document.title === "Мой профиль") ||
    (document.title === "Edit profile" || document.title === "Редактирование профиля")) {
    userInfoFd.append('userId', localStorage.getItem('user_id'));
} else {
    userInfoFd.append('userId', localStorage.getItem('other_user_id'));
}

$.ajax({
    url: '/php/get_profile_info.php',
    type: 'POST',
    cache: false,
    data: userInfoFd,
    dataType: 'html',
    processData: false,
    contentType: false,
    success: function (data) {
        let data_arr = JSON.parse(data);

        if (document.title === "My profile" || document.title === "Мой профиль") {
            document.getElementById('userName').innerText = data_arr['name'];
            if (data_arr['profile_pic'] != null && data_arr['profile_pic'] !== '') {
                document.getElementById('userPhoto').src = data_arr['profile_pic'];
            }
            if (data_arr['age'] !== 0 && data_arr['age'] !== '0') {
                document.getElementById('userAge').innerText = data_arr['age'];
            } else {
                document.getElementById('userAge').innerText = 'none';
            }
            if (data_arr['city'] != null && data_arr['city'] !== '') {
                document.getElementById('userCity').innerText = data_arr['city'];
            } else {
                document.getElementById('userCity').innerText = 'none';
            }
            if (data_arr['educational_inst'] != null && data_arr['educational_inst'] !== '') {
                document.getElementById('userEducationalInst').innerText = data_arr['educational_inst'];
            } else {
                document.getElementById('userEducationalInst').innerText = 'none';
            }
            if (data_arr['rating'] != null && data_arr['rating'] !== '') {
                document.getElementById('userRating').innerText = data_arr['rating'];
            }
            if (data_arr['about_me'] != null && data_arr['about_me'] !== '') {
                document.getElementById('userAboutMe').innerText = data_arr['about_me'];
            } else {
                document.getElementById('userAboutMe').innerText =
                    language === 'en' ? 'There is nothing yet...' : 'Пока ничего нет...';
            }
        } else if (document.title === "Edit profile" || document.title === "Редактирование профиля") {
            document.getElementById('userNameInput').value = data_arr['name'];
            document.getElementById('languageSelect').value = data_arr['language'];
            if (data_arr['profile_pic'] != null && data_arr['profile_pic'] !== '') {
                localStorage.setItem('profile_pic', data_arr['profile_pic']);
                let userProfilePicInput = document.getElementById('userProfilePicInput');

                let userProfilePicImg = document.createElement('img');
                userProfilePicImg.src = data_arr['profile_pic'];
                userProfilePicImg.className = 'profile__img';

                let userProfileDeletePic = document.createElement('button');
                userProfileDeletePic.innerText = language === 'en' ?
                    'Delete picture' : 'Удалить изображение';
                userProfileDeletePic.type = 'button';
                userProfileDeletePic.className = 'delete__profile-pic__btn';
                userProfileDeletePic.onclick = deleteProfilePicture;

                let userProfilePicGroup = document.createElement('div');
                userProfilePicGroup.appendChild(userProfilePicImg);
                userProfilePicGroup.appendChild(userProfileDeletePic);

                userProfilePicInput.parentNode.replaceChild(userProfilePicGroup, userProfilePicInput);
            }

            document.getElementById('userAgeInput').value = data_arr['age'];
            document.getElementById('userCityInput').value = data_arr['city'];
            document.getElementById('userEducationalInstInput').value = data_arr['educational_inst'];
            document.getElementById('userAboutMeInput').value = data_arr['about_me'];
        } else if (document.title === "Other's profile" || document.title === "Чужой профиль") {
            document.getElementById('userName').innerText = data_arr['name'];
            if (data_arr['profile_pic'] != null && data_arr['profile_pic'] !== '') {
                document.getElementById('userPhoto').src = data_arr['profile_pic'];
            }
            if (data_arr['age'] !== 0 && data_arr['age'] !== '0') {
                document.getElementById('userAge').innerText = data_arr['age'];
            } else {
                document.getElementById('userAge').innerText = 'none';
            }
            if (data_arr['city'] != null && data_arr['city'] !== '') {
                document.getElementById('userCity').innerText = data_arr['city'];
            } else {
                document.getElementById('userCity').innerText = 'none';
            }
            if (data_arr['educational_inst'] != null && data_arr['educational_inst'] !== '') {
                document.getElementById('userEducationalInst').innerText = data_arr['educational_inst'];
            } else {
                document.getElementById('userEducationalInst').innerText = 'none';
            }
            if (data_arr['rating'] != null && data_arr['rating'] !== '') {
                document.getElementById('userRating').innerText = data_arr['rating'];
            }
            if (data_arr['about_me'] != null && data_arr['about_me'] !== '') {
                document.getElementById('userAboutMe').innerText = data_arr['about_me'];
            } else {
                document.getElementById('userAboutMe').innerText =
                    language === 'en' ? 'There is nothing yet...' : 'Пока ничего нет...';
            }

            let fd = new FormData();
            fd.append('userId', localStorage.getItem('user_id'));
            findTasks(fd);
        } else if (document.title === "Task information" || document.title === "Информация о задании") {
            document.getElementById('userName').innerText = data_arr['name'];
            if (data_arr['profile_pic'] != null && data_arr['profile_pic'] !== '') {
                document.getElementById('userPhoto').src = data_arr['profile_pic'];
            }
        }
    }
});