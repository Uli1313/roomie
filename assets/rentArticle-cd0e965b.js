import{a as u,S as d}from"./bootstrap.min-b3783de9.js";import{a as b}from"./ignore-7fb80f8e.js";const q="https://roomie-lfta.onrender.com",I=localStorage.getItem("userId"),C=localStorage.getItem("token"),E={headers:{Authorization:`Bearer ${C}`}};let x;const v=document.querySelectorAll(".nav-logged"),$=document.querySelectorAll(".nav-unlogged"),A=document.querySelectorAll(".nav-logged-photo"),j=document.querySelector(".logout-btn");(async()=>{try{const t=`/600/users/${I}`,o=`${q}${t}`,n=await u.get(o,E),l=n.data.photo;A.forEach(r=>r.setAttribute("src",l)),x=n.data,_(),v.forEach(r=>{r.classList.remove("d-none")}),$.forEach(r=>{r.classList.add("d-none")})}catch(t){console.log(t),v.forEach(o=>{o.classList.add("d-none")}),$.forEach(o=>{o.classList.remove("d-none")})}})();function _(){localStorage.setItem("user",JSON.stringify(x))}j.addEventListener("click",B);function B(){d.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(t=>{t.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),d.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const p="https://roomie-lfta.onrender.com/";let i="";const M=new URL(window.location.href),f=M.searchParams.get("id");let T=document.querySelector(".current-page"),U=document.querySelector(".article-title"),k=document.querySelector(".article-photo"),H=document.querySelector(".article-price"),P=document.querySelector(".article-detail"),w=document.querySelector(".article-priceInclude"),z=document.querySelector(".article-equipment"),F=document.querySelector(".article-age"),R=document.querySelector(".article-identity"),N=document.querySelector(".article-trafficLifeEquipment"),D=document.querySelector(".article-otherdetail"),O=document.querySelector(".article-contact"),y=document.querySelector(".article-qas"),g=parseInt(localStorage.getItem("userId")),Y=document.querySelector(".message-btn"),h=document.querySelector(".message-area"),G=document.querySelector(".report");u.get(`${p}rents/${f}?_expand=user`).then(function(t){i=t.data,document.title=`${i.title}`,J(i),K(k),W(),Q(),V()});u.get(`${p}qas?rentId=${f}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(t){i=t.data,L(i)});function J(t){let o=t.traffic.concat(t.lifeEquipment),n=t.canPet?"可養寵物":"不可養寵物",l=t.canCooking?"可開伙":"不可開伙",r=t.user.contact.person[0]+t.user.contact.person[1],a=t.user.contact.phone,c=t.user.contact.line;T.textContent=`${t.title}`,U.textContent=`${t.title}`,k.innerHTML=`<div class="col-12 col-sm-6 pe-0 rounded">
                            <div class="overflow-hidden rounded border me-3 me-sm-0 shadow-sm">
                                <img src="${t.photo[0]}" class="img-fluid imgCursor rounded img-open" data-open="0" alt="house photo">
                            </div>    
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${t.photo[1]}" class="img-fluid imgCursor rounded img-open" data-open="1" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border shadow-sm"> 
                                <img src="${t.photo[2]}" class="img-fluid imgCursor rounded img-open" data-open="2" alt="house photo">
                            </div>   
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${t.photo[3]}" class="img-fluid imgCursor rounded img-open" data-open="3" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${t.photo[4]}" class="img-fluid imgCursor rounded img-open" data-open="4" alt="house photo">
                            </div>
                        </div>`,H.textContent=`${t.price.toLocaleString("zh-TW")}元/月`,P.innerHTML=`
                        <li><span class="h6 pe-2">地址:</span>${t.address} &nbsp;${t.district[0]}-${t.district[1]}</li>
                        <li><span class="h6 pe-2">格局:</span>${t.houseLayout}</li>
                        <li><span class="h6 pe-2">坪數:</span>${t["square Footage"]}坪</li>
                        <li><span class="h6 pe-2">樓層/總樓層:</span>${t.floor}F&nbsp;/&nbsp;${t.totalFloor}F</li>
                        <li><span class="h6 pe-2">房屋類型:</span>${t.type}</li>
                        <li><span class="h6 pe-2">需求人數:</span>${t.needPartner}人</li>
                        <li><span class="h6 pe-2">需求性別:</span>${t.gender}</li>
                        <li><span class="h6 pe-2">寵物:</span>${n}</li>
                        <li><span class="h6 pe-2">開伙:</span>${l}</li>
                        <li><span class="h6 pe-2">押金:</span>${t.deposit}</li>
                        <li><span class="h6 pe-2">最短租期:</span>${t.minPeriod}</li>
                        <li><span class="h6 pe-2">更新日期:</span>${t.updateDate}</li>
                        `,t.priceInclude.forEach((e,s)=>s==0?w.textContent+=`${e}`:w.textContent+=`、${e}`),t.equipment.forEach(e=>{let s="";e=="床"&&(s="single_bed"),e=="衣櫃"&&(s="dresser"),e=="沙發"&&(s="chair"),e=="桌子"&&(s="table_restaurant"),e=="椅子"&&(s="chair_alt"),e=="網路"&&(s="wifi"),e=="冰箱"&&(s="kitchen"),e=="電視"&&(s="tv"),e=="冷氣"&&(s="air"),e=="電梯"&&(s="elevator"),e=="洗衣機"&&(s="local_laundry_service"),e=="熱水器"&&(s="water_heater"),e=="天然瓦斯"&&(s="gas_meter"),e=="機車車位"&&(s="local_parking"),e=="汽車車位"&&(s="local_parking"),z.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${e}
                                </div>`}),F.innerHTML=`<span class="h6 pe-2 text-primary">適合年齡:</span>${t.minAge}&nbsp;~&nbsp;${t.maxAge}&nbsp;歲`,t.identity.forEach(e=>{let s="";e=="學生"&&(s="person"),e=="上班族"&&(s="person_apron"),e=="家庭"&&(s="groups"),R.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${e}
                                </div>`}),o.forEach(e=>{let s="";e.includes("火車站")&&(s="train"),e.includes("公車站")&&(s="directions_bus"),e.includes("捷運站")&&(s="directions_railway"),e.includes("學校")&&(s="school"),e.includes("百貨公司")&&(s="store"),e.includes("公園")&&(s="park"),e.includes("夜市")&&(s="storefront"),e.includes("醫療機構")&&(s="local_hospital"),N.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                                <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                                ${e}
                                            </div>`}),D.textContent=`${t.intro}`,O.innerHTML=`
                        <li class="d-flex align-items-center gap-2 h5">
                        <img class="nav-logged-photo object-fit-contain rounded-circle" src="${t.user.photo}" alt="user-photo">
                            <span>${r}</span></li>
                        <li class="my-2">電話: &nbsp;${a}</li>
                        <li>Line: &nbsp;${c}</li>
                        `}function L(t){t.forEach(o=>{o.userId==o.rent.userId?y.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <img class="nav-logged-photo object-fit-contain rounded-circle" src="${o.user.photo}" alt="user-photo">
                                    <span>${o.user.contact.person[0]+o.user.contact.person[1]}<span class="fs-7 border rounded bg-primary-200 mx-1">發文者</span>:</span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${o.content}</p>
                                    <p class="fs-7 fw-normal">日期:${o.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `:y.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <img class="nav-logged-photo object-fit-contain rounded-circle" src="${o.user.photo}" alt="user-photo">
                                    <span>${o.user.contact.person[0]+o.user.contact.person[1]} : </span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${o.content}</p>
                                    <p class="fs-7 fw-normal">日期:${o.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `}),g?h.setAttribute("placeholder","留言給發文者吧~"):h.setAttribute("placeholder","登入即可傳送訊息!")}function K(t){let o=document.querySelector(".img-modal"),n=document.querySelector(".img-main"),l=0;t.addEventListener("click",function(e){e.target.classList.contains("img-open")&&(l=parseInt(e.target.dataset.open),o.classList.remove("d-none"),o.classList.add("d-flex"),document.body.style.overflow="hidden",n.setAttribute("src",`${i.photo[l]}`))}),o.addEventListener("click",function(e){let s=e.target.classList.contains("img-fluid"),m=e.target.classList.contains("material-symbols-outlined");s||m||(o.classList.remove("d-flex"),o.classList.add("d-none"),document.body.style.overflow="auto")});let r=document.querySelector(".img-group"),a="";i.photo.forEach(function(e,s){a+=`
                <li class="col-2 col-xxl-1 cursor">           
                    <img 
                    class="img-fluid rounded" 
                    src="${e}" 
                    alt="租屋圖片"
                    data-id="${s}">
                </li>
            `,r.innerHTML=a}),r.addEventListener("click",function(e){e.target.dataset.id=="0"?(n.setAttribute("src",`${i.photo[0]}`),l=0):e.target.dataset.id=="1"?(n.setAttribute("src",`${i.photo[1]}`),l=1):e.target.dataset.id=="2"?(n.setAttribute("src",`${i.photo[2]}`),l=2):e.target.dataset.id=="3"?(n.setAttribute("src",`${i.photo[3]}`),l=3):e.target.dataset.id=="4"&&(n.setAttribute("src",`${i.photo[4]}`),l=4)}),document.querySelectorAll(".arrow").forEach(e=>{e.addEventListener("click",function(s){if(s.target.classList.contains("img-arrow-left")){if(l==0)return;l>0&&(l--,n.setAttribute("src",`${i.photo[l]}`))}if(s.target.classList.contains("img-arrow-right")){if(l==4)return;l<4&&(l++,n.setAttribute("src",`${i.photo[l]}`))}})})}function W(){let t=document.querySelector(".favorite"),o=document.querySelector("#heartIcon");t.setAttribute("data-id",f),o.setAttribute("data-id",f),t.addEventListener("click",function(n){let l=parseInt(n.target.dataset.id),r=parseInt(localStorage.getItem("userId")),a={rentId:l,userId:r};r?u.get(`${p}users/${r}/favorites`).then(function(c){const e=c.data.find(s=>s.rentId===l);e&&d.fire({icon:"warning",title:"您已經有這則貼文",showConfirmButton:!1,timer:1500}),e===void 0&&u.post(`${p}favorites`,a).then(function(s){d.fire({icon:"success",title:"添加至您的收藏",showConfirmButton:!1,timer:1500})})}):d.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})}function Q(){Y.addEventListener("click",t=>{const o=new Date,n=o.getFullYear(),l=String(o.getMonth()+1).padStart(2,"0"),r=String(o.getDate()).padStart(2,"0");if(g)if(h.value.length>0){let a={rentId:parseInt(f),userId:g,date:`${n}/${l}/${r}`,content:h.value};u.post(`${p}qas`,a).then(function(c){u.get(`${p}qas?rentId=${f}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(e){i=e.data,y.innerHTML="",d.fire({icon:"success",title:"已留言成功",showConfirmButton:!1,timer:1500}),h.value="",L(i)})})}else d.fire({icon:"warning",title:"文字欄位不能為空",showConfirmButton:!1,timer:1500});else d.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})}G.addEventListener("click",t=>{if(g){if(t.target.classList.contains("report")||t.target.classList.contains("warning")){d.fire({html:` <p class="my-3">此貼文違反了哪一項規範事項 ?</p>
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
                        `,showConfirmButton:!1});let o=document.querySelectorAll(".form-check-input"),n=document.querySelector(".least-one");document.querySelector(".report-btn").addEventListener("click",r=>{let a=!1;if(o.forEach(c=>{c.checked&&(a=!0)}),!a)n.classList.remove("d-none");else{let c=[],e={};o.forEach(s=>{if(s.checked){let m=document.querySelector(`label[for="${s.id}"]`);c.push(`第${s.dataset.id}條:${m.textContent.trim()}`),e={rentId:parseInt(f),userId:g,content:c}}}),u.post(`${p}reports`,e).then(function(s){d.fire({icon:"success",title:"已收到您的檢舉",showConfirmButton:!1,timer:1500})})}})}}else d.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})});function V(){let t=i.title;const n=`https://maps.googleapis.com/maps/api/geocode/json?address=${i.district[0]+i.district[1]}&key=${b}`,l=encodeURI(n);u.get(`${l}`).then(function(r){let a=r.data.results[0].geometry.location.lat,c=r.data.results[0].geometry.location.lng,e={lat:a,lng:c};function s(){const S=new google.maps.Map(document.getElementById("map"),{center:e,zoom:16});new google.maps.Marker({position:e,map:S,title:t})}var m=document.createElement("script");m.src=`https://maps.googleapis.com/maps/api/js?key=${b}&callback=initMap`,m.async=!0,window.initMap=s,document.head.appendChild(m)})}
