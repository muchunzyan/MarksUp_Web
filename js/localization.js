let language;

if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'en');
} else {
    language = localStorage.getItem('language');
}

const translations = {
    "en": {
        "find-a-task": "Find a task",
        "create-a-task": "Create a task",
        "my-tasks": "My tasks",
        "deals": "Deals",
        "profile": "Profile",
        "specify-the-name-of-the-subject": "Specify the name of the subject",
        "the-name-of-the-subject": "The name of the subject",
        "linear-algebra": "Linear algebra",
        "next": "Next",
        "choose-the-type-of-educational-institution": "Choose the type of" +
            " educational institution",
        "university": "University",
        "school": "School",
        "other": "Other",
        "back": "Back",
        "specific-task-or-fully-study-the-topic": "Do you want someone to" +
            " explain to you how to do a specific task, or you need help to" +
            " fully study the topic?",
        "specific-task": "Specific task",
        "full-topic": "Full topic",
        "write-a-detailed-description-of-the-task": "Write a detailed" +
            " description of the task",
        "description-of-the-task": "Description of the task",
        "i-need-help-in": "I need help in ...",
        "specify-the-deadline-for-the-task": "Specify the deadline for the" +
            " task",
        "deadline": "Deadline",
        "how-much-are-you-willing-to-pay-for-this-task": "How much are you" +
            " willing to pay for this task?",
        "price-for-the-task": "Price for the task (₽)",
        "negotiated-price": "Negotiated price",
        "attach-a-photo-of-the-task": "Attach a photo of the task/materials" +
            " or some related documents, if there are any",
        "attach-file": "Attach file",
        "check-the-correctness-of-the-data": "Check the correctness of the" +
            " data",
        "subject-semicolon": "Subject:",
        "deadline-semicolon": "Deadline:",
        "price-semicolon": "Price:",
        "description-semicolon": "Description:",
        "edit": "Edit",
        "publish": "Publish",
        "contributor-or-subject-name": "Contributor or subject name...",
        "select-a-deal": "Select a deal",
        "edit-profile": "Edit profile",
        "name": "Name",
        "photo": "Photo",
        "age": "Age",
        "city": "City",
        "educational-institution": "Educational institution",
        "about-me": "About me",
        "tell-something-about-yourself": "Tell something about yourself...",
        "cancel": "Cancel",
        "save": "Save",
        "edit-task": "Edit task",
        "type-of-help": "Type of help",
        "attached-documents": "Attached documents",
        "delete-task": "Delete task",
        "deadline-from": "Deadline from",
        "deadline-to": "Deadline to",
        "price-from": "Price from (₽)",
        "price-to": "Price to (₽)",
        "login-register": "Login/Register",
        "e-mail": "E-mail",
        "password": "Password",
        "login": "Login",
        "create-account": "Create account",
        "edit-profile-btn": "Edit profile",
        "age-semicolon": "Age: ",
        "city-semicolon": "City: ",
        "educational-institution-semicolon": "Educational institution: ",
        "rating-semicolon": "Rating: ",
        "registration": "Registration",
        "ivanov-ivan": "Ivanov Ivan",
        "register": "Register",
        "respond": "Respond",
        "customer": "Customer",
        "description-of-the-service": "Description of the service",
        "description-of-the-service-text": '<span' +
            ' class=\"bold-text\">MarksUp</span> is the first student' +
            ' freelance platform.<br><br><span class=\"bold-text\">Our' +
            ' mission</span> is to create a convenient and efficient' +
            ' infrastructure for everyone who studies for the rapid exchange' +
            ' of knowledge and mutual assistance.',
        "statistics": "Statistics",
        "statistics-text": "In the future, this section will display" +
            " statistics of the service.",
        "how-it-works": "How it works?",
        "how-it-works-text": '<span class=\"bold-text\">Help and' +
            ' earn</span><br>With the help of the Markup website, respond' +
            ' to student publications and earn money by helping others in' +
            ' their studies.<br><br><span class=\"bold-text\">Get help' +
            ' yourself</span><br>Create and publish your ads using the' +
            ' MarksUp website and get help with your studies from students' +
            ' like you!',
        "commissions": "Commissions",
        "commissions-text": 'The transfer of funds to the Contractor\'s' +
            ' account is carried out at his request. For the withdrawal of' +
            ' funds from the Contractor\'s Balance, a commission of 10 (ten)' +
            ' percent is charged, deducted from the amount withdrawn by the' +
            ' Contractor.<br><br>When the Customer pays for the transaction,' +
            ' a commission of 10 (ten) percent is charged, in addition to' +
            ' the order amount.',
        "create-task": "Create task",
        "find-task": "Find task",
        "my-profile": "My profile",
        "others-profile": "Other's profile",
        "task-information": "Task information",
        "language": "Language",
    },
    "ru": {
        "find-a-task": "Найти задание",
        "create-a-task": "Создать задание",
        "my-tasks": "Мои задания",
        "deals": "Сделки",
        "profile": "Профиль",
        "specify-the-name-of-the-subject": "Укажите название предмета",
        "the-name-of-the-subject": "Название предмета",
        "linear-algebra": "Линейная алгебра",
        "next": "Далее",
        "choose-the-type-of-educational-institution": "Выберите тип учебного" +
            " заведения",
        "university": "Университет",
        "school": "Школа",
        "other": "Другое",
        "back": "Назад",
        "specific-task-or-fully-study-the-topic": "Вы хотите, чтобы кто-то" +
            " объяснил вам, как выполнить определенную задачу, или вам нужна" +
            " помощь для полного изучения темы?",
        "specific-task": "Определенная задача",
        "full-topic": "Полная тема",
        "write-a-detailed-description-of-the-task": "Напишите подробное" +
            " описание задания",
        "description-of-the-task": "Описание задачи",
        "i-need-help-in": "Мне нужна помощь в ...",
        "specify-the-deadline-for-the-task": "Укажите крайний срок" +
            " выполнения задания",
        "deadline": "Крайний срок",
        "how-much-are-you-willing-to-pay-for-this-task": "Сколько вы готовы" +
            " заплатить за это задание?",
        "price-for-the-task": "Цена за выполнение задания (₽)",
        "negotiated-price": "Договорная цена",
        "attach-a-photo-of-the-task": "Прикрепите фотографию" +
            " задания/материалов или какие-либо сопутствующие документы," +
            " если таковые имеются",
        "attach-file": "Прикрепить файл",
        "check-the-correctness-of-the-data": "Проверьте правильность данных",
        "subject-semicolon": "Предмет:",
        "deadline-semicolon": "Крайний срок:",
        "price-semicolon": "Цена:",
        "description-semicolon": "Описание:",
        "edit": "Редактировать",
        "publish": "Опубликовать",
        "contributor-or-subject-name": "Имя пользователя или название предмета...",
        "select-a-deal": "Выберите сделку",
        "edit-profile": "Редактирование профиля",
        "name": "Имя",
        "photo": "Фото",
        "age": "Возраст",
        "city": "Город",
        "educational-institution": "Учебное заведение",
        "about-me": "Обо мне",
        "tell-something-about-yourself": "Расскажите что-нибудь о себе...",
        "cancel": "Отменить",
        "save": "Сохранить",
        "edit-task": "Редактирование задания",
        "type-of-help": "Вид помощи",
        "attached-documents": "Прикрепленные документы",
        "delete-task": "Удалить задачу",
        "deadline-from": "Крайний срок от",
        "deadline-to": "Крайний срок до",
        "price-from": "Цена от (₽)",
        "price-to": "Цена до (₽)",
        "login-register": "Вход/Регистрация",
        "e-mail": "Электронная почта",
        "password": "Пароль",
        "login": "Войти",
        "create-account": "Создать аккаунт",
        "edit-profile-btn": "Редактировать профиль",
        "age-semicolon": "Возраст: ",
        "city-semicolon": "Город: ",
        "educational-institution-semicolon": "Учебное заведение: ",
        "rating-semicolon": "Рейтинг: ",
        "registration": "Регистрация",
        "ivanov-ivan": "Иванов Иван",
        "register": "Зарегистрироваться",
        "respond": "Откликнуться",
        "customer": "Заказчик",
        "description-of-the-service": "Описание сервиса",
        "description-of-the-service-text": '<span' +
            ' class=\"bold-text\">MarksUp</span> это первая фриланс' +
            ' платформа для студентов. Мы гарантируем безопасность сделок и' +
            ' качество услуг, предоставляемых нашим пользователям!<br><br>' +
            '<span class=\"bold-text\">Наша миссия</span> это создание' +
            ' удобной и эффективной инфраструктуры для всех, кто учится, для' +
            ' быстрого обмена знаниями и взаимопомощи.',
        "statistics": "Статистика",
        "statistics-text": "В будущем в этом разделе будет отображаться" +
            " статистика работы сервиса.",
        "how-it-works": "Как это работает?",
        "how-it-works-text": '<span class=\"bold-text\">Помогай и' +
            ' зарабатывай</span><br>С помощью сайта Markup откликайтесь на' +
            ' студенческие запросы и зарабатывайте деньги, помогая другим в' +
            ' учебе.<br><br><span class=\"bold-text\">Получай помощь' +
            ' сам</span><br>Создавайте и публикуйте свои объявления с' +
            ' помощью сайта MarksUp и получайте помощь в учебе от таких же' +
            ' студентов, как вы!',
        "commissions": "Комиссии",
        "commissions-text": 'Перевод средств на счет Исполнителя' +
            ' осуществляется по его запросу. За снятие средств с баланса' +
            ' Исполнителя взимается комиссия в размере 10 (десяти)' +
            ' процентов, вычитаемая из суммы, выводимой' +
            ' Исполнителем.<br><br>Когда Клиент оплачивает сделку, взимается' +
            ' комиссия в размере 10 (десяти) процентов в дополнение к сумме' +
            ' заказа.',
        "create-task": "Создать задание",
        "find-task": "Найти задание",
        "my-profile": "Мой профиль",
        "others-profile": "Чужой профиль",
        "task-information": "Информация о задании",
        "language": "Язык",
    },
};

const placeholders = [
    "i-need-help-in",
    "linear-algebra",
    "contributor-or-subject-name",
    "tell-something-about-yourself",
    "ivanov-ivan",
];

const html = [
    "description-of-the-service-text",
    "how-it-works-text",
    "commissions-text",
];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
});

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    if (placeholders.includes(key)) {
        element.placeholder = translations[language][key];
    } else if (html.includes(key)) {
        element.innerHTML = translations[language][key];
    } else {
        element.innerText = translations[language][key];
    }
}