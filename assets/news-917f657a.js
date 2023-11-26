import"./bootstrap.min-78670b47.js";import{a as o}from"./axios-28bc18a3.js";const m="https://roomie-nnwq.onrender.com";let g,e=1;const l=2,f=document.querySelector(".news-list"),d=document.querySelector(".pagination");let c,r;function p(){o.get(`${m}/news`).then(a=>{c=a.data.length,r=Math.ceil(c/l),h(r)}).catch(a=>{console.log(a)})}function h(a){let t="";t+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span class="material-icons align-bottom">
      chevron_left
    </span>
  </a>
</li>`;for(let n=1;n<=a;n++)t+=`<li class="page-item">
    <a class="page-link" href="#">${n}</a>
  </li>`;t+=`<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span class="material-icons"> navigate_next </span>
  </a>
</li>`,d.innerHTML=t}function s(a,t){o.get(`${m}/news?_sort=date&_order=desc&_page=${a}&_limit=${t}`).then(n=>{g=n.data,u()}).catch(n=>{console.log(n)})}function u(a){let t="";g.forEach(i=>{t+=`
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
    </li>`}),f.innerHTML=t;const n=document.querySelectorAll(".page-link");n.forEach(i=>{(i.textContent.trim()==="chevron_left"||i.textContent.trim()==="navigate_next")&&i.blur()}),n[e].classList.add("active")}d.addEventListener("click",a=>{const t=document.querySelectorAll(".page-link");if(t.forEach(n=>{n.classList.remove("active")}),a.target.textContent.trim()==="chevron_left"){if(e===1){t[e].classList.add("active");return}e>1&&(e--,s(e,l))}else if(a.target.textContent.trim()==="navigate_next"){if(e===r){t[e].classList.add("active");return}e<r&&(e++,s(e,l))}else e=Number(a.target.textContent.trim()),s(e,l)});p();s(e,l);
