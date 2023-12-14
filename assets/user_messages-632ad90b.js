import{a as n}from"./bootstrap.min-0d2201fe.js";import{S as $}from"./sweetalert2.all-42322153.js";const R="https://roomie-lfta.onrender.com",j=localStorage.getItem("userId"),E=localStorage.getItem("token"),B={headers:{Authorization:`Bearer ${E}`}};let w;const _=document.querySelectorAll(".nav-logged"),L=document.querySelectorAll(".nav-unlogged"),P=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const t=`/600/users/${j}`,a=`${R}${t}`,e=await n.get(a,B),s=e.data.photo;P.forEach(o=>o.setAttribute("src",s)),w=e.data,M(),_.forEach(o=>{o.classList.remove("d-none")}),L.forEach(o=>{o.classList.add("d-none")}),console.log("已登入")}catch(t){console.log(t),_.forEach(a=>{a.classList.add("d-none")}),L.forEach(a=>{a.classList.remove("d-none")}),console.log("未登入")}})();function M(){localStorage.setItem("user",JSON.stringify(w))}const l="https://roomie-lfta.onrender.com",c=localStorage.getItem("userId"),D=localStorage.getItem("token"),H={headers:{Authorization:`Bearer ${D}`}};function z(){F(),U(),G()}z();let N;async function F(){try{const t=`/600/users/${c}`,a=`${l}${t}`;N=(await n.get(a,H)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(e=>location.pathname.match(e))&&$.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{J(),location.href="login.html"}})}}function J(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const h=document.querySelector(".js-postList");let p=[];function U(){n.get(`${l}/qas?rentId=${c}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(t=>{p=t.data,console.log("data",p),O(p)}).catch(t=>{console.log(t)})}function O(t){if(!t.length){h.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關留言 ¯_(ツ)_/¯</p>
  </div>`;return}let a="";t.forEach((e,s)=>{let o="";e.isReply==!0?o="已回覆":o="未回覆",a+=`<tr>
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
            <td>${s+1}</td>
            <td><a href="rentArticle.html?id=${e.id}">${e.rent.title}</a></td>
            <td>${e.date}</td>
            <td>
              <a
                href="#"
                class="js-replyStatus text-dark fs-7"
                data-id="${e.id}"
                data-status="${e.isReply}"
              >
                ${o}
              </a>
            </td>
            <td>
              <button
                class="replyBtn btn btn-sm btn-primary rounded-pill"
                type="button"
                data-id="${e.id}"
                data-status="${o}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight1"
                aria-controls="offcanvasRight"
              >
                回覆
              </button>
            </td>
          </tr>`}),h.innerHTML=a}h.addEventListener("click",t=>{t.preventDefault();const a=t.target.classList;console.log(a);let e=t.target.getAttribute("data-id");if(a.contains("js-replyStatus")){let s=t.target.getAttribute("data-status");console.log(s,e),V(s,e);return}});function V(t,a){let e;t&&(e=!0),n.patch(`${l}/qas/${a}`,{isReply:e}).then(s=>{$.fire({showCloseButton:!1,title:"修改狀態成功",icon:"success",timer:1500}),U()}).catch(s=>{console.log(s)})}const Y=document.querySelector(".js-postComment");let f=[];function G(){n.get(`${l}/qas?rentId=${c}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(t=>{f=t.data,console.log("comment",f),K(f)}).catch(t=>{console.log(t)})}function K(t){let a="";t.forEach(r=>{a+=`<div
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
      ${r.rent.title}
    </h5>
    <div class="comment-wrap mb-5">
      <div class="d-flex border-bottom pb-3">
        <img
          class="account-img"
          src="${r.user.photo}"
          alt="user-photo"
        />
        <div class="ms-3">
          <p class="fw-bold">${r.user.name}</p>
          <span class="fs-7">${r.date}</span>
        </div>
      </div>
      <div class="my-3">
        <p>${r.content}</p>
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
        data-id="${r.id}"
      >
        回覆
      </button>
    </div>
  </div>
  </div>`}),Y.innerHTML=a;const e=document.querySelector(".reply-btn"),s=new Date,o=s.getFullYear(),q=String(s.getMonth()+1).padStart(2,"0"),A=String(s.getDate()).padStart(2,"0");e.addEventListener("click",r=>{r.preventDefault();const S=document.querySelector(".msg-area").value.trim();let I=r.target.getAttribute("data-id");console.log("click",S,I);let T={reply:{userId:parseInt(c),replyContent:S,date:`${o}/${q}/${A}`}};n.patch(`${l}/qas/${I}`,T).then(d=>{console.log("newcomment",t),t=d.data,n.get(`${l}/qas?rentId=${c}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(i=>{t=i.data,console.log("replycomment",t);const C=document.querySelector(".reply-content");let k="";t.forEach(u=>{k+=`<div class="comment-wrap mb-5">
              <div class="d-flex border-bottom pb-3">
                <img
                  class="account-img"
                  src="${u.user.photo}"
                  alt="user-photo"
                />
                <div class="ms-3">
                  <p class="fw-bold">發文者</p>
                  <span class="fs-7">${u.reply.date}</span>
                </div>
              </div>
              <div class="my-3">
                <p>${u.reply.replyContent}</p>
              </div>
            </div></p>`}),C.innerHTML=k,document.querySelector(".msg-area").value=""}).catch(i=>{console.log(i)})}).catch(d=>{console.log(d)})})}const y="https://roomie-lfta.onrender.com",x=localStorage.getItem("userId"),Q=localStorage.getItem("token"),W={headers:{Authorization:`Bearer ${Q}`}};function X(){tt(),at()}X();let Z;async function tt(){try{const t=`/600/users/${x}`,a=`${y}${t}`;Z=(await n.get(a,W)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(e=>location.pathname.match(e))&&$.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{et(),location.href="login.html"}})}}function et(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const v=document.querySelector(".js-tenantList");let g=[];function at(){n.get(`${y}/qas?userId=${x}&_expand=rent&_expand=user&_sort=date&_order=asc`).then(t=>{g=t.data,console.log("data",g),st(g)}).catch(t=>{console.log(t)})}let b="";function st(t){if(!t.length){v.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關留言 ¯_(ツ)_/¯</p>
  </div>`;return}let a="";t.forEach((e,s)=>{b=e.id;let o="";e.isReply==!0?o="已回覆":o="未回覆",a+=`<tr>
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
            <td>${s+1}</td>
            <td><a href="rentArticle.html?id=${e.id}">${e.rent.title}</a></td>
            <td>${e.date}</td>
            <td>
              <p
                class="js-replyStatus text-dark fs-7"
                data-id="${e.id}"
                data-status="${e.isReply}"
              >
                ${o}
              </p>
            </td>
            <td>
              <button
                class="checkBtn btn btn-sm btn-primary rounded-pill"
                type="button"
                data-id="${e.id}"
                data-status="${o}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight2"
                aria-controls="offcanvasRight"
              >
                查看
              </button>
            </td>
          </tr>`}),v.innerHTML=a}let m=[];const ot=document.querySelector(".js-tenantComment");v.addEventListener("click",t=>{t.preventDefault(),t.target.classList,b=parseInt(t.target.getAttribute("data-id")),n.get(`${y}/qas?userId=${x}&_expand=rent&_expand=user&_sort=date&_order=asc`).then(a=>{m=a.data,console.log("comment",m);let e="";m.forEach(s=>{s.id===b&&(e+=`<div
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
              ${s.rent.title}
            </h5>
            <div class="comment-wrap mb-5">
              <div class="d-flex border-bottom pb-3">
                <img
                  class="account-img"
                  src="${s.user.photo}"
                  alt="user-photo"
                />
                <div class="ms-3">
                  <p class="fw-bold">${s.user.name}</p>
                  <span class="fs-7">${s.date}</span>
                </div>
              </div>
              <div class="my-3">
                <p>${s.content}</p>
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
                  data-id="${s.id}"
                >
                  回覆
                </button>
              </div>
            </div>
          </div>`)}),ot.innerHTML=e}).catch(a=>{console.log(a)})});
