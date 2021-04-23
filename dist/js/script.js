const   html           = document.querySelector('html'),
        promo          = html.querySelector('.promo'),
        humburger      = promo.querySelector('.humburger'),
        menu           = html.querySelector('.menu'),
        menuItem       = menu.querySelectorAll('.menu__link'),
        menuOverlay    = menu.querySelector('.menu__overlay'),
        menuTheme      = menu.querySelector('.menu__night'),
        menuDay        = menu.querySelector('.day'),
        menuNight      = menu.querySelector('.night'),
        closeElem      = menu.querySelector('.menu__close'),
        counters       = html.querySelectorAll('.skills__levels-percent'),
        lines          = html.querySelectorAll('.skills__levels-line span'),
        modalWindow    = html.querySelector('#thanks'),
        modalSuccess   = modalWindow.querySelector('#success'),
        modalError     = modalWindow.querySelector('#error'),
        modalWindowBtn = modalWindow.querySelectorAll('#thanks button');


addClassActive = (elem) => {
    if (!elem.classList.contains('active')) {
        elem.classList.add('active');
    }
}
removeClassActive = (elem) => {
    if (elem.classList.contains('active')) {
        elem.classList.remove('active');
    }
}
showElement = (elem) => {
    addClassActive(elem);
    setTimeout(function() {
        if (!elem.classList.contains('fadeIn')) {
            elem.classList.add('fadeIn');
            elem.classList.remove('fadeOut');
        }
    }, 500);
}
hideElement = (elem) => {
    elem.classList.add('fadeOut');
    clearInterval();
    setTimeout(function() {
        removeClassActive(elem);
        elem.classList.remove('fadeIn');
        elem.classList.remove('fadeOut');
    }, 1000);
}

let theme;

if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
} else {
    theme = 'day';
    menuNight.classList.add('active');
    localStorage.setItem('theme', 'day');
}

if (theme === 'night') {
    html.classList.add('__night-theme');
    menuDay.classList.add('active');
} else {
    menuNight.classList.add('active')
};

menuTheme.addEventListener('click', () => {
    html.classList.toggle('__night-theme');
    menuDay.classList.toggle('active');
    menuNight.classList.toggle('active');
    if (html.classList.contains('__night-theme')) {
        localStorage.setItem('theme', 'night')
    } else {
        localStorage.setItem('theme', 'day')
    }
});

humburger.addEventListener('click', () => {
    addClassActive(menu);
    document.body.style.overflow = 'hidden';
});

closeElem.addEventListener('click', () => {
    removeClassActive(menu);
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        removeClassActive(menu);
        document.body.style.overflow = '';
    });
});

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

modalWindowBtn.forEach( (item, i) => {
    item.addEventListener('click', () => {
        hideElement(modalWindow);
        hideElement(modalSuccess);
        hideElement(modalError);
    });
});

window.onclick = function(event) {
    if (event.target === modalWindow) {
        hideElement(modalWindow);
        hideElement(modalSuccess);
        hideElement(modalError);
    }
    if (event.target == menuOverlay) {
        removeClassActive(menu);
        document.body.style.overflow = '';
    }
};


// Отправка данных на сервер
function send(event, php) {
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    const req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
        const json = JSON.parse(this.response); //internet explorer 11
            console.log(json);
            
            // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            if (json.result == "success") {
                // Если сообщение отправлено
                // alert("Сообщение отправлено");
                showElement(modalWindow);
                showElement(modalSuccess);
            } else {
                // Если произошла ошибка
                // alert("Ошибка. Сообщение не отправлено");
                showElement(modalWindow);
                showElement(modalError);
            }
        // Если не удалось связаться с php файлом
        } else {
            // alert("Ошибка сервера. Номер: "+req.status);
            showElement(modalWindow);
            showElement(modalError);
        }}; 
    
    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function() {alert("Ошибка отправки запроса");};
    req.send(new FormData(event.target));
}

// Оформление input file
function inputFile(e) {
    let el = e.target.parentNode.querySelector('.count');
    if (e.target.value != '') {
        el.innerHTML = "Выбрано файлов: " + e.target.files.length;
    } else {
        el.innerHTML = 'Прикрепить файлы';
    }
}

// scroll анимация
let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
    if (isScrolling == false) {
        window.requestAnimationFrame(function() {
        scrolling(e);
        isScrolling = false;
        });
    }
    isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

const   listItems      = html.querySelectorAll(".exp__column ul li"),
        animationsFull = html.querySelectorAll(".animated_full"),
        animations     = html.querySelectorAll(".animated"),
        upBtn          = html.querySelector("#totop");



function scrolling(e) {

    for (let i = 0; i < animations.length; i++) {
        const animate = animations[i];

        if (isPartiallyVisible(animate)) {
            addClassActive(animate);
        } else {
            // animate.classList.remove("active");
        }
    }

    for (let n = 0; n < listItems.length; n++) {
        const listItem = listItems[n];

        if (isPartiallyVisible(listItem)) {
            addClassActive(listItem);
        } else {
        // listItem.classList.remove("active");
        }
    }

    for (let m = 0; m < animationsFull.length; m++) {
        const animateFull = animationsFull[m];

        if (isFullyVisible(animateFull)) {
            addClassActive(animateFull);
        } else {
            // animateFull.classList.remove("active");
        }
    }

    // кнопка наверх, скрывается когда секция промо частично видна
    if (isPartiallyVisible(promo)) {
        removeClassActive(upBtn);
    } else {
        addClassActive(upBtn);
    }

}

function isPartiallyVisible(el) {
    const elementBoundary = el.getBoundingClientRect();

    const top = elementBoundary.top;
    const bottom = elementBoundary.bottom;
    const height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

function isFullyVisible(el) {
    const elementBoundary = el.getBoundingClientRect();

    const top = elementBoundary.top;
    const bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}
