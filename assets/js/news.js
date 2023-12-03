import axios from "axios";
// const url = "http://localhost:3000";
const url = "https://roomie-lfta.onrender.com";

let newsData;
let currentPage = 1;
const limit = 2;
const newsList = document.querySelector(".news-list");
const pagination = document.querySelector(".pagination");
const newsSearch = document.querySelector(".news-search");
let totalNews;
let pageCount;

// 搜尋
newsSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.querySelector(".news-search-input").value.trim();
  if (value === "") {
    getTotalData();
    getData(currentPage, limit);
  } else {
    axios
      .get(`${url}/news?title_like=${value}`)
      .then((res) => {
        const filterData = res.data;
        totalNews = res.data.length;
        pageCount = Math.ceil(totalNews / limit);
        createPagination(pageCount);
        renderNews(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// 取得資料長度計算要幾頁
function getTotalData() {
  axios
    .get(`${url}/news`)
    .then((res) => {
      totalNews = res.data.length;
      pageCount = Math.ceil(totalNews / limit);
      createPagination(pageCount);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 依照頁數組頁碼
function createPagination(pageCount) {
  let str = "";
  // 組上一頁
  str += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span class="material-icons align-bottom">
      chevron_left
    </span>
  </a>
</li>`;
  // 組中間頁數
  for (let i = 1; i <= pageCount; i++) {
    str += `<li class="page-item">
    <a class="page-link" href="#">${i}</a>
  </li>`;
  }
  // 組下一頁
  str += `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span class="material-icons"> navigate_next </span>
  </a>
</li>`;
  pagination.innerHTML = str;
}

// 取得該頁的資料
function getData(page, limit) {
  axios
    .get(`${url}/news?_sort=date&_order=desc&_page=${page}&_limit=${limit}`)
    .then((res) => {
      newsData = res.data;
      renderNews(newsData);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 渲染當前頁資料
function renderNews(page) {
  let str = "";
  page.forEach((e) => {
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

  const pageLink = document.querySelectorAll(".page-link");
  pageLink.forEach((e) => {
    // 移除上/下一頁按鈕的 focus 效果
    if (
      e.textContent.trim() === "chevron_left" ||
      e.textContent.trim() === "navigate_next"
    ) {
      e.blur();
    }
  });
  // 當前頁增加 active
  pageLink[currentPage].classList.add("active");
}

// 監聽分頁
pagination.addEventListener("click", (e) => {
  // 移除所有 active 樣式
  const pageLink = document.querySelectorAll(".page-link");
  pageLink.forEach((e) => {
    e.classList.remove("active");
  });
  // 判斷點擊的位置
  if (e.target.textContent.trim() === "chevron_left") {
    // 上一頁按鈕
    // 當前已是最前頁則在該頁加上 active ，不重新撈取資料
    if (currentPage === 1) {
      pageLink[currentPage].classList.add("active");
      return;
    }
    if (currentPage > 1) {
      currentPage--;
      getData(currentPage, limit);
    }
  } else if (e.target.textContent.trim() === "navigate_next") {
    // 下一頁按鈕
    if (currentPage === pageCount) {
      pageLink[currentPage].classList.add("active");
      return;
    }
    if (currentPage < pageCount) {
      currentPage++;
      getData(currentPage, limit);
    }
  } else {
    // 數字按鈕
    currentPage = Number(e.target.textContent.trim());
    getData(currentPage, limit);
  }
});

getTotalData();
getData(currentPage, limit);
