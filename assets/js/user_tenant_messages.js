import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "https://roomie-lfta.onrender.com";
const localUserId = localStorage.getItem('userId');
const localUserToken = localStorage.getItem('token');
const token = {
  headers: {
    'Authorization': `Bearer ${localUserToken}`
  }
}
// 初始化
function init() {
  getUserInfo();
  getTentantData();
}
init();

let user;
// 從 API 取得用戶資訊
async function getUserInfo() {
  try {
    const apiPath = `/600/users/${localUserId}`;
    const apiUrl = `${baseUrl}${apiPath}`;
    const response = await axios.get(apiUrl, token);
    user = response.data;
  } catch (err) {
    console.log(err);
    if (err.response.status === 401 || err.response.statusText === 'Unauthorized') {
      // 登入過期要回到登入頁
      const needBack = ['user.html', 'user_posts.html', 'user_favorites.html', 'user_messages.html']
      if (needBack.some(pageName => location.pathname.match(pageName))) {
        const swal = Swal.fire({
          icon: "warning",
          title: "請重新登入",
          scrollbarPadding: false,
          didClose: () => {
            clearUserInfo();
            location.href = 'login.html';
          }
        });
      }
    }
  }
}
function clearUserInfo() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

// 取得求租者列表
const tenantList = document.querySelector('.js-tenantList');
let tenantData = [];
function getTentantData() {
  axios.get(`${baseUrl}/qas?userId=${localUserId}&_expand=rent&_expand=user&_sort=date&_order=asc`)
    .then((res) => {
      tenantData = res.data;
      renderTenantData(tenantData);
    })
    .catch((err) => {
      console.log(err)
    })
}
// 渲染求租者列表
let rentId = "";
function renderTenantData(tenantData) {
  if (!tenantData.length) {
    tenantList.innerHTML = `<tr>
    <td colspan="5" class="text-center">尚無相關留言 ¯\_(ツ)_/¯</td>
  </tr>`;
    return;
  }
  let tenantStr = '';
  tenantData.forEach((item, index) => {
    rentId = item.id;
    // 判斷回覆狀態
    let replyStr = '';
    if (item.isReply == true) {
      replyStr = '已回覆'
    } else {
      replyStr = '未回覆'
    }
    tenantStr += `<tr>
            <th scope="row">${index + 1}</th>
            <td><a href="rentArticle.html?id=${item.id}">${item.rent.title}</a></td>
            <td>${item.date}</td>
            <td>
              <p
                class="js-replyStatus text-dark fs-7"
                data-id="${item.id}"
                data-status="${item.isReply}"
              >
                ${replyStr}
              </p>
            </td>
            <td>
              <button
                class="checkBtn btn btn-sm btn-primary rounded-pill me-1"
                type="button"
                data-id="${item.id}"
                data-status="${replyStr}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight2"
                aria-controls="offcanvasRight"
              >
                查看
              </button>
              <button
                class="deleBtn btn btn-sm btn-warning rounded-pill"
                type="button"
                data-id="${item.id}"
              >
                刪除
              </button>
            </td>
          </tr>`
  })
  tenantList.innerHTML = tenantStr;
}
let commentData = [];
const tenantComment = document.querySelector('.js-tenantComment');
tenantList.addEventListener('click', (e) => {
  e.preventDefault();
  const targetClass = e.target.classList;
  let targetId = e.target.getAttribute('data-id');
  // 刪除留言
  if (targetClass.contains("deleBtn")) {
    deleItem(targetId);
    return
  }
  // 賦予 rentId = 點擊到的 data-id，要記得轉成數字
  rentId = parseInt(e.target.getAttribute('data-id'));
  axios.get(`${baseUrl}/qas?userId=${localUserId}&_expand=rent&_expand=user&_sort=date&_order=asc`)
    .then((res) => {
      commentData = res.data;

      let commentStr = '';
      commentData.forEach((item) => {
        // 判斷 item.id === rentId 則渲染對應的留言
        if (item.id === rentId) {
          commentStr += `<div
            class="offcanvas-header offcanvas-custom pt-5 d-flex justify-content-end"
          >
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body px-7 pb-7 d-flex flex-column">
            <h5 class="mb-5" id="offcanvasRightLabel">
              ${item.rent.title}
            </h5>
            <div class="comment-wrap mb-5">
              <div class="d-flex border-bottom pb-3">
                <img
                  class="account-img"
                  src="${item.user.photo}"
                  alt="user-photo"
                />
                <div class="ms-3">
                  <p class="fw-bold">${item.user.name}</p>
                  <span class="fs-7">${item.date}</span>
                </div>
              </div>
              <div class="my-3">
                <p>${item.content}</p>
              </div>
            </div>
            <div class="reply-content"></div>
            <div class="mt-auto">
              <textarea
                class="msg-area form-control border rounded-0"
                name=""
                id="postReplyTextarea"
                rows="8"
              ></textarea>
              <div class="invalid-feedback">請輸入回覆內容</div>

              <div class="d-flex justify-content-end mt-3">
                <button
                  class="check-btn btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
                  data-id="${item.id}"
                >
                  回覆
                </button>
              </div>
            </div>
          </div>`;
        }
      })
      tenantComment.innerHTML = commentStr;
    })
    .catch((err) => {
      console.log(err)
    })
});

// 刪除留言
function deleItem(targetId) {
  Swal.fire({
    icon: "question",
    title: "確定要刪除留言嗎",
    text: "一旦刪除後將無法復原",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${baseUrl}/qas/${targetId}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "刪除留言成功",
            timer: 1500,
            showConfirmButton: false,
          });
          getTentantData();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "刪除留言失敗",
            timer: 1500,
            showConfirmButton: false,
          });
        });
    }
  });
}






