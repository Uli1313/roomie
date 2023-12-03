import "swiper/css/bundle";
import Swiper from "swiper/bundle";
import * as d3 from "d3";
import axios from "axios";

// const url = "http://localhost:3000";
const url = "https://roomie-lfta.onrender.com";

let rentsData;
let newsData;

// banner 物件
const bannerRent = document.querySelector(".banner-rent");
// banner 搜尋欄
const bannerSearchForm = document.querySelector(".banner-search-form");
// banner 手機板下拉選單
const bannerMobileSearch = document.querySelector(".banner-mobile-search");
// 當前選擇的縣市
let currentCountyName;
// 當前顯示的物件資料
let currentCountyData;
// 最新物件
const latestRentItem = document.querySelector(".latest-rent-item");

// 繪製地圖變數
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
    .attr("data-county", (d) => d.properties["COUNTYNAME"])
    .append("title")
    .text((d) => d.properties["COUNTYNAME"]);

  currentCounty();
});

// 取得物件資料
function rentInit() {
  axios
    .get(`${url}/rents?_sort=view&_order=desc`)
    .then((res) => {
      rentsData = res.data;
      renderBannerRent(rentsData);
      renderLatestRent(rentsData);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 渲染物件
function renderBannerRent(data) {
  currentCountyData = data.slice(0, 10);

  const countyUnselected = document.querySelector(".county-unselected");
  const countySelected = document.querySelector(".county-selected");
  let str = "";

  // 縣市熱門物件件數
  if (currentCountyName) {
    countyUnselected.classList.add("d-none");
    countySelected.classList.remove("d-none");
    countySelected.innerHTML = `<span class="material-icons text-primary"> location_on </span>
    <h6 class="text-primary fs-4 me-2">${currentCountyName}</h6>
    <p class="fs-7">
      熱門房屋物件<span class="mx-2 fw-bold text-primary">${data.length}</span
      >件
    </p>`;
  }
  // 是否有物件
  if (data.length === 0) {
    bannerRent.innerHTML = `<div
    class="w-100 h-100 d-flex align-items-center justify-content-center fs-4 fs-md-3 text-primary-200 fw-medium position-relative" style="top:-24px"
  >
    <p>沒有任何物件 Σ(ﾟωﾟ)</p>
  </div>`;
    return;
  }

  // 取前 10 筆作渲染
  currentCountyData.forEach((e) => {
    str += `<li
    class="banner-rent-item d-flex p-3 py-md-4 px-md-5 gap-2 gap-md-4 position-relative"
  >
    <img
      class="banner-rent-img object-fit-cover rounded-3"
      src=${e.photo[0]}
      alt=""
    />
    <div class="d-flex flex-column justify-content-between">
      <p class="lh-sm fs-md-5">
        ${e.title}
      </p>
      <p class="text-primary fw-bold lh-sm fs-7 fs-md-5">
        <span class="fs-4 fs-md-3 me-1">${e.price}</span>元/月
      </p>
    </div>
    <a href="rentArticle.html?id=${e.id}" class="stretched-link"></a>
  </li>`;
  });
  bannerRent.innerHTML = str;
}

// 點擊顯示 當前縣市名稱 & icon 標示、物件列表
function currentCounty() {
  const county = document.querySelectorAll(".banner-county");
  county.forEach((e) => {
    e.addEventListener("click", (e) => {
      currentCountyName = e.target.getAttribute("data-county");
      updateCurrentCounty(e.target);
      currentCountyRent();
    });
  });
}
// 顯示當前物件列表
function currentCountyRent() {
  // 取得當前縣市物件
  axios
    .get(
      `${url}/rents?_sort=updateDate&_order=desc&address=${currentCountyName}`
    )
    .then((res) => {
      const filterData = res.data;
      renderBannerRent(filterData);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 點擊縣市、視窗縮放時更新圖標位置
function updateCurrentCounty(e) {
  const icon = document.querySelector(".banner-county-icon");
  const countyLabel = document.querySelector(".banner-county-label");
  const domRect = e.getBoundingClientRect(); // 取得元素寬高及位置
  const svgWidth = domRect.width;
  const svgHeight = domRect.height;
  const svgSize = (function () {
    // 微調圖標位置
    if (currentCountyName === "新北市" || currentCountyName === "宜蘭縣") {
      return { x: svgWidth / 2, y: svgHeight / 1.4 };
    } else if (currentCountyName === "臺東縣") {
      return { x: svgWidth / 2.8, y: svgHeight / 2.5 };
    } else {
      return { x: svgWidth / 2, y: svgHeight / 2 };
    }
  })();

  icon.style.left = `${domRect.left + svgSize.x - 12}px`;
  icon.style.top = `${domRect.top + svgSize.y - 24}px`;
  icon.classList.remove("d-none");

  countyLabel.style.left = `${domRect.left + svgSize.x - 108}px`;
  countyLabel.style.top = `${domRect.top + svgSize.y - 10}px`;
  countyLabel.classList.remove("d-none");
  countyLabel.textContent = currentCountyName;
}

// 視窗縮放時圖標跟著地圖一起移動
window.addEventListener("resize", () => {
  const county = document.querySelectorAll(".banner-county");
  county.forEach((e) => {
    if (e.getAttribute("data-county") === currentCountyName) {
      updateCurrentCounty(e);
    }
  });
});

// 手機板下拉縣市選單
bannerMobileSearch.addEventListener("change", (e) => {
  currentCountyName = e.target.value;
  currentCountyRent();
});

// 搜尋框
bannerSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = document.querySelector(".banner-search-input").value;
  const filterData = currentCountyData.filter((i) => i.title.includes(value));

  // 先初始化成已選縣市的資料
  // currentCountyRent();

  if (!value && !currentCountyName) {
    // 空值且沒選擇縣市時初始化物件資料
    rentInit();
    return;
  } else if (!value && currentCountyName) {
    // 已選縣市，搜尋值為空值
    currentCountyRent();
    return;
  }
  renderBannerRent(filterData);
});

rentInit();

// 撈取最新物件
function renderLatestRent(data) {
  const showData = data.slice(0, 10);
  console.log(showData);
  latestRentItem.innerHTML = showData.reduce((a, c) => {
    return (
      a +
      `  <div class="swiper-slide position-relative">
    <div class="rounded-5 rounded-md-8 bg-white shadow-sm">
      <img
        class="latest-rent-img"
        src=${c.photo[0]}
        alt=""
      />
      <div class="p-4 px-md-5 py-md-6">
        <h4 class="fs-5 fs-md-4 mb-2">${c.title}</h4>
        <div
          class="d-flex justify-content-between align-items-md-end flex-column flex-md-row"
        >
          <p class="text-light-400 fs-8 fs-md-7 order-md-1">
            ${c.district[0]}｜${c.type}｜${c["square Footage"]}坪${c.floor}F/${c.totalFloor}F
          </p>
          <p
            class="fw-medium fs-7 fs-md-6 text-primary order-md-0"
          >
            <span class="ms-1 fw-bold fs-4 fs-md-3">${c.price}</span
            >元/月
          </p>
        </div>
      </div>
    </div>
    <a href="rentArticle.html?id=${c.id}" class="stretched-link d-block"></a>
  </div>`
    );
  }, "");
}

// 撈取最新公告
axios
  .get(`${url}/news?_sort=date&_order=desc`)
  .then((res) => {
    newsData = res.data;
    renderNews();
  })
  .catch((err) => {
    console.log(err);
  });

function renderNews() {
  const newsList = document.querySelector(".news-list");
  const latestNews = newsData.slice(0, 3);
  let str = "";
  latestNews.forEach((e) => {
    str += `
    <li
    class="news-item d-flex align-items-center position-relative link-dark fw-bold py-4 py-md-6"
  >
    <div class="d-flex flex-column flex-md-row flex-grow-1">
      <p class="me-5 text-light-400 fs-7 fs-md-6 mb-2 mb-md-0">
        ${e.date}
      </p>
      <p class="fs-md-5">${e.title}</p>
    </div>
    <span class="news-icon material-icons p-2">
      chevron_right
    </span>
    <a href="news_single.html?id=${e.id}" class="stretched-link"></a>
  </li>`;
  });
  newsList.innerHTML = str;
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
