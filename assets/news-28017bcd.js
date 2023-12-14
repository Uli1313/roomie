import{a as d}from"./bootstrap.min-0d2201fe.js";const x="https://roomie-lfta.onrender.com",k=localStorage.getItem("userId"),S=localStorage.getItem("token"),y={headers:{Authorization:`Bearer ${S}`}};let h;const m=document.querySelectorAll(".nav-logged"),u=document.querySelectorAll(".nav-unlogged"),$=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const a=`/600/users/${k}`,e=`${x}${a}`,t=await d.get(e,y),o=t.data.photo;$.forEach(c=>c.setAttribute("src",o)),h=t.data,_(),m.forEach(c=>{c.classList.remove("d-none")}),u.forEach(c=>{c.classList.add("d-none")}),console.log("已登入")}catch(a){console.log(a),m.forEach(e=>{e.classList.add("d-none")}),u.forEach(e=>{e.classList.remove("d-none")}),console.log("未登入")}})();function _(){localStorage.setItem("user",JSON.stringify(h))}const g="https://roomie-lfta.onrender.com";let f,n=1;const s=2,b=document.querySelector(".news-list"),p=document.querySelector(".pagination"),E=document.querySelector(".news-search");let i,l;E.addEventListener("submit",a=>{a.preventDefault();const e=document.querySelector(".news-search-input").value.trim();e===""?(v(),r(n,s)):d.get(`${g}/news?title_like=${e}`).then(t=>{const o=t.data;i=t.data.length,l=Math.ceil(i/s),L(l),w(o)}).catch(t=>{console.log(t)})});function v(){d.get(`${g}/news`).then(a=>{i=a.data.length,l=Math.ceil(i/s),L(l)}).catch(a=>{console.log(a)})}function L(a){let e="";e+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span class="material-icons align-bottom">
      chevron_left
    </span>
  </a>
</li>`;for(let t=1;t<=a;t++)e+=`<li class="page-item">
    <a class="page-link" href="#">${t}</a>
  </li>`;e+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span class="material-icons"> navigate_next </span>
  </a>
</li>`,p.innerHTML=e}function r(a,e){d.get(`${g}/news?_sort=date&_order=desc&_page=${a}&_limit=${e}`).then(t=>{f=t.data,w(f)}).catch(t=>{console.log(t)})}function w(a){let e="";a.forEach(o=>{e+=`
      <li
      class="news-item d-flex align-items-center position-relative link-dark fw-bold py-4 py-md-6"
    >
      <div class="d-flex flex-column flex-md-row flex-grow-1">
        <p class="me-5 text-light-400 fs-7 fs-md-6 mb-2 mb-md-0">
          ${o.date}
        </p>
        <p class="fs-md-5">${o.title}</p>
      </div>
      <span class="news-icon material-icons p-2">
        chevron_right
      </span>
      <a href="news_single.html?id=${o.id}" class="stretched-link"></a>
    </li>`}),b.innerHTML=e;const t=document.querySelectorAll(".page-link");t.forEach(o=>{(o.textContent.trim()==="chevron_left"||o.textContent.trim()==="navigate_next")&&o.blur()}),t[n].classList.add("active")}p.addEventListener("click",a=>{const e=document.querySelectorAll(".page-link");if(e.forEach(t=>{t.classList.remove("active")}),a.target.textContent.trim()==="chevron_left"){if(n===1){e[n].classList.add("active");return}n>1&&(n--,r(n,s))}else if(a.target.textContent.trim()==="navigate_next"){if(n===l){e[n].classList.add("active");return}n<l&&(n++,r(n,s))}else n=Number(a.target.textContent.trim()),r(n,s)});v();r(n,s);
