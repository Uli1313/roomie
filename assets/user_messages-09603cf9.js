import{a as o}from"./bootstrap.min-f14bc68a.js";import{S as c}from"./sweetalert2.all-9c23d2ec.js";const R="https://roomie-lfta.onrender.com",E=localStorage.getItem("userId"),j=localStorage.getItem("token"),P={headers:{Authorization:`Bearer ${j}`}};let B;const x=document.querySelectorAll(".nav-logged"),S=document.querySelectorAll(".nav-unlogged"),D=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const t=`/600/users/${E}`,a=`${R}${t}`,e=await o.get(a,P),n=e.data.photo;D.forEach(s=>s.setAttribute("src",n)),B=e.data,M(),x.forEach(s=>{s.classList.remove("d-none")}),S.forEach(s=>{s.classList.add("d-none")}),console.log("已登入")}catch(t){console.log(t),x.forEach(a=>{a.classList.add("d-none")}),S.forEach(a=>{a.classList.remove("d-none")}),console.log("未登入")}})();function M(){localStorage.setItem("user",JSON.stringify(B))}const d="https://roomie-lfta.onrender.com",i=localStorage.getItem("userId"),H=localStorage.getItem("token"),z={headers:{Authorization:`Bearer ${H}`}};function F(){N(),v(),Q()}F();let J;async function N(){try{const t=`/600/users/${i}`,a=`${d}${t}`;J=(await o.get(a,z)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(e=>location.pathname.match(e))&&c.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{O(),location.href="login.html"}})}}function O(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const g=document.querySelector(".js-postList");let I=[];function v(){o.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(t=>{I=t.data,V(I)}).catch(t=>{console.log(t)})}function V(t){if(!t.length){g.innerHTML=`<tr>
    <td colspan="5" class="text-center">尚無相關留言 ¯_(ツ)_/¯</td>
  </tr>`;return}let a="";t.forEach((e,n)=>{let s="";e.isReply==!0?s="已回覆":s="未回覆",a+=`<tr>
            <th scope="row">${n+1}</th>
            <td><a href="rentArticle.html?id=${e.id}">${e.rent.title}</a></td>
            <td>${e.date}</td>
            <td>
              <a
                href="#"
                class="js-replyStatus text-dark fs-7"
                data-id="${e.id}"
                data-status="${e.isReply}"
              >
                ${s}
              </a>
            </td>
            <td>
              <button
                class="replyBtn btn btn-sm btn-primary rounded-pill me-1"
                type="button"
                data-id="${e.id}"
                data-status="${s}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight1"
                aria-controls="offcanvasRight"
              >
                回覆
              </button>
              <button
                class="deleBtn btn btn-sm btn-warning rounded-pill"
                type="button"
                data-id="${e.id}"
              >
                刪除
              </button>
            </td>
          </tr>`}),g.innerHTML=a}g.addEventListener("click",t=>{t.preventDefault();const a=t.target.classList;let e=t.target.getAttribute("data-id");if(a.contains("js-replyStatus")){let n=t.target.getAttribute("data-status");G(n,e);return}if(a.contains("deleBtn")){Y(e);return}});function Y(t){c.fire({icon:"question",title:"確定要刪除留言嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&o.delete(`${d}/qas/${t}`).then(e=>{c.fire({icon:"success",title:"刪除留言成功",timer:1500,showConfirmButton:!1}),v()}).catch(e=>{c.fire({icon:"error",title:"刪除留言失敗",timer:1500,showConfirmButton:!1})})})}function G(t,a){let e;t&&(e=!0),o.patch(`${d}/qas/${a}`,{isReply:e}).then(n=>{c.fire({showCloseButton:!1,title:"修改狀態成功",icon:"success",timer:1500}),v()}).catch(n=>{console.log(n)})}const K=document.querySelector(".js-postComment");let _=[];function Q(){o.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(t=>{_=t.data,W(_)}).catch(t=>{console.log(t)})}function W(t){let a="";t.forEach(l=>{a+=`<div
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
      ${l.rent.title}
    </h5>
    <div class="comment-wrap mb-5">
      <div class="d-flex border-bottom pb-3">
        <img
          class="account-img"
          src="${l.user.photo}"
          alt="user-photo"
        />
        <div class="ms-3">
          <p class="fw-bold">${l.user.name}</p>
          <span class="fs-7">${l.date}</span>
        </div>
      </div>
      <div class="my-3">
        <p>${l.content}</p>
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
        data-id="${l.id}"
      >
        回覆
      </button>
    </div>
  </div>
  </div>`}),K.innerHTML=a;const e=document.querySelector(".reply-btn"),n=new Date,s=n.getFullYear(),r=String(n.getMonth()+1).padStart(2,"0"),C=String(n.getDate()).padStart(2,"0");e.addEventListener("click",l=>{l.preventDefault();const q=document.querySelector(".msg-area").value.trim();let T=l.target.getAttribute("data-id"),U={reply:{userId:parseInt(i),replyContent:q,date:`${s}/${r}/${C}`}};o.patch(`${d}/qas/${T}`,U).then(f=>{t=f.data,o.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(p=>{t=p.data;const A=document.querySelector(".reply-content");let y="";t.forEach(m=>{y+=`<div class="comment-wrap mb-5">
              <div class="d-flex border-bottom pb-3">
                <img
                  class="account-img"
                  src="${m.user.photo}"
                  alt="user-photo"
                />
                <div class="ms-3">
                  <p class="fw-bold">發文者</p>
                  <span class="fs-7">${m.reply.date}</span>
                </div>
              </div>
              <div class="my-3">
                <p>${m.reply.replyContent}</p>
              </div>
            </div></p>`}),A.innerHTML=y,document.querySelector(".msg-area").value=""}).catch(p=>{console.log(p)})}).catch(f=>{console.log(f)})})}const u="https://roomie-lfta.onrender.com",$=localStorage.getItem("userId"),X=localStorage.getItem("token"),Z={headers:{Authorization:`Bearer ${X}`}};function tt(){at(),k()}tt();let et;async function at(){try{const t=`/600/users/${$}`,a=`${u}${t}`;et=(await o.get(a,Z)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(e=>location.pathname.match(e))&&c.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{st(),location.href="login.html"}})}}function st(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const h=document.querySelector(".js-tenantList");let w=[];function k(){o.get(`${u}/qas?userId=${$}&_expand=rent&_expand=user&_sort=date&_order=asc`).then(t=>{w=t.data,nt(w)}).catch(t=>{console.log(t)})}let b="";function nt(t){if(!t.length){h.innerHTML=`<tr>
    <td colspan="5" class="text-center">尚無相關留言 ¯_(ツ)_/¯</td>
  </tr>`;return}let a="";t.forEach((e,n)=>{b=e.id;let s="";e.isReply==!0?s="已回覆":s="未回覆",a+=`<tr>
            <th scope="row">${n+1}</th>
            <td><a href="rentArticle.html?id=${e.id}">${e.rent.title}</a></td>
            <td>${e.date}</td>
            <td>
              <p
                class="js-replyStatus text-dark fs-7"
                data-id="${e.id}"
                data-status="${e.isReply}"
              >
                ${s}
              </p>
            </td>
            <td>
              <button
                class="checkBtn btn btn-sm btn-primary rounded-pill me-1"
                type="button"
                data-id="${e.id}"
                data-status="${s}"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight2"
                aria-controls="offcanvasRight"
              >
                查看
              </button>
              <button
                class="deleBtn btn btn-sm btn-warning rounded-pill"
                type="button"
                data-id="${e.id}"
              >
                刪除
              </button>
            </td>
          </tr>`}),h.innerHTML=a}let L=[];const ot=document.querySelector(".js-tenantComment");h.addEventListener("click",t=>{t.preventDefault();const a=t.target.classList;let e=t.target.getAttribute("data-id");if(a.contains("deleBtn")){rt(e);return}b=parseInt(t.target.getAttribute("data-id")),o.get(`${u}/qas?userId=${$}&_expand=rent&_expand=user&_sort=date&_order=asc`).then(n=>{L=n.data;let s="";L.forEach(r=>{r.id===b&&(s+=`<div
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
                  class="check-btn btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
                  data-id="${r.id}"
                >
                  回覆
                </button>
              </div>
            </div>
          </div>`)}),ot.innerHTML=s}).catch(n=>{console.log(n)})});function rt(t){c.fire({icon:"question",title:"確定要刪除留言嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&o.delete(`${u}/qas/${t}`).then(e=>{c.fire({icon:"success",title:"刪除留言成功",timer:1500,showConfirmButton:!1}),k()}).catch(e=>{c.fire({icon:"error",title:"刪除留言失敗",timer:1500,showConfirmButton:!1})})})}
