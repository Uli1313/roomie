import{a as c}from"./bootstrap.min-0d2201fe.js";import{S as $}from"./sweetalert2.all-42322153.js";const S="https://roomie-lfta.onrender.com",L=localStorage.getItem("userId"),q=localStorage.getItem("token"),v={headers:{Authorization:`Bearer ${q}`}};let b;const g=document.querySelectorAll(".nav-logged"),h=document.querySelectorAll(".nav-unlogged"),k=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const t=`/600/users/${L}`,s=`${S}${t}`,e=await c.get(s,v),o=e.data.photo;k.forEach(r=>r.setAttribute("src",o)),b=e.data,A(),g.forEach(r=>{r.classList.remove("d-none")}),h.forEach(r=>{r.classList.add("d-none")}),console.log("已登入")}catch(t){console.log(t),g.forEach(s=>{s.classList.add("d-none")}),h.forEach(s=>{s.classList.remove("d-none")}),console.log("未登入")}})();function A(){localStorage.setItem("user",JSON.stringify(b))}const p="https://roomie-lfta.onrender.com",x=localStorage.getItem("userId"),D=localStorage.getItem("token"),d={headers:{Authorization:`Bearer ${D}`}};let u=`${p}/660/favorites?userId=${x}&_expand=rent`,i=[],y=document.querySelector(".favorites-list"),w=document.querySelector("#filterDate"),E=document.querySelector("#filterSquare"),I=document.querySelector("#filterPrice");function m(){c.get(u,d).then(t=>{i=t.data,f(i),B(),U()})}m();function f(t){if(t.length==0){y.innerHTML=` <div class="d-flex justify-content-center align-items-center">
                                        <p>這裡什麼都沒有，先去找找看有沒有喜歡的物件，再加入收藏單吧！ ¯_(ツ)_/¯</p>
                                    </div>`;return}let s="";t.forEach(e=>{let o="";e.rent.traffic.forEach(function(l){o+=`<span class="me-3 px-1 bg-primary-200">近${l}</span>`}),s+=`
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
                        ${o}
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
        `}),y.innerHTML=s}function B(){document.querySelectorAll(".delete-one-btn").forEach(s=>{s.addEventListener("click",e=>{let o=e.target.dataset.id;const r=`${p}/660/favorites/${o}`;c.delete(r,d).then(function(l){i=l.data,$.fire({icon:"success",title:"刪除成功!!",showConfirmButton:!1,timer:2e3}),m()})})})}function U(){document.querySelector(".delete-all-btn").addEventListener("click",s=>{const e=i.map(r=>r.id),o=Math.max(...e);for(let r=1;r<=o;r++){const l=`${p}/660/favorites/${r}`;c.delete(l,d).then(function(n){i=n.data,$.fire({icon:"success",title:"全部刪除成功!!",showConfirmButton:!1,timer:2e3}),m()})}})}function P(){let t="asc";w.addEventListener("click",function(s){c.get(u,d).then(e=>{i=e.data;const o=i.sort((r,l)=>{const n=new Date(r.rent.updateDate).getTime(),a=new Date(l.rent.updateDate).getTime();return t==="asc"?n<a?-1:n>a?1:0:n>a?-1:n<a?1:0});f(o),t=t==="asc"?"desc":"asc"})})}P();function T(){let t="asc";E.addEventListener("click",function(s){c.get(u,d).then(e=>{i=e.data;const o=i.sort((r,l)=>{const n=r.rent["square Footage"],a=l.rent["square Footage"];return t==="asc"?n<a?-1:n>a?1:0:n>a?-1:n<a?1:0});f(o),t=t==="asc"?"desc":"asc"})})}T();function j(){let t="asc";I.addEventListener("click",function(s){c.get(u,d).then(e=>{i=e.data;const o=i.sort((r,l)=>{const n=r.rent.price,a=l.rent.price;return t==="asc"?n<a?-1:n>a?1:0:n>a?-1:n<a?1:0});f(o),t=t==="asc"?"desc":"asc"})})}j();
