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
  // getRentComment();
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
      console.log('data', tenantData)
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
    tenantList.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關留言 ¯\_(ツ)_/¯</p>
  </div>`;
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
                class="checkBtn btn btn-sm btn-primary rounded-pill"
                type="button"
                data-id="${item.id}"
                data-status="${replyStr}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight2"
                aria-controls="offcanvasRight"
              >
                查看
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

  rentId = parseInt(e.target.getAttribute('data-id'));
  
  axios.get(`${baseUrl}/qas?userId=${localUserId}&_expand=rent&_expand=user&_sort=date&_order=asc`)
    .then((res) => {
      commentData = res.data;
      console.log('comment', commentData)

      let commentStr = '';
      commentData.forEach((item) => {
        
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
// 取得留言內容

// function getRentComment(rentId) {
//   console.log(123, rentId);
  
// }

// 渲染發文者列表留言
// function renderTenantComment(commentData) {
//   let commentStr = '';
//   commentData.forEach((item) => {
//     commentStr += `<div
//     class="offcanvas-header offcanvas-custom pt-5 d-flex justify-content-end"
//   >
//     <button
//       type="button"
//       class="btn-close text-reset"
//       data-bs-dismiss="offcanvas"
//       aria-label="Close"
//     ></button>
//   </div>
//   <div class="offcanvas-body px-7 pb-7 d-flex flex-column">
//     <h5 class="mb-5" id="offcanvasRightLabel">
//       ${item.rent.title}
//     </h5>
//     <div class="comment-wrap mb-5">
//       <div class="d-flex border-bottom pb-3">
//         <img
//           class="account-img"
//           src="${item.user.photo}"
//           alt="user-photo"
//         />
//         <div class="ms-3">
//           <p class="fw-bold">${item.user.name}</p>
//           <span class="fs-7">${item.date}</span>
//         </div>
//       </div>
//       <div class="my-3">
//         <p>${item.content}</p>
//       </div>
//     </div>
//     <div class="reply-content"></div>
//     <div class="mt-auto">
//     <textarea
//       class="msg-area form-control border rounded-0"
//       name=""
//       id="postReplyTextarea"
//       rows="8"
//     ></textarea>
//     <div class="invalid-feedback">請輸入回覆內容</div>

//     <div class="d-flex justify-content-end mt-3">
//       <button
//         class="check-btn btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
//         data-id="${item.id}"
//       >
//         回覆
//       </button>
//     </div>
//   </div>
//   </div>`

//   })
//   tenantComment.innerHTML = commentStr;
// }

// 刪除物件







