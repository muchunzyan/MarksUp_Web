if (!document.getElementById('createSubjectNameForm') &&
    !document.getElementById('createConfirmTask')) {
    document.getElementById('backBtn').onclick = function () {
        history.back();
    }
}

if (document.getElementById('createSubjectNameForm')) {
    document.forms.createSubjectNameForm.onsubmit = function (e) {
        e.preventDefault();
        let subjectName = document.forms.createSubjectNameForm.subjectNameInput.value.trim();
        if (subjectName !== '') {
            $("#createSubjectNameForm").prop('disabled', true);
            localStorage.setItem('create_subject_name', subjectName);
            window.open('create_task_2.html', '_self');
        }
    }
}

if (document.getElementById('createEdInstForm')) {
    document.forms.createEdInstForm.universityEdInst.onclick = function (e) {
        e.preventDefault();
        if ($(this).text().trim() === 'Университет') {
            localStorage.setItem('create_ed_inst', 'University');
        } else {
            localStorage.setItem('create_ed_inst', $(this).text().trim());
        }
        document.forms.createEdInstForm.universityEdInst.classList.add('selected');
        document.forms.createEdInstForm.schoolEdInst.classList.remove('selected');
        document.forms.createEdInstForm.otherEdInst.classList.remove('selected');
    }
    document.forms.createEdInstForm.schoolEdInst.onclick = function (e) {
        e.preventDefault();
        if ($(this).text().trim() === 'Школа') {
            localStorage.setItem('create_ed_inst', 'School');
        } else {
            localStorage.setItem('create_ed_inst', $(this).text().trim());
        }
        document.forms.createEdInstForm.universityEdInst.classList.remove('selected');
        document.forms.createEdInstForm.schoolEdInst.classList.add('selected');
        document.forms.createEdInstForm.otherEdInst.classList.remove('selected');
    }
    document.forms.createEdInstForm.otherEdInst.onclick = function (e) {
        e.preventDefault();
        if ($(this).text().trim() === 'Другое') {
            localStorage.setItem('create_ed_inst', 'Other');
        } else {
            localStorage.setItem('create_ed_inst', $(this).text().trim());
        }
        document.forms.createEdInstForm.universityEdInst.classList.remove('selected');
        document.forms.createEdInstForm.schoolEdInst.classList.remove('selected');
        document.forms.createEdInstForm.otherEdInst.classList.add('selected');
    }
    document.forms.createEdInstForm.onsubmit = function (e) {
        e.preventDefault();
        if (localStorage.getItem('create_ed_inst') && localStorage.getItem('create_ed_inst') !== '') {
            $("#createEdInstForm").prop('disabled', true);
            window.open('create_task_3.html', '_self');
        }
    }
}

if (document.getElementById('createTaskTypeForm')) {
    document.forms.createTaskTypeForm.specificTaskType.onclick = function (e) {
        e.preventDefault();
        if ($(this).text().trim() === 'Определенная задача') {
            localStorage.setItem('create_task_type', 'Specific task');
        } else {
            localStorage.setItem('create_task_type', $(this).text().trim());
        }
        document.forms.createTaskTypeForm.specificTaskType.classList.add('selected');
        document.forms.createTaskTypeForm.fullTopicType.classList.remove('selected');
    }
    document.forms.createTaskTypeForm.fullTopicType.onclick = function (e) {
        e.preventDefault();
        if ($(this).text().trim() === 'Полная тема') {
            localStorage.setItem('create_task_type', 'Full topic');
        } else {
            localStorage.setItem('create_task_type', $(this).text().trim());
        }
        document.forms.createTaskTypeForm.specificTaskType.classList.remove('selected');
        document.forms.createTaskTypeForm.fullTopicType.classList.add('selected');
    }
    document.forms.createTaskTypeForm.onsubmit = function (e) {
        e.preventDefault();
        if (localStorage.getItem('create_task_type') && localStorage.getItem('create_task_type') !== '') {
            $("#createTaskTypeForm").prop('disabled', true);
            window.open('create_task_4.html', '_self');
        }
    }
}

if (document.getElementById('createDescriptionForm')) {
    document.forms.createDescriptionForm.onsubmit = function (e) {
        e.preventDefault();
        let description = document.forms.createDescriptionForm.taskDescriptionInput.value;
        if (description.trim() !== '') {
            $("#createDescriptionForm").prop('disabled', true);
            localStorage.setItem('create_description', description);
            window.open('create_task_5.html', '_self');
        }
    }
}

if (document.getElementById('createDeadlineForm')) {
    document.forms.createDeadlineForm.onsubmit = function (e) {
        e.preventDefault();
        let deadline = document.forms.createDeadlineForm.deadlineInput.value;
        if (deadline !== '') {
            $("#createDeadlineForm").prop('disabled', true);
            localStorage.setItem('create_deadline', deadline);
            window.open('create_task_6.html', '_self');
        }
    }
}

if (document.getElementById('createPriceForm')) {
    document.forms.createPriceForm.priceInput.onclick = function () {
        let price = document.forms.createPriceForm.priceInput.value.trim();
        localStorage.setItem('create_price', price);

        document.forms.createPriceForm.negotiatedPrice.classList.remove('selected');
    }
    document.forms.createPriceForm.priceInput.onchange = function () {
        let price = document.forms.createPriceForm.priceInput.value.trim();
        localStorage.setItem('create_price', price);
    }
    document.forms.createPriceForm.negotiatedPrice.onclick = function (e) {
        e.preventDefault();
        localStorage.setItem('create_price', 'Negotiated price');

        document.forms.createPriceForm.negotiatedPrice.classList.add('selected');
        document.forms.createPriceForm.priceInput.value = '';
    }
    document.forms.createPriceForm.onsubmit = function (e) {
        e.preventDefault();
        if (localStorage.getItem('create_price') && localStorage.getItem('create_price') !== '') {
            $("#createPriceForm").prop('disabled', true);
            window.open('create_task_7.html', '_self');
        } else {
            alert(language === 'en' ? "Fill price field or choose Negotiated" +
                " price." : "Заполните поле Цена или выберите Договорная цена.")
        }
    }
}

function displayAttachedImages() {
    let imagesArr = JSON.parse(localStorage.getItem('create_images'));
    if (imagesArr != null) {
        document.getElementById('photosAttached').innerHTML = '';
        for (let i = 0; i < imagesArr.length; i++) {
            let attached_photo = document.createElement('img');
            attached_photo.className = 'attached__photo';
            if (imagesArr[i].endsWith('.png') || imagesArr[i].endsWith('.jpg') || imagesArr[i].endsWith('.jpeg')) {
                attached_photo.src = imagesArr[i];
            } else {
                attached_photo.src = '/img/file.png';
                attached_photo.style.padding = '20px';
            }

            let photo_cross = document.createElement('img');
            photo_cross.className = 'photo__cross';
            photo_cross.src = '/img/cross.png';

            let att_photo_button = document.createElement('button');
            att_photo_button.className = 'att__photo__btn';
            att_photo_button.type = 'button';
            att_photo_button.id = 'attPhotoBtn' + (i + 1);
            att_photo_button.appendChild(attached_photo);
            att_photo_button.appendChild(photo_cross);

            if (i % 4 === 0) {
                let photos__attached__row = document.createElement('div')
                photos__attached__row.className = 'photos__attached__row';
                photos__attached__row.appendChild(att_photo_button);
                document.getElementById('photosAttached').appendChild(photos__attached__row);
            } else {
                let photos__attached__column = document.getElementById('photosAttached');
                photos__attached__column.lastChild.appendChild(att_photo_button);
            }
        }

        for (let button of document.getElementsByTagName("button")) {
            button.addEventListener("click", onButtonPress);
        }
    }
}

const onButtonPress = e => {
    let clickedButton = e.target.parentNode;
    if (clickedButton.id.startsWith('attPhotoBtn')) {
        let imageLink = clickedButton.children[0].src;
        let imageLinkArr = imageLink.split('/');
        let imageName = imageLinkArr[imageLinkArr.length - 1];
        let fd = new FormData();
        fd.append('imageName', imageName);
        $.ajax({
            url: '/php/delete_task_img.php',
            type: 'POST',
            cache: false,
            data: fd,
            dataType: 'html',
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#createImagesForm").prop('disabled', true);
            },
            success: function (data) {
                if (data === "Image deleted.") {
                    let imagesArr = JSON.parse(localStorage.getItem('create_images'));
                    let index = imagesArr.indexOf(imageLink);
                    if (index !== -1) {
                        imagesArr.splice(index, 1);
                    }
                    localStorage.setItem('create_images', JSON.stringify(imagesArr));
                    displayAttachedImages();
                } else {
                    alert(language === 'en' ? data :
                        'Произошла ошибка при удалении изображения с сервера.');
                }
            }
        });
    }
}

if (document.getElementById('createImagesForm')) {
    displayAttachedImages();

    document.forms.createImagesForm.photoInput.onchange = function () {
        let fd = new FormData(document.forms.createImagesForm);

        $.ajax({
            url: '/php/upload_task_photo.php',
            type: 'POST',
            cache: false,
            data: fd,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#createImagesForm").prop('disabled', true);
            },
            success: function (data) {
                if (data === "File upload to server failed, please try" +
                    " again.") {
                    alert(language === 'en' ? data : "Загрузка файла на" +
                        " сервер не удалась, попробуйте еще раз.");
                }
                if (data === "No image selected.") {
                    alert(language === 'en' ? data : "Изображение не выбрано.");
                } else {
                    if (localStorage.getItem('create_images') == null) {
                        localStorage.setItem('create_images', JSON.stringify([data]));
                    } else {
                        let imagesArr = JSON.parse(localStorage.getItem('create_images'));
                        imagesArr.push(data);
                        localStorage.setItem('create_images', JSON.stringify(imagesArr));
                    }

                    displayAttachedImages();
                }
            }
        });
    }

    document.forms.createImagesForm.onsubmit = function (e) {
        e.preventDefault();
        $("#createImagesForm").prop('disabled', true);
        window.open('create_task_8.html', '_self');
    }
}

if (document.getElementById('createConfirmTask')) {
    document.getElementById('subjectName').innerText = localStorage.getItem('create_subject_name');
    document.getElementById('deadline').innerText = localStorage.getItem('create_deadline');
    let price = localStorage.getItem('create_price');
    if (price !== "Negotiated price" && price !== "Договорная цена") {
        document.getElementById('price').innerText = price + '₽';
    } else {
        document.getElementById('price').innerText = price;
    }
    if (language === 'en') {
        document.getElementById('educationalInst').innerText = localStorage.getItem('create_ed_inst');
        document.getElementById('taskType').innerText = localStorage.getItem('create_task_type');
    } else {
        if (localStorage.getItem('create_ed_inst') === 'University') {
            document.getElementById('educationalInst').innerText = 'Университет';
        } else if (localStorage.getItem('create_ed_inst') === 'School') {
            document.getElementById('educationalInst').innerText = 'Школа';
        } else if (localStorage.getItem('create_ed_inst') === 'Other') {
            document.getElementById('educationalInst').innerText = 'Другое';
        }
        if (localStorage.getItem('create_task_type') === 'Specific task') {
            document.getElementById('taskType').innerText = 'Определенная задача';
        } else if (localStorage.getItem('create_task_type') === 'Full topic') {
            document.getElementById('taskType').innerText = 'Полная тема';
        }
    }
    document.getElementById('taskDescription').innerText = localStorage.getItem('create_description');

    let imagesArr = JSON.parse(localStorage.getItem('create_images'));
    if (imagesArr != null) {
        document.getElementById('photos').innerHTML = '';
        for (let i = 0; i < imagesArr.length; i++) {
            let attached_photo = document.createElement('img');
            attached_photo.className = 'task__card__img';
            if (imagesArr[i].endsWith('.png') || imagesArr[i].endsWith('.jpg') || imagesArr[i].endsWith('.jpeg')) {
                attached_photo.src = imagesArr[i];
            } else {
                attached_photo.src = '/img/file.png';
                attached_photo.style.padding = '10px';
            }
            attached_photo.onclick = function () {
                window.open(imagesArr[i]);
            }

            if (i % 5 === 0) {
                let photos__attached__row = document.createElement('div')
                photos__attached__row.className = 'task__info__images__row';
                photos__attached__row.appendChild(attached_photo);
                document.getElementById('photos').appendChild(photos__attached__row);
            } else {
                let photos__attached__column = document.getElementById('photos');
                photos__attached__column.lastChild.appendChild(attached_photo);
            }
        }
    }

    document.forms.createConfirmTask.onsubmit = function (e) {
        e.preventDefault();

        let fd = new FormData();
        fd.append('subjectName', localStorage.getItem('create_subject_name').replaceAll("\'", "\\\'"));
        fd.append('deadline', localStorage.getItem('create_deadline'));
        fd.append('price', localStorage.getItem('create_price'));
        fd.append('educationalInst', localStorage.getItem('create_ed_inst'));
        fd.append('taskType', localStorage.getItem('create_task_type'));
        fd.append('description', localStorage.getItem('create_description').replaceAll("\'", "\\\'"));
        fd.append('imagesLinks', localStorage.getItem('create_images'));
        fd.append('userId', localStorage.getItem('user_id'));

        $.ajax({
            url: '/php/create_task.php',
            type: 'POST',
            cache: false,
            data: fd,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#createConfirmTask").prop('disabled', true);
            },
            success: function (data) {
                if (data === "Task created successfully!") {
                    localStorage.removeItem('create_subject_name');
                    localStorage.removeItem('create_deadline');
                    localStorage.removeItem('create_price');
                    localStorage.removeItem('create_ed_inst');
                    localStorage.removeItem('create_task_type');
                    localStorage.removeItem('create_description');
                    localStorage.removeItem('create_images');

                    myAlert(language === 'en' ? data : 'Задание создано успешно!');
                    setTimeout(function () {
                        window.open('/html/my_tasks.html', '_self');
                    }, 1500);
                } else {
                    alert(data);
                }
            }
        });
    }

    document.getElementById('editBtn').onclick = function () {
        window.open('/html/edit_task.html', '_self');
    }
}
