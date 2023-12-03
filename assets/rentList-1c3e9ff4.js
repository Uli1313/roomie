import"./bootstrap.min-e773685c.js";import{a as p}from"./axios-28bc18a3.js";const h="https://roomie-lfta.onrender.com/";let D,v,f=4,r=1,o="",E=document.querySelector(".pagination");function A(){o="_sort=view&_order=desc",p.get(`${h}rents?${o}`).then(function(n){let i=n.data;g(o,r,f),w(i)})}A();function w(n){D=n.length,v=Math.ceil(D/f);let i="";i+=`<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
        <span class="material-icons align-bottom">
        chevron_left
        </span>
    </a>
    </li>`;for(let s=1;s<=v;s++)i+=`<li class="page-item">
        <a class="page-link" href="#">${s}</a>
    </li>`;i+=`<li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
        <span class="material-icons"> navigate_next </span>
    </a>
    </li>`,E.innerHTML=i;const l=document.querySelectorAll(".page-link");l.forEach(s=>{(s.textContent.trim()==="chevron_left"||s.textContent.trim()==="navigate_next")&&s.blur()}),l[r].classList.add("active")}function g(n,i,l){p.get(`${h}rents?${n}&_page=${i}&_limit=${l}`).then(s=>{let t=s.data;M(t)})}E.addEventListener("click",n=>{const i=document.querySelectorAll(".page-link");if(i.forEach(l=>{l.classList.remove("active")}),n.target.textContent.trim()==="chevron_left"){if(r===1){i[r].classList.add("active");return}r>1&&(r--,i[r].classList.add("active"),g(o,r,f))}else if(n.target.textContent.trim()==="navigate_next"){if(r===v){i[r].classList.add("active");return}r<v&&(r++,i[r].classList.add("active"),g(o,r,f))}else r=Number(n.target.textContent.trim()),i[r].classList.add("active"),g(o,r,f)});function q(n){let i=document.querySelector("#list"),l="";n.forEach(function(t){let u=t.canPet?"可養寵物":"不可養寵物",y=t.canCooking?"可開伙":"不可開伙",k="";t.traffic.forEach(function(m){k+=`<span class="me-3 px-1 bg-primary-200">近${m}</span>`}),l+=`<div class="row p-1 my-4 rounded hover-primary-2">
                    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
                        <img 
                            src="${t.photo[0]}" 
                            style="width:auto;height:100%;object-fit: cover;object-position: center;" 
                            alt="house photo"
                            class="rounded-top rounded-md-start">
                    </div>
                    <div class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end">
                        <ul>
                            <li class="w-100 d-flex justify-content-between align-items-center py-2">
                                <a href="rentArticle.html?id=${t.id}" class="h3 link-dark link-title">${t.title}</a> 
                                <button class="p-3 link-dark hover-primary border-0 rounded-3">
                                    <span class="material-symbols-outlined">heart_plus</span>
                                </button></li>
                            <li class="pb-3">${t.houseLayout} | ${t["square Footage"]}坪 | ${t.floor}F/${t.totalFloor}F </li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-2 transform-y-25">location_on</span>
                                ${t.address} ${t.district[0]}-${t.district[1]}</li>
                            <li class="pb-3">
                                <span class="material-symbols-outlined pe-1 transform-y-25">person</span>
                                <span class="me-3 px-1 bg-primary-200">${t.gender}</span>
                                <span class="me-3 px-1 bg-primary-200">${u}</span>
                                <span class="me-3 px-1 bg-primary-200">${y}</span></li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-1 transform-y-25">map</span>
                                ${k}</li>
                            <li class="pb-2 h2 text-secondary text-end">${t.price.toLocaleString("zh-TW")}元/月</li>
                            <li class="d-flex justify-content-between">更新日期:${t.updateDate} 
                                <div>
                                    <span class="material-symbols-outlined transform-y-25">visibility</span>
                                    <span class="ps-2">${t.view}</span>
                                </div></li>
                        </ul>
                    </div>
                </div>`}),i.innerHTML=l,document.querySelectorAll(".link-title").forEach(t=>{t.addEventListener("click",function(u){u.preventDefault();const y=new URL(u.target.href),$=new URLSearchParams(y.search).get("id");p.get(`${h}rents/${$}`).then(function(m){const a=m.data;let b={view:parseInt(a.view)+1};p.patch(`${h}rents/${$}`,b).then(function(e){window.location.href=u.target.href}).catch(function(e){console.error(e)})}).catch(function(m){console.error(m)})})})}function C(){let n=document.querySelector("#list"),i=`
                <div class="row rounded">
                    <div class="col bg-white rounded m-5 p-5 d-flex flex-column justify-content-center align-items-center ">
                        <p>¯_(ツ)_/¯</p>
                        <p class="p-2 h5">對不起，沒有找到適合您的物件！</p>
                        <p>建議您：重新篩選或搜尋試試看唷～</p>
                    </div>
                </div>`;n.innerHTML=i}let R=document.querySelector("#filterDate"),j=document.querySelector("#filterPrice");function N(n){let i="desc";R.addEventListener("click",function(l){i==="desc"?(n.sort((s,t)=>new Date(t.updateDate)-new Date(s.updateDate)),i="asc"):(n.sort((s,t)=>new Date(s.updateDate)-new Date(t.updateDate)),i="desc"),q(n)})}function F(n){let i="desc";j.addEventListener("click",function(l){i==="desc"?(n.sort((s,t)=>new Date(t.price)-new Date(s.price)),i="asc"):(n.sort((s,t)=>new Date(s.price)-new Date(t.price)),i="desc"),q(n)})}function M(n){q(n),F(n),N(n)}let O=document.querySelector("#search"),U=document.querySelector("#submit");U.addEventListener("click",function(n){let i=O.value,l=`q=${i}`;p.get(`${h}rents?q=${i}`).then(function(s){let t=s.data;t.length>0?(g(l,r,f),w(t)):C()})});p.get("https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json").then(function(n){let s=n.data.map(function(e){return{name:e.name,districts:e.districts.map(function(x){return x.name})}}).filter(e=>e.name!=="釣魚臺"&&e.name!=="南海島");function t(e,x){const c=["臺北市","新北市","基隆市","桃園市","新竹市","新竹縣","臺中市","彰化縣","苗栗縣","南投縣","雲林縣","高雄市","臺南市","嘉義市","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];return c.indexOf(e.name)-c.indexOf(x.name)}s.sort(t);let u=document.querySelectorAll(".countyCity"),y=document.querySelector(".btnTitle"),k=document.querySelector(".dropdownTitle"),$=document.querySelector(".districtList");document.querySelectorAll(".form-check-input"),u.forEach(function(e){e.addEventListener("change",function(x){document.querySelector("#disabled-events").classList.remove("disabled-events");let c=Array.from(u).indexOf(e),d=s[c],L=`${d.name}`,P=`${d.name}`,_="";d.districts.forEach(function(T,S){_+=` 
                                        <li class="pb-2">
                                            <div class="form-check-inline cursor">
                                                <input class="form-check-input cursor districtCheckbox" type="checkbox" id="district${S}" value="${d.name}">
                                                <label class="form-check-label cursor districtLabelText" for="district${S}">${T}</label>
                                            </div>
                                        </li>
                                        `}),y.textContent=L,k.textContent=P,$.innerHTML=_,document.querySelectorAll(".form-check-input")})});let m=document.querySelector("#row"),a="",b="";m.addEventListener("change",function(e){const c=document.querySelector(`label[for='${e.target.id}']`).textContent.trim();e.target.checked?(e.target.type==="radio"&&e.target.classList.contains("cityRadio")?a=`address_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?a+=`&district_like=${c}`:e.target.type==="radio"&&e.target.classList.contains("priceRadio")?b=`&${e.target.dataset.price}`:e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")?a+=`&type=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("lifeEquipmentCheckbox")?a+=`&lifeEquipment_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("equipmentCheckbox")?a+=`&equipment_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("identityCheckbox")?a+=`&identity_like=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("genderCheckbox")?a+=`&gender=${c}`:e.target.type==="checkbox"&&e.target.classList.contains("canPetCookCheckbox")&&(c=="可開伙"?a+=`&canCooking=${!0}`:a+=`&canPet=${!0}`),o=a+b,p.get(`${h}rents?${o}`).then(function(d){if(d.data.length>0){let L=d.data;g(o,r,f),w(L)}else C()})):(e.target.type==="radio"&&e.target.classList.contains("cityRadio")?a=a.replace(`address_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?a=a.replace(`&district_like=${c}`,""):e.target.type==="radio"&&e.target.classList.contains("priceRadio")?b=a.replace(`&${e.target.dataset.price}`,""):e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")?a=a.replace(`&type=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("lifeEquipmentCheckbox")?a=a.replace(`&lifeEquipment_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("equipmentCheckbox")?a=a.replace(`&equipment_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("identityCheckbox")?a=a.replace(`&identity_like=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("genderCheckbox")?a=a.replace(`&gender=${c}`,""):e.target.type==="checkbox"&&e.target.classList.contains("canPetCookCheckbox")&&(c=="可開伙"?a=a.replace(`&canCooking=${!0}`,""):a=a.replace(`&canPet=${!0}`,"")),o=a+b,p.get(`${h}rents?${o}`).then(function(d){if(d.data.length>0){let L=d.data;g(o,r,f),w(L)}else C()}))})});let H=document.querySelector("#close");H.addEventListener("click",function(n){location.reload()});
