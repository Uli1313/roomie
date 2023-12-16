import{a as f,S as r}from"./bootstrap.min-ee9b3e4d.js";import"https://unpkg.com/@wangeditor/editor@latest/dist/index.js";const h="https://roomie-lfta.onrender.com",p=localStorage.getItem("userId"),v=localStorage.getItem("token"),S={headers:{Authorization:`Bearer ${v}`}};let g;const i=document.querySelectorAll(".nav-logged"),d=document.querySelectorAll(".nav-unlogged"),L=document.querySelectorAll(".nav-logged-photo"),w=document.querySelector(".logout-btn");(async()=>{try{const t=`/600/users/${p}`,e=`${h}${t}`,o=await f.get(e,S),s=o.data.photo;L.forEach(c=>c.setAttribute("src",s)),g=o.data,y(),i.forEach(c=>{c.classList.remove("d-none")}),d.forEach(c=>{c.classList.add("d-none")})}catch(t){console.log(t),i.forEach(e=>{e.classList.add("d-none")}),d.forEach(e=>{e.classList.remove("d-none")})}})();function y(){localStorage.setItem("user",JSON.stringify(g))}w.addEventListener("click",I);function I(){r.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(t=>{t.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),r.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const b="https://roomie-lfta.onrender.com/",E="/contacts",q=`${b}${E}`,n=document.querySelector(".contact-form"),m=n.querySelector("#form-content"),C=n.querySelector("#contact-email"),u=n.querySelector(".email-error"),k={post:function(t){const e={...t,userId:Number(localStorage.getItem("userId")),isReply:!1};return f.post(q,e).then(function(o){return r.fire({scrollbarPadding:!1,icon:"success",title:"謝謝您的意見，我們將會在兩週內透過電子郵件聯絡您。",showConfirmButton:!1,timer:1500,allowOutsideClick:!1}),console.log(o),o.data}).catch(function(o){console.log(o)})}};let a;C.addEventListener("input",t=>{const{value:e}=t.target;e||(u.textContent="請輸入您的電子郵件"),l(e)||(u.textContent="信箱格式錯誤")});n.addEventListener("submit",t=>{t.preventDefault();const e=n["contact-name"].value,o=n["contact-email"].value;if(e?n["contact-name"].classList.remove("is-invalid"):n["contact-name"].classList.add("is-invalid"),!o||!l(o)?n["contact-email"].classList.add("is-invalid"):n["contact-email"].classList.remove("is-invalid"),!a||a==="<p><br></p>"?m.classList.add("is-invalid"):m.classList.remove("is-invalid"),console.log(n.querySelectorAll(".invalid-feedback")),!e||!o||!l(o)||!a||a==="<p><br></p>")return;const s={name:e,mail:o,content:a};k.post(s),console.log(s),n.reset()});function l(t){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(t)}const{createEditor:U,createToolbar:A}=window.wangEditor,$={placeholder:"請輸入留言內容",onChange(t){a=t.getHtml()}};U({selector:"#editor-container",html:"<p><br></p>",config:$,mode:"simple"});
