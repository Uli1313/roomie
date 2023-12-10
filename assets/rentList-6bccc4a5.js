import"./bootstrap.min-340b141d.js";import{a as u}from"./axios-28bc18a3.js";import{S as D}from"./sweetalert2.all-ae5fa1cb.js";const p="https://roomie-lfta.onrender.com/";let t="",m=[];function F(r){let a=document.querySelector("#list"),l="";r.forEach(function(i){let o=i.canPet?"可養寵物":"不可養寵物",b=i.canCooking?"可開伙":"不可開伙",f="";i.traffic.forEach(function(x){f+=`<span class="me-3 px-1 bg-primary-200">近${x}</span>`}),l+=`<div class="row p-1 my-4 rounded hover-primary-2 ">
                    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
                        <img 
                            src="${i.photo[0]}" 
                            style="width:auto;height:100%;object-fit: cover;object-position: center;" 
                            alt="house photo"
                            class="rounded-top rounded-md-start">
                    </div>
                    <div class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end">
                        <ul>
                            <li class="w-100 d-flex justify-content-between align-items-center py-2">
                                <a href="rentArticle.html?id=${i.id}" class="h3 link-dark link-title">${i.title}</a> 
                                <button class="p-3 link-dark hover-primary border-0 rounded-3 favorite" data-id="${i.id}">
                                    <span class="material-symbols-outlined" data-id="${i.id}">heart_plus</span>
                                </button></li>
                            <li class="pb-3">${i.houseLayout} | ${i["square Footage"]}坪 | ${i.floor}F/${i.totalFloor}F </li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-2 transform-y-25">location_on</span>
                                ${i.address} ${i.district[0]}-${i.district[1]}</li>
                            <li class="pb-3">
                                <span class="material-symbols-outlined pe-1 transform-y-25">person</span>
                                <span class="me-3 px-1 bg-primary-200">${i.gender}</span>
                                <span class="me-3 px-1 bg-primary-200">${o}</span>
                                <span class="me-3 px-1 bg-primary-200">${b}</span></li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-1 transform-y-25">map</span>
                                ${f}</li>
                            <li class="pb-2 h2 text-danger text-end">${i.price.toLocaleString("zh-TW")}元/月</li>
                            <li class="d-flex justify-content-between">更新日期:${i.updateDate} 
                                <div>
                                    <span class="material-symbols-outlined transform-y-25">visibility</span>
                                    <span class="ps-2">${i.view}</span>
                                </div></li>
                        </ul>
                    </div>
                </div>`}),a.innerHTML=l,G(),J()}function w(){let r=document.querySelector("#list"),a=`
                <div class="row rounded">
                    <div class="col bg-white rounded m-5 p-5 d-flex flex-column justify-content-center align-items-center ">
                        <p>¯_(ツ)_/¯</p>
                        <p class="p-2 h5">對不起，沒有找到適合您的物件！</p>
                        <p>建議您：重新篩選或搜尋試試看唷～</p>
                    </div>
                </div>`;r.innerHTML=a}function M(){t="_sort=view&_order=desc&status=刊登中",u.get(`${p}rents?${t}`).then(function(r){m=r.data,$(t,s,h),g(m)})}M();let B=document.querySelector("#filterDate"),H=document.querySelector("#filterPrice"),y="&_sort=updateDate&_order=asc",_="&_sort=updateDate&_order=desc",k="&_sort=price&_order=asc",C="&_sort=price&_order=desc",E="_sort=view&_order=desc";function O(){B.addEventListener("click",function(r){t.includes(y)?t=t.replace(y,_):t.includes(_)?t=t.replace(_,y):t.includes(k)?t=t.replace(k,y):t.includes(C)?t=t.replace(C,y):t.includes(E)?t=t.replace(E,y):t+=y,u.get(`${p}rents?${t}`).then(function(a){m=a.data,m.length>0?($(t,1,h),s=1,g(m)):(w(),s=1,g(m))})})}O();function V(){H.addEventListener("click",function(r){t.includes(k)?t=t.replace(k,C):t.includes(C)?t=t.replace(C,k):t.includes(y)?t=t.replace(y,k):t.includes(_)?t=t.replace(_,k):t.includes(E)?t=t.replace(E,k):t+=k,u.get(`${p}rents?${t}`).then(function(a){m=a.data,m.length>0?($(t,1,h),s=1,g(m)):(w(),s=1,g(m))})})}V();let T,P,h=4,s=1,R=document.querySelector(".pagination");function $(r,a,l){u.get(`${p}rents?${r}&_page=${a}&_limit=${l}`).then(i=>{let o=i.data;F(o)})}function g(r){T=r.length,P=Math.ceil(T/h);let a="";if(T==0)a="";else{a+=`<li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
            <span class="material-icons align-bottom">
            chevron_left
            </span>
        </a>
        </li>`;for(let i=1;i<=P;i++)a+=`<li class="page-item">
            <a class="page-link" href="#">${i}</a>
        </li>`;a+=`<li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
            <span class="material-icons"> navigate_next </span>
        </a>
        </li>`}R.innerHTML=a;const l=document.querySelectorAll(".page-link");l.forEach(i=>{(i.textContent.trim()==="chevron_left"||i.textContent.trim()==="navigate_next")&&i.blur()}),l[s].classList.add("active")}R.addEventListener("click",r=>{const a=document.querySelectorAll(".page-link");if(a.forEach(l=>{l.classList.remove("active")}),r.target.textContent.trim()==="chevron_left"){if(s===1){a[s].classList.add("active"),r.preventDefault();return}s>1&&(s--,a[s].classList.add("active"),$(t,s,h))}else if(r.target.textContent.trim()==="navigate_next"){if(s===P){a[s].classList.add("active"),r.preventDefault();return}s<P&&(s++,a[s].classList.add("active"),$(t,s,h))}else s=Number(r.target.textContent.trim()),a[s].classList.add("active"),$(t,s,h)});let Y=document.querySelector("#search"),z=document.querySelector("#submit");z.addEventListener("click",function(r){let l=`q=${Y.value}&status=刊登中`;u.get(`${p}rents?${l}`).then(function(i){let o=i.data;o.length>0?($(l,s,h),g(o)):w()})});u.get("https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json").then(function(r){let a=r.data,i=a.map(function(e){return{name:e.name,districts:e.districts.map(function(v){return v.name})}}).filter(e=>e.name!=="釣魚臺"&&e.name!=="南海島");function o(e,v){const c=["臺北市","新北市","基隆市","桃園市","新竹市","新竹縣","臺中市","彰化縣","苗栗縣","南投縣","雲林縣","高雄市","臺南市","嘉義市","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];return c.indexOf(e.name)-c.indexOf(v.name)}i.sort(o);let b=document.querySelectorAll(".countyCity"),f=document.querySelector(".btnTitle"),L=document.querySelector(".dropdownTitle"),x=document.querySelector(".districtList");document.querySelectorAll(".form-check-input"),b.forEach(function(e){e.addEventListener("change",function(v){document.querySelector("#disabled-events").classList.remove("disabled-events");let c=Array.from(b).indexOf(e),d=i[c],U=`${d.name}`,N=`${d.name}`,A="";d.districts.forEach(function(j,I){A+=` 
                                        <li class="pb-2">
                                            <div class="form-check-inline cursor">
                                                <input class="form-check-input cursor districtCheckbox" type="checkbox" id="district${I}" value="${d.name}">
                                                <label class="form-check-label cursor districtLabelText" for="district${I}">${j}</label>
                                            </div>
                                        </li>
                                        `}),f.textContent=U,L.textContent=N,x.innerHTML=A,document.querySelectorAll(".form-check-input")})});let q=document.querySelector("#row"),n="",S="";q.addEventListener("change",function(e){const c=document.querySelector(`label[for='${e.target.id}']`).textContent.trim();e.target.checked?(e.target.type==="radio"&&e.target.classList.contains("cityRadio")?n=`address_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?n+=`&district_like=${c}`:e.target.type==="radio"&&e.target.classList.contains("priceRadio")?S=`&${e.target.dataset.price}&_sort=price&_order=desc`:e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")?n+=`&type=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("lifeEquipmentCheckbox")?n+=`&lifeEquipment_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("equipmentCheckbox")?n+=`&equipment_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("identityCheckbox")?n+=`&identity_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("genderCheckbox")?n+=`&gender=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("canPetCookCheckbox")&&(c=="可開伙"?n+=`&canCooking=${!0}`:n+=`&canPet=${!0}`),t=n+S+"&status=刊登中",u.get(`${p}rents?${t}`).then(function(d){d.data.length>0?(a=d.data,$(t,1,h),s=1,g(a)):(a=d.data,w(),s=1,g(a))})):(e.target.type==="radio"&&e.target.classList.contains("cityRadio")?n=n.replace(`address_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?n=n.replace(`&district_like=${c}`,""):e.target.type==="radio"&&e.target.classList.contains("priceRadio")?S=n.replace(`&${e.target.dataset.price}`,""):e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")?n=n.replace(`&type=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("lifeEquipmentCheckbox")?n=n.replace(`&lifeEquipment_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("equipmentCheckbox")?n=n.replace(`&equipment_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("identityCheckbox")?n=n.replace(`&identity_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("genderCheckbox")?n=n.replace(`&gender=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("canPetCookCheckbox")&&(c=="可開伙"?n=n.replace(`&canCooking=${!0}`,""):n=n.replace(`&canPet=${!0}`,"")),t=n+S+"&status=刊登中",u.get(`${p}rents?${t}`).then(function(d){d.data.length>0?(a=d.data,$(t,1,h),s=1,g(a)):(a=d.data,w(),s=1,g(a))}))})});let W=document.querySelector("#close");W.addEventListener("click",function(r){location.reload()});function G(){document.querySelectorAll(".link-title").forEach(a=>{a.addEventListener("click",function(l){l.preventDefault();const i=new URL(l.target.href),b=new URLSearchParams(i.search).get("id");u.get(`${p}rents/${b}`).then(function(f){const L=f.data;let x={view:parseInt(L.view)+1};u.patch(`${p}rents/${b}`,x).then(function(q){window.location.href=l.target.href}).catch(function(q){console.error(q)})}).catch(function(f){console.error(f)})})})}function J(){document.querySelectorAll(".favorite").forEach(a=>{a.addEventListener("click",function(l){let i=parseInt(l.target.dataset.id),o=parseInt(localStorage.getItem("userId")),b={rentId:i,userId:o};o?u.get(`${p}users/${o}/favorites`).then(function(f){const L=f.data.find(x=>x.rentId===i);L&&D.fire({icon:"warning",title:"您已經有這則貼文",showConfirmButton:!1,timer:1500}),L===void 0&&u.post(`${p}favorites`,b).then(function(x){D.fire({icon:"success",title:"添加至您的收藏",showConfirmButton:!1,timer:1500})})}):D.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})})}
