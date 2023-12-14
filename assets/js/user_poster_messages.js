import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "https://roomie-lfta.onrender.com";
// const baseUrl = "http://localhost:3000";
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
  getPosterData();
  getPostComment();
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

// 取得發文者列表
const postList = document.querySelector('.js-postList');
let posterData = [];
function getPosterData() {
  axios.get(`${baseUrl}/qas?rentId=${localUserId}&_expand=user&_expand=rent&_sort=date&_order=asc`)
    .then((res) => {
      posterData = res.data;
      console.log('data', posterData)
      renderPosterData(posterData);
    })
    .catch((err) => {
      console.log(err)
    })
}
// 渲染發文者列表
function renderPosterData(posterData) {
  if (!posterData.length) {
    postList.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關留言 ¯\_(ツ)_/¯</p>
  </div>`;
    return;
  }
  let postStr = '';
  posterData.forEach((item, index) => {
    // 判斷回覆狀態
    let replyStr = '';
    if (item.isReply == true) {
      replyStr = '已回覆'
    } else {
      replyStr = '未回覆'
    }
    postStr += `<tr>
            <th scope="row">
              <div>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                />
              </div>
            </th>
            <td>${index + 1}</td>
            <td><a href="rentArticle.html?id=${item.id}">${item.rent.title}</a></td>
            <td>${item.date}</td>
            <td>
              <a
                href="#"
                class="js-replyStatus text-dark fs-7"
                data-id="${item.id}"
                data-status="${item.isReply}"
              >
                ${replyStr}
              </a>
            </td>
            <td>
              <button
                class="replyBtn btn btn-sm btn-primary rounded-pill"
                type="button"
                data-id="${item.id}"
                data-status="${replyStr}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight1"
                aria-controls="offcanvasRight"
              >
                回覆
              </button>
            </td>
          </tr>`
  })
  postList.innerHTML = postStr;
}
postList.addEventListener('click', (e) => {
  e.preventDefault();
  const targetClass = e.target.classList;
  console.log(targetClass)
  let id = e.target.getAttribute('data-id');
  if (targetClass.contains("js-replyStatus")) {
    let status = e.target.getAttribute('data-status');
    console.log(status, id)
    changeReplyStatus(status, id)
    return
  }
  // if(targetClass.contains("form-check-input")){
  //   alert('勾選')
  //   return
  // }
  // if(targetClass.contains("replyBtn")){
  //   alert('回覆')
  //   return
  // }
})
// 修改回覆狀態
function changeReplyStatus(status, id) {
  let newStatus;
  if (!status == false) {
    newStatus = true;
  }
  axios.patch(`${baseUrl}/qas/${id}`, {
    "isReply": newStatus
  })
    .then((res) => {
      Swal.fire({
        showCloseButton: false,
        title: '修改狀態成功',
        icon: 'success',
        timer: 1500
      })
      getPosterData();
    })
    .catch((err) => {
      console.log(err)
    })
}
// 取得留言內容
const postComment = document.querySelector('.js-postComment');
let commentData = [];
function getPostComment() {
  axios.get(`${baseUrl}/qas?rentId=${localUserId}&_expand=user&_expand=rent&_sort=date&_order=asc`)
    .then((res) => {
      commentData = res.data;
      console.log('comment', commentData)
      renderPosterComment(commentData);
    })
    .catch((err) => {
      console.log(err)
    })
}
// 渲染發文者列表留言
function renderPosterComment(commentData) {
  let commentStr = '';
  commentData.forEach((item) => {
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
        class="reply-btn btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
        data-id="${item.id}"
      >
        回覆
      </button>
    </div>
  </div>
  </div>`

  })
  postComment.innerHTML = commentStr;

  // 渲染回覆留言
  // 因為 innerHTML 重繪畫面，所以事件監聽要寫在這裡面

  const replyBtn = document.querySelector('.reply-btn');
  const now = new Date();
  const year = now.getFullYear(); // 年份
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份 (月份從 0 開始，所以需要加 1)，補置2位數
  const day = String(now.getDate()).padStart(2, '0'); // 日，補置2位數
  replyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const msgArea = document.querySelector('.msg-area');
    const msgAreaValue = msgArea.value.trim();
    let id = e.target.getAttribute('data-id');
    console.log('click', msgAreaValue, id)
    let replyData = {
      "reply": {
        "userId": parseInt(localUserId),
        "replyContent": msgAreaValue,
        "date": `${year}/${month}/${day}`
      }
    }
    axios.patch(`${baseUrl}/qas/${id}`, replyData)
      .then((res) => {
        console.log('newcomment', commentData)
        commentData = res.data;

        axios.get(`${baseUrl}/qas?rentId=${localUserId}&_expand=user&_expand=rent&_sort=date&_order=asc`)
          .then((res) => {
            commentData = res.data;
            console.log('replycomment', commentData)
            // 重新渲染留言
            const replyContent = document.querySelector('.reply-content');
            let replyStr = ''
            commentData.forEach((item) => {
              replyStr += `<div class="comment-wrap mb-5">
              <div class="d-flex border-bottom pb-3">
                <img
                  class="account-img"
                  src="${item.user.photo}"
                  alt="user-photo"
                />
                <div class="ms-3">
                  <p class="fw-bold">發文者</p>
                  <span class="fs-7">${item.reply.date}</span>
                </div>
              </div>
              <div class="my-3">
                <p>${item.reply.replyContent}</p>
              </div>
            </div></p>`
            })
            replyContent.innerHTML = replyStr;
            document.querySelector('.msg-area').value = '';
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  });
}

// 刪除物件







