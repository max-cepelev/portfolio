const humburger = document.querySelector('.humburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.menu__close');

humburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () =>{ 
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__levels-percent'),
        lines = document.querySelectorAll('.skills__levels-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

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
                alert("Сообщение отправлено");
            } else {
                // Если произошла ошибка
                alert("Ошибка. Сообщение не отправлено");
            }
        // Если не удалось связаться с php файлом
        } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
    
    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function() {alert("Ошибка отправки запроса");};
    req.send(new FormData(event.target));
}

// scroll анимация
var isScrolling = false;

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

var listItems = document.querySelectorAll(".exp__column ul li");
var animationsFull = document.querySelectorAll(".animated_full");
var animations = document.querySelectorAll(".animated");

function scrolling(e) {

    for (var i = 0; i < animations.length; i++) {
        var animate = animations[i];

        if (isPartiallyVisible(animate)) {
            animate.classList.add("active");
        } else {
            // animate.classList.remove("active");
        }
    }

    for (var n = 0; n < listItems.length; n++) {
        var listItem = listItems[n];

        if (isPartiallyVisible(listItem)) {
            listItem.classList.add("active");
        } else {
        // listItem.classList.remove("active");
        }
    }

    for (var m = 0; m < animationsFull.length; m++) {
        var animateFull = animationsFull[m];

        if (isFullyVisible(animateFull)) {
            animateFull.classList.add("active");
        } else {
            animateFull.classList.remove("active");
        }
    }
}

function isPartiallyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

function isFullyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}