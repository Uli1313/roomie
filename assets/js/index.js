import "swiper/css/bundle";
import Swiper from "swiper/bundle";
const swiperLatestRent = new Swiper(".latest-rent-swiper", {
  slidesPerView: 1,
  spaceBetween: 12,
  grabCursor: true,
  //   loop: true,
  centeredSlides: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});
