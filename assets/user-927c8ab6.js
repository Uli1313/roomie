import{a as r,S as d}from"./bootstrap.min-ee9b3e4d.js";const T="https://roomie-lfta.onrender.com",z=localStorage.getItem("userId"),M=localStorage.getItem("token"),R={headers:{Authorization:`Bearer ${M}`}};let E;const b=document.querySelectorAll(".nav-logged"),L=document.querySelectorAll(".nav-unlogged"),J=document.querySelectorAll(".nav-logged-photo"),V=document.querySelector(".logout-btn");(async()=>{try{const e=`/600/users/${z}`,t=`${T}${e}`,o=await r.get(t,R),s=o.data.photo;J.forEach(n=>n.setAttribute("src",s)),E=o.data,_(),b.forEach(n=>{n.classList.remove("d-none")}),L.forEach(n=>{n.classList.add("d-none")})}catch(e){console.log(e),b.forEach(t=>{t.classList.add("d-none")}),L.forEach(t=>{t.classList.remove("d-none")})}})();function _(){localStorage.setItem("user",JSON.stringify(E))}V.addEventListener("click",j);function j(){d.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(e=>{e.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),d.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const c="https://roomie-lfta.onrender.com",l=localStorage.getItem("userId"),O=localStorage.getItem("token"),P={headers:{Authorization:`Bearer ${O}`}},p=document.querySelector("#nickName"),y=document.querySelector("#name"),v=document.querySelector("#genderMale"),w=document.querySelector("#genderFemal");function W(){G(),D()}W();let a;async function G(){try{const e=`/600/users/${l}`,t=`${c}${e}`;a=(await r.get(t,P)).data,B(),U()}catch(e){console.log(e),(e.response.status===401||e.response.statusText==="Unauthorized")&&["user.html","user_posts.html","user_favorites.html","user_messages.html"].some(o=>location.pathname.match(o))&&d.fire({icon:"warning",title:"請重新登入",scrollbarPadding:!1,didClose:()=>{A(),location.href="login.html"}})}}function B(){localStorage.setItem("user",JSON.stringify(a))}function H(){const e=localStorage.getItem("user");e&&(a=JSON.parse(e),U())}H();function U(){p&&y&&v&&w&&(p.value=a.nickname,y.value=a.name,document.getElementById("userNickName").textContent=a.nickname,document.getElementById("userEmail").textContent=a.email,document.getElementById("signupEmail").value=a.email,document.getElementById("userPhoto").src=a.photo,a.gender==="male"?v.checked=!0:w.checked=!0)}const I=document.querySelector(".infoEdit-btn"),k=document.querySelector(".infoSave-btn"),F=document.querySelectorAll(".editable-input"),N=document.querySelector("#aboutMe"),K=document.querySelector("#updateFile"),x=document.querySelector(".selectFile"),h={},C=(e,t,o)=>{e.forEach(s=>{s[t?"setAttribute":"removeAttribute"]("readonly",t),s.value=s.value.trim()}),v.disabled=o,w.disabled=o,N.readOnly=t},Q=async(e,t=!1)=>{try{const o=await r.patch(`${c}/users/${l}`,e);return!t&&d.fire({scrollbarPadding:!1,icon:"success",title:"修改成功",showCancelButton:!1,timer:1500}),console.log(o.data),o.data}catch(o){throw console.error(o),o}};I.addEventListener("click",e=>{e.preventDefault(),C(F,!1,!1),I.classList.add("d-none"),k.classList.remove("d-none"),x.classList.remove("d-none")});k.addEventListener("click",async e=>{e.preventDefault(),C(F,!0,!0);const t={nickname:p.value.trim(),name:y.value.trim(),gender:v.checked?"male":"female",about:N.value.trim(),photo:h.base64Image},o=await Q(t);a={...a,...o},B(),I.classList.remove("d-none"),k.classList.add("d-none"),x.classList.add("d-none")});K.addEventListener("change",e=>{const t=e.target.files[0],o=new FileReader;o.onload=s=>{const n=s.target.result;h.base64Image=n,h.fileName=t.name;let i=document.getElementById("userPhoto");i.src=h.base64Image},o.readAsDataURL(t)});let m=[],g=[],f=[];function D(){r.get(`${c}/rents?userId=${l}`).then(e=>{m=e.data,S(m,g,f)}).catch(e=>{console.log(e)}),r.get(`${c}/favorites?userId=${l}`).then(e=>{g=e.data,S(m,g,f)}).catch(e=>{console.log(e)}),r.get(`${c}/qas?userId=${l}`).then(e=>{f=e.data,S(m,g,f)}).catch(e=>{console.log(e)})}D();const X=document.querySelector(".postsNum"),Y=document.querySelector(".favsNum"),Z=document.querySelector(".commentsNum");function S(e,t,o){X.textContent=e.length,Y.textContent=t.length,Z.textContent=o.length}const q=document.querySelector("#changePwdForm");q.addEventListener("submit",e=>{e.preventDefault(),te()});function ee(e){r.patch(`${c}/600/users/${l}`,{password:e},P).then(t=>{q.reset(),d.fire({icon:"success",title:"變更密碼成功",showConfirmButton:!1,timer:1500,didClose:()=>{A(),location.href="login.html"}}),q.classList.remove("was-validated")}).catch(t=>{console.log(t)})}function te(){const e=document.querySelector("#nowPwd"),t=document.querySelector("#setNewPwd"),o=document.querySelector("#rePwd"),s=e.value.trim(),n=t.value.trim(),i=o.value.trim();if(s===""?u(e,"欄位不得為空"):$(e),n===""?u(t,"欄位不得為空"):oe(n)||ne(n)?u(t,"密碼不安全"):$(t),i==="")u(o,"欄位不得為空");else if(n!==i)u(o,"密碼不一致");else if(n===i){ee(n);return}}function u(e,t){const o=e.parentElement,s=o.querySelector(".invalid-feedback");s.innerText=t,o.classList.add("was-validated")}function $(e){e.parentElement.classList.add("was-validated")}function oe(e){return/123456|234567|345678|456789|567890|abcdefghijklmnopqrstuvwxyz|zyxwvutsrqponmlkjihgfedcba/i.test(e)}function ne(e){return e.length<6}function A(){localStorage.removeItem("token"),localStorage.removeItem("userId")}
