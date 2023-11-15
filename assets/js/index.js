import "swiper/css/bundle";
import Swiper from "swiper/bundle";

const swiperIntro = new Swiper(".intro-swiper", {
  slidesPerView: "auto",
  spaceBetween: 12,
  breakpoints: {
    768: {
      spaceBetween: 24,
    },
  },
});

const swiperLatestRent = new Swiper(".latest-rent-swiper", {
  slidesPerView: 1,
  spaceBetween: 12,
  grabCursor: true,
  autoplay: {
    delay: 1500,
  },
  loop: true,
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

// 打字機
const arr = ["工作室", "住處"];
let count = 0;
setInterval(function () {
  count += 1;
  const typewriteAni = document.getElementById("typewrite-animated");
  const typewriteText = document.getElementById("typewrite-text");
  if (typewriteAni.classList.contains("typewriter")) {
    typewriteAni.classList.remove("typewriter", "typingtwo", "typingthree");
  } else {
    typewriteAni.classList.add("typewriter");
    if (count % 2 === 1) {
      typewriteAni.classList.add("typingtwo");
    } else {
      typewriteAni.classList.add("typingthree");
    }
    typewriteAni.addEventListener("animationend", function () {
      setTimeout(function () {
        typewriteText.textContent = "";
        typewriteAni.classList.remove("typewriter", "typingtwo", "typingthree");
      }, 800);
    });
  }
  typewriteText.textContent = arr[count % 2];
}, 1500);

// // 選取 .swiper-slide-prev 之前的 第一個 .swiper-slide
// const swiperSlidePrev = document.querySelector(".swiper-slide-prev");
// const swiperSlidePrevPrev = swiperSlidePrev.previousElementSibling;
// if (swiperSlidePrevPrev)
//   swiperSlidePrevPrev.classList.add("swiper-slide-prev-prev");

// console.log(swiperSlidePrev);
