import{a as d}from"./bootstrap.min-0d2201fe.js";import{S as r}from"./sweetalert2.all-42322153.js";const _="https://roomie-lfta.onrender.com",F=localStorage.getItem("userId"),U=localStorage.getItem("token"),Y={headers:{Authorization:`Bearer ${U}`}};let j;const $=document.querySelectorAll(".nav-logged"),v=document.querySelectorAll(".nav-unlogged"),P=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const s=`/600/users/${F}`,e=`${_}${s}`,t=await d.get(e,Y),o=t.data.photo;P.forEach(a=>a.setAttribute("src",o)),j=t.data,E(),$.forEach(a=>{a.classList.remove("d-none")}),v.forEach(a=>{a.classList.add("d-none")}),console.log("已登入")}catch(s){console.log(s),$.forEach(e=>{e.classList.add("d-none")}),v.forEach(e=>{e.classList.remove("d-none")}),console.log("未登入")}})();function E(){localStorage.setItem("user",JSON.stringify(j))}const p="https://roomie-lfta.onrender.com",m=localStorage.getItem("userId"),H=localStorage.getItem("token"),c={headers:{Authorization:`Bearer ${H}`}};let w,x,L,k;const B=document.querySelector("#publishList"),T=document.querySelector("#matchedList"),D=document.querySelector("#removedList"),S=document.querySelector("#draftList"),z=document.querySelectorAll(".user-post-list"),R=document.querySelector("#postsTab");let C="publish-tab";function y(){const s=`${p}/600/rents?userId=${m}&status=刊登中`;d.get(s,c).then(e=>{w=e.data,J(w)}).catch(e=>console.log(e))}function J(s){if(!s.length){B.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}B.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((a,l)=>a+`<span class="me-3 px-1 bg-primary-200"
      >${l}</span
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
                <a class="dropdown-item" href="#">編輯貼文</a>
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
 ${o}
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
  </div>`},"")}function q(){const s=`${p}/600/rents?userId=${m}&status=已媒合`;d.get(s,c).then(e=>{x=e.data,N(x)}).catch(e=>console.log(e))}function N(s){let e="";if(!s.length){T.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}s.forEach(function(t){const o=`${t.updateDate}`,a=new Date(o),l=`${t.soldDate}`,n=new Date(l),i=new Date,f=a.getTime()-n.getTime(),b=n.getTime()-i.getTime(),h=Math.abs(Math.trunc(f/(1e3*3600*24))),M=Math.abs(Math.trunc(b/(1e3*3600*24)));e+=`<div class="user-post-item col-12 my-3 p-1 hover-primary-2 rounded">
                    <div class="col-12 p-3 bg-white d-flex flex-wrap justify-content-evenly align-items-center text-end text-lg-center border rounded">
                        <div class="col-12 col-lg-4"><a href="matchArticle.html?id=${t.id}" class="link-dark fw-bold">${t.title}</a></div>
                        <div class="col-12 col-lg pb-1 pb-lg-0"><span class="text-primary">${M}日前&nbsp;</span>媒合成功</div>
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
                `}),T.innerHTML=e}function A(){const s=`${p}/600/rents?userId=${m}&status=下架`;d.get(s,c).then(e=>{L=e.data,O(L)}).catch(e=>console.log(e))}function O(s){if(!s.length){D.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}D.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((a,l)=>a+`<span class="me-3 px-1 bg-primary-200"
      >${l}</span
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
                <a class="dropdown-item" href="#">編輯貼文</a>
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
 ${o}
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
  </div>`},"")}function I(){const s=`${p}/600/rents?userId=${m}&status=草稿`;d.get(s,c).then(e=>{k=e.data,V(k)}).catch(e=>console.log(e))}function V(s){if(!s.length){S.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}S.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((a,l)=>a+`<span class="me-3 px-1 bg-primary-200"
      >${l}</span
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
                <a class="dropdown-item" href="#">編輯貼文</a>
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
 ${o}
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
  </div>`},"")}R.addEventListener("click",s=>{const e=s.target.getAttribute("id");switch(C=e,e){case"publish-tab":y();break;case"matched-tab":q();break;case"removed-tab":A();break;case"draft-tab":I();break}});z.forEach(s=>{s.addEventListener("click",e=>{const t=e.target.classList;if(t.contains("to-removed"))return g("下架",e);if(t.contains("to-matched"))return g("已媒合",e);if(t.contains("to-publish"))return g("刊登中",e);if(t.contains("delete-post"))return W(e)})});function g(s,e){const t=e.target.closest(".user-post-item").getAttribute("data-post-id"),o=`${p}/600/rents/${t}`,a={status:s};let l;if(s==="已媒合"){const n=new Date,i=n.getFullYear(),f=(n.getMonth()+1).toString().padStart(2,"0"),b=n.getDate().toString().padStart(2,"0"),h=`${i}/${f}/${b}`;l={status:s,soldDate:h}}switch(s){case"下架":r.fire({icon:"question",title:"確定要暫時下架嗎",text:"點選確定後將移至下架區，可以至下架區再次上架貼文",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&d.patch(o,a,c).then(i=>{u(),r.fire({icon:"success",title:"下架貼文成功",timer:1500,showConfirmButton:!1})}).catch(i=>{r.fire({icon:"error",title:"下架貼文失敗",timer:1500,showConfirmButton:!1}),console.log(i)})});break;case"已媒合":r.fire({icon:"question",title:"確定媒合成功嗎",text:"一旦點選確定後將移至已媒合，無法再次上架貼文",input:"checkbox",inputPlaceholder:"我同意將貼文保留在媒合成功頁面",inputValidator:n=>!n&&"請勾選同意",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&d.patch(o,l,c).then(i=>{u(),r.fire({icon:"success",title:"恭喜您媒合成功",timer:1500,showConfirmButton:!1})}).catch(i=>{r.fire({icon:"error",title:"發生錯誤",timer:1500,showConfirmButton:!1})})});break;case"刊登中":r.fire({icon:"question",title:"確定要上架貼文嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&d.patch(o,a,c).then(i=>{u(),r.fire({icon:"success",title:"上架貼文成功",timer:1500,showConfirmButton:!1})}).catch(i=>{r.fire({icon:"error",title:"上架貼文失敗",timer:1500,showConfirmButton:!1})})});break}}function W(s){const e=s.target.closest(".user-post-item").getAttribute("data-post-id"),t=`${p}/600/rents/${e}`;r.fire({icon:"question",title:"確定要刪除貼文嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(o=>{o.isConfirmed&&d.delete(t,c).then(a=>{u(),r.fire({icon:"success",title:"刪除貼文成功",timer:1500,showConfirmButton:!1})}).catch(a=>{r.fire({icon:"error",title:"刪除貼文失敗",timer:1500,showConfirmButton:!1})})})}function u(){switch(C){case"publish-tab":y();break;case"matched-tab":q();break;case"removed-tab":A();break;case"draft-tab":I();break}}function G(){y()}G();[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
