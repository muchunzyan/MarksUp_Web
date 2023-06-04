let chosenTaskId;
let chosenDealId;
let dealCustomerId;
let dealExecutorId;
let scrollMessages = true;
let myTask;
let dealRating = null;

function deleteDeal(dealId) {
    let deleteDealFd = new FormData();
    deleteDealFd.append('dealId', dealId);
    $.ajax({
        url: '/php/delete_deal.php',
        type: 'POST',
        cache: false,
        data: deleteDealFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data === 'Deal deleted successfully!') {
                window.open('/html/deals.html', '_self');
            } else {
                alert(data)
            }
        }
    });
}

function createMessage(messageText, fileLink) {
    let messageFd = new FormData();
    if (messageText !== '') {
        messageFd.append('messageText', messageText);
    }
    if (fileLink !== '') {
        messageFd.append('fileLink', fileLink);
    }
    messageFd.append('senderId', localStorage.getItem('user_id'));
    messageFd.append('dealId', chosenDealId);

    $.ajax({
        url: '/php/create_message.php',
        type: 'POST',
        cache: false,
        data: messageFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data === 'Message created successfully!') {
                document.getElementById('messageInput').value = '';
                scrollMessages = true;
                displayMessages();
            } else {
                alert(data);
            }
        }
    });
}

function displayMessages() {
    let getMessagesFd = new FormData();
    getMessagesFd.append('dealId', chosenDealId);
    $.ajax({
        url: '/php/get_messages.php',
        type: 'POST',
        cache: false,
        data: getMessagesFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data !== '0 results') {
                let messagesArr = [];
                let messagesString = data.split('}');
                messagesString.splice(-1);
                for (let i = 0; i < messagesString.length; i++) {
                    messagesString[i] = messagesString[i] + '}';
                    messagesString[i] = $.parseJSON(messagesString[i]);
                    messagesArr.push(messagesString[i]);
                }

                if (messagesArr.length > 0) {
                    let messagesList = document.getElementById('messagesList');
                    messagesList.innerHTML = '';

                    for (let i = 0; i < messagesArr.length; i++) {
                        let messageDatetime = document.createElement('div');
                        messageDatetime.className = 'message-datetime';
                        messageDatetime.innerText = messagesArr[i]['time_sent'];

                        let message = document.createElement('div');
                        message.classList.add('message');
                        if (messagesArr[i]['sender_id'] !== localStorage.getItem('user_id')) {
                            message.classList.add('others__message');
                        } else {
                            message.classList.add('my__message');
                        }

                        if (messagesArr[i]['text'] != null) {
                            let messageText = document.createElement('div');
                            messageText.className = 'message-text';
                            messageText.innerText = messagesArr[i]['text'];

                            message.appendChild(messageText);
                        } else if (messagesArr[i]['file_link'] != null) {
                            let fileImgBtn = document.createElement('img');
                            fileImgBtn.src = '/img/file.png';

                            let fileButton = document.createElement('button');
                            fileButton.className = 'message__file-button';
                            fileButton.onclick = function () {
                                window.open(messagesArr[i]['file_link']);
                            }
                            fileButton.appendChild(fileImgBtn);

                            let fileTitle = document.createElement('div');
                            fileTitle.className = 'message__file-title';
                            let fileLinkArr = messagesArr[i]['file_link'].split('/');
                            fileTitle.innerText = fileLinkArr[fileLinkArr.length - 1];

                            message.appendChild(fileButton);
                            message.appendChild(fileTitle);
                        }

                        message.appendChild(messageDatetime);
                        messagesList.appendChild(message);
                    }

                    if (scrollMessages) {
                        messagesList.scrollTo(0, messagesList.scrollHeight);
                    }
                }
            }
        }
    });
}

function displayDeals() {
    let fd = new FormData();
    fd.append('userId', localStorage.getItem('user_id'));

    $.ajax({
        url: '/php/get_deals.php',
        type: 'POST',
        cache: false,
        data: fd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            let dealArr = [];
            let dealString = data.split('}');
            dealString.splice(-1);
            for (let i = 0; i < dealString.length; i++) {
                dealString[i] = dealString[i] + '}';
                dealString[i] = $.parseJSON(dealString[i]);
                dealArr.push(dealString[i]);
            }

            let dealCards = document.getElementById('dealCards');
            dealCards.innerText = '';
            let dealCardsHeight = document.getElementById('dealsListColumn').offsetHeight - 42 - 15 - 38;
            dealCards.style.height = dealCardsHeight + 'px';

            if (dealArr.length > 0) {
                for (let i = 0; i < dealArr.length; i++) {
                    let userId = localStorage.getItem('user_id');
                    let otherUserId = dealArr[i]['contributors'].replace(userId, '').replace(';', '');
                    let taskId = dealArr[i]['task_id'];
                    let userFd = new FormData();
                    userFd.append('userId', otherUserId);

                    $.ajax({
                        url: '/php/get_profile_info.php',
                        type: 'POST',
                        cache: false,
                        data: userFd,
                        dataType: 'html',
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            if (data !== '0 results') {
                                let userDataArr = [];
                                let userDataString = data.split('}');
                                userDataString.splice(-1);
                                for (let i = 0; i < userDataString.length; i++) {
                                    userDataString[i] = userDataString[i] + '}';
                                    userDataString[i] = $.parseJSON(userDataString[i]);
                                    userDataArr.push(userDataString[i]);
                                }

                                let taskFd = new FormData();
                                taskFd.append('taskId', taskId);

                                $.ajax({
                                    url: '/php/get_task_info.php',
                                    type: 'POST',
                                    cache: false,
                                    data: taskFd,
                                    dataType: 'html',
                                    processData: false,
                                    contentType: false,
                                    success: function (data) {
                                        if (data !== '0 results') {
                                            data = $.parseJSON(data);
                                            let subjectName = data['subject_name'];
                                            let deadline = data['deadline'];

                                            let dealCardDeleteImg = document.createElement('img');
                                            dealCardDeleteImg.src = '/img/delete.png';

                                            let dealCardDeleteBtn = document.createElement('button');
                                            dealCardDeleteBtn.className = 'deal__card__delete__btn';
                                            dealCardDeleteBtn.onclick = function () {
                                                myAlertWithBtns(language === 'en' ?
                                                    'Are you sure you want' +
                                                    ' to delete this deal?' :
                                                    'Вы уверены, что хотите' +
                                                    ' удалить эту сделку?',
                                                    function () {
                                                    deleteDeal(dealArr[i]['id']);
                                                });
                                            }
                                            dealCardDeleteBtn.appendChild(dealCardDeleteImg);

                                            let dealCardDeadline = document.createElement('div');
                                            dealCardDeadline.className = 'deal__card-deadline';
                                            dealCardDeadline.innerText = (language === 'en' ?
                                                'Deadline: ' : 'Крайний срок: ') + deadline;

                                            let dealCardSubjectName = document.createElement('div');
                                            dealCardSubjectName.className = 'deal__card-subject';
                                            dealCardSubjectName.innerText = subjectName;

                                            let dealCardName = document.createElement('div');
                                            dealCardName.className = 'deal__card-name';
                                            dealCardName.innerText = userDataArr[0]['name'];

                                            let dealCardColumn = document.createElement('div');
                                            dealCardColumn.className = 'deal__card_column';
                                            dealCardColumn.appendChild(dealCardName);
                                            dealCardColumn.appendChild(dealCardSubjectName);
                                            dealCardColumn.appendChild(dealCardDeadline);

                                            let dealCard = document.createElement('div');
                                            dealCard.className = 'deal__card';
                                            dealCard.onclick = function () {
                                                chosenTaskId = data['id'];
                                                let myId = localStorage.getItem('user_id');
                                                if (data['user_id'] === myId) {
                                                    dealCustomerId = myId;
                                                    dealExecutorId = otherUserId;
                                                } else {
                                                    dealCustomerId = otherUserId;
                                                    dealExecutorId = myId;
                                                }
                                                let dealCards = document.getElementById('dealCards');
                                                for (let c = 0; c < dealCards.children.length; c++) {
                                                    dealCards.children[c].classList.remove('selected__deal');
                                                }
                                                dealCard.classList.add('selected__deal');
                                                chosenDealId = dealArr[i]['id'];
                                                myTask = data['user_id'] === localStorage.getItem('user_id');

                                                let otherUserPhoto = document.createElement('img');
                                                otherUserPhoto.className = 'deals__user__photo_round';
                                                if (userDataArr[0]['profile_pic'] != null && userDataArr[0]['profile_pic'] !== '') {
                                                    otherUserPhoto.src = userDataArr[0]['profile_pic'];
                                                } else {
                                                    otherUserPhoto.src = '/img/user_pic_null.png';
                                                }

                                                let otherUserName = document.createElement('div');
                                                otherUserName.className = 'deals__user__info-name';
                                                otherUserName.innerText = userDataArr[0]['name'];

                                                let dealsUserInfo = document.createElement('div');
                                                dealsUserInfo.className = 'deals__user__info';
                                                dealsUserInfo.onclick = function () {
                                                    localStorage.setItem('other_user_id', userDataArr[0]['id']);
                                                    window.open('/html/others_profile.html', '_self');
                                                }
                                                dealsUserInfo.appendChild(otherUserPhoto);
                                                dealsUserInfo.appendChild(otherUserName);

                                                let messagesList = document.createElement('div');
                                                messagesList.className = 'messages__list';
                                                messagesList.id = 'messagesList';
                                                messagesList.onscroll = function () {
                                                    scrollMessages = messagesList.scrollTop + messagesList.offsetHeight === messagesList.scrollHeight;
                                                }

                                                let conversationColumn = document.getElementById('conversationColumn');
                                                conversationColumn.innerHTML = '';
                                                conversationColumn.appendChild(dealsUserInfo);
                                                conversationColumn.appendChild(messagesList);

                                                setInterval(() => {
                                                    displayMessages();
                                                }, 500);

                                                let attachPhoto = document.createElement('img');
                                                attachPhoto.src = '/img/picture.png';

                                                let messageAttachImgBtn = document.createElement('button');
                                                messageAttachImgBtn.className = 'message__attach__img__btn';
                                                messageAttachImgBtn.onclick = function () {
                                                    let fileInput = document.createElement('input');
                                                    fileInput.type = 'file';
                                                    fileInput.onchange = e => {
                                                        let file = e.target.files[0];

                                                        myAlertWithBtns((language === 'en' ?
                                                            'Send ' : 'Отправить ') + file.name,
                                                            function () {
                                                            let uploadFileFd = new FormData();
                                                            uploadFileFd.append('file', file);

                                                            $.ajax({
                                                                url: '/php/upload_file.php',
                                                                type: 'POST',
                                                                cache: false,
                                                                data: uploadFileFd,
                                                                processData: false,
                                                                contentType: false,
                                                                success: function (data) {
                                                                    if (data === "File upload to server failed, please try again.") {
                                                                        alert(language === 'en' ? data :
                                                                            "Загрузка файла на сервер не удалась, попробуйте еще раз.");
                                                                    } else if (data === "No file selected.") {
                                                                        alert(language === 'en' ? data :
                                                                            "Файл не выбран.");
                                                                    } else {
                                                                        fileInput.remove();
                                                                        createMessage('', data);
                                                                    }
                                                                }
                                                            });
                                                        });
                                                    }
                                                    fileInput.click();

                                                }
                                                messageAttachImgBtn.appendChild(attachPhoto);

                                                let messageInput = document.createElement('textarea');
                                                messageInput.className = 'form-control message__form-control';
                                                messageInput.id = 'messageInput';
                                                messageInput.placeholder = language === 'en' ? "Message..." : "Сообщение...";
                                                messageInput.style.height = '40px';
                                                let keysPressed = [];
                                                messageInput.onkeydown = function (e) {
                                                    keysPressed.push(e.key);
                                                    if (keysPressed.includes('Enter') && !keysPressed.includes('Shift')) {
                                                        e.preventDefault();
                                                        if (messageInput.value !== '') {
                                                            createMessage(messageInput.value, '');
                                                        }
                                                    }
                                                };
                                                messageInput.onkeyup = function (e) {
                                                    keysPressed.splice(keysPressed.indexOf(e.key));
                                                };

                                                let messageTextareaLabel = document.createElement('label');
                                                messageTextareaLabel.style.margin = '0px';
                                                messageTextareaLabel.appendChild(messageInput);

                                                let sendMessage = document.createElement('img');
                                                sendMessage.src = '/img/send.png';

                                                let messageSendImgBtn = document.createElement('button');
                                                messageSendImgBtn.className = 'message__send__img__btn';
                                                messageSendImgBtn.onclick = function () {
                                                    if (messageInput.value !== '') {
                                                        createMessage(messageInput.value, '');
                                                    }
                                                };
                                                messageSendImgBtn.appendChild(sendMessage);

                                                let messageInputAreaRow = document.createElement('div');
                                                messageInputAreaRow.className = 'message__input__area__row';
                                                messageInputAreaRow.appendChild(messageAttachImgBtn);
                                                messageInputAreaRow.appendChild(messageTextareaLabel);
                                                messageInputAreaRow.appendChild(messageSendImgBtn);

                                                let messageInputArea = document.createElement('div');
                                                messageInputArea.className = 'message__input__area';
                                                messageInputArea.appendChild(messageInputAreaRow);

                                                conversationColumn.appendChild(messageInputArea);

                                                let containerHeight = document.getElementById('container').offsetHeight;
                                                let messagesListHeight = containerHeight - dealsUserInfo.offsetHeight - messageInputArea.offsetHeight - 3;
                                                document.getElementById('messagesList').style.height = messagesListHeight + 'px';

                                                displayDealStatus();
                                            }
                                            dealCard.appendChild(dealCardColumn);
                                            dealCard.appendChild(dealCardDeleteBtn);

                                            dealCards.appendChild(dealCard);
                                        } else if (data === "0 results") {
                                            deleteDeal(dealArr[i]['id']);
                                        } else {
                                            alert(data);
                                        }
                                    }
                                });
                            } else if (data === "0 results") {
                                //TODO delete deal by user id
                            } else {
                                alert(data);
                            }
                        }
                    });
                }
            } else {
                let noTasksText = document.createElement('div');
                noTasksText.className = 'no__deals__text';
                noTasksText.innerText = language === 'en' ?
                    "You don't have any deals." : "У вас нет сделок.";

                dealCards.appendChild(noTasksText);
            }
        }
    });
}

function displayDealSteps(dealStepsGroup) {
    let dealInfoFd = new FormData();
    dealInfoFd.append('dealId', chosenDealId);

    $.ajax({
        url: '/php/get_deal_info.php',
        type: 'POST',
        cache: false,
        data: dealInfoFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data !== '0 results') {
                let dealInfoArr = JSON.parse(data);

                if (dealStepsGroup != null) {
                    dealStepsGroup.innerHTML = '';

                    if (dealInfoArr['status'] != null) {
                        if (dealInfoArr['customer_price'] != null &&
                            dealInfoArr['customer_price'] === dealInfoArr['executor_price'] &&
                            dealInfoArr['status'] === 'price_agreement') {
                            let changeDealFd = new FormData();
                            changeDealFd.append('dealId', chosenDealId);
                            changeDealFd.append('dealStatus', 'executor_helps');

                            $.ajax({
                                url: '/php/change_deal_info.php',
                                type: 'POST',
                                cache: false,
                                data: changeDealFd,
                                dataType: 'html',
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    if (data !== 'Deal changed successfully!') {
                                        alert(data);
                                    } else {
                                        displayDealStatus();
                                    }
                                }
                            });
                        } else {
                            let partnerPrice = document.createElement('span');
                            partnerPrice.className = 'deal__text__normal';
                            partnerPrice.innerText = language === 'en' ? 'Waiting...' : 'Ожидание...';
                            if (dealInfoArr['executor_price'] != null && myTask) {
                                partnerPrice.innerText = dealInfoArr['executor_price'] + '₽';
                            } else if (dealInfoArr['customer_price'] != null && !myTask) {
                                partnerPrice.innerText = dealInfoArr['customer_price'] + '₽';
                            }

                            let partnerPriceBold = document.createElement('span');
                            partnerPriceBold.className = 'deal__text__bold';
                            partnerPriceBold.innerText = language === 'en' ?
                                'Partner\'s price: ' : 'Цена партнера: ';

                            let partnerPriceDiv = document.createElement('div');
                            partnerPriceDiv.appendChild(partnerPriceBold);
                            partnerPriceDiv.appendChild(partnerPrice);

                            let yourPrice = document.createElement('span');
                            yourPrice.className = 'deal__text__normal';
                            yourPrice.innerText = language === 'en' ? 'Waiting...' : 'Ожидание...';
                            if (dealCustomerId === localStorage.getItem('user_id') && dealInfoArr['customer_price'] != null) {
                                yourPrice.innerText = dealInfoArr['customer_price'] + '₽';
                            } else if (dealExecutorId === localStorage.getItem('user_id') && dealInfoArr['executor_price'] != null) {
                                yourPrice.innerText = dealInfoArr['executor_price'] + '₽';
                            }

                            let yourPriceBold = document.createElement('span');
                            yourPriceBold.className = 'deal__text__bold';
                            yourPriceBold.innerText = language === 'en' ?
                                'Your price: ' : 'Ваша цена: ';

                            let yourPriceDiv = document.createElement('div');
                            yourPriceDiv.appendChild(yourPriceBold);
                            yourPriceDiv.appendChild(yourPrice);

                            let priceGroup = document.createElement('div');
                            priceGroup.className = 'deal__group';
                            priceGroup.appendChild(partnerPriceDiv);
                            priceGroup.appendChild(yourPriceDiv);

                            dealStepsGroup.appendChild(priceGroup);
                        }
                    }
                    if (dealInfoArr['status'] != null &&
                        dealInfoArr['status'] !== 'price_agreement') {
                        let taskCompletionText = document.createElement('div');
                        taskCompletionText.className = 'deal__text__bold';
                        if (dealInfoArr['status'] === 'executor_helps') {
                            if (document.getElementById('dealStatusText').innerText !== 'Executor helps' &&
                                document.getElementById('dealStatusText').innerText !== 'Исполнитель помогает') {
                                displayDealStatus();
                            }
                            if (myTask) {
                                taskCompletionText.innerText = language === 'en' ?
                                    'Waiting for confirmation of the' +
                                    ' completion of the task from the' +
                                    ' executor...' :
                                    'Ожидание подтверждения выполнения' +
                                    ' задания от исполнителя...';
                            } else {
                                taskCompletionText.innerText = language === 'en' ?
                                    'Confirm completion of the training' +
                                    ' service.' :
                                    'Подтвердите выполнение услуги по обучению.';
                            }
                        } else if (dealInfoArr['status'] === 'customer_confirms') {
                            if (document.getElementById('dealStatusText').innerText !== 'Customer confirms' &&
                                document.getElementById('dealStatusText').innerText !== 'Заказчик подтверждает') {
                                displayDealStatus();
                            }
                            taskCompletionText.innerHTML = 'Executor says:' +
                                ' Task completed</br></br>';
                            if (myTask) {
                                taskCompletionText.innerHTML += language === 'en' ?
                                    'Confirm completion of the training' +
                                    ' service.' :
                                    'Подтвердите выполнение услуги по обучению.';
                            } else {
                                taskCompletionText.innerHTML += language === 'en' ?
                                    'Waiting for confirmation of the' +
                                    ' completion of the task from the' +
                                    ' customer...' :
                                    'Ожидание подтверждения выполнения' +
                                    ' задания от заказчика...';
                            }
                        } else {
                            taskCompletionText.innerHTML = 'Executor says:' +
                                ' Task completed</br></br>' +
                                'Customer says: Task completed';
                        }

                        let taskCompletionGroup = document.createElement('div');
                        taskCompletionGroup.className = 'deal__group';
                        taskCompletionGroup.appendChild(taskCompletionText);

                        dealStepsGroup.appendChild(taskCompletionGroup);
                    }
                    if (dealInfoArr['status'] != null &&
                        dealInfoArr['status'] !== 'price_agreement' &&
                        dealInfoArr['status'] !== 'executor_helps' &&
                        dealInfoArr['status'] !== 'customer_confirms') {
                        let paymentGroup = document.createElement('div');
                        paymentGroup.className = 'deal__group';

                        if (dealInfoArr['status'] !== 'rating') {
                            if (document.getElementById('dealStatusText').innerText !== 'Payment' &&
                                document.getElementById('dealStatusText').innerText !== 'Оплата') {
                                displayDealStatus();
                            }
                            let paymentBold = document.createElement('div');
                            paymentBold.className = 'deal__text__bold';
                            paymentBold.innerText = language === 'en' ?
                                'You are now invited to negotiate and make' +
                                ' your own payment.' :
                                'Теперь вам предлагается договориться и' +
                                ' произвести оплату самостоятельно.';

                            let paymentText = document.createElement('div');
                            paymentText.className = 'deal__text__light';
                            paymentText.innerText = language === 'en' ?
                                'In future this will be done through the' +
                                ' website and will have a secure transaction' +
                                ' function.' :
                                'В будущем это будет осуществляться через' +
                                ' веб-сайт и будет иметь функцию безопасной' +
                                ' транзакции.';

                            paymentGroup.appendChild(paymentBold);
                            paymentGroup.appendChild(paymentText);
                        } else {
                            let paymentBold = document.createElement('div');
                            paymentBold.className = 'deal__text__bold';
                            paymentBold.innerText = language === 'en' ?
                                'Payment completed.' : 'Оплата завершена.';
                            paymentGroup.appendChild(paymentBold);
                        }
                        dealStepsGroup.appendChild(paymentGroup);
                    }
                    if (dealInfoArr['status'] != null &&
                        dealInfoArr['status'] !== 'price_agreement' &&
                        dealInfoArr['status'] !== 'executor_helps' &&
                        dealInfoArr['status'] !== 'customer_confirms' &&
                        dealInfoArr['status'] !== 'payment') {
                        if ((document.getElementById('dealStatusText').innerText !== 'Closing deal' &&
                                document.getElementById('dealStatusText').innerText !== 'Завершение сделки') ||
                            document.getElementById('completePaymentBtn')) {
                            displayDealStatus();
                        }
                        if (myTask) {
                            let starsRow = document.createElement('div');
                            starsRow.className = 'stars__row';

                            for (let i = 0; i < 5; i++) {
                                let star = document.createElement('img');
                                if (i < dealRating) {
                                    star.src = '/img/star_filled.png';
                                } else {
                                    star.src = '/img/star_empty.png';
                                }
                                star.className = 'star';
                                starsRow.appendChild(star);
                            }

                            let ratingText = document.createElement('div');
                            ratingText.className = 'deal__text__bold';
                            ratingText.innerText = language === 'en' ?
                                'Please, rate the executor\'s work.' :
                                'Пожалуйста, оцените работу исполнителя.';

                            let ratingGroup = document.createElement('div');
                            ratingGroup.className = 'deal__group';
                            ratingGroup.appendChild(ratingText);
                            ratingGroup.appendChild(starsRow);

                            dealStepsGroup.appendChild(ratingGroup);

                            const stars = document.querySelectorAll('.star');
                            stars.forEach((star, index1) => {
                                star.addEventListener('click', () => {
                                    dealRating = index1 + 1;
                                    stars.forEach((star, index2) => {
                                        if (index1 >= index2) {
                                            star.src = '/img/star_filled.png';
                                        } else {
                                            star.src = '/img/star_empty.png';
                                        }
                                    });
                                });
                            });
                        }
                    }
                    if (dealInfoArr['status'] === 'completed') {
                        window.open('/html/deals.html', '_self');
                    }
                }
            }
        }
    });
}

function displayDealStatus() {
    let dealInfoFd = new FormData();
    dealInfoFd.append('dealId', chosenDealId);

    $.ajax({
        url: '/php/get_deal_info.php',
        type: 'POST',
        cache: false,
        data: dealInfoFd,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data !== '0 results') {
                let dealInfoArr = JSON.parse(data);

                let dealColumn = document.getElementById('dealColumn');
                dealColumn.innerHTML = '';

                let dealStatusText = document.createElement('div');
                dealStatusText.id = 'dealStatusText';

                let dealStatusTitle = document.createElement('div');
                dealStatusTitle.className = 'deal__text__light';
                dealStatusTitle.innerText = language === 'en' ?
                    'Deal status' : 'Статус сделки';

                let dealStatusColumn = document.createElement('div');
                dealStatusColumn.className = 'deal__status__column';
                dealStatusColumn.appendChild(dealStatusTitle);
                dealStatusColumn.appendChild(dealStatusText);

                let dealSupportImg = document.createElement('img');
                dealSupportImg.src = '/img/support.png';

                let dealSupportImgBtn = document.createElement('button');
                dealSupportImgBtn.className = 'deal__support__img__btn';
                dealSupportImgBtn.onclick = function () {
                    window.open('mailto:muchunzyan@mail.ru');
                }
                dealSupportImgBtn.appendChild(dealSupportImg);

                let dealStatusGroup = document.createElement('div');
                dealStatusGroup.className = 'deal__status__group';
                dealStatusGroup.id = 'dealStatusGroup';
                dealStatusGroup.appendChild(dealStatusColumn);
                dealStatusGroup.appendChild(dealSupportImgBtn);

                dealColumn.appendChild(dealStatusGroup);

                let dealStepsGroup = document.createElement('div');
                dealStepsGroup.id = 'dealStepsGroup';
                dealColumn.appendChild(dealStepsGroup);

                if (dealInfoArr['status'] === 'price_agreement') {
                    dealStatusText.innerText = language === 'en' ?
                        'Price agreement' : 'Согласование цены';

                    let yourPriceBold = document.createElement('span');
                    yourPriceBold.className = 'deal__text__bold';
                    yourPriceBold.innerText = language === 'en' ?
                        'Your price: ' : 'Ваша цена: ';

                    let yourPriceInput = document.createElement('input');
                    yourPriceInput.className = 'deal__input';
                    yourPriceInput.type = 'number';
                    yourPriceInput.placeholder = '₽';

                    let yourPriceDiv = document.createElement('div');
                    yourPriceDiv.className = 'your__price__div__input';
                    yourPriceDiv.appendChild(yourPriceBold);
                    yourPriceDiv.appendChild(yourPriceInput);

                    let priceSubmitBtn = document.createElement('button');
                    priceSubmitBtn.className = 'deal__submit__btn';
                    priceSubmitBtn.innerText = language === 'en' ?
                        'Submit' : 'Подтвердить';
                    priceSubmitBtn.onclick = function () {
                        let changeDealFd = new FormData();
                        changeDealFd.append('dealId', chosenDealId);
                        if (dealCustomerId === localStorage.getItem('user_id')) {
                            changeDealFd.append('customerPrice', yourPriceInput.value);
                        } else {
                            changeDealFd.append('executorPrice', yourPriceInput.value);
                        }
                        yourPriceInput.value = '';

                        $.ajax({
                            url: '/php/change_deal_info.php',
                            type: 'POST',
                            cache: false,
                            data: changeDealFd,
                            dataType: 'html',
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                if (data !== 'Deal changed successfully!') {
                                    alert(data);
                                }
                            }
                        });
                    };

                    let dealBottomGroup = document.createElement('div');
                    dealBottomGroup.className = 'deal__bottom__group';
                    dealBottomGroup.id = 'dealBottomGroup';
                    dealBottomGroup.appendChild(yourPriceDiv);
                    dealBottomGroup.appendChild(priceSubmitBtn);

                    dealColumn.appendChild(dealBottomGroup);
                    dealStepsGroup.style.height = (dealColumn.offsetHeight -
                        document.getElementById('dealStatusGroup').offsetHeight -
                        dealBottomGroup.offsetHeight - 30) + 'px';
                } else if (dealInfoArr['status'] === 'executor_helps') {
                    dealStatusText.innerText = language === 'en' ?
                        'Executor helps' : 'Исполнитель помогает';
                    if (!myTask) {
                        let taskCompleteBtn = document.createElement('button');
                        taskCompleteBtn.className = 'deal__submit__btn';
                        taskCompleteBtn.innerText = language === 'en' ?
                            'Task completed' : 'Задание выполнено';
                        taskCompleteBtn.onclick = function () {
                            let changeDealFd = new FormData();
                            changeDealFd.append('dealId', chosenDealId);
                            changeDealFd.append('dealStatus', 'customer_confirms');

                            $.ajax({
                                url: '/php/change_deal_info.php',
                                type: 'POST',
                                cache: false,
                                data: changeDealFd,
                                dataType: 'html',
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    if (data !== 'Deal changed successfully!') {
                                        alert(data);
                                    } else {
                                        displayDealStatus();
                                    }
                                }
                            });
                        };

                        let dealBottomGroup = document.createElement('div');
                        dealBottomGroup.className = 'deal__bottom__group';
                        dealBottomGroup.appendChild(taskCompleteBtn);

                        dealColumn.appendChild(dealBottomGroup);
                        dealStepsGroup.style.height = (dealColumn.offsetHeight -
                            document.getElementById('dealStatusGroup').offsetHeight -
                            dealBottomGroup.offsetHeight - 30) + 'px';
                    } else {
                        let dealBottomGroup = document.getElementById('dealBottomGroup');
                        dealBottomGroup.innerHTML = '';
                    }
                } else if (dealInfoArr['status'] === 'customer_confirms') {
                    dealStatusText.innerText = language === 'en' ?
                        'Customer confirms' : 'Заказчик подтверждает';
                    if (myTask) {
                        let taskCompleteBtn = document.createElement('button');
                        taskCompleteBtn.className = 'deal__submit__btn';
                        taskCompleteBtn.innerText = language === 'en' ?
                            'Task completed' : 'Задание выполнено';
                        taskCompleteBtn.onclick = function () {
                            let changeDealFd = new FormData();
                            changeDealFd.append('dealId', chosenDealId);
                            changeDealFd.append('dealStatus', 'payment');

                            $.ajax({
                                url: '/php/change_deal_info.php',
                                type: 'POST',
                                cache: false,
                                data: changeDealFd,
                                dataType: 'html',
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    if (data !== 'Deal changed successfully!') {
                                        alert(data);
                                    } else {
                                        displayDealStatus();
                                    }
                                }
                            });
                        };

                        let dealBottomGroup = document.createElement('div');
                        dealBottomGroup.className = 'deal__bottom__group';
                        dealBottomGroup.appendChild(taskCompleteBtn);

                        dealColumn.appendChild(dealBottomGroup);
                        dealStepsGroup.style.height = (dealColumn.offsetHeight -
                            document.getElementById('dealStatusGroup').offsetHeight -
                            dealBottomGroup.offsetHeight - 30) + 'px';
                    }
                } else if (dealInfoArr['status'] === 'payment') {
                    dealStatusText.innerText = language === 'en' ?
                        'Payment' : 'Оплата';
                    if (document.getElementById('dealStatusText').innerText !== 'Payment' &&
                        document.getElementById('dealStatusText').innerText !== 'Оплата') {
                        displayDealStatus();
                    }
                    if (!myTask) {
                        let paymentCompleteBtn = document.createElement('button');
                        paymentCompleteBtn.className = 'deal__submit__btn';
                        paymentCompleteBtn.innerText = language === 'en' ?
                            'Payment completed' : 'Оплата завершена';
                        paymentCompleteBtn.id = 'completePaymentBtn';
                        paymentCompleteBtn.onclick = function () {
                            let changeDealFd = new FormData();
                            changeDealFd.append('dealId', chosenDealId);
                            changeDealFd.append('dealStatus', 'rating');

                            $.ajax({
                                url: '/php/change_deal_info.php',
                                type: 'POST',
                                cache: false,
                                data: changeDealFd,
                                dataType: 'html',
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    if (data !== 'Deal changed successfully!') {
                                        alert(data);
                                    } else {
                                        displayDealStatus();
                                    }
                                }
                            });
                        };

                        let dealBottomGroup = document.createElement('div');
                        dealBottomGroup.className = 'deal__bottom__group';
                        dealBottomGroup.appendChild(paymentCompleteBtn);

                        dealColumn.appendChild(dealBottomGroup);
                        dealStepsGroup.style.height = (dealColumn.offsetHeight -
                            document.getElementById('dealStatusGroup').offsetHeight -
                            dealBottomGroup.offsetHeight - 30) + 'px';
                    }
                } else if (dealInfoArr['status'] === 'rating') {
                    dealStatusText.innerText = language === 'en' ?
                        'Closing deal' : 'Завершение сделки';

                    if (myTask) {
                        let submitRatingBtn = document.createElement('button');
                        submitRatingBtn.className = 'deal__submit__btn';
                        submitRatingBtn.innerText = language === 'en' ?
                            'Submit' : 'Подтвердить';
                        submitRatingBtn.onclick = function () {
                            myAlert(language === 'en' ?
                                'Thank you for the evaluation!</br>Closing' +
                                ' deal.' : 'Спасибо за оценку!</br>Закрываем' +
                                ' сделку.');
                            setTimeout(() => {
                                let changeDealFd = new FormData();
                                changeDealFd.append('dealId', chosenDealId);
                                changeDealFd.append('dealStatus', 'completed');

                                $.ajax({
                                    url: '/php/change_deal_info.php',
                                    type: 'POST',
                                    cache: false,
                                    data: changeDealFd,
                                    dataType: 'html',
                                    processData: false,
                                    contentType: false,
                                    success: function (data) {
                                        if (data === 'Deal changed successfully!') {
                                            let deleteTaskFd = new FormData();
                                            deleteTaskFd.append('taskId', chosenTaskId);

                                            $.ajax({
                                                url: '/php/delete_task.php',
                                                type: 'POST',
                                                cache: false,
                                                data: deleteTaskFd,
                                                dataType: 'html',
                                                processData: false,
                                                contentType: false,
                                                success: function (data) {
                                                    if (data !== 'Task deleted' +
                                                        ' successfully!') {
                                                        alert(data);
                                                    } else {
                                                        let ratingFd = new FormData();
                                                        ratingFd.append('userId', dealExecutorId);
                                                        ratingFd.append('rating', dealRating);

                                                        $.ajax({
                                                            url: '/php/change_rating.php',
                                                            type: 'POST',
                                                            cache: false,
                                                            data: ratingFd,
                                                            dataType: 'html',
                                                            processData: false,
                                                            contentType: false,
                                                            success: function (data) {
                                                                if (data !== '0 rows') {
                                                                    window.open('/html/deals.html', '_self');
                                                                } else {
                                                                    alert(data);
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        } else {
                                            alert(data);
                                        }
                                    }
                                });
                            }, 1500);
                        };

                        let dealBottomGroup = document.createElement('div');
                        dealBottomGroup.className = 'deal__bottom__group';
                        dealBottomGroup.appendChild(submitRatingBtn);

                        dealColumn.appendChild(dealBottomGroup);
                        dealStepsGroup.style.height = (dealColumn.offsetHeight -
                            document.getElementById('dealStatusGroup').offsetHeight -
                            dealBottomGroup.offsetHeight - 30) + 'px';
                    }
                }
            } else {
                alert(data);
            }
        }
    });
}

displayDeals();

setInterval(() => {
    displayDealSteps(document.getElementById('dealStepsGroup'));
}, 500);

let dealCardsList = [];
setTimeout(function () {
    let originalDealCardsList = document.getElementById('dealCards').childNodes;
    for (let i = 0; i < originalDealCardsList.length; i++) {
        dealCardsList.push(originalDealCardsList[i].cloneNode(true));
    }
}, 500);

document.getElementById('messageSearchInput').onkeyup = function (e) {
    let searchInputText = e.target.value.trim().toLowerCase();

    let dealCardsListFiltered = [];
    for (let i = 0; i < dealCardsList.length; i++) {
        dealCardsListFiltered.push(dealCardsList[i].cloneNode(true));
    }

    for (let i = 0; i < dealCardsListFiltered.length; i++) {
        let cardInfoNodes = dealCardsListFiltered[i].firstChild.children;

        if (!cardInfoNodes[0].innerText.toLowerCase().includes(searchInputText) &&
            !cardInfoNodes[1].innerText.toLowerCase().includes(searchInputText) &&
            !cardInfoNodes[2].innerText.toLowerCase().includes(searchInputText)) {
            dealCardsListFiltered.splice(i);
        }
    }

    document.getElementById('dealCards').innerHTML = '';
    dealCardsListFiltered.forEach(function (item) {
        document.getElementById('dealCards').appendChild(item);
    });
}
