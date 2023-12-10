import"./bootstrap.min-340b141d.js";import{a as i}from"./axios-28bc18a3.js";import{S as m}from"./sweetalert2.all-ae5fa1cb.js";const c="https://roomie-lfta.onrender.com",d=localStorage.getItem("userId"),g=localStorage.getItem("token"),h={headers:{Authorization:`Bearer ${g}`}};function y(){$(),S(),w(),_(),C()}y();let x;async function $(){try{const t=`/600/users/${d}`,a=`${c}${t}`;x=(await i.get(a,h)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(o=>location.pathname.match(o))&&m.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{k(),location.href="login.html"}})}}function k(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const R=document.querySelector(".js-postList");let l=[],r=[];function S(){i.get(`${c}/rents?userId=${d}`).then(t=>{l=t.data,console.log(l),b(l,r)}).catch(t=>{console.log(t)})}function w(){i.get(`${c}/qas?rentId=${d}&_expand=user`).then(t=>{r=t.data,console.log("content",r),b(l,r)}).catch(t=>{console.log(t)})}function b(t,a){let o="",s="";a.forEach(e=>{s+=`${e.isReply}`,s==!0?s="已回覆":s="未回覆",o+=`<div class="mb-5">
        <div class="d-flex border-bottom pb-3">
          <img
            class="account-img"
            src="/assets/images/user.png"
            alt="user-photo"
          />
          <div class="ms-3">
            <p class="fw-bold">${e.user.name}</p>
            <span class="fs-7"
              >${e.date}</span
            >
          </div>
        </div>
        <div class="my-3">
          ${e.content}
        </div>
      </div>`});let n="";t.length?t.forEach((e,p)=>{n+=`<tr>
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
            <td>${p+1}</td>
            <td>${e.title}</td>
            <td>${e.updateDate}</td>
            <td>
              <button
                class="btn btn-sm border-0 text-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                ${s}
              </button>
    
              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div class="offcanvas-header offcanvas-custom pt-3">
                  <h5 id="offcanvasRightLabel">
                  ${e.title}
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
                    ${o}
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
          </tr>`}):n+=`<div class="d-flex justify-content-center align-items-center">
        <p>尚無相關留言 ¯_(ツ)_/¯</p>
      </div>`,R.innerHTML=n}const L=document.querySelector(".js-askRentList");let f=[],v=[];function _(){i.get(`${c}/qas?userId=${d}&_expand=rent`).then(t=>{f=t.data,console.log("ask",f),u(f,v)}).catch(t=>{console.log(t)})}function C(){i.get(`${c}/qas?userId=${d}&_expand=user`).then(t=>{v=t.data,console.log("rentcontent",v),u(f,v)}).catch(t=>{console.log(t)})}function u(t,a){console.log(a.length);let o="",s="";a.forEach(e=>{s+=`${e.isReply}`,s==!0?s="已回覆":s="未回覆",o+=`<div class="mb-5">
        <div class="d-flex border-bottom pb-3">
          <img
            class="account-img"
            src="/assets/images/user.png"
            alt="user-photo"
          />
          <div class="ms-3">
            <p class="fw-bold">${e.user.name}</p>
            <span class="fs-7"
              >${e.date}</span
            >
          </div>
        </div>
        <div class="my-3">
          ${e.content}
        </div>
      </div>`});let n="";t.length?t.forEach((e,p)=>{n+=`<tr>
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
            <td>${p+1}</td>
            <td>${e.rent.title}</td>
            <td>${e.rent.updateDate}</td>
            <td>
              <button
                class="btn btn-sm border-0 text-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                ${s}
              </button>
    
              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div class="offcanvas-header offcanvas-custom pt-3">
                  <h5 id="offcanvasRightLabel">
                  ${e.rent.title}
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
                    ${o}
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
          </tr>`}):n+=`<div class="d-flex justify-content-center align-items-center">
        <p>尚無相關留言 ¯_(ツ)_/¯</p>
      </div>`,L.innerHTML=n}const j=document.querySelector(".comment-content"),{createEditor:I,createToolbar:T}=window.wangEditor,U={placeholder:"最多不超過 100 字",maxLength:100,onChange(t){const a=t.getHtml();text=t.getText(),j.innerHTML=a.replace(/<p><br><\/p>/g,"")}},E=I({selector:"#editor-container",html:"<p><br></p>",config:U,mode:"simple"}),D={toolbarKeys:["bold","underline","italic","|","undo","redo"]};T({editor:E,selector:"#toolbar-container",config:D,mode:"default"});
