import"./bootstrap.min-e773685c.js";import{a as o}from"./axios-28bc18a3.js";const m="https://roomie-lfta.onrender.com";let d,n=1;const l=2,h=document.querySelector(".news-list"),g=document.querySelector(".pagination"),v=document.querySelector(".news-search");let r,s;v.addEventListener("submit",a=>{a.preventDefault();const t=document.querySelector(".news-search-input").value.trim();t===""?(f(),c(n,l)):o.get(`${m}/news?title_like=${t}`).then(e=>{const i=e.data;r=e.data.length,s=Math.ceil(r/l),p(s),u(i)}).catch(e=>{console.log(e)})});function f(){o.get(`${m}/news`).then(a=>{r=a.data.length,s=Math.ceil(r/l),p(s)}).catch(a=>{console.log(a)})}function p(a){let t="";t+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span class="material-icons align-bottom">
      chevron_left
    </span>
  </a>
</li>`;for(let e=1;e<=a;e++)t+=`<li class="page-item">
    <a class="page-link" href="#">${e}</a>
  </li>`;t+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span class="material-icons"> navigate_next </span>
  </a>
</li>`,g.innerHTML=t}function c(a,t){o.get(`${m}/news?_sort=date&_order=desc&_page=${a}&_limit=${t}`).then(e=>{d=e.data,u(d)}).catch(e=>{console.log(e)})}function u(a){let t="";a.forEach(i=>{t+=`
      <li
      class="news-item d-flex align-items-center position-relative link-dark fw-bold py-4 py-md-6"
    >
      <div class="d-flex flex-column flex-md-row flex-grow-1">
        <p class="me-5 text-light-400 fs-7 fs-md-6 mb-2 mb-md-0">
          ${i.date}
        </p>
        <p class="fs-md-5">${i.title}</p>
      </div>
      <span class="news-icon material-icons p-2">
        chevron_right
      </span>
      <a href="news_single.html?id=${i.id}" class="stretched-link"></a>
    </li>`}),h.innerHTML=t;const e=document.querySelectorAll(".page-link");e.forEach(i=>{(i.textContent.trim()==="chevron_left"||i.textContent.trim()==="navigate_next")&&i.blur()}),e[n].classList.add("active")}g.addEventListener("click",a=>{const t=document.querySelectorAll(".page-link");if(t.forEach(e=>{e.classList.remove("active")}),a.target.textContent.trim()==="chevron_left"){if(n===1){t[n].classList.add("active");return}n>1&&(n--,c(n,l))}else if(a.target.textContent.trim()==="navigate_next"){if(n===s){t[n].classList.add("active");return}n<s&&(n++,c(n,l))}else n=Number(a.target.textContent.trim()),c(n,l)});f();c(n,l);
