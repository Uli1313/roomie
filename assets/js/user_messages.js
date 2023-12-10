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
    getContent();
    getRentSeeker();
    getaskRentContent();
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
let contentData = [];
function getPosterData() {
    axios.get(`${baseUrl}/rents?userId=${localUserId}`)
        .then((res) => {
            posterData = res.data;
            console.log(posterData)
            renderPosterData(posterData, contentData);
        })
        .catch((err) => {
            console.log(err)
        })
}
// 取得留言內容
function getContent() {
    axios.get(`${baseUrl}/qas?rentId=${localUserId}&_expand=user`)
        .then((res) => {
            contentData = res.data;
            console.log('content', contentData)
            renderPosterData(posterData, contentData);
        })
        .catch((err) => {
            console.log(err)
        })
}
// 渲染發文者列表
function renderPosterData(posterData, contentData) {

    let contentStr = ''
    let replyStr = '';
    contentData.forEach((qasItem) => {
        // 回覆字串
        replyStr += `${qasItem.isReply}`

        // 判斷回覆狀態
        if (replyStr == true) {
            replyStr = '已回覆'
        } else {
            replyStr = '未回覆'
        }

        contentStr += `<div class="mb-5">
        <div class="d-flex border-bottom pb-3">
          <img
            class="account-img"
            src="/assets/images/user.png"
            alt="user-photo"
          />
          <div class="ms-3">
            <p class="fw-bold">${qasItem.user.name}</p>
            <span class="fs-7"
              >${qasItem.date}</span
            >
          </div>
        </div>
        <div class="my-3">
          ${qasItem.content}
        </div>
      </div>`
    })

    let postStr = '';
    if (posterData.length) {
        posterData.forEach((item, index) => {
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
            <td>${item.title}</td>
            <td>${item.updateDate}</td>
            <td>
              <button
                class="btn btn-sm border-0 text-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                ${replyStr}
              </button>
    
              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div class="offcanvas-header offcanvas-custom pt-3">
                  <h5 id="offcanvasRightLabel">
                  ${item.title}
                  </h5>
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="offcanvas-body p-7 d-flex flex-column justify-content-between"
                >
                  <div>
                    ${contentStr}
                    <div>
                      <div class="d-flex border-bottom pb-3">
                        <img
                          class="account-img"
                          src="/assets/images/user_default.png"
                          alt="user-photo"
                        />
                        <div class="ms-3">
                          <p class="fw-bold">userName</p>
                          <span class="fs-7"
                            >2023-10-01 20:37:00</span
                          >
                        </div>
                      </div>
                      <div class="my-3">
                        <p class="comment-content"></p>
                      </div>
                    </div>
                  </div>
    
                  <div>
                  <!-- 文字編輯器 start -->
                  <div id="editor—wrapper">
                    <div id="toolbar-container">
                      <!-- 工具欄 -->
                    </div>
                    <div id="editor-container"><!-- 编辑器 --></div>
                  </div>
                  <!-- 文字編輯器 end -->
                    <div class="invalid-feedback">請輸入回覆內容</div>
    
                    <div class="d-flex justify-content-end mt-3">
                      <button
                        class="btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
                      >
                        回覆
                      </button>
                      <button
                        class="btn btn-sm btn-outline-primary py-3 px-5 rounded-pill"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>`
        })
    } else {
        postStr += `<div class="d-flex justify-content-center align-items-center">
        <p>尚無相關留言 ¯\_(ツ)_/¯</p>
      </div>`;
    }
    postList.innerHTML = postStr;
}

// 取得求租者列表
const askRentList = document.querySelector('.js-askRentList');
let askRentData = [];
let askRentContentData = [];
function getRentSeeker() {
    axios.get(`${baseUrl}/qas?userId=${localUserId}&_expand=rent`)
        .then((res) => {
            askRentData = res.data;
            console.log('ask', askRentData)
            renderRentSeeker(askRentData, askRentContentData);
        })
        .catch((err) => {
            console.log(err)
        })
}
// 取得留言內容
function getaskRentContent() {
    axios.get(`${baseUrl}/qas?userId=${localUserId}&_expand=user`)
        .then((res) => {
            askRentContentData = res.data;
            console.log('rentcontent', askRentContentData)
            renderRentSeeker(askRentData, askRentContentData);
        })
        .catch((err) => {
            console.log(err)
        })
}
// 渲染求租者列表
function renderRentSeeker(askRentData, askRentContentData) {
    console.log(askRentContentData.length)

    let contentStr = ''
    let replyStr = '';
    askRentContentData.forEach((qasItem) => {
        // 回覆字串
        replyStr += `${qasItem.isReply}`

        // 判斷回覆狀態
        if (replyStr == true) {
            replyStr = '已回覆'
        } else {
            replyStr = '未回覆'
        }

        contentStr += `<div class="mb-5">
        <div class="d-flex border-bottom pb-3">
          <img
            class="account-img"
            src="/assets/images/user.png"
            alt="user-photo"
          />
          <div class="ms-3">
            <p class="fw-bold">${qasItem.user.name}</p>
            <span class="fs-7"
              >${qasItem.date}</span
            >
          </div>
        </div>
        <div class="my-3">
          ${qasItem.content}
        </div>
      </div>`
    })

    let askRentStr = '';
    if (askRentData.length) {
        askRentData.forEach((item, index) => {
            askRentStr += `<tr>
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
            <td>${item.rent.title}</td>
            <td>${item.rent.updateDate}</td>
            <td>
              <button
                class="btn btn-sm border-0 text-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                ${replyStr}
              </button>
    
              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div class="offcanvas-header offcanvas-custom pt-3">
                  <h5 id="offcanvasRightLabel">
                  ${item.rent.title}
                  </h5>
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="offcanvas-body p-7 d-flex flex-column justify-content-between"
                >
                  <div>
                    ${contentStr}
                    <div>
                      <div class="d-flex border-bottom pb-3">
                        <img
                          class="account-img"
                          src="/assets/images/user_default.png"
                          alt="user-photo"
                        />
                        <div class="ms-3">
                          <p class="fw-bold">userName</p>
                          <span class="fs-7"
                            >2023-10-01 20:37:00</span
                          >
                        </div>
                      </div>
                      <div class="my-3">
                        <p class="comment-content"></p>
                      </div>
                    </div>
                  </div>
    
                  <div>
                  <!-- 文字編輯器 start -->
                  <div id="editor—wrapper">
                    <div id="toolbar-container">
                      <!-- 工具欄 -->
                    </div>
                    <div id="editor-container"><!-- 编辑器 --></div>
                  </div>
                  <!-- 文字編輯器 end -->
                    <div class="invalid-feedback">請輸入回覆內容</div>
    
                    <div class="d-flex justify-content-end mt-3">
                      <button
                        class="btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
                      >
                        回覆
                      </button>
                      <button
                        class="btn btn-sm btn-outline-primary py-3 px-5 rounded-pill"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>`
        })

    } else {
        askRentStr += `<div class="d-flex justify-content-center align-items-center">
        <p>尚無相關留言 ¯\_(ツ)_/¯</p>
      </div>`;
    }
    askRentList.innerHTML = askRentStr;
}

// 選取物件

// 刪除物件







const commentContent = document.querySelector('.comment-content');
// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor;

const editorConfig = {
    placeholder: '最多不超過 100 字',
    maxLength: 100, // 字數最大限制
    onChange(editor) {
        const html = editor.getHtml() // 獲取用戶輸入的 html 結構
        text = editor.getText()
        commentContent.innerHTML = html.replace(/<p><br><\/p>/g, "") // 把內容渲染到預覽頁面上
    }
};

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'simple', // or 'simple'
});

const toolbarConfig = {
    toolbarKeys: ['bold', 'underline', 'italic', '|', 'undo', 'redo'] // 工具欄重新配置
};

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
});