import"./bootstrap.min-340b141d.js";import{a as l}from"./axios-28bc18a3.js";import{S as i}from"./sweetalert2.all-ae5fa1cb.js";const c="https://roomie-lfta.onrender.com",u=localStorage.getItem("userId"),T=localStorage.getItem("token"),d={headers:{Authorization:`Bearer ${T}`}};let f,h,y,g;const $=document.querySelector("#publishList"),v=document.querySelector("#matchedList"),w=document.querySelector("#removedList"),x=document.querySelector("#draftList"),C=document.querySelectorAll(".user-post-list"),F=document.querySelector("#postsTab");let k="publish-tab";function b(){const s=`${c}/600/rents?userId=${u}&status=刊登中`;l.get(s,d).then(e=>{f=e.data,Y(f)}).catch(e=>console.log(e))}function Y(s){if(!s.length){$.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}$.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((n,a)=>n+`<span class="me-3 px-1 bg-primary-200"
      >${a}</span
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
  </div>`},"")}function L(){const s=`${c}/600/rents?userId=${u}&status=已媒合`;l.get(s,d).then(e=>{h=e.data,_(h)}).catch(e=>console.log(e))}function _(s){if(!s.length){v.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}v.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((n,a)=>n+`<span class="me-3 px-1 bg-primary-200"
      >${a}</span
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
                <a class="dropdown-item delete-post" href="#">刪除貼文</a>
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
  </div>`},"")}function B(){const s=`${c}/600/rents?userId=${u}&status=下架`;l.get(s,d).then(e=>{y=e.data,q(y)}).catch(e=>console.log(e))}function q(s){if(!s.length){w.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}w.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((n,a)=>n+`<span class="me-3 px-1 bg-primary-200"
      >${a}</span
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
  </div>`},"")}function j(){const s=`${c}/600/rents?userId=${u}&status=草稿`;l.get(s,d).then(e=>{g=e.data,D(g)}).catch(e=>console.log(e))}function D(s){if(!s.length){x.innerHTML=`<div class="d-flex justify-content-center align-items-center">
    <p>尚無相關物件 ¯_(ツ)_/¯</p>
  </div>`;return}x.innerHTML=s.reduce((e,t)=>{const o=t.traffic.reduce((n,a)=>n+`<span class="me-3 px-1 bg-primary-200"
      >${a}</span
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
  </div>`},"")}F.addEventListener("click",s=>{const e=s.target.getAttribute("id");switch(k=e,e){case"publish-tab":b();break;case"matched-tab":L();break;case"removed-tab":B();break;case"draft-tab":j();break}});C.forEach(s=>{s.addEventListener("click",e=>{const t=e.target.classList;if(t.contains("to-removed"))return m("下架",e);if(t.contains("to-matched"))return m("已媒合",e);if(t.contains("to-publish"))return m("刊登中",e);if(t.contains("delete-post"))return P(e)})});function m(s,e){const t=e.target.closest(".user-post-item").getAttribute("data-post-id"),o=`${c}/600/rents/${t}`,n={status:s};switch(s){case"下架":i.fire({icon:"question",title:"確定要暫時下架嗎",text:"點選確定後將移至下架區，可以至下架區再次上架貼文",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&(l.patch(o,n,d).then(r=>p()).catch(r=>console.log(r)),i.fire({icon:"success",title:"下架貼文成功",timer:1500,showConfirmButton:!1}))});break;case"已媒合":i.fire({icon:"question",title:"確定媒合成功嗎",text:"一旦點選確定後將移至已媒合，無法再次上架貼文",input:"checkbox",inputPlaceholder:"我同意將貼文保留在媒合成功頁面",inputValidator:a=>!a&&"請勾選同意",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&(l.patch(o,n,d).then(r=>p()).catch(r=>console.log(r)),i.fire({icon:"success",title:"恭喜您媒合成功",timer:1500,showConfirmButton:!1}))});break;case"刊登中":i.fire({icon:"question",title:"確定要上架貼文嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(a=>{a.isConfirmed&&(l.patch(o,n,d).then(r=>p()).catch(r=>console.log(r)),i.fire({icon:"success",title:"上架貼文成功",timer:1500,showConfirmButton:!1}))});break}}function P(s){const e=s.target.closest(".user-post-item").getAttribute("data-post-id"),t=`${c}/600/rents/${e}`;i.fire({icon:"question",title:"確定要刪除貼文嗎",text:"一旦刪除後將無法復原",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(o=>{o.isConfirmed&&(l.delete(t,d).then(n=>p()).catch(n=>console.log(n)),i.fire({icon:"success",title:"刪除貼文成功",timer:1500,showConfirmButton:!1}))})}function p(){switch(k){case"publish-tab":b();break;case"matched-tab":L();break;case"removed-tab":B();break;case"draft-tab":j();break}}function S(){b()}S();[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
