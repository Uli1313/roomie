import{a as d}from"./bootstrap.min-0d2201fe.js";import{S as A}from"./sweetalert2.all-42322153.js";const H="https://roomie-lfta.onrender.com",O=localStorage.getItem("userId"),z=localStorage.getItem("token"),V={headers:{Authorization:`Bearer ${z}`}};let R;const U=document.querySelectorAll(".nav-logged"),N=document.querySelectorAll(".nav-unlogged"),Y=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const s=`/600/users/${O}`,a=`${H}${s}`,c=await d.get(a,V),i=c.data.photo;Y.forEach(o=>o.setAttribute("src",i)),R=c.data,J(),U.forEach(o=>{o.classList.remove("d-none")}),N.forEach(o=>{o.classList.add("d-none")}),console.log("已登入")}catch(s){console.log(s),U.forEach(a=>{a.classList.add("d-none")}),N.forEach(a=>{a.classList.remove("d-none")}),console.log("未登入")}})();function J(){localStorage.setItem("user",JSON.stringify(R))}const f="https://roomie-lfta.onrender.com/";let t="",g=[];function W(s){let a=document.querySelector("#list"),c="";s.forEach(function(i){let o=i.canPet?"可養寵物":"不可養寵物",b=i.canCooking?"可開伙":"不可開伙",p="";i.traffic.forEach(function(x){p+=`<span class="me-3 px-1 bg-primary-200">近${x}</span>`}),c+=`<div class="row p-1 my-4 rounded hover-primary-2 ">
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
                                ${p}</li>
                            <li class="pb-2 h2 text-danger text-end">${i.price.toLocaleString("zh-TW")}元/月</li>
                            <li class="d-flex justify-content-between">更新日期:${i.updateDate} 
                                <div>
                                    <span class="material-symbols-outlined transform-y-25">visibility</span>
                                    <span class="ps-2">${i.view}</span>
                                </div></li>
                        </ul>
                    </div>
                </div>`}),a.innerHTML=c,ie(),ne()}function w(){let s=document.querySelector("#list"),a=`
                <div class="row rounded">
                    <div class="col bg-white rounded m-5 p-5 d-flex flex-column justify-content-center align-items-center ">
                        <p>¯_(ツ)_/¯</p>
                        <p class="p-2 h5">對不起，沒有找到適合您的物件！</p>
                        <p>建議您：重新篩選或搜尋試試看唷～</p>
                    </div>
                </div>`;s.innerHTML=a}function G(){t="_sort=view&_order=desc&status=刊登中",d.get(`${f}rents?${t}`).then(function(s){g=s.data,$(t,r,h),m(g)})}G();let K=document.querySelector("#filterDate"),Q=document.querySelector("#filterPrice"),y="&_sort=updateDate&_order=asc",_="&_sort=updateDate&_order=desc",k="&_sort=price&_order=asc",S="&_sort=price&_order=desc",E="_sort=view&_order=desc";function X(){K.addEventListener("click",function(s){t.includes(y)?t=t.replace(y,_):t.includes(_)?t=t.replace(_,y):t.includes(k)?t=t.replace(k,y):t.includes(S)?t=t.replace(S,y):t.includes(E)?t=t.replace(E,y):t+=y,d.get(`${f}rents?${t}`).then(function(a){g=a.data,g.length>0?($(t,1,h),r=1,m(g)):(w(),r=1,m(g))})})}X();function Z(){Q.addEventListener("click",function(s){t.includes(k)?t=t.replace(k,S):t.includes(S)?t=t.replace(S,k):t.includes(y)?t=t.replace(y,k):t.includes(_)?t=t.replace(_,k):t.includes(E)?t=t.replace(E,k):t+=k,d.get(`${f}rents?${t}`).then(function(a){g=a.data,g.length>0?($(t,1,h),r=1,m(g)):(w(),r=1,m(g))})})}Z();let D,P,h=4,r=1,j=document.querySelector(".pagination");function $(s,a,c){d.get(`${f}rents?${s}&_page=${a}&_limit=${c}`).then(i=>{let o=i.data;W(o)})}function m(s){D=s.length,P=Math.ceil(D/h);let a="";if(D==0)a="";else{a+=`<li class="page-item">
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
        </li>`}j.innerHTML=a;const c=document.querySelectorAll(".page-link");c.forEach(i=>{(i.textContent.trim()==="chevron_left"||i.textContent.trim()==="navigate_next")&&i.blur()}),c[r].classList.add("active")}j.addEventListener("click",s=>{const a=document.querySelectorAll(".page-link");if(a.forEach(c=>{c.classList.remove("active")}),s.target.textContent.trim()==="chevron_left"){if(r===1){a[r].classList.add("active"),s.preventDefault();return}r>1&&(r--,a[r].classList.add("active"),$(t,r,h))}else if(s.target.textContent.trim()==="navigate_next"){if(r===P){a[r].classList.add("active"),s.preventDefault();return}r<P&&(r++,a[r].classList.add("active"),$(t,r,h))}else r=Number(s.target.textContent.trim()),a[r].classList.add("active"),$(t,r,h)});let ee=document.querySelector("#search"),te=document.querySelector("#submit");te.addEventListener("click",function(s){let c=`q=${ee.value}&status=刊登中`;d.get(`${f}rents?${c}`).then(function(i){let o=i.data;o.length>0?($(c,r,h),m(o)):w()})});d.get("https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json").then(function(s){let a=s.data,i=a.map(function(e){return{name:e.name,districts:e.districts.map(function(v){return v.name})}}).filter(e=>e.name!=="釣魚臺"&&e.name!=="南海島");function o(e,v){const l=["臺北市","新北市","基隆市","桃園市","新竹市","新竹縣","臺中市","彰化縣","苗栗縣","南投縣","雲林縣","高雄市","臺南市","嘉義市","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];return l.indexOf(e.name)-l.indexOf(v.name)}i.sort(o);let b=document.querySelectorAll(".countyCity"),p=document.querySelector(".btnTitle"),L=document.querySelector(".dropdownTitle"),x=document.querySelector(".districtList");document.querySelectorAll(".form-check-input"),b.forEach(function(e){e.addEventListener("change",function(v){document.querySelector("#disabled-events").classList.remove("disabled-events");let l=Array.from(b).indexOf(e),u=i[l],B=`${u.name}`,F=`${u.name}`,I="";u.districts.forEach(function(M,T){I+=` 
                                        <li class="pb-2">
                                            <div class="form-check-inline cursor">
                                                <input class="form-check-input cursor districtCheckbox" type="checkbox" id="district${T}" value="${u.name}">
                                                <label class="form-check-label cursor districtLabelText" for="district${T}">${M}</label>
                                            </div>
                                        </li>
                                        `}),p.textContent=B,L.textContent=F,x.innerHTML=I,document.querySelectorAll(".form-check-input")})});let C=document.querySelector("#row"),n="",q="";C.addEventListener("change",function(e){const l=document.querySelector(`label[for='${e.target.id}']`).textContent.trim();e.target.checked?(e.target.type==="radio"&&e.target.classList.contains("cityRadio")?n=`address_like=${l}`:e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?n+=`&district_like=${l}`:e.target.type==="radio"&&e.target.classList.contains("priceRadio")?q=`&${e.target.dataset.price}&_sort=price&_order=desc`:e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")?n+=`&type=${l}`:e.target.type==="checkbox"&&e.target.classList.contains("lifeEquipmentCheckbox")?n+=`&lifeEquipment_like=${l}`:e.target.type==="checkbox"&&e.target.classList.contains("equipmentCheckbox")?n+=`&equipment_like=${l}`:e.target.type==="checkbox"&&e.target.classList.contains("identityCheckbox")?n+=`&identity_like=${l}`:e.target.type==="checkbox"&&e.target.classList.contains("genderCheckbox")?n+=`&gender=${l}`:e.target.type==="checkbox"&&e.target.classList.contains("canPetCookCheckbox")&&(l=="可開伙"?n+=`&canCooking=${!0}`:n+=`&canPet=${!0}`),t=n+q+"&status=刊登中",d.get(`${f}rents?${t}`).then(function(u){u.data.length>0?(a=u.data,$(t,1,h),r=1,m(a)):(a=u.data,w(),r=1,m(a))})):(e.target.type==="radio"&&e.target.classList.contains("cityRadio")?n=n.replace(`address_like=${l}`,""):e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?n=n.replace(`&district_like=${l}`,""):e.target.type==="radio"&&e.target.classList.contains("priceRadio")?q=n.replace(`&${e.target.dataset.price}`,""):e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")?n=n.replace(`&type=${l}`,""):e.target.type==="checkbox"&&e.target.classList.contains("lifeEquipmentCheckbox")?n=n.replace(`&lifeEquipment_like=${l}`,""):e.target.type==="checkbox"&&e.target.classList.contains("equipmentCheckbox")?n=n.replace(`&equipment_like=${l}`,""):e.target.type==="checkbox"&&e.target.classList.contains("identityCheckbox")?n=n.replace(`&identity_like=${l}`,""):e.target.type==="checkbox"&&e.target.classList.contains("genderCheckbox")?n=n.replace(`&gender=${l}`,""):e.target.type==="checkbox"&&e.target.classList.contains("canPetCookCheckbox")&&(l=="可開伙"?n=n.replace(`&canCooking=${!0}`,""):n=n.replace(`&canPet=${!0}`,"")),t=n+q+"&status=刊登中",d.get(`${f}rents?${t}`).then(function(u){u.data.length>0?(a=u.data,$(t,1,h),r=1,m(a)):(a=u.data,w(),r=1,m(a))}))})});let ae=document.querySelector("#close");ae.addEventListener("click",function(s){location.reload()});function ie(){document.querySelectorAll(".link-title").forEach(a=>{a.addEventListener("click",function(c){c.preventDefault();const i=new URL(c.target.href),b=new URLSearchParams(i.search).get("id");d.get(`${f}rents/${b}`).then(function(p){const L=p.data;let x={view:parseInt(L.view)+1};d.patch(`${f}rents/${b}`,x).then(function(C){window.location.href=c.target.href}).catch(function(C){console.error(C)})}).catch(function(p){console.error(p)})})})}function ne(){document.querySelectorAll(".favorite").forEach(a=>{a.addEventListener("click",function(c){let i=parseInt(c.target.dataset.id),o=parseInt(localStorage.getItem("userId")),b={rentId:i,userId:o};o?d.get(`${f}users/${o}/favorites`).then(function(p){const L=p.data.find(x=>x.rentId===i);L&&A.fire({icon:"warning",title:"您已經有這則貼文",showConfirmButton:!1,timer:1500}),L===void 0&&d.post(`${f}favorites`,b).then(function(x){A.fire({icon:"success",title:"添加至您的收藏",showConfirmButton:!1,timer:1500})})}):A.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})})}
