import"./bootstrap.min-78670b47.js";import{a as d}from"./axios-28bc18a3.js";d.get("http://localhost:3000/rents?_sort=view&_order=desc").then(function(s){let a=s.data;f(a),q(a),D(a)});function f(s){let a=document.querySelector("#list"),o="";s.forEach(function(t){let r=t.canPet?"可養寵物":"不可養寵物",p=t.canCooking?"可開伙":"不可開伙",m="";t.traffic.forEach(function(h){m+=`<span class="me-3 px-1 bg-primary-200">近${h}</span>`}),o+=`<div class="row p-1 my-4 rounded hover-primary-2">
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
                                <a href="rentArticle.html" class="h3 link-dark">${t.title}</a> 
                                <button class="p-3 link-dark hover-primary border-0 rounded-3">
                                    <span class="material-symbols-outlined">heart_plus</span>
                                </button></li>
                            <li class="pb-3">${t.houseLayout} | ${t["square Footage"]}坪${t.floor}F/${t.totalFloor}F </li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-2 transform-y-25">location_on</span>
                                ${t.address[0]}${t.address[1]}-${t.address[2]}</li>
                            <li class="pb-3">
                                <span class="material-symbols-outlined pe-1 transform-y-25">person</span>
                                <span class="me-3 px-1 bg-primary-200">${t.gender}</span>
                                <span class="me-3 px-1 bg-primary-200">${r}</span>
                                <span class="me-3 px-1 bg-primary-200">${p}</span></li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-1 transform-y-25">map</span>
                                ${m}</li>
                            <li class="pb-2 h2 text-secondary text-end">${t.price}元/月</li>
                            <li class="d-flex justify-content-between">更新日期:${t.updateDate} 
                                <div>
                                    <span class="material-symbols-outlined transform-y-25">visibility</span>
                                    <span class="ps-2">${t.view}</span>
                                </div></li>
                        </ul>
                    </div>
                </div>`}),a.innerHTML=o}function v(){let s=document.querySelector("#list"),a=`
                <div class="row p-1 my-4 rounded">
                    <div class="col bg-white rounded p-7 d-flex flex-column justify-content-center align-items-center">
                        <p>¯_(ツ)_/¯</p>
                        <p class="p-2 h5">對不起，沒有找到適合您的物件！</p>
                        <p>建議您：重新輸入"關鍵字"搜尋試試看唷～</p>
                    </div>
                </div>`;s.innerHTML=a}let C=document.querySelector("#filterDate"),E=document.querySelector("#filterPrice");function q(s){let a="desc";C.addEventListener("click",function(o){a==="desc"?(s.sort((t,r)=>new Date(r.updateDate)-new Date(t.updateDate)),a="asc"):(s.sort((t,r)=>new Date(t.updateDate)-new Date(r.updateDate)),a="desc"),f(s)})}function D(s){let a="desc";E.addEventListener("click",function(o){a==="desc"?(s.sort((t,r)=>new Date(r.price)-new Date(t.price)),a="asc"):(s.sort((t,r)=>new Date(t.price)-new Date(r.price)),a="desc"),f(s)})}let T=document.querySelector("#search"),A=document.querySelector("#submit");A.addEventListener("click",function(s){let a=T.value;d.get(`http://localhost:3000/rents?q=${a}`).then(function(o){let t=o.data;t.length>0?(f(t),q(t),D(t)):v()})});d.get("https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json").then(function(s){let t=s.data.map(function(e){return{name:e.name,districts:e.districts.map(function(i){return i.name})}}).filter(e=>e.name!=="釣魚臺"&&e.name!=="南海島");function r(e,i){const l=["臺北市","新北市","基隆市","桃園市","新竹市","新竹縣","臺中市","彰化縣","苗栗縣","南投縣","雲林縣","高雄市","臺南市","嘉義市","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];return l.indexOf(e.name)-l.indexOf(i.name)}t.sort(r);let p=document.querySelectorAll(".countyCity"),m=document.querySelector(".btnTitle"),b=document.querySelector(".dropdownTitle"),h=document.querySelector(".districtList");p.forEach(function(e){e.addEventListener("change",function(i){if(i.target.checked){document.querySelector("#disabled-events").classList.remove("disabled-events");let l=Array.from(p).indexOf(e),n=t[l],u=`${n.name}`,c=`${n.name}`,w="";n.districts.forEach(function(S,k){w+=` 
                                        <li class="pb-2">
                                            <div class="form-check-inline cursor">
                                                <input class="form-check-input cursor districtCheckbox" type="checkbox" id="district${k}" value="${n.name}">
                                                <label class="form-check-label cursor districtLabelText" for="district${k}">${S}</label>
                                            </div>
                                        </li>
                                        `}),m.textContent=u,b.textContent=c,h.innerHTML=w}})});let L=document.querySelector("#row");document.querySelectorAll(".cityRadio"),document.querySelectorAll(".districtCheckbox"),document.querySelectorAll(".priceRadio"),document.querySelectorAll(".houseCheckbox"),document.querySelectorAll(".otherCheckbox");let y="",g="",x=[],$=[];L.addEventListener("change",function(e){if(e.target.checked){const l=document.querySelector(`label[for='${e.target.id}']`).textContent.trim();e.target.type==="radio"&&e.target.classList.contains("cityRadio")?d.get(`http://localhost:3000/rents?q=${l}`).then(function(n){x=n.data,y=l,console.log(x)}):e.target.type==="checkbox"&&e.target.classList.contains("districtCheckbox")?d.get(`http://localhost:3000/rents?q=${l}`).then(function(n){let u=n.data.filter(c=>c.address[0]===e.target.value);$.push(u),g=l,console.log($.flat())}):e.target.type==="radio"&&e.target.classList.contains("priceRadio")?d.get(`http://localhost:3000/rents?${e.target.dataset.price}`).then(function(n){if(y=="")console.log(n.data);else{let u=n.data.filter(c=>c.address[0]==y&&c.address[1]==g);console.log(u)}}):e.target.type==="checkbox"&&e.target.classList.contains("houseCheckbox")}})});
