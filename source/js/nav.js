(function () {
    let nav = document.querySelector('#nav-js');
    let navToggle = document.querySelector('#nav-toggle-js');

    nav.classList.remove('header__nav--no-js');
    navToggle.classList.remove('header__nav-toggle--no-js');

    navToggle.addEventListener('click', function() {
        if(navToggle.classList.contains('header__nav-toggle--open')) {
            navToggle.classList.remove('header__nav-toggle--open');
            nav.classList.remove('header__nav--open');
        } else {
            navToggle.classList.add('header__nav-toggle--open');
            nav.classList.add('header__nav--open');
        }
    });
})();
