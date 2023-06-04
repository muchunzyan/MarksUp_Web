function createDeal(taskInfo) {
    let customerId = taskInfo['user_id'];
    let taskId = taskInfo['id'];
    let postFd = new FormData();
    postFd.append('userId', localStorage.getItem('user_id'));
    postFd.append('customerId', customerId);
    postFd.append('taskId', taskId);

    $.ajax({
        url: '/php/create_deal.php',
        type: 'POST',
        cache: false,
        data: postFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data === "Deal created successfully!") {
                myAlert(language === 'en' ?
                    'Respond sent' : 'Отклик отправлен');
                setTimeout(function () {
                    closeAlert();
                }, 1500);
            } else {
                alert(data);
            }
        }
    });
}

function findTasks(fd) {
    $.ajax({
        url: '/php/find_tasks.php',
        type: 'POST',
        cache: false,
        data: fd,
        dataType: 'html',
        processData: false,
        contentType: false,
        beforeSend: function () {
            $("#filterForm").prop('disabled', true);
        },
        success: function (data) {
            let dataArr = [];
            let dataString = data.split('}');
            dataString.splice(-1);
            for (let i = 0; i < dataString.length; i++) {
                dataString[i] = dataString[i] + '}';
                dataString[i] = $.parseJSON(dataString[i]);
                dataArr.push(dataString[i]);
            }

            let foundTasks = document.getElementById('foundTasks');
            foundTasks.innerText = '';

            if (dataArr.length > 0) {
                for (let i = 0; i < dataArr.length; i++) {
                    let taskCardRespondBtn = document.createElement('button');
                    taskCardRespondBtn.className = 'task__card__respond__btn';
                    taskCardRespondBtn.id = 'taskCardRespondBtn';
                    taskCardRespondBtn.innerText = language === 'en' ?
                        'Respond' : 'Откликнуться';

                    let taskCardBtnsRow = document.createElement('div');
                    taskCardBtnsRow.classList.add('task__card__btns__row');
                    taskCardBtnsRow.classList.add('justify-content-end');
                    taskCardBtnsRow.appendChild(taskCardRespondBtn);

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
                    } else {
                        if (dataArr[i]['task_type'] === 'Specific task') {
                            taskCardChipTaskType.innerText = 'Определенная' +
                                ' задача';
                        } else if (dataArr[i]['task_type'] === 'Full topic') {
                            taskCardChipTaskType.innerText = 'Полная тема';
                        }
                    }

                    let taskCardChipEdInst = document.createElement('div');
                    taskCardChipEdInst.className = 'task__card__chip';
                    if (language === 'en') {
                        taskCardChipEdInst.innerText = dataArr[i]['educational_inst'];
                    } else {
                        if (dataArr[i]['educational_inst'] === 'University') {
                            taskCardChipEdInst.innerText = 'Университет';
                        } else if (dataArr[i]['educational_inst'] === 'School') {
                            taskCardChipEdInst.innerText = 'Школа';
                        } else if (dataArr[i]['educational_inst'] === 'Other') {
                            taskCardChipEdInst.innerText = 'Другое';
                        }
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
                    taskCard.onclick = function (e) {
                        if (e.target.id === 'taskCardRespondBtn') {
                            let getFd = new FormData();
                            getFd.append('userId', localStorage.getItem('user_id'));
                            $.ajax({
                                url: '/php/get_deals.php',
                                type: 'POST',
                                cache: false,
                                data: getFd,
                                dataType: 'html',
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    let dealsArr = [];
                                    let dealsString = data.split('}');
                                    dealsString.splice(-1);
                                    for (let j = 0; j < dealsString.length; j++) {
                                        dealsString[j] = dealsString[j] + '}';
                                        dealsString[j] = $.parseJSON(dealsString[j]);
                                        dealsArr.push(dealsString[j]);
                                    }
                                    if (data !== '0 results') {
                                        let createNew = true;
                                        for (let j = 0; j < dealsArr.length; j++) {
                                            if (dealsArr[j]['contributors'].includes(localStorage.getItem('user_id')) &&
                                                dataArr[i]['id'] === dealsArr[j]['task_id']) {
                                                createNew = false;
                                                break;
                                            }
                                        }
                                        if (createNew) {
                                            createDeal(dataArr[i]);
                                        } else {
                                            myAlert(language === 'en' ?
                                                'The request has already been' +
                                                ' sent' : 'Отклик уже отправлен');
                                            setTimeout(function () {
                                                closeAlert();
                                            }, 1500);
                                        }
                                    } else {
                                        createDeal(dataArr[i]);
                                    }
                                }
                            });
                        } else {
                            localStorage.setItem('selected_task', dataArr[i]['id']);
                            localStorage.setItem('other_user_id', dataArr[i]['user_id']);
                            window.open('/html/task_info.html', '_self');
                        }
                    }
                    taskCard.appendChild(taskCardRow);

                    foundTasks.appendChild(taskCard);
                }
            } else {
                let noTasksText = document.createElement('div');
                noTasksText.className = 'no__tasks__text';
                noTasksText.innerText = language === 'en' ?
                    "Nothing found." : "Ничего не найдено.";

                foundTasks.appendChild(noTasksText);
            }

            $("#filterForm").prop('disabled', false);
        }
    });
}

if (document.title === "Find task" || document.title === "Найти задание") {
    let fd = new FormData();
    fd.append('userId', localStorage.getItem('user_id'));
    findTasks(fd);

    document.forms.filterForm.onsubmit = function (e) {
        e.preventDefault();

        let fd = new FormData();
        fd.append('userId', localStorage.getItem('user_id'));
        fd.append('edInst', document.getElementById('edInstFilterSelect').value);
        fd.append('taskType', document.getElementById('taskTypeFilterSelect').value);
        fd.append('deadlineFrom', document.getElementById('deadlineFromFilterInput').value);
        fd.append('deadlineTo', document.getElementById('deadlineToFilterInput').value);
        fd.append('priceFrom', document.getElementById('priceFromFilterInput').value);
        fd.append('priceTo', document.getElementById('priceToFilterInput').value);

        findTasks(fd);
    }

    document.getElementById('resetBtn').onclick = function () {
        window.open('/html/find_task.html', '_self');
    }
}
