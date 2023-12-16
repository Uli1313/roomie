import{a as d,S as r}from"./bootstrap.min-acd3fe77.js";const M="https://roomie-lfta.onrender.com",F=localStorage.getItem("userId"),P=localStorage.getItem("token"),U={headers:{Authorization:`Bearer ${P}`}};let C;const v=document.querySelectorAll(".nav-logged"),$=document.querySelectorAll(".nav-unlogged"),Y=document.querySelectorAll(".nav-logged-photo"),E=document.querySelector(".logout-btn");(async()=>{try{const s=`/600/users/${F}`,e=`${M}${s}`,t=await d.get(e,U),a=t.data.photo;Y.forEach(o=>o.setAttribute("src",a)),C=t.data,H(),v.forEach(o=>{o.classList.remove("d-none")}),$.forEach(o=>{o.classList.add("d-none")})}catch(s){console.log(s),v.forEach(e=>{e.classList.add("d-none")}),$.forEach(e=>{e.classList.remove("d-none")})}})();function H(){localStorage.setItem("user",JSON.stringify(C))}E.addEventListener("click",z);function z(){r.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(s=>{s.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),r.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const p="https://roomie-lfta.onrender.com",m=localStorage.getItem("userId"),R=localStorage.getItem("token"),c={headers:{Authorization:`Bearer ${R}`}};let w,x,L,k;const B=document.querySelector("#publishList"),T=document.querySelector("#matchedList"),S=document.querySelector("#removedList"),D=document.querySelector("#draftList"),J=document.querySelectorAll(".user-post-list"),N=document.querySelector("#postsTab");let j="publish-tab";function y(){const s=`${p}/660/rents?userId=${m}&status=刊登中`;d.get(s,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(e=>{w=e.data,O(w)}).catch(e=>console.log(e))}function O(s){if(!s.length){B.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}B.innerHTML=s.reduce((e,t)=>{const a=t.traffic.reduce((o,i)=>o+`<span class="me-3 px-1 bg-primary-200"
      >${i}</span
    >`,"");return e+`<div class="user-post-item row p-1 rounded hover-primary-2" data-post-id=${t.id}>
    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
      <img
        src="${t.photo[0]}"
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
          <a href="rentArticle.html?id=${t.id}" class="h3 link-dark"
            >${t.title}</a
          >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
              type="button"
              id="dropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-symbols-outlined more-btn"
                >more_vert</span
              >
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownBtn"
            >
              <li>
                <a class="dropdown-item edit-post" href="#">編輯貼文</a>
              </li>
              <li>
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
              </li>
              <li>
                <a class="dropdown-item to-removed" href="#">暫時下架</a>
              </li>
              <li>
                <a class="dropdown-item to-matched" href="#">媒合成功</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="pb-3">${t.houseLayout} | ${t["square Footage"]}坪${t.floor}F/${t.totalFloor}F</li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-2"
            style="transform: translateY(25%)"
            >location_on</span
          >${t.address}${t.district[0]}-${t.district[1]}
        </li>
        <li class="pb-3">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >person</span
          >
          <span class="me-3 px-1 bg-primary-200">${t.gender}</span
          ><span class="me-3 px-1 bg-primary-200">${t.canCooking?"可開伙":"不可開伙"}</span
          ><span class="me-3 px-1 bg-primary-200"
            >${t.canPet?"可養寵物":"不可養寵物"}</span
          >
        </li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >map</span
          >
 ${a}
        </li>
        <li class="pb-2 h2 text-secondary text-end">
          ${t.price}元/月
        </li>
        <li class="d-flex justify-content-between">
          更新日期:${t.updateDate}
          <div>
            <span
              class="material-symbols-outlined"
              style="transform: translateY(25%)"
              >visibility</span
            ><span class="ps-2">${t.view}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>`},"")}function q(){const s=`${p}/660/rents?userId=${m}&status=已媒合`;d.get(s,c).then(e=>{x=e.data,V(x)}).catch(e=>console.log(e))}function V(s){let e="";if(!s.length){T.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}s.forEach(function(t){const a=`${t.updateDate}`,o=new Date(a),i=`${t.soldDate}`,n=new Date(i),l=new Date,f=o.getTime()-n.getTime(),b=n.getTime()-l.getTime(),h=Math.abs(Math.trunc(f/(1e3*3600*24))),_=Math.abs(Math.trunc(b/(1e3*3600*24)));e+=`<div class="user-post-item col-12 my-3 p-1 hover-primary-2 rounded" data-post-id=${t.id}>
                    <div class="col-12 p-3 bg-white d-flex flex-wrap justify-content-evenly align-items-center text-end text-lg-center border rounded">
                        <div class="col-12 col-lg-4"><a href="matchArticle.html?id=${t.id}" class="link-dark fw-bold">${t.title}</a></div>
                        <div class="col-12 col-lg pb-1 pb-lg-0"><span class="text-primary">${_}日前&nbsp;</span>媒合成功</div>
                        <div class="col-12 col-lg pb-1 pb-lg-0">${t["square Footage"]}坪&nbsp;/&nbsp;${t.type}</div>
                        <div class="col-12 col-lg fw-bold text-primary">${t.price.toLocaleString("zh-TW")}元/月</div>
                        <div class="col-12 col-lg d-flex align-items-center">
                            <span class="text-primary">花費${h}日&nbsp;</span>
                            媒合成功
                            <span class="material-symbols-outlined ps-1 text-danger" style="margin-top:2px" >verified</span>
                        </div>
                        <div class="dropdown">
                        <button
                          class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
                          type="button"
                          id="dropdownBtn"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span class="material-symbols-outlined more-btn"
                            >more_vert</span
                          >
                        </button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownBtn"
                        >
                          <li>
                            <a class="dropdown-item delete-post" href="#">刪除貼文</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
                `}),T.innerHTML=e}function I(){const s=`${p}/660/rents?userId=${m}&status=下架`;d.get(s,c).then(e=>{L=e.data,W(L)}).catch(e=>console.log(e))}function W(s){if(!s.length){S.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}S.innerHTML=s.reduce((e,t)=>{const a=t.traffic.reduce((o,i)=>o+`<span class="me-3 px-1 bg-primary-200"
      >${i}</span
    >`,"");return e+`<div class="user-post-item row p-1 rounded hover-primary-2" data-post-id=${t.id}>
    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
      <img
        src="${t.photo[0]}"
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
          <a href="rentArticle.html?id=${t.id}" class="h3 link-dark"
            >${t.title}</a
          >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
              type="button"
              id="dropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-symbols-outlined more-btn"
                >more_vert</span
              >
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownBtn"
            >
              <li>
                <a class="dropdown-item edit-post" href="#">編輯貼文</a>
              </li>
              <li>
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
              </li>
              <li>
                <a class="dropdown-item to-publish" href="#">刊登文章</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="pb-3">${t.houseLayout} | ${t["square Footage"]}坪${t.floor}F/${t.totalFloor}F</li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-2"
            style="transform: translateY(25%)"
            >location_on</span
          >${t.address}${t.district[0]}-${t.district[1]}
        </li>
        <li class="pb-3">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >person</span
          >
          <span class="me-3 px-1 bg-primary-200">${t.gender}</span
          ><span class="me-3 px-1 bg-primary-200">${t.canCooking?"可開伙":"不可開伙"}</span
          ><span class="me-3 px-1 bg-primary-200"
            >${t.canPet?"可養寵物":"不可養寵物"}</span
          >
        </li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >map</span
          >
 ${a}
        </li>
        <li class="pb-2 h2 text-secondary text-end">
          ${t.price}元/月
        </li>
        <li class="d-flex justify-content-between">
          更新日期:${t.updateDate}
          <div>
            <span
              class="material-symbols-outlined"
              style="transform: translateY(25%)"
              >visibility</span
            ><span class="ps-2">${t.view}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>`},"")}function A(){const s=`${p}/660/rents?userId=${m}&status=草稿`;d.get(s,c).then(e=>{k=e.data,G(k)}).catch(e=>console.log(e))}function G(s){if(!s.length){D.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}D.innerHTML=s.reduce((e,t)=>{const a=t.traffic.reduce((o,i)=>o+`<span class="me-3 px-1 bg-primary-200"
      >${i}</span
    >`,"");return e+`<div class="user-post-item row p-1 rounded hover-primary-2" data-post-id=${t.id}>
    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
      <img
        src="${t.photo[0]}"
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
          <a href="rentArticle.html?id=${t.id}" class="h3 link-dark"
            >${t.title}</a
          >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle p-3 link-none border-0 rounded-3 d-flex justify-content-center align-items-center"
              type="button"
              id="dropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="material-symbols-outlined more-btn"
                >more_vert</span
              >
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownBtn"
            >
              <li>
                <a class="dropdown-item edit-post" href="#">編輯貼文</a>
              </li>
              <li>
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
              </li>
              <li>
                <a class="dropdown-item to-publish" href="#">刊登文章</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="pb-3">${t.houseLayout} | ${t["square Footage"]}坪${t.floor}F/${t.totalFloor}F</li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-2"
            style="transform: translateY(25%)"
            >location_on</span
          >${t.address}${t.district[0]}-${t.district[1]}
        </li>
        <li class="pb-3">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >person</span
          >
          <span class="me-3 px-1 bg-primary-200">${t.gender}</span
          ><span class="me-3 px-1 bg-primary-200">${t.canCooking?"可開伙":"不可開伙"}</span
          ><span class="me-3 px-1 bg-primary-200"
            >${t.canPet?"可養寵物":"不可養寵物"}</span
          >
        </li>
        <li class="pb-2">
          <span
            class="material-symbols-outlined pe-1"
            style="transform: translateY(25%)"
            >map</span
          >
 ${a}
        </li>
        <li class="pb-2 h2 text-secondary text-end">
          ${t.price}元/月
        </li>
        <li class="d-flex justify-content-between">
          更新日期:${t.updateDate}
          <div>
            <span
              class="material-symbols-outlined"
              style="transform: translateY(25%)"
              >visibility</span
            ><span class="ps-2">${t.view}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>`},"")}N.addEventListener("click",s=>{const e=s.target.getAttribute("id");switch(j=e,e){case"publish-tab":y();break;case"matched-tab":q();break;case"removed-tab":I();break;case"draft-tab":A();break}});J.forEach(s=>{s.addEventListener("click",e=>{const t=e.target.classList;if(t.contains("to-removed"))return g("下架",e);if(t.contains("to-matched"))return g("已媒合",e);if(t.contains("to-publish"))return g("刊登中",e);if(t.contains("delete-post"))return K(e);if(t.contains("edit-post"))return Q()})});function g(s,e){const t=e.target.closest(".user-post-item").getAttribute("data-post-id"),a=`${p}/600/rents/${t}`,o={status:s};let i;if(s==="已媒合"){const n=new Date,l=n.getFullYear(),f=(n.getMonth()+1).toString().padStart(2,"0"),b=n.getDate().toString().padStart(2,"0"),h=`${l}/${f}/${b}`;i={status:s,soldDate:h}}switch(s){case"下架":r.fire({icon:"question",title:"確定要暫時下架嗎",text:"點選確定後將移至下架區，可以至下架區再次上架貼文",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&d.patch(a,o,c).then(l=>{u(),r.fire({icon:"success",title:"下架貼文成功",timer:1500,showConfirmButton:!1})}).catch(l=>{r.fire({icon:"error",title:"下架貼文失敗",timer:1500,showConfirmButton:!1}),console.log(l)})});break;case"已媒合":r.fire({icon:"question",title:"確定媒合成功嗎",text:"一旦點選確定後將移至已媒合，無法再次上架貼文",input:"checkbox",inputPlaceholder:"我同意將貼文保留在媒合成功頁面",inputValidator:n=>!n&&"請勾選同意",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&d.patch(a,i,c).then(l=>{u(),r.fire({icon:"success",title:"恭喜您媒合成功",timer:1500,showConfirmButton:!1})}).catch(l=>{r.fire({icon:"error",title:"發生錯誤",timer:1500,showConfirmButton:!1})})});break;case"刊登中":r.fire({icon:"question",title:"確定要上架貼文嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&d.patch(a,o,c).then(l=>{u(),r.fire({icon:"success",title:"上架貼文成功",timer:1500,showConfirmButton:!1})}).catch(l=>{r.fire({icon:"error",title:"上架貼文失敗",timer:1500,showConfirmButton:!1})})});break}}function K(s){const e=s.target.closest(".user-post-item").getAttribute("data-post-id");console.log(e);const t=`${p}/600/rents/${e}`;r.fire({icon:"question",title:"確定要刪除貼文嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&d.delete(t,c).then(o=>{u(),r.fire({icon:"success",title:"刪除貼文成功",timer:1500,showConfirmButton:!1})}).catch(o=>{r.fire({icon:"error",title:"刪除貼文失敗",timer:1500,showConfirmButton:!1})})})}function Q(s){location.href="user_editPost.html"}function u(){switch(j){case"publish-tab":y();break;case"matched-tab":q();break;case"removed-tab":I();break;case"draft-tab":A();break}}function X(){y()}X();[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
