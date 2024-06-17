(function () {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  const menuLink = menu.querySelectorAll('.menu__link');
  const burger = document.querySelector('.burger-menu');

  // Клик по кнопке burger открывает или закрывает меню
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Открывает меню
  function openMenu() {
    menu.classList.add('active');
    burger.classList.add('active');
    disableScroll();
  }

  // Закрывает меню
  function closeMenu() {
    menu.classList.remove('active');
    burger.classList.remove('active');
    enableScroll();
  }

  // Отключает scroll на body
  function disableScroll() {
    const paddingRightBody = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = paddingRightBody + 'px';
  }

  // Включает scroll на body
  function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  // При клике по пункту меню с анкорной ссылкой закрывает меню
  menuLink.forEach(item => {
    item.addEventListener('click', () => {
      const url = new URL(item.href);
      if (url.hash) {
        closeMenu();
      }
    });
  });

  // Закроет меню при открытии модалки из меню на мобильном разрешении
  const headerBtn = document.querySelector('.header__btn');
  headerBtn.addEventListener('click', () => {
    closeMenu();
  });
})();

// Функция переносит элемент из одного блока в другой при пересечении брейкпоинта (media query)
function transferElement(options) {
  const { element, breakpoint, whenDown, whenUp } = options;

  const mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`);
  const elem = document.querySelector(element);
  const elemDown = document.querySelector(whenDown.elementTo);
  const elemUp = document.querySelector(whenUp.elementTo);

  if (!elem || !elemDown || !elemUp) return;

  // Функция сработает при загрузке
  handleMediaQuery(mediaQueryList);

  function handleMediaQuery(e) {
    if (e.matches) {
      // console.log('Меньше');
      moveElement(elem, elemDown, whenDown.method);
    } else {
      // console.log('Больше');
      moveElement(elem, elemUp, whenUp.method);
    }
  }

  // Срабатывает каждый раз при пересечении брейкпоинта
  mediaQueryList.addEventListener('change', handleMediaQuery);

  // Переносит элемент выбранным методом
  function moveElement(el, elTo, placeTo) {
    if (placeTo === 'append') {
      elTo.append(el);
    } else if (placeTo === 'prepend') {
      elTo.prepend(el);
    } else if (placeTo === 'before') {
      elTo.before(el);
    } else if (placeTo === 'after') {
      elTo.after(el);
    }
  }
}

transferElement({
  element: '.header__btn',
  breakpoint: 768,
  whenDown: {
    elementTo: '.menu__list',
    // append, prepend, before, after
    method: 'append',
  },
  whenUp: {
    elementTo: '.menu',
    // append, prepend, before, after
    method: 'after',
  },
});
