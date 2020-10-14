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