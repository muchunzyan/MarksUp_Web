let getTasksFd = new FormData();
getTasksFd.append('userId', localStorage.getItem('user_id'));

$.ajax({
    url: '/php/get_my_tasks.php',
    type: 'POST',
    cache: false,
    data: getTasksFd,
    dataType: 'html',
    processData: false,
    contentType: false,
    success: function (data) {
        let dataArr = [];
        let dataString = data.split('}');
        dataString.splice(-1);
        for (let i = 0; i < dataString.length; i++) {
            dataString[i] = dataString[i] + '}';
            dataString[i] = $.parseJSON(dataString[i]);
            dataArr.push(dataString[i]);
        }

        let myTasks = document.getElementById('myTasks');
        if (dataArr.length > 0) {
            for (let i = 0; i < dataArr.length; i++) {
                let taskCardDeleteImg = document.createElement('img');
                taskCardDeleteImg.src = '/img/delete.png';

                let taskCardDeleteBtn = document.createElement('button');
                taskCardDeleteBtn.className = 'task__card__delete__btn';
                taskCardDeleteBtn.appendChild(taskCardDeleteImg);
                taskCardDeleteBtn.onclick = function (e) {
                    let taskId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id.split('taskCard')[1];
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
                                    myAlert(language === 'en' ? data :
                                        'Задание удалено успешно!');
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

                let taskCardEditBtn = document.createElement('button');
                taskCardEditBtn.className = 'task__card__edit__btn';
                taskCardEditBtn.innerText = language === 'en' ?
                    'Edit' : 'Изменить';
                taskCardEditBtn.onclick = function (e) {
                    let taskId = e.target.parentNode.parentNode.parentNode.parentNode.id.split('taskCard')[1];

                    localStorage.setItem('create_subject_name', dataArr[i]['subject_name']);
                    localStorage.setItem('create_ed_inst', dataArr[i]['educational_inst']);
                    localStorage.setItem('create_task_type', dataArr[i]['task_type']);
                    localStorage.setItem('create_description', dataArr[i]['description']);
                    localStorage.setItem('create_deadline', dataArr[i]['deadline']);
                    localStorage.setItem('create_price', dataArr[i]['price']);
                    localStorage.setItem('create_images', dataArr[i]['images_links']);
                    localStorage.setItem('task_id', taskId);

                    window.open('/html/edit_task.html', '_self');
                }

                let taskCardBtnsRow = document.createElement('div');
                taskCardBtnsRow.className = 'task__card__btns__row';
                taskCardBtnsRow.appendChild(taskCardEditBtn);
                taskCardBtnsRow.appendChild(taskCardDeleteBtn);

                let taskCardPrice = document.createElement('div');
                taskCardPrice.className = 'task__card__price';
                if (dataArr[i]['price'] === 'Negotiated price') {
                    if (language === 'en') {
                        taskCardPrice.innerText = dataArr[i]['price'];
                    } else {
                        taskCardPrice.innerText = 'Договорная цена';
                    }
                } else {
                    taskCardPrice.innerText = dataArr[i]['price'] + '₽';
                }

                let taskCardChipTaskType = document.createElement('div');
                taskCardChipTaskType.className = 'task__card__chip';
                if (language === 'en') {
                    taskCardChipTaskType.innerText = dataArr[i]['task_type'];
                } else if (dataArr[i]['task_type'] === 'Specific task') {
                    taskCardChipTaskType.innerText = 'Определенная задача';
                } else if (dataArr[i]['task_type'] === 'Full topic') {
                    taskCardChipTaskType.innerText = 'Полная тема';
                }

                let taskCardChipEdInst = document.createElement('div');
                taskCardChipEdInst.className = 'task__card__chip';
                if (language === 'en') {
                    taskCardChipEdInst.innerText = dataArr[i]['educational_inst'];
                } else if (dataArr[i]['educational_inst'] === 'University') {
                    taskCardChipEdInst.innerText = 'Университет';
                } else if (dataArr[i]['educational_inst'] === 'School') {
                    taskCardChipEdInst.innerText = 'Школа';
                } else if (dataArr[i]['educational_inst'] === 'Other') {
                    taskCardChipEdInst.innerText = 'Другое';
                }

                let taskCardColumnRight = document.createElement('div');
                taskCardColumnRight.className = 'task__card_column__right';
                taskCardColumnRight.appendChild(taskCardChipEdInst);
                taskCardColumnRight.appendChild(taskCardChipTaskType);
                taskCardColumnRight.appendChild(taskCardPrice);
                taskCardColumnRight.appendChild(taskCardBtnsRow);

                let taskCardImagesColumn = document.createElement('div');
                taskCardImagesColumn.className = 'task__card__images__column';

                if (dataArr[i]['images_links'] !== 'null') {
                    let imgLinks = dataArr[i]['images_links'].slice(1, -1);
                    imgLinks = imgLinks.split(',');
                    for (let j = 0; j < imgLinks.length; j++) {
                        let imgLink = imgLinks[j].slice(1, -1);

                        let taskCardImg = document.createElement('img');
                        taskCardImg.className = 'task__card__img';
                        if (imgLink.endsWith('.png') || imgLink.endsWith('.jpg') || imgLink.endsWith('.jpeg')) {
                            taskCardImg.src = imgLink;
                        } else {
                            taskCardImg.src = '/img/file.png';
                            taskCardImg.style.padding = '10px';
                        }
                        taskCardImg.onclick = function () {
                            window.open(imgLink);
                        }

                        if (j % 3 === 0) {
                            let taskCardImagesRow = document.createElement('div');
                            taskCardImagesRow.className = 'task__card__images__row';
                            taskCardImagesColumn.appendChild(taskCardImagesRow);
                        }
                        taskCardImagesColumn.lastChild.appendChild(taskCardImg);
                    }
                }

                let taskCardDescription = document.createElement('div');
                taskCardDescription.className = 'task__card__text';
                taskCardDescription.innerText = dataArr[i]['description'];

                let taskCardDeadline = document.createElement('div');
                taskCardDeadline.className = 'task__card__text';
                taskCardDeadline.innerText = dataArr[i]['deadline'];

                let taskCardSubjectName = document.createElement('div');
                taskCardSubjectName.className = 'task__card__text__bold';
                taskCardSubjectName.innerText = dataArr[i]['subject_name'];

                let taskCardColumnLeft = document.createElement('div');
                taskCardColumnLeft.className = 'task__card_column__left';
                taskCardColumnLeft.appendChild(taskCardSubjectName);
                taskCardColumnLeft.appendChild(taskCardDeadline);
                taskCardColumnLeft.appendChild(taskCardDescription);
                taskCardColumnLeft.appendChild(taskCardImagesColumn);

                let taskCardRow = document.createElement('div');
                taskCardRow.className = 'task__card__row';
                taskCardRow.appendChild(taskCardColumnLeft);
                taskCardRow.appendChild(taskCardColumnRight);

                let taskCard = document.createElement('div');
                taskCard.className = 'task__card';
                taskCard.id = 'taskCard' + dataArr[i]['id'];
                taskCard.appendChild(taskCardRow);

                myTasks.appendChild(taskCard);
            }
        } else {
            let noTasksText = document.createElement('div');
            noTasksText.className = 'no__tasks__text';
            noTasksText.innerText = language === 'en' ?
                "You don't have any tasks created." : 'У вас нет созданных заданий.';

            myTasks.appendChild(noTasksText);
        }
    }
});
