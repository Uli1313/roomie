import"./bootstrap.min-e773685c.js";import"https://unpkg.com/@wangeditor/editor@latest/dist/index.js";import{S as r}from"./sweetalert2.all-b34669d1.js";import{a as m}from"./axios-28bc18a3.js";const d="https://roomie-lfta.onrender.com/",u="/contacts",f=`${d}${u}`,t=document.querySelector(".contact-form"),i=t.querySelector("#form-content"),p=t.querySelector("#contact-email"),l=t.querySelector(".email-error"),v={post:function(o){const n={...o,userId:Number(localStorage.getItem("userId")),isReply:!1};return m.post(f,n).then(function(e){return r.fire({scrollbarPadding:!1,icon:"success",title:"謝謝您的意見，我們將會在兩週內透過電子郵件聯絡您。",showConfirmButton:!1,timer:1500,allowOutsideClick:!1}),console.log(e),e.data}).catch(function(e){console.log(e)})}};let a;p.addEventListener("input",o=>{const{value:n}=o.target;n||(l.textContent="請輸入您的電子郵件"),c(n)||(l.textContent="信箱格式錯誤")});t.addEventListener("submit",o=>{o.preventDefault();const n=t["contact-name"].value,e=t["contact-email"].value;if(n?t["contact-name"].classList.remove("is-invalid"):t["contact-name"].classList.add("is-invalid"),!e||!c(e)?t["contact-email"].classList.add("is-invalid"):t["contact-email"].classList.remove("is-invalid"),!a||a==="<p><br></p>"?i.classList.add("is-invalid"):i.classList.remove("is-invalid"),console.log(t.querySelectorAll(".invalid-feedback")),!n||!e||!c(e)||!a||a==="<p><br></p>")return;const s={name:n,mail:e,content:a};v.post(s),console.log(s),t.reset()});function c(o){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(o)}const{createEditor:g,createToolbar:y}=window.wangEditor,w={placeholder:"請輸入留言內容",onChange(o){a=o.getHtml()}};g({selector:"#editor-container",html:"<p><br></p>",config:w,mode:"simple"});
