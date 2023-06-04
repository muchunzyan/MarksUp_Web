function displayAttachedImages() {
    document.getElementById('photosAttached').innerHTML = '';
    let imagesArr = JSON.parse(localStorage.getItem('create_images'));
    if (imagesArr != null && imagesArr.length !== 0) {
        for (let i = 0; i < imagesArr.length; i++) {
            let attached_photo = document.createElement('img');
            attached_photo.className = 'attached__photo';
            attached_photo.src = imagesArr[i];

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

    let photoInputLabel = document.createElement('label');
    photoInputLabel.htmlFor = 'photoInput';
    photoInputLabel.className = 'add__photo__btn';

    let photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.id = 'photoInput';
    photoInput.name = 'photoInput';
    photoInput.accept = "image/png, image/jpeg, image/jpg";

    photoInput.onchange = function () {
        let fd = new FormData(document.forms.editTaskForm);

        $.ajax({
            url: '/php/upload_task_photo.php',
            type: 'POST',
            cache: false,
            data: fd,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#editTaskForm").prop('disabled', true);
            },
            success: function (data) {
                if (data === "File upload to server failed, please try" +
                    " again.") {
                    alert(language === 'en' ? data : "Загрузка файла на" +
                        " сервер не удалась, попробуйте еще раз.");
                } else if (data === "No image selected.") {
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

    let photoInputSpan = document.createElement('span');
    photoInputSpan.innerText = language === 'en' ? 'Attach photo' : 'Прикрепить фото';

    photoInputLabel.appendChild(photoInput);
    photoInputLabel.appendChild(photoInputSpan);

    let photosAttached = document.getElementById('photosAttached');
    if (photosAttached.childNodes.length === 4 ||
        photosAttached.childNodes.length === 0) {
        let photos__attached__row = document.createElement('div')
        photos__attached__row.className = 'photos__attached__row';
        photos__attached__row.appendChild(photoInputLabel);
        document.getElementById('photosAttached').appendChild(photos__attached__row);
    }
    photosAttached.lastChild.appendChild(photoInputLabel);
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
                if (data === "There was a error deleting the image from server.") {
                    alert(language === 'en' ? data : "Произошла ошибка при" +
                        " удалении изображения с сервера.");
                } else {
                    let imagesArr = JSON.parse(localStorage.getItem('create_images'));
                    let index = imagesArr.indexOf(imageLink);
                    if (index !== -1) {
                        imagesArr.splice(index, 1);
                    }
                    localStorage.setItem('create_images', JSON.stringify(imagesArr));
                    displayAttachedImages();
                }
            }
        });
    }
}

document.getElementById('subjectNameInput').value = localStorage.getItem('create_subject_name');
document.getElementById('educationalInstSelect').value = localStorage.getItem('create_ed_inst');
document.getElementById('taskTypeSelect').value = localStorage.getItem('create_task_type');
document.getElementById('taskDescriptionInput').value = localStorage.getItem('create_description');
document.getElementById('deadlineInput').value = localStorage.getItem('create_deadline');
let price = localStorage.getItem('create_price');
if (price !== "Negotiated price" && price !== "Договорная цена") {
    document.getElementById('priceInput').value = price;
} else {
    document.getElementById('negotiatedPrice').classList.add('selected');
}

displayAttachedImages();

document.forms.editTaskForm.priceInput.onclick = function () {
    let price = document.forms.editTaskForm.priceInput.value.trim();
    localStorage.setItem('create_price', price);

    document.forms.editTaskForm.negotiatedPrice.classList.remove('selected');
}
document.forms.editTaskForm.priceInput.onchange = function () {
    let price = document.forms.editTaskForm.priceInput.value.trim();
    localStorage.setItem('create_price', price);
}
document.forms.editTaskForm.negotiatedPrice.onclick = function (e) {
    e.preventDefault();
    localStorage.setItem('create_price', $(this).text().trim());

    document.forms.editTaskForm.negotiatedPrice.classList.add('selected');
    document.forms.editTaskForm.priceInput.value = '';
}

document.forms.editTaskForm.onsubmit = function (e) {
    e.preventDefault();

    let fd = new FormData();
    fd.append('subjectName', document.getElementById('subjectNameInput').value.replaceAll("\'", "\\\'"));
    fd.append('educationalInst', document.getElementById('educationalInstSelect').value);
    fd.append('taskType', document.getElementById('taskTypeSelect').value);
    fd.append('description', document.getElementById('taskDescriptionInput').value.replaceAll("\'", "\\\'"));
    fd.append('deadline', document.getElementById('deadlineInput').value);
    fd.append('price', localStorage.getItem('create_price'));
    fd.append('imagesLinks', localStorage.getItem('create_images'));
    fd.append('userId', localStorage.getItem('user_id'));

    let taskId = localStorage.getItem('task_id');
    if (taskId != null && taskId !== '') {
        fd.append('taskId', taskId);
    }

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

                let title;
                if (taskId != null && taskId !== '') {
                    title = language === 'en' ?
                        'Task updated successfully!' :
                        'Задание успешно обновлено!';
                } else {
                    title = data;
                }

                myAlert(title);
                setTimeout(function () {
                    window.open('/html/my_tasks.html', '_self');
                }, 1500);
            } else {
                alert(data);
            }
        }
    });
}

document.getElementById('deleteBtn').onclick = function () {
    let taskId = localStorage.getItem('task_id');
    let fd = new FormData();
    fd.append('taskId', taskId);

    myAlertWithBtns(language === 'en' ?
        'Are you sure you want to delete this task?' :
        'Вы уверены, что хотите удалить это задание?',
        function () {
        $.ajax({
            url: '/php/delete_task.php',
            type: 'POST',
            cache: false,
            data: fd,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data === "Task deleted successfully!") {
                    myAlert(data);
                    setTimeout(function () {
                        window.open('/html/my_tasks.html', '_self');
                    }, 1500);
                } else {
                    alert(data);
                }
            }
        });
    });
}

document.getElementById('backBtn').onclick = function () {
    let taskId = localStorage.getItem('task_id');
    if (taskId != null && taskId !== '') {
        localStorage.removeItem('create_subject_name');
        localStorage.removeItem('create_deadline');
        localStorage.removeItem('create_price');
        localStorage.removeItem('create_ed_inst');
        localStorage.removeItem('create_task_type');
        localStorage.removeItem('create_description');
        localStorage.removeItem('create_images');
        localStorage.removeItem('task_id');
    }
    history.back();
}
