import "swiper/css/bundle";
import Swiper from "swiper/bundle";
import * as d3 from "d3";

// 首頁地圖
let bannerMap = d3.select(".banner-map");
const g = bannerMap.append("g");

let projectmethod = d3.geoMercator().center([121.7, 24.2]).scale(8500);
let pathGenerator = d3.geoPath().projection(projectmethod);
// 繪製地圖
d3.json("/roomie/assets/COUNTY_MOI_1090820.json").then((data) => {
  const geometries = topojson.feature(data, data.objects["COUNTY_MOI_1090820"]);

  g.append("path");
  const paths = g.selectAll("path").data(geometries.features);
  paths
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("class", "banner-county")
    .append("title")
    .text((d) => d.properties["COUNTYNAME"]);

  currentCounty();
});

// 點擊顯示 當前縣市名稱 & icon 標示
function currentCounty() {
  const county = document.querySelectorAll(".banner-county");
  const icon = document.querySelector(".banner-county-icon");
  const countyLabel = document.querySelector(".banner-county-label");
  county.forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(e);
      // 定位基準在 body
      icon.style.left = `${e.pageX - 12}px`;
      icon.style.top = `${e.pageY - 24}px`;
      icon.classList.remove("d-none");

      countyLabel.style.left = `${e.pageX - 108}px`;
      countyLabel.style.top = `${e.pageY - 10}px`;
      countyLabel.classList.remove("d-none");
      countyLabel.textContent = e.target.textContent;
    });
  });
}

// Swiper
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
