import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const reviewsSlider = new Swiper('.reviews-slider', {
  modules: [Navigation],

  // Optional parameters
  slidesPerView: 3,
  loop: true,
  spaceBetween: 30,

  watchSlidesProgress: true,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    950: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1450: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '.reviews-slider-next',
    prevEl: '.reviews-slider-prev',
  },
});
