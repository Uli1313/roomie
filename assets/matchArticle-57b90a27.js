import{a as p}from"./bootstrap.min-0d2201fe.js";import{S as f}from"./sweetalert2.all-42322153.js";import{a as b}from"./ignore-7fb80f8e.js";const E="https://roomie-lfta.onrender.com",C=localStorage.getItem("userId"),A=localStorage.getItem("token"),j={headers:{Authorization:`Bearer ${A}`}};let L;const v=document.querySelectorAll(".nav-logged"),$=document.querySelectorAll(".nav-unlogged"),_=document.querySelectorAll(".nav-logged-photo");(async()=>{try{const e=`/600/users/${C}`,o=`${E}${e}`,c=await p.get(o,j),a=c.data.photo;_.forEach(n=>n.setAttribute("src",a)),L=c.data,M(),v.forEach(n=>{n.classList.remove("d-none")}),$.forEach(n=>{n.classList.add("d-none")}),console.log("已登入")}catch(e){console.log(e),v.forEach(o=>{o.classList.add("d-none")}),$.forEach(o=>{o.classList.remove("d-none")}),console.log("未登入")}})();function M(){localStorage.setItem("user",JSON.stringify(L))}const h="https://roomie-lfta.onrender.com/";let r="";const T=new URL(window.location.href),g=T.searchParams.get("id");let U=document.querySelector(".current-page"),H=document.querySelector(".article-title"),S=document.querySelector(".article-photo"),B=document.querySelector(".article-costday"),z=document.querySelector(".article-price"),D=document.querySelector(".article-detail"),x=document.querySelector(".article-priceInclude"),P=document.querySelector(".article-equipment"),R=document.querySelector(".article-age"),F=document.querySelector(".article-identity"),N=document.querySelector(".article-trafficLifeEquipment"),O=document.querySelector(".article-otherdetail"),Y=document.querySelector(".article-contact"),w=document.querySelector(".article-qas"),k=parseInt(localStorage.getItem("userId"));document.querySelector(".message-btn");document.querySelector(".message-area");let G=document.querySelector(".report");p.get(`${h}rents/${g}?_expand=user`).then(function(e){r=e.data,document.title=`${r.title}`,J(r),W(S),Q(),V()});p.get(`${h}qas?rentId=${g}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(e){r=e.data,K(r)});function J(e){let o=e.traffic.concat(e.lifeEquipment),c=e.canPet?"可養寵物":"不可養寵物",a=e.canCooking?"可開伙":"不可開伙",n=e.user.contact.person[0]+e.user.contact.person[1],d=e.user.contact.phone,m=e.user.contact.line;const l=`${e.updateDate}`,i=new Date(l),u=`${e.soldDate}`,y=new Date(u),q=i.getTime()-y.getTime(),I=Math.abs(Math.trunc(q/(1e3*3600*24)));U.textContent=`${e.title}`,H.textContent=`${e.title}`,S.innerHTML=`<div class="col-12 col-sm-6 pe-0 rounded">
                            <div class="overflow-hidden rounded border me-3 me-sm-0 shadow-sm">
                                <img src="${e.photo[0]}" class="img-fluid imgCursor rounded img-open" data-open="0" alt="house photo">
                            </div>    
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${e.photo[1]}" class="img-fluid imgCursor rounded img-open" data-open="1" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border shadow-sm"> 
                                <img src="${e.photo[2]}" class="img-fluid imgCursor rounded img-open" data-open="2" alt="house photo">
                            </div>   
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${e.photo[3]}" class="img-fluid imgCursor rounded img-open" data-open="3" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${e.photo[4]}" class="img-fluid imgCursor rounded img-open" data-open="4" alt="house photo">
                            </div>
                        </div>`,B.textContent=`${I}日 媒合成功`,z.textContent=`${e.price.toLocaleString("zh-TW")}元/月`,D.innerHTML=`
                        <li><span class="h6 pe-2">地址:</span>${e.address} &nbsp;${e.district[0]}-${e.district[1]}</li>
                        <li><span class="h6 pe-2">格局:</span>${e.houseLayout}</li>
                        <li><span class="h6 pe-2">坪數:</span>${e["square Footage"]}坪</li>
                        <li><span class="h6 pe-2">樓層/總樓層:</span>${e.floor}F&nbsp;/&nbsp;${e.totalFloor}F</li>
                        <li><span class="h6 pe-2">房屋類型:</span>${e.type}</li>
                        <li><span class="h6 pe-2">需求人數:</span>${e.needPartner}人</li>
                        <li><span class="h6 pe-2">需求性別:</span>${e.gender}</li>
                        <li><span class="h6 pe-2">寵物:</span>${c}</li>
                        <li><span class="h6 pe-2">開伙:</span>${a}</li>
                        <li><span class="h6 pe-2">押金:</span>${e.deposit}</li>
                        <li><span class="h6 pe-2">最短租期:</span>${e.minPeriod}</li>
                        <li><span class="h6 pe-2">更新日期:</span>${e.updateDate}</li>
                        `,e.priceInclude.forEach((t,s)=>s==0?x.textContent+=`${t}`:x.textContent+=`、${t}`),e.equipment.forEach(t=>{let s="";t=="床"&&(s="single_bed"),t=="衣櫃"&&(s="dresser"),t=="沙發"&&(s="chair"),t=="桌子"&&(s="table_restaurant"),t=="椅子"&&(s="chair_alt"),t=="網路"&&(s="wifi"),t=="冰箱"&&(s="kitchen"),t=="電視"&&(s="tv"),t=="冷氣"&&(s="air"),t=="電梯"&&(s="elevator"),t=="洗衣機"&&(s="local_laundry_service"),t=="熱水器"&&(s="water_heater"),t=="天然瓦斯"&&(s="gas_meter"),t=="機車車位"&&(s="local_parking"),t=="汽車車位"&&(s="local_parking"),P.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${t}
                                </div>`}),R.innerHTML=`<span class="h6 pe-2 text-primary">適合年齡:</span>${e.minAge}&nbsp;~&nbsp;${e.maxAge}&nbsp;歲`,e.identity.forEach(t=>{let s="";t=="學生"&&(s="person"),t=="上班族"&&(s="person_apron"),t=="家庭"&&(s="groups"),F.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${t}
                                </div>`}),o.forEach(t=>{let s="";t.includes("火車站")&&(s="train"),t.includes("公車站")&&(s="directions_bus"),t.includes("捷運站")&&(s="directions_railway"),t.includes("學校")&&(s="school"),t.includes("百貨公司")&&(s="store"),t.includes("公園")&&(s="park"),t.includes("夜市")&&(s="storefront"),t.includes("醫療機構")&&(s="local_hospital"),N.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                                <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                                ${t}
                                            </div>`}),O.textContent=`${e.intro}`,Y.innerHTML=`
                        <li class="d-flex align-items-center gap-2 h5">
                            <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                            <span>${n}</span></li>
                        <li class="my-2">電話: &nbsp;${d}</li>
                        <li>Line: &nbsp;${m}</li>
                        `}function K(e){e.forEach(o=>{o.userId==o.rent.userId?w.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                                    <span>${o.user.contact.person[0]+o.user.contact.person[1]}<span class="fs-7 border rounded bg-primary-200 mx-1">發文者</span>:</span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${o.content}</p>
                                    <p class="fs-7 fw-normal">日期:${o.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `:w.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                                    <span>${o.user.contact.person[0]+o.user.contact.person[1]} : </span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${o.content}</p>
                                    <p class="fs-7 fw-normal">日期:${o.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `})}function W(e){let o=document.querySelector(".img-modal"),c=document.querySelector(".img-main"),a=0;e.addEventListener("click",function(l){l.target.classList.contains("img-open")&&(a=parseInt(l.target.dataset.open),o.classList.remove("d-none"),o.classList.add("d-flex"),document.body.style.overflow="hidden",c.setAttribute("src",`${r.photo[a]}`))}),o.addEventListener("click",function(l){let i=l.target.classList.contains("img-fluid"),u=l.target.classList.contains("material-symbols-outlined");i||u||(o.classList.remove("d-flex"),o.classList.add("d-none"),document.body.style.overflow="auto")});let n=document.querySelector(".img-group"),d="";r.photo.forEach(function(l,i){d+=`
                <li class="col-2 col-xxl-1 cursor">           
                    <img 
                    class="img-fluid rounded" 
                    src="${l}" 
                    alt="租屋圖片"
                    data-id="${i}">
                </li>
            `,n.innerHTML=d}),n.addEventListener("click",function(l){l.target.dataset.id=="0"?(c.setAttribute("src",`${r.photo[0]}`),a=0):l.target.dataset.id=="1"?(c.setAttribute("src",`${r.photo[1]}`),a=1):l.target.dataset.id=="2"?(c.setAttribute("src",`${r.photo[2]}`),a=2):l.target.dataset.id=="3"?(c.setAttribute("src",`${r.photo[3]}`),a=3):l.target.dataset.id=="4"&&(c.setAttribute("src",`${r.photo[4]}`),a=4)}),document.querySelectorAll(".arrow").forEach(l=>{l.addEventListener("click",function(i){if(i.target.classList.contains("img-arrow-left")){if(a==0)return;a>0&&(a--,c.setAttribute("src",`${r.photo[a]}`))}if(i.target.classList.contains("img-arrow-right")){if(a==4)return;a<4&&(a++,c.setAttribute("src",`${r.photo[a]}`))}})})}function Q(){let e=document.querySelector(".favorite"),o=document.querySelector("#heartIcon");e.setAttribute("data-id",g),o.setAttribute("data-id",g),e.addEventListener("click",function(c){let a=parseInt(c.target.dataset.id),n=parseInt(localStorage.getItem("userId")),d={rentId:a,userId:n};n?p.get(`${h}users/${n}/favorites`).then(function(m){const l=m.data.find(i=>i.rentId===a);l&&f.fire({icon:"warning",title:"您已經有這則貼文",showConfirmButton:!1,timer:1500}),l===void 0&&p.post(`${h}favorites`,d).then(function(i){f.fire({icon:"success",title:"添加至您的收藏",showConfirmButton:!1,timer:1500})})}):f.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})}G.addEventListener("click",e=>{if(k){if(e.target.classList.contains("report")||e.target.classList.contains("warning")){f.fire({html:` <p class="my-3">此貼文違反了哪一項規範事項 ?</p>
                        <div class="border rounded py-2 px-3">
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report1" data-id="1">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第一條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report1">
                                        禁止惡意洗板、重複張貼。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report2" data-id="2">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第二條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report2">
                                        禁止包含廣告、商業宣傳之內容。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report3" data-id="3">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第三條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report3">
                                        內容不得空泛或明顯無意義內容。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report4" data-id="4">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第四條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report4">
                                        禁止中傷、歧視、挑釁或謾罵他人。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report5" data-id="5">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第五條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report5">
                                        禁止包含色情、露點、性騷擾、暴力或血腥恐怖等讓人不舒服之內容。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report6" data-id="6">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第六條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report6">
                                        禁止在平台上分享他人的個人資訊,但不限於地址、電話號碼、電子郵件地址等。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report7" data-id="7">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第七條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report7">
                                        禁止在平台上引發政治、宗教或種族爭議的內容,並尊重其他用戶的信仰和立場。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report8" data-id="8">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第八條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report8">
                                        禁止在平台上分享未經授權的版權材料,包括圖片、影片、音樂等,請確保發布的內容符合版權法規。
                                    </label>
                                </div>
                            </div>
                            <div class="form-check text-start d-flex justify-content-start mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="report9" data-id="9">
                                <div class="col-2 col-sm-1 ms-2 me-3" style="white-space: nowrap;">
                                    第九條 : 
                                </div>
                                <div class="col-10 col-sm-11 ps-4 text-justify">
                                    <label class="form-check-label d-inline" for="report9">
                                        用戶應該確保自己的帳戶安全,不分享帳號密碼,並確保其帳戶內容符合平台規範。如果用戶的帳號被濫用,平台可能會採取相應的措施。
                                    </label>
                                </div>
                            </div>
                        </div>
                        <p class="mt-2 text-danger least-one d-none">*至少選擇一個欄位</p>
                        <input class="btn btn-primary mt-3 report-btn" type="submit" value="送出">
                        `,showConfirmButton:!1});let o=document.querySelectorAll(".form-check-input"),c=document.querySelector(".least-one");document.querySelector(".report-btn").addEventListener("click",n=>{let d=!1;if(o.forEach(m=>{m.checked&&(d=!0)}),!d)c.classList.remove("d-none");else{let m=[],l={};o.forEach(i=>{if(i.checked){let u=document.querySelector(`label[for="${i.id}"]`);m.push(`第${i.dataset.id}條:${u.textContent.trim()}`),l={rentId:parseInt(g),userId:k,content:m}}}),p.post(`${h}reports`,l).then(function(i){f.fire({icon:"success",title:"已收到您的檢舉",showConfirmButton:!1,timer:1500})})}})}}else f.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})});function V(){let e=r.title;const c=`https://maps.googleapis.com/maps/api/geocode/json?address=${r.district[0]+r.district[1]}&key=${b}`,a=encodeURI(c);p.get(`${a}`).then(function(n){let d=n.data.results[0].geometry.location.lat,m=n.data.results[0].geometry.location.lng,l={lat:d,lng:m};function i(){const y=new google.maps.Map(document.getElementById("map"),{center:l,zoom:16});new google.maps.Marker({position:l,map:y,title:e})}var u=document.createElement("script");u.src=`https://maps.googleapis.com/maps/api/js?key=${b}&callback=initMap`,u.async=!0,window.initMap=i,document.head.appendChild(u)})}
