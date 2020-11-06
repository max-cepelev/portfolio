const   humburger      = document.querySelector('.humburger'),
        dayBtn         = document.querySelector('.day'),
        nightBtn       = document.querySelector('.night'),
        html           = document.querySelector('html'),
        promo          = document.querySelector('.promo'),
        menu           = document.querySelector('.menu'),
        menuItem       = document.querySelectorAll('.menu__link'),
        menuOverlay    = document.querySelector('.menu__overlay'),
        closeElem      = document.querySelector('.menu__close'),
        counters       = document.querySelectorAll('.skills__levels-percent'),
        lines          = document.querySelectorAll('.skills__levels-line span'),
        modalWindow    = document.querySelector('#thanks'),
        modalSuccess   = document.querySelector('#success'),
        modalError     = document.querySelector('#error'),
        modalWindowBtn = document.querySelectorAll('#thanks button');

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
function send(event, php){
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

const   listItems      = document.querySelectorAll(".exp__column ul li"),
        animationsFull = document.querySelectorAll(".animated_full"),
        animations     = document.querySelectorAll(".animated"),
        upBtn          = document.querySelector("#totop");



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
