import axios from "axios";
const url = "http://localhost:3000";

let data;
let moreNewsData;

const newsTitle = document.querySelector(".news-title");
const newsDate = document.querySelector(".news-date");
const newsContent = document.querySelector(".news-content");
const moreNews = document.querySelector(".more-news");
// 取得當前網址 id
const getUrl = new URL(window.location.href);
const getUrlId = getUrl.searchParams.get("id");

// 取得文章內容
axios
  .get(`${url}/news/${getUrlId}`)
  .then((res) => {
    data = res.data;
    renderNewsContent();
  })
  .catch((err) => {
    console.log(err);
  });

// 渲染文章內容
function renderNewsContent() {
  newsTitle.innerHTML = data.title;
  newsDate.innerHTML = data.date;
  newsContent.innerHTML = data.content;
}

// 取得"看更多消息"的資料
axios
  .get(`${url}/news?_sort=date&_order=desc`)
  .then((res) => {
    moreNewsData = res.data;
    renderMoreNews();
  })
  .catch((err) => {
    console.log(err);
  });
function renderMoreNews() {
  let str = "";
  moreNewsData.slice(0, 3).forEach((e) => {
    str += `<li class="position-relative border-bottom py-4">
    <p class="fs-md-5">${e.title}</p>
    <p class="me-5 text-light-400 fs-7 fs-md-6">${e.date}</p>
    <a href="news_single.html?id=${e.id}" class="stretched-link d-block"></a>
  </li>`;
  });
  moreNews.innerHTML = str;
}
