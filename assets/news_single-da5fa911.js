import{a as s,S as c}from"./bootstrap.min-acd3fe77.js";const g="https://roomie-lfta.onrender.com",h=localStorage.getItem("userId"),f=localStorage.getItem("token"),w={headers:{Authorization:`Bearer ${f}`}};let i;const a=document.querySelectorAll(".nav-logged"),l=document.querySelectorAll(".nav-unlogged"),S=document.querySelectorAll(".nav-logged-photo"),p=document.querySelector(".logout-btn");(async()=>{try{const e=`/600/users/${h}`,t=`${g}${e}`,r=await s.get(t,w),m=r.data.photo;S.forEach(o=>o.setAttribute("src",m)),i=r.data,L(),a.forEach(o=>{o.classList.remove("d-none")}),l.forEach(o=>{o.classList.add("d-none")})}catch(e){console.log(e),a.forEach(t=>{t.classList.add("d-none")}),l.forEach(t=>{t.classList.remove("d-none")})}})();function L(){localStorage.setItem("user",JSON.stringify(i))}p.addEventListener("click",v);function v(){c.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(e=>{e.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),c.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const d="https://roomie-lfta.onrender.com";let n,u;const y=document.querySelector(".news-title"),I=document.querySelector(".news-date"),$=document.querySelector(".news-content"),q=document.querySelector(".more-news"),T=new URL(window.location.href),U=T.searchParams.get("id");s.get(`${d}/news/${U}`).then(e=>{n=e.data,k()}).catch(e=>{console.log(e)});function k(){y.innerHTML=n.title,I.innerHTML=n.date,$.innerHTML=n.content}s.get(`${d}/news?_sort=date&_order=desc`).then(e=>{u=e.data,E()}).catch(e=>{console.log(e)});function E(){let e="";u.slice(0,3).forEach(t=>{e+=`<li class="position-relative border-bottom py-4">
    <p class="fs-md-5">${t.title}</p>
    <p class="me-5 text-light-400 fs-7 fs-md-6">${t.date}</p>
    <a href="news_single.html?id=${t.id}" class="stretched-link d-block"></a>
  </li>`}),q.innerHTML=e}