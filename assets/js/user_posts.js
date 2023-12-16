import axios from "axios";
import Swal from "sweetalert2";

// const url = "http://localhost:3000";
const url = "https://roomie-lfta.onrender.com";

const localUserId = localStorage.getItem("userId");
const localUserToken = localStorage.getItem("token");
const token = {
  headers: {
    Authorization: `Bearer ${localUserToken}`,
  },
};

let publishData;
let matchedData;
let removedData;
let draftData;
const publishList = document.querySelector("#publishList");
const matchedList = document.querySelector("#matchedList");
const removedList = document.querySelector("#removedList");
const draftList = document.querySelector("#draftList");

const userPostList = document.querySelectorAll(".user-post-list");
const postsTab = document.querySelector("#postsTab");
let currentTab = "publish-tab";

// 取得刊登中文章
function getPublishData() {
  const apiUrl = `${url}/660/rents?userId=${localUserId}&status=刊登中`;
  console.log(apiUrl);
  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      publishData = res.data;
      renderPublishList(publishData);
    })
    .catch((err) => console.log(err));
}

// 渲染刊登中文章
function renderPublishList(data) {
  if (!data.length) {
    publishList.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯\_(ツ)_/¯</p>
  </div>`;
    return;
  }

  publishList.innerHTML = data.reduce((a, c) => {
    const trafficList = c.traffic.reduce((acc, cur) => {
      return (
        acc +
        `<span class="me-3 px-1 bg-primary-200"
      >${cur}</span
    >`
      );
    }, "");
    return (
      a +
      `<div class="user-post-item row p-1 rounded hover-primary-2" data-post-id=${
        c.id
      }>
    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
      <img
        src="${c.photo[0]}"
        style="
          width: auto;
          height: 100%;
          object-fit: cover;
          object-position: center;
        "
        alt="house photo"
        class="rounded-top rounded-md-start"
      />
    </div>
    <div
      class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end"
    >
      <ul>
        <li
          class="w-100 d-flex justify-content-between align-items-center py-2"
        >
          <a href="rentArticle.html?id=${c.id}" class="h3 link-dark"
            >${c.title}</a
          >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
              type="button"
              id="dropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-symbols-outlined more-btn"
                >more_vert</span
              >
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownBtn"
            >
              <li>
                <a class="dropdown-item" href="#">編輯貼文</a>
              </li>
              <li>
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
              </li>
              <li>
                <a class="dropdown-item to-removed" href="#">暫時下架</a>
              </li>
              <li>
                <a class="dropdown-item to-matched" href="#">媒合成功</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="pb-3">${c.houseLayout} | ${c["square Footage"]}坪${
        c.floor
      }F/${c.totalFloor}F</li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-2"
            style="transform: translateY(25%)"
            >location_on</span
          >${c.address}${c.district[0]}-${c.district[1]}
        </li>
        <li class="pb-3">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >person</span
          >
          <span class="me-3 px-1 bg-primary-200">${c.gender}</span
          ><span class="me-3 px-1 bg-primary-200">${
            c.canCooking ? "可開伙" : "不可開伙"
          }</span
          ><span class="me-3 px-1 bg-primary-200"
            >${c.canPet ? "可養寵物" : "不可養寵物"}</span
          >
        </li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >map</span
          >
 ${trafficList}
        </li>
        <li class="pb-2 h2 text-secondary text-end">
          ${c.price}元/月
        </li>
        <li class="d-flex justify-content-between">
          更新日期:${c.updateDate}
          <div>
            <span
              class="material-symbols-outlined"
              style="transform: translateY(25%)"
              >visibility</span
            ><span class="ps-2">${c.view}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>`
    );
  }, "");
}

// 取得已媒合文章
function getMatchedData() {
  const apiUrl = `${url}/660/rents?userId=${localUserId}&status=已媒合`;
  axios
    .get(apiUrl, token)
    .then((res) => {
      matchedData = res.data;
      renderMatchedList(matchedData);
    })
    .catch((err) => console.log(err));
}

// 渲染已媒合文章
function renderMatchedList(data) {
  let div = "";
  if (!data.length) {
    matchedList.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯\_(ツ)_/¯</p>
  </div>`;
    return;
  }

  data.forEach(function (v) {
    // 上傳日期
    const dateString = `${v.updateDate}`;
    const updateDate = new Date(dateString);
    // 媒合日期
    const dateString2 = `${v.soldDate}`;
    const matchDate = new Date(dateString2);
    // 今天日期
    const todayDate = new Date();
    // 時間
    const costTime = updateDate.getTime() - matchDate.getTime();
    const daysAwayTime = matchDate.getTime() - todayDate.getTime();
    // 換算天數
    const costDay = Math.abs(Math.trunc(costTime / (1000 * 3600 * 24)));
    const daysAway = Math.abs(Math.trunc(daysAwayTime / (1000 * 3600 * 24)));

    div += `<div class="user-post-item col-12 my-3 p-1 hover-primary-2 rounded">
                    <div class="col-12 p-3 bg-white d-flex flex-wrap justify-content-evenly align-items-center text-end text-lg-center border rounded">
                        <div class="col-12 col-lg-4"><a href="matchArticle.html?id=${
                          v.id
                        }" class="link-dark fw-bold">${v.title}</a></div>
                        <div class="col-12 col-lg pb-1 pb-lg-0"><span class="text-primary">${daysAway}日前&nbsp;</span>媒合成功</div>
                        <div class="col-12 col-lg pb-1 pb-lg-0">${
                          v["square Footage"]
                        }坪&nbsp;/&nbsp;${v.type}</div>
                        <div class="col-12 col-lg fw-bold text-primary">${v.price.toLocaleString(
                          "zh-TW"
                        )}元/月</div>
                        <div class="col-12 col-lg d-flex align-items-center">
                            <span class="text-primary">花費${costDay}日&nbsp;</span>
                            媒合成功
                            <span class="material-symbols-outlined ps-1 text-danger" style="margin-top:2px" >verified</span>
                        </div>
                        <div class="dropdown">
                        <button
                          class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
                          type="button"
                          id="dropdownBtn"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span class="material-symbols-outlined more-btn"
                            >more_vert</span
                          >
                        </button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownBtn"
                        >
                          <li>
                            <a class="dropdown-item delete-post" href="#">刪除貼文</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
                `;
  });
  matchedList.innerHTML = div;
}

// 取得下架文章
function getRemovedData() {
  const apiUrl = `${url}/660/rents?userId=${localUserId}&status=下架`;
  axios
    .get(apiUrl, token)
    .then((res) => {
      removedData = res.data;
      renderRemovedList(removedData);
    })
    .catch((err) => console.log(err));
}

// 渲染下架文章
function renderRemovedList(data) {
  if (!data.length) {
    removedList.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯\_(ツ)_/¯</p>
  </div>`;
    return;
  }

  removedList.innerHTML = data.reduce((a, c) => {
    const trafficList = c.traffic.reduce((acc, cur) => {
      return (
        acc +
        `<span class="me-3 px-1 bg-primary-200"
      >${cur}</span
    >`
      );
    }, "");
    return (
      a +
      `<div class="user-post-item row p-1 rounded hover-primary-2" data-post-id=${
        c.id
      }>
    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
      <img
        src="${c.photo[0]}"
        style="
          width: auto;
          height: 100%;
          object-fit: cover;
          object-position: center;
        "
        alt="house photo"
        class="rounded-top rounded-md-start"
      />
    </div>
    <div
      class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end"
    >
      <ul>
        <li
          class="w-100 d-flex justify-content-between align-items-center py-2"
        >
          <a href="rentArticle.html?id=${c.id}" class="h3 link-dark"
            >${c.title}</a
          >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
              type="button"
              id="dropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-symbols-outlined more-btn"
                >more_vert</span
              >
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownBtn"
            >
              <li>
                <a class="dropdown-item" href="#">編輯貼文</a>
              </li>
              <li>
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
              </li>
              <li>
                <a class="dropdown-item to-publish" href="#">刊登文章</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="pb-3">${c.houseLayout} | ${c["square Footage"]}坪${
        c.floor
      }F/${c.totalFloor}F</li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-2"
            style="transform: translateY(25%)"
            >location_on</span
          >${c.address}${c.district[0]}-${c.district[1]}
        </li>
        <li class="pb-3">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >person</span
          >
          <span class="me-3 px-1 bg-primary-200">${c.gender}</span
          ><span class="me-3 px-1 bg-primary-200">${
            c.canCooking ? "可開伙" : "不可開伙"
          }</span
          ><span class="me-3 px-1 bg-primary-200"
            >${c.canPet ? "可養寵物" : "不可養寵物"}</span
          >
        </li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >map</span
          >
 ${trafficList}
        </li>
        <li class="pb-2 h2 text-secondary text-end">
          ${c.price}元/月
        </li>
        <li class="d-flex justify-content-between">
          更新日期:${c.updateDate}
          <div>
            <span
              class="material-symbols-outlined"
              style="transform: translateY(25%)"
              >visibility</span
            ><span class="ps-2">${c.view}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>`
    );
  }, "");
}

// 取得草稿文章
function getDraftData() {
  const apiUrl = `${url}/660/rents?userId=${localUserId}&status=草稿`;
  axios
    .get(apiUrl, token)
    .then((res) => {
      draftData = res.data;
      renderDraftList(draftData);
    })
    .catch((err) => console.log(err));
}

// 渲染草稿文章
function renderDraftList(data) {
  if (!data.length) {
    draftList.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯\_(ツ)_/¯</p>
  </div>`;
    return;
  }

  draftList.innerHTML = data.reduce((a, c) => {
    const trafficList = c.traffic.reduce((acc, cur) => {
      return (
        acc +
        `<span class="me-3 px-1 bg-primary-200"
      >${cur}</span
    >`
      );
    }, "");
    return (
      a +
      `<div class="user-post-item row p-1 rounded hover-primary-2" data-post-id=${
        c.id
      }>
    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
      <img
        src="${c.photo[0]}"
        style="
          width: auto;
          height: 100%;
          object-fit: cover;
          object-position: center;
        "
        alt="house photo"
        class="rounded-top rounded-md-start"
      />
    </div>
    <div
      class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end"
    >
      <ul>
        <li
          class="w-100 d-flex justify-content-between align-items-center py-2"
        >
          <a href="rentArticle.html?id=${c.id}" class="h3 link-dark"
            >${c.title}</a
          >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
              type="button"
              id="dropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-symbols-outlined more-btn"
                >more_vert</span
              >
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownBtn"
            >
              <li>
                <a class="dropdown-item" href="#">編輯貼文</a>
              </li>
              <li>
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
              </li>
              <li>
                <a class="dropdown-item to-publish" href="#">刊登文章</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="pb-3">${c.houseLayout} | ${c["square Footage"]}坪${
        c.floor
      }F/${c.totalFloor}F</li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-2"
            style="transform: translateY(25%)"
            >location_on</span
          >${c.address}${c.district[0]}-${c.district[1]}
        </li>
        <li class="pb-3">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >person</span
          >
          <span class="me-3 px-1 bg-primary-200">${c.gender}</span
          ><span class="me-3 px-1 bg-primary-200">${
            c.canCooking ? "可開伙" : "不可開伙"
          }</span
          ><span class="me-3 px-1 bg-primary-200"
            >${c.canPet ? "可養寵物" : "不可養寵物"}</span
          >
        </li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >map</span
          >
 ${trafficList}
        </li>
        <li class="pb-2 h2 text-secondary text-end">
          ${c.price}元/月
        </li>
        <li class="d-flex justify-content-between">
          更新日期:${c.updateDate}
          <div>
            <span
              class="material-symbols-outlined"
              style="transform: translateY(25%)"
              >visibility</span
            ><span class="ps-2">${c.view}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>`
    );
  }, "");
}

// 監聽頁籤點擊切換
postsTab.addEventListener("click", (e) => {
  const tabId = e.target.getAttribute("id");
  currentTab = tabId;

  switch (tabId) {
    case "publish-tab":
      getPublishData();
      break;
    case "matched-tab":
      getMatchedData();
      break;
    case "removed-tab":
      getRemovedData();
      break;
    case "draft-tab":
      getDraftData();
      break;
  }
});

// 監聽文章動作
userPostList.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    const action = e.target.classList;
    if (action.contains("to-removed")) return patchPostStatus("下架", e);
    if (action.contains("to-matched")) return patchPostStatus("已媒合", e);
    if (action.contains("to-publish")) return patchPostStatus("刊登中", e);
    if (action.contains("delete-post")) return deletePost(e);
  });
});

// 更改文章狀態
function patchPostStatus(resultStatus, event) {
  const id = event.target
    .closest(".user-post-item")
    .getAttribute("data-post-id");
  const apiUrl = `${url}/600/rents/${id}`;
  const data = {
    status: resultStatus,
  };
  let matchedData;

  if (resultStatus === "已媒合") {
    // 媒合成功日期
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTime.getDate().toString().padStart(2, "0");
    const soldDate = `${year}/${month}/${day}`;

    matchedData = {
      status: resultStatus,
      soldDate: soldDate,
    };
  }
  switch (resultStatus) {
    case "下架":
      Swal.fire({
        icon: "question",
        title: "確定要暫時下架嗎",
        text: "點選確定後將移至下架區，可以至下架區再次上架貼文",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(apiUrl, data, token)
            .then((res) => {
              renderCurrentTab();
              Swal.fire({
                icon: "success",
                title: "下架貼文成功",
                timer: 1500,
                showConfirmButton: false,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "下架貼文失敗",
                timer: 1500,
                showConfirmButton: false,
              });
              console.log(err);
            });
        }
      });
      break;
    case "已媒合":
      Swal.fire({
        icon: "question",
        title: "確定媒合成功嗎",
        text: "一旦點選確定後將移至已媒合，無法再次上架貼文",
        input: "checkbox",
        inputPlaceholder: "我同意將貼文保留在媒合成功頁面",
        inputValidator: (result) => {
          return !result && "請勾選同意";
        },
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(apiUrl, matchedData, token)
            .then((res) => {
              renderCurrentTab();
              Swal.fire({
                icon: "success",
                title: "恭喜您媒合成功",
                timer: 1500,
                showConfirmButton: false,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "發生錯誤",
                timer: 1500,
                showConfirmButton: false,
              });
            });
        }
      });
      break;
    case "刊登中":
      Swal.fire({
        icon: "question",
        title: "確定要上架貼文嗎",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(apiUrl, data, token)
            .then((res) => {
              renderCurrentTab();
              Swal.fire({
                icon: "success",
                title: "上架貼文成功",
                timer: 1500,
                showConfirmButton: false,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "上架貼文失敗",
                timer: 1500,
                showConfirmButton: false,
              });
            });
        }
      });
      break;
  }
}

// 刪除文章
function deletePost(event) {
  const id = event.target
    .closest(".user-post-item")
    .getAttribute("data-post-id");
  const apiUrl = `${url}/600/rents/${id}`;
  Swal.fire({
    icon: "question",
    title: "確定要刪除貼文嗎",
    text: "一旦刪除後將無法復原",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(apiUrl, token)
        .then((res) => {
          renderCurrentTab();
          Swal.fire({
            icon: "success",
            title: "刪除貼文成功",
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "刪除貼文失敗",
            timer: 1500,
            showConfirmButton: false,
          });
        });
    }
  });
}

// 依當前頁面渲染文章
function renderCurrentTab() {
  switch (currentTab) {
    case "publish-tab":
      getPublishData();
      break;
    case "matched-tab":
      getMatchedData();
      break;
    case "removed-tab":
      getRemovedData();
      break;
    case "draft-tab":
      getDraftData();
      break;
  }
}

// 初始化 預設顯示刊登中文章
function userPostsInit() {
  getPublishData();
}
userPostsInit();

// tooltip
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
// const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl);
// });
