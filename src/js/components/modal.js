class Modal {
  defaultOptions = {};
  constructor(params) {
    this.params = Object.assign(this.defaultOptions, params);
    this.modalEl = document.querySelector(params.selectorModal);
    this.btnOpenList = document.querySelectorAll(params.selectorButton);
    // Если нет элемента на странице, дальше код не выполняется
    if (!this.modalEl) return;
    this.modalBody = this.modalEl.querySelector('.modal__body');
    this.btnClose = this.modalEl.querySelector('.modal__btn-close');

    this.arrayOpenModalHandler = [];

    this.init();
  }

  init() {
    // Открытие модального окна
    this.btnOpenList.forEach(btn => {
      this.openModalHandler = this.openModalHandler.bind(this);
      this.arrayOpenModalHandler.push(this.openModalHandler);
      btn.addEventListener('click', this.openModalHandler);
    });

    // Закрытие модального окна по нажатию на крестик
    this.closeModalBtnHandler = this.closeModalBtnHandler.bind(this);
    this.btnClose.addEventListener('click', this.closeModalBtnHandler);
  }

  // Методы =========================================================================
  // Отключает scroll на body
  disableScroll() {
    const paddingRightBody = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = paddingRightBody + 'px';
  }

  // Включает scroll на body
  enableScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  // Открытия модального окна
  openModal() {
    this.modalEl.classList.add('open');
    this.modalBody.classList.add('open');
    this.disableScroll();

    // Добавление обработчиков закрытия окна
    // Закрытие модального окна по клику вне окна
    this.closeOutsideClickHandler = this.closeOutsideClickHandler.bind(this);
    window.addEventListener('click', this.closeOutsideClickHandler);
    // Закрытие по нажатию клавиши Esc
    this.closeEscHandler = this.closeEscHandler.bind(this);
    window.addEventListener('keydown', this.closeEscHandler);
  }

  // Закрытия модального окна
  closeModal() {
    this.modalEl.classList.remove('open');
    this.modalBody.classList.remove('open');

    this.enableScroll();

    // Удаление обработчиков закрытия окна
    window.removeEventListener('click', this.closeOutsideClickHandler);
    window.removeEventListener('keydown', this.closeEscHandler);
  }

  // Обработчик открытия модального окна
  openModalHandler() {
    this.openModal();
  }

  // Обработчик закрытия модального окна
  closeModalBtnHandler() {
    this.closeModal();
  }

  // Обработчик закрытия модального окна по клику вне окна
  closeOutsideClickHandler(e) {
    if (e.target === this.modalEl) {
      this.closeModal();
    }
  }

  // Обработчик закрытия по нажатию клавиши Esc
  closeEscHandler(e) {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  }

  // Удаляет обработчики событий
  destroy() {
    this.closeModal();
    this.btnOpenList.forEach((btn, i) => {
      btn.removeEventListener('click', this.arrayOpenModalHandler[i]);
    });
    this.btnClose.removeEventListener('click', this.closeModalBtnHandler);
  }
}

// Первый аргумент - селектор модального окна, второй - селектор кнопки открытия
// const modal1 = new Modal({
//   selectorModal: '.modal-1',
//   selectorButton: '.block1__btn-1',
// });

// ==========================================================================

// Отключает модалку на выбранном брейкпоинте
(function () {
  const btnList = document.querySelectorAll('.open-modal');
  let modal1;
  const mediaQueryList = window.matchMedia(`(max-width: 768px)`);

  function preventDefaultLink(e) {
    e.preventDefault();
  }

  function handleMediaQuery(e) {
    if (e.matches) {
      // Если меньше брейкпоинта
      modal1 = new Modal({
        selectorModal: '.modal-1',
        selectorButton: '.open-modal',
      });

      btnList.forEach(btn => {
        btn.addEventListener('click', preventDefaultLink);
      });
    } else {
      // Если больше брейкпоинта

      if (modal1) modal1.destroy();

      btnList.forEach(btn => {
        btn.removeEventListener('click', preventDefaultLink);
      });
    }
  }

  // Функция сработает при загрузке
  handleMediaQuery(mediaQueryList);

  // Срабатывает каждый раз при пересечении брейкпоинта
  mediaQueryList.addEventListener('change', handleMediaQuery);
})();
