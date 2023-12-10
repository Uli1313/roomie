import"./bootstrap.min-340b141d.js";import{a as o}from"./axios-28bc18a3.js";const s="https://roomie-lfta.onrender.com";let t,r;const c=document.querySelector(".news-title"),l=document.querySelector(".news-date"),a=document.querySelector(".news-content"),i=document.querySelector(".more-news"),d=new URL(window.location.href),m=d.searchParams.get("id");o.get(`${s}/news/${m}`).then(e=>{t=e.data,w()}).catch(e=>{console.log(e)});function w(){c.innerHTML=t.title,l.innerHTML=t.date,a.innerHTML=t.content}o.get(`${s}/news?_sort=date&_order=desc`).then(e=>{r=e.data,h()}).catch(e=>{console.log(e)});function h(){let e="";r.slice(0,3).forEach(n=>{e+=`<li class="position-relative border-bottom py-4">
    <p class="fs-md-5">${n.title}</p>
    <p class="me-5 text-light-400 fs-7 fs-md-6">${n.date}</p>
    <a href="news_single.html?id=${n.id}" class="stretched-link d-block"></a>
  </li>`}),i.innerHTML=e}
