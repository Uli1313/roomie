import{a as d,S as m}from"./bootstrap.min-acd3fe77.js";const x="https://roomie-lfta.onrender.com",k=localStorage.getItem("userId"),y=localStorage.getItem("token"),$={headers:{Authorization:`Bearer ${y}`}};let p;const u=document.querySelectorAll(".nav-logged"),f=document.querySelectorAll(".nav-unlogged"),_=document.querySelectorAll(".nav-logged-photo"),b=document.querySelector(".logout-btn");(async()=>{try{const t=`/600/users/${k}`,e=`${x}${t}`,a=await d.get(e,$),n=a.data.photo;_.forEach(c=>c.setAttribute("src",n)),p=a.data,q(),u.forEach(c=>{c.classList.remove("d-none")}),f.forEach(c=>{c.classList.add("d-none")})}catch(t){console.log(t),u.forEach(e=>{e.classList.add("d-none")}),f.forEach(e=>{e.classList.remove("d-none")})}})();function q(){localStorage.setItem("user",JSON.stringify(p))}b.addEventListener("click",E);function E(){m.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(t=>{t.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),m.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const g="https://roomie-lfta.onrender.com";let h,o=1;const l=10,C=document.querySelector(".news-list"),v=document.querySelector(".pagination"),I=document.querySelector(".news-search");let i,s;I.addEventListener("submit",t=>{t.preventDefault();const e=document.querySelector(".news-search-input").value.trim();e===""?(w(),r(o,l)):d.get(`${g}/news?title_like=${e}`).then(a=>{const n=a.data;i=a.data.length,s=Math.ceil(i/l),S(s),L(n)}).catch(a=>{console.log(a)})});function w(){d.get(`${g}/news`).then(t=>{i=t.data.length,s=Math.ceil(i/l),S(s)}).catch(t=>{console.log(t)})}function S(t){let e="";e+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span class="material-icons align-bottom">
      chevron_left
    </span>
  </a>
</li>`;for(let a=1;a<=t;a++)e+=`<li class="page-item">
    <a class="page-link" href="#">${a}</a>
  </li>`;e+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span class="material-icons"> navigate_next </span>
  </a>
</li>`,v.innerHTML=e}function r(t,e){d.get(`${g}/news?_sort=date&_order=desc&_page=${t}&_limit=${e}`).then(a=>{h=a.data,L(h)}).catch(a=>{console.log(a)})}function L(t){let e="";t.forEach(n=>{e+=`
      <li
      class="news-item d-flex align-items-center position-relative link-dark fw-bold py-4 py-md-6"
    >
      <div class="d-flex flex-column flex-md-row flex-grow-1">
        <p class="me-5 text-light-400 fs-7 fs-md-6 mb-2 mb-md-0">
          ${n.date}
        </p>
        <p class="fs-md-5">${n.title}</p>
      </div>
      <span class="news-icon material-icons p-2">
        chevron_right
      </span>
      <a href="news_single.html?id=${n.id}" class="stretched-link"></a>
    </li>`}),C.innerHTML=e;const a=document.querySelectorAll(".page-link");a.forEach(n=>{(n.textContent.trim()==="chevron_left"||n.textContent.trim()==="navigate_next")&&n.blur()}),a[o].classList.add("active")}v.addEventListener("click",t=>{const e=document.querySelectorAll(".page-link");if(e.forEach(a=>{a.classList.remove("active")}),t.target.textContent.trim()==="chevron_left"){if(o===1){e[o].classList.add("active");return}o>1&&(o--,r(o,l))}else if(t.target.textContent.trim()==="navigate_next"){if(o===s){e[o].classList.add("active");return}o<s&&(o++,r(o,l))}else o=Number(t.target.textContent.trim()),r(o,l)});w();r(o,l);
