import{a as c,S as u}from"./bootstrap.min-acd3fe77.js";const S="https://roomie-lfta.onrender.com",v=localStorage.getItem("userId"),L=localStorage.getItem("token"),q={headers:{Authorization:`Bearer ${L}`}};let $;const h=document.querySelectorAll(".nav-logged"),y=document.querySelectorAll(".nav-unlogged"),k=document.querySelectorAll(".nav-logged-photo"),x=document.querySelector(".logout-btn");(async()=>{try{const t=`/600/users/${v}`,o=`${S}${t}`,e=await c.get(o,q),s=e.data.photo;k.forEach(r=>r.setAttribute("src",s)),$=e.data,A(),h.forEach(r=>{r.classList.remove("d-none")}),y.forEach(r=>{r.classList.add("d-none")})}catch(t){console.log(t),h.forEach(o=>{o.classList.add("d-none")}),y.forEach(o=>{o.classList.remove("d-none")})}})();function A(){localStorage.setItem("user",JSON.stringify($))}x.addEventListener("click",B);function B(){u.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(t=>{t.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),u.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const p="https://roomie-lfta.onrender.com",I=localStorage.getItem("userId"),w=localStorage.getItem("token"),d={headers:{Authorization:`Bearer ${w}`}};let f=`${p}/660/favorites?userId=${I}&_expand=rent`,i=[],b=document.querySelector(".favorites-list"),D=document.querySelector("#filterDate"),E=document.querySelector("#filterSquare"),U=document.querySelector("#filterPrice");function g(){c.get(f,d).then(t=>{i=t.data,m(i),T(),P()})}g();function m(t){if(t.length==0){b.innerHTML=` <div class="d-flex justify-content-center align-items-center">
                                        <p>這裡什麼都沒有，先去找找看有沒有喜歡的物件，再加入收藏單吧！ ¯_(ツ)_/¯</p>
                                    </div>`;return}let o="";t.forEach(e=>{let s="";e.rent.traffic.forEach(function(l){s+=`<span class="me-3 px-1 bg-primary-200">近${l}</span>`}),o+=`
            <div class="row p-1 rounded hover-primary-2">
                <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
                <img
                    src="${e.rent.photo[0]}"
                    style="
                    width: auto;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    "
                    alt="house photo"
                    class="rounded-top rounded-md-start"
                />
                </div>
                <div
                class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end"
                >
                <ul>
                    <li
                    class="w-100 d-flex justify-content-between align-items-center py-2"
                    >
                    <a href="rentArticle.html?id=${e.rent.id}" class="h3 link-dark"
                        >${e.rent.title}</a
                    >
                    <button
                        class="p-3 link-dark hover-primary border-0 rounded-3 d-flex justify-content-center align-items-center"
                    >
                        <span class="material-symbols-outlined delete-one-btn" data-id="${e.id}"
                        >close</span
                        >
                    </button>
                    </li>
                    <li class="pb-3">${e.rent.houseLayout} | ${e.rent["square Footage"]}坪 | ${e.rent.floor}F/${e.rent.totalFloor}F</li>
                    <li class="pb-2">
                    <span
                        class="material-symbols-outlined pe-2"
                        style="transform: translateY(25%)"
                        >location_on</span
                    >${e.rent.address}${e.rent.district[0]}-${e.rent.district[1]}
                    </li>
                    <li class="pb-3">
                    <span
                        class="material-symbols-outlined pe-1"
                        style="transform: translateY(25%)"
                        >person</span
                    >
                    <span class="me-3 px-1 bg-primary-200">${e.rent.gender}</span
                    ><span class="me-3 px-1 bg-primary-200"
                        >${e.rent.canCooking?"可開伙":"不可開伙"}</span
                    ><span class="me-3 px-1 bg-primary-200"
                        >${e.rent.canPet?"可養寵物":"不可養寵物"}</span
                    >
                    </li>
                    <li class="pb-2">
                    <span
                        class="material-symbols-outlined pe-1"
                        style="transform: translateY(25%)"
                        >map</span>
                        ${s}
                    </li>
                    <li class="pb-2 h2 text-secondary text-end">
                    ${e.rent.price.toLocaleString("zh-TW")}元/月
                    </li>
                    <li class="d-flex justify-content-between">
                    更新日期:${e.rent.updateDate}
                    <div>
                        <span
                        class="material-symbols-outlined"
                        style="transform: translateY(25%)"
                        >visibility</span
                        ><span class="ps-2">${e.rent.view}</span>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        `}),b.innerHTML=o}function T(){document.querySelectorAll(".delete-one-btn").forEach(o=>{o.addEventListener("click",e=>{let s=e.target.dataset.id;const r=`${p}/660/favorites/${s}`;c.delete(r,d).then(function(l){i=l.data,u.fire({icon:"success",title:"刪除成功!!",showConfirmButton:!1,timer:2e3}),g()})})})}function P(){document.querySelector(".delete-all-btn").addEventListener("click",o=>{const e=i.map(r=>r.id),s=Math.max(...e);for(let r=1;r<=s;r++){const l=`${p}/660/favorites/${r}`;c.delete(l,d).then(function(n){i=n.data,u.fire({icon:"success",title:"全部刪除成功!!",showConfirmButton:!1,timer:2e3}),g()})}})}function j(){let t="asc";D.addEventListener("click",function(o){c.get(f,d).then(e=>{i=e.data;const s=i.sort((r,l)=>{const n=new Date(r.rent.updateDate).getTime(),a=new Date(l.rent.updateDate).getTime();return t==="asc"?n<a?-1:n>a?1:0:n>a?-1:n<a?1:0});m(s),t=t==="asc"?"desc":"asc"})})}j();function C(){let t="asc";E.addEventListener("click",function(o){c.get(f,d).then(e=>{i=e.data;const s=i.sort((r,l)=>{const n=r.rent["square Footage"],a=l.rent["square Footage"];return t==="asc"?n<a?-1:n>a?1:0:n>a?-1:n<a?1:0});m(s),t=t==="asc"?"desc":"asc"})})}C();function F(){let t="asc";U.addEventListener("click",function(o){c.get(f,d).then(e=>{i=e.data;const s=i.sort((r,l)=>{const n=r.rent.price,a=l.rent.price;return t==="asc"?n<a?-1:n>a?1:0:n>a?-1:n<a?1:0});m(s),t=t==="asc"?"desc":"asc"})})}F();
