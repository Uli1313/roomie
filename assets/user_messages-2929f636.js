import{a as n,S as r}from"./bootstrap.min-acd3fe77.js";const R="https://roomie-lfta.onrender.com",E=localStorage.getItem("userId"),j=localStorage.getItem("token"),P={headers:{Authorization:`Bearer ${j}`}};let C;const S=document.querySelectorAll(".nav-logged"),I=document.querySelectorAll(".nav-unlogged"),D=document.querySelectorAll(".nav-logged-photo"),M=document.querySelector(".logout-btn");(async()=>{try{const t=`/600/users/${E}`,a=`${R}${t}`,e=await n.get(a,P),o=e.data.photo;D.forEach(s=>s.setAttribute("src",o)),C=e.data,H(),S.forEach(s=>{s.classList.remove("d-none")}),I.forEach(s=>{s.classList.add("d-none")})}catch(t){console.log(t),S.forEach(a=>{a.classList.add("d-none")}),I.forEach(a=>{a.classList.remove("d-none")})}})();function H(){localStorage.setItem("user",JSON.stringify(C))}M.addEventListener("click",z);function z(){r.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(t=>{t.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),r.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const d="https://roomie-lfta.onrender.com",i=localStorage.getItem("userId"),F=localStorage.getItem("token"),J={headers:{Authorization:`Bearer ${F}`}};function N(){V(),$(),X()}N();let O;async function V(){try{const t=`/600/users/${i}`,a=`${d}${t}`;O=(await n.get(a,J)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(e=>location.pathname.match(e))&&r.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{Y(),location.href="login.html"}})}}function Y(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const g=document.querySelector(".js-postList");let _=[];function $(){n.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(t=>{_=t.data,G(_)}).catch(t=>{console.log(t)})}function G(t){if(!t.length){g.innerHTML=`<tr>
    <td colspan="5" class="text-center">尚無相關留言 ¯_(ツ)_/¯</td>
  </tr>`;return}let a="";t.forEach((e,o)=>{let s="";e.isReply==!0?s="已回覆":s="未回覆",a+=`<tr>
            <th scope="row">${o+1}</th>
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
          </tr>`}),g.innerHTML=a}g.addEventListener("click",t=>{t.preventDefault();const a=t.target.classList;let e=t.target.getAttribute("data-id");if(a.contains("js-replyStatus")){let o=t.target.getAttribute("data-status");Q(o,e);return}if(a.contains("deleBtn")){K(e);return}});function K(t){r.fire({icon:"question",title:"確定要刪除留言嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&n.delete(`${d}/qas/${t}`).then(e=>{r.fire({icon:"success",title:"刪除留言成功",timer:1500,showConfirmButton:!1}),$()}).catch(e=>{r.fire({icon:"error",title:"刪除留言失敗",timer:1500,showConfirmButton:!1})})})}function Q(t,a){let e;t&&(e=!0),n.patch(`${d}/qas/${a}`,{isReply:e}).then(o=>{r.fire({showCloseButton:!1,title:"修改狀態成功",icon:"success",timer:1500}),$()}).catch(o=>{console.log(o)})}const W=document.querySelector(".js-postComment");let h=[];function X(){n.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(t=>{h=t.data,Z(h)}).catch(t=>{console.log(t)})}function Z(t){let a="";t.forEach(c=>{a+=`<div
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
      ${c.rent.title}
    </h5>
    <div class="comment-wrap mb-5">
      <div class="d-flex border-bottom pb-3">
        <img
          class="account-img"
          src="${c.user.photo}"
          alt="user-photo"
        />
        <div class="ms-3">
          <p class="fw-bold">${c.user.name}</p>
          <span class="fs-7">${c.date}</span>
        </div>
      </div>
      <div class="my-3">
        <p>${c.content}</p>
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
        data-id="${c.id}"
      >
        回覆
      </button>
    </div>
  </div>
  </div>`}),W.innerHTML=a;const e=document.querySelector(".reply-btn"),o=new Date,s=o.getFullYear(),l=String(o.getMonth()+1).padStart(2,"0"),q=String(o.getDate()).padStart(2,"0");e.addEventListener("click",c=>{c.preventDefault();const k=document.querySelector(".msg-area").value.trim();let T=c.target.getAttribute("data-id"),U={reply:{userId:parseInt(i),replyContent:k,date:`${s}/${l}/${q}`}};n.patch(`${d}/qas/${T}`,U).then(p=>{t=p.data,n.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(f=>{t=f.data;const A=document.querySelector(".reply-content");let x="";t.forEach(m=>{x+=`<div class="comment-wrap mb-5">
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
            </div></p>`}),A.innerHTML=x,document.querySelector(".msg-area").value=""}).catch(f=>{console.log(f)})}).catch(p=>{console.log(p)})})}function tt(t){n.get(`${d}/qas?rentId=${i}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(a=>{t=a.data;const e=document.querySelector(".reply-content");let o="";t.forEach(s=>{o+=`<div class="comment-wrap mb-5">
              <div class="d-flex border-bottom pb-3">
                <img
                  class="account-img"
                  src="${s.user.photo}"
                  alt="user-photo"
                />
                <div class="ms-3">
                  <p class="fw-bold">發文者</p>
                  <span class="fs-7">${s.reply.date}</span>
                </div>
              </div>
              <div class="my-3">
                <p>${s.reply.replyContent}</p>
              </div>
            </div></p>`}),e.innerHTML=o,document.querySelector(".msg-area").value=""}).catch(a=>{console.log(a)})}tt(h);const u="https://roomie-lfta.onrender.com",y=localStorage.getItem("userId"),et=localStorage.getItem("token"),at={headers:{Authorization:`Bearer ${et}`}};function st(){nt(),L()}st();let ot;async function nt(){try{const t=`/600/users/${y}`,a=`${u}${t}`;ot=(await n.get(a,at)).data}catch(t){console.log(t),(t.response.status===401||t.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(e=>location.pathname.match(e))&&r.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{rt(),location.href="login.html"}})}}function rt(){localStorage.removeItem("token"),localStorage.removeItem("userId")}const v=document.querySelector(".js-tenantList");let w=[];function L(){n.get(`${u}/qas?userId=${y}&_expand=rent&_expand=user&_sort=date&_order=asc`).then(t=>{w=t.data,lt(w)}).catch(t=>{console.log(t)})}let b="";function lt(t){if(!t.length){v.innerHTML=`<tr>
    <td colspan="5" class="text-center">尚無相關留言 ¯_(ツ)_/¯</td>
  </tr>`;return}let a="";t.forEach((e,o)=>{b=e.id;let s="";e.isReply==!0?s="已回覆":s="未回覆",a+=`<tr>
            <th scope="row">${o+1}</th>
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
          </tr>`}),v.innerHTML=a}let B=[];const ct=document.querySelector(".js-tenantComment");v.addEventListener("click",t=>{t.preventDefault();const a=t.target.classList;let e=t.target.getAttribute("data-id");if(a.contains("deleBtn")){dt(e);return}b=parseInt(t.target.getAttribute("data-id")),n.get(`${u}/qas?userId=${y}&_expand=rent&_expand=user&_sort=date&_order=asc`).then(o=>{B=o.data;let s="";B.forEach(l=>{l.id===b&&(s+=`<div
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
                  class="check-btn btn btn-sm btn-primary py-3 px-5 rounded-pill me-3"
                  data-id="${l.id}"
                >
                  回覆
                </button>
              </div>
            </div>
          </div>`)}),ct.innerHTML=s}).catch(o=>{console.log(o)})});function dt(t){r.fire({icon:"question",title:"確定要刪除留言嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&n.delete(`${u}/qas/${t}`).then(e=>{r.fire({icon:"success",title:"刪除留言成功",timer:1500,showConfirmButton:!1}),L()}).catch(e=>{r.fire({icon:"error",title:"刪除留言失敗",timer:1500,showConfirmButton:!1})})})}