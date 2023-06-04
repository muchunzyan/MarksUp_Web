let taskInfoFd = new FormData();
taskInfoFd.append('taskId', localStorage.getItem('selected_task'));

$.ajax({
    url: '/php/get_task_info.php',
    type: 'POST',
    cache: false,
    data: taskInfoFd,
    dataType: 'html',
    processData: false,
    contentType: false,
    success: function (data) {
        if (data !== '0 results') {
            data = $.parseJSON(data);

            document.getElementById('subjectName').innerText = data['subject_name'];
            document.getElementById('deadline').innerText = data['deadline'];
            if (data['price'] === 'Negotiated price' || data['price'] === 'Договорная цена') {
                document.getElementById('price').innerText =
                    language === 'en' ? data['price'] : 'Договорная цена';
            } else {
                document.getElementById('price').innerText = data['price'] + '₽';
            }
            document.getElementById('description').innerText = data['description'];
            if (language === 'en') {
                document.getElementById('educationalInst').innerText = data['educational_inst'];
            } else if (data['educational_inst'] === 'University') {
                document.getElementById('educationalInst').innerText = 'Университет';
            } else if (data['educational_inst'] === 'School') {
                document.getElementById('educationalInst').innerText = 'Школа';
            } else if (data['educational_inst'] === 'Other') {
                document.getElementById('educationalInst').innerText = 'Другое';
            }
            if (language === 'en') {
                document.getElementById('taskType').innerText = data['task_type'];
            } else if (data['task_type'] === 'Specific task') {
                document.getElementById('taskType').innerText = 'Определенная задача';
            } else if (data['task_type'] === 'Full topic') {
                document.getElementById('taskType').innerText = 'Полная тема';
            }

            let taskImagesColumn = document.createElement('div');
            taskImagesColumn.className = 'task__card__images__column';

            if (data['images_links'] !== 'null') {
                let imgLinks = data['images_links'].slice(1, -1);
                imgLinks = imgLinks.split(',');
                for (let j = 0; j < imgLinks.length; j++) {
                    let imgLink = imgLinks[j].slice(1, -1);

                    let taskImg = document.createElement('img');
                    taskImg.className = 'task__card__img';
                    if (imgLink.endsWith('.jpg') || imgLink.endsWith('.png') || imgLink.endsWith('.jpeg')) {
                        taskImg.src = imgLink;
                    } else {
                        taskImg.src = '/img/file.png';
                        taskImg.style.padding = '10px';
                    }
                    taskImg.onclick = function () {
                        window.open(imgLink);
                    }
                    if (j % 5 === 0) {
                        let taskImagesRow = document.createElement('div');
                        taskImagesRow.className = 'task__card__images__row';
                        taskImagesColumn.appendChild(taskImagesRow);
                    }
                    taskImagesColumn.lastChild.appendChild(taskImg);
                }
            }
            document.getElementById('taskInfoImages').appendChild(taskImagesColumn);

            document.getElementById('respondBtn').onclick = function (e) {
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
                    success: function (dealsData) {
                        let dealsArr = [];
                        let dealsString = dealsData.split('}');
                        dealsString.splice(-1);
                        for (let j = 0; j < dealsString.length; j++) {
                            dealsString[j] = dealsString[j] + '}';
                            dealsString[j] = $.parseJSON(dealsString[j]);
                            dealsArr.push(dealsString[j]);
                        }
                        if (dealsData !== '0 results') {
                            let createNew = true;
                            for (let j = 0; j < dealsArr.length; j++) {
                                if (dealsArr[j]['contributors'].includes(localStorage.getItem('user_id')) &&
                                    data['id'] === dealsArr[j]['task_id']) {
                                    createNew = false;
                                    break;
                                }
                            }
                            if (createNew) {
                                createDeal(data);
                            } else {
                                myAlert(language === 'en' ? 'The request has' +
                                    ' already been sent' : 'Запрос уже отправлен');
                                setTimeout(function () {
                                    closeAlert();
                                }, 1500);
                            }
                        } else {
                            createDeal(data);
                        }
                    }
                });
            }
        } else {
            alert(data);
        }
    }
});
