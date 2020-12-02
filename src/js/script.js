const   html           = document.querySelector('html'),
        promo          = html.querySelector('.promo'),
        humburger      = promo.querySelector('.humburger'),
        dayBtn         = promo.querySelector('.day'),
        nightBtn       = promo.querySelector('.night'),
        menu           = html.querySelector('.menu'),
        menuItem       = menu.querySelectorAll('.menu__link'),
        menuOverlay    = menu.querySelector('.menu__overlay'),
        closeElem      = menu.querySelector('.menu__close'),
        counters       = html.querySelectorAll('.skills__levels-percent'),
        lines          = html.querySelectorAll('.skills__levels-line span'),
        modalWindow    = html.querySelector('#thanks'),
        modalSuccess   = modalWindow.querySelector('#success'),
        modalError     = modalWindow.querySelector('#error'),
        modalWindowBtn = modalWindow.querySelectorAll('#thanks button');

nightBtn.addEventListener('click', () => {
    dayBtn.classList.add('active');
    dayBtn.classList.remove('disactive');
    nightBtn.classList.remove('active');
    nightBtn.classList.add('disactive');
    html.classList.remove('__night-theme');
});

dayBtn.addEventListener('click', () => {
    nightBtn.classList.add('active');
    nightBtn.classList.remove('disactive');
    dayBtn.classList.remove('active');
    dayBtn.classList.add('disactive');
    html.classList.add('__night-theme');
});

humburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () =>{ 
    menu.classList.remove('active');
});

menuItem.forEach( (item, i) => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

modalWindowBtn.forEach( (item, i) => {
    item.addEventListener('click', () => {
        modalWindow.style.display = "none";
    });
});

window.onclick = function(event) {
    if (event.target == modalWindow) {
        modalWindow.style.display = "none";
    }
    if (event.target == menuOverlay) {
        menu.classList.remove('active');
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
                modalWindow.style.display = "block";
                modalSuccess.style.display = "flex";
            } else {
                // Если произошла ошибка
                // alert("Ошибка. Сообщение не отправлено");
                modalWindow.style.display = "block";
                modalError.style.display = "flex";
            }
        // Если не удалось связаться с php файлом
        } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
    
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
            animate.classList.add("active");
        } else {
            // animate.classList.remove("active");
        }
    }

    for (let n = 0; n < listItems.length; n++) {
        const listItem = listItems[n];

        if (isPartiallyVisible(listItem)) {
            listItem.classList.add("active");
        } else {
        // listItem.classList.remove("active");
        }
    }

    for (let m = 0; m < animationsFull.length; m++) {
        const animateFull = animationsFull[m];

        if (isFullyVisible(animateFull)) {
            animateFull.classList.add("active");
        } else {
            // animateFull.classList.remove("active");
        }
    }

    // кнопка наверх, скрывается когда секция промо частично видна
    if (isPartiallyVisible(promo)) {
        upBtn.classList.remove("active");
    } else {
        upBtn.classList.add("active");
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
