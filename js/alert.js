function closeAlert() {
    document.getElementById('alert').remove();
    document.getElementsByTagName('header')[0].classList.remove('blur');
    document.getElementsByTagName('header')[0].classList.remove('non-clickable');
    document.getElementById('container').classList.remove('blur');
    document.getElementById('container').classList.remove('non-clickable');
}

function blurPage() {
    document.getElementsByTagName('header')[0].classList.add('blur');
    document.getElementsByTagName('header')[0].classList.add('non-clickable');
    document.getElementById('container').classList.add('blur');
    document.getElementById('container').classList.add('non-clickable');
}

function myAlert(title) {
    let alertTitle = document.createElement('div');
    alertTitle.className = 'pop__up__window-text';
    alertTitle.innerHTML = title;

    let alert = document.createElement('div');
    alert.id = 'alert';
    alert.className = 'pop__up__window';
    alert.appendChild(alertTitle);

    blurPage();
    document.body.appendChild(alert);
}

function myAlertWithBtns(title, onSubmit) {
    let alertTitle = document.createElement('div');
    alertTitle.className = 'pop__up__window-text';
    alertTitle.innerText = title;

    let alertConfirmButton = document.createElement('button');
    alertConfirmButton.className = 'pop__up__btn blue__btn btn__margin-left';
    alertConfirmButton.innerText = language === 'en' ? 'Yes' : 'Да';
    alertConfirmButton.onclick = function () {
        onSubmit();
        closeAlert();
    };

    let alertDenyButton = document.createElement('button');
    alertDenyButton.className = 'pop__up__btn red__btn btn__margin-right';
    alertDenyButton.innerText = language === 'en' ? 'No' : 'Нет';
    alertDenyButton.onclick = closeAlert;

    let alertButtonsRow = document.createElement('div');
    alertButtonsRow.className = 'pop__up__window-btns';
    alertButtonsRow.appendChild(alertDenyButton);
    alertButtonsRow.appendChild(alertConfirmButton);

    let alert = document.createElement('div');
    alert.id = 'alert';
    alert.className = 'pop__up__window';
    alert.appendChild(alertTitle);
    alert.appendChild(alertButtonsRow);

    blurPage();
    document.body.appendChild(alert);
}
