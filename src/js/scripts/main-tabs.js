(function () {
  const buttons = document.querySelectorAll('.main-tabs__button');
  const contents = document.querySelectorAll('.main-tabs__content');
  const img = document.querySelectorAll('.main-tabs__img-wrap');
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      contents.forEach(item => item.classList.remove('active'));
      img.forEach(item => item.classList.remove('active'));

      btn.classList.add('active');
      contents[i].classList.add('active');
      img[i].classList.add('active');
    });
  });
})();
