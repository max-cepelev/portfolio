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
// var firstBox = document.querySelector("#firstBox");
var expItems = document.querySelectorAll(".exp__item");
var expIcons = document.querySelectorAll(".exp__item-icon");
var expHeads = document.querySelectorAll(".exp__item-head");
var expDescrs = document.querySelectorAll(".exp__item-descr");

function scrolling(e) {

    // if (isPartiallyVisible(firstBox)) {
    //     firstBox.classList.add("active");

    //     document.body.classList.add("colorOne");
    //     document.body.classList.remove("colorTwo");
    // } else {
    //     document.body.classList.remove("colorOne");
    //     document.body.classList.remove("colorTwo");
    // }

    // if (isFullyVisible(secondBox)) {
    //     secondBox.classList.add("active");

    //     document.body.classList.add("colorTwo");
    //     document.body.classList.remove("colorOne");
    // }
    for (var i = 0; i < expItems.length; i++) {
        var expItem = expItems[i];
        var expIcon = expIcons[i];
        var expHead = expHeads[i];
        var expDescr = expDescrs[i];

        if (isFullyVisible(expItem)) {
        expItem.classList.add("active");
        expIcon.classList.add("active");
        expHead.classList.add("active");
        expDescr.classList.add("active");
        }
        // } else {
        // expItem.classList.remove("active");
        // expIcon.classList.remove("active");
        // expHead.classList.remove("active");
        // expDescr.classList.remove("active");
        // }
    }

    for (var n = 0; n < listItems.length; n++) {
        var listItem = listItems[n];

        if (isFullyVisible(listItem)) {
        listItem.classList.add("active");
        } else {
        // listItem.classList.remove("active");
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