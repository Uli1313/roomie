import{a as d,S as c}from"./bootstrap.min-acd3fe77.js";import{a as v}from"./ignore-7fb80f8e.js";const q="https://roomie-lfta.onrender.com",I=localStorage.getItem("userId"),C=localStorage.getItem("token"),E={headers:{Authorization:`Bearer ${C}`}};let k;const $=document.querySelectorAll(".nav-logged"),w=document.querySelectorAll(".nav-unlogged"),A=document.querySelectorAll(".nav-logged-photo"),j=document.querySelector(".logout-btn");(async()=>{try{const e=`/600/users/${I}`,o=`${q}${e}`,n=await d.get(o,E),l=n.data.photo;A.forEach(i=>i.setAttribute("src",l)),k=n.data,_(),$.forEach(i=>{i.classList.remove("d-none")}),w.forEach(i=>{i.classList.add("d-none")})}catch(e){console.log(e),$.forEach(o=>{o.classList.add("d-none")}),w.forEach(o=>{o.classList.remove("d-none")})}})();function _(){localStorage.setItem("user",JSON.stringify(k))}j.addEventListener("click",B);function B(){c.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(e=>{e.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),c.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const u="https://roomie-lfta.onrender.com/",M=new URL(window.location.href),m=M.searchParams.get("id");let T=document.querySelector(".current-page"),U=document.querySelector(".article-title"),L=document.querySelector(".article-photo"),H=document.querySelector(".article-price"),z=document.querySelector(".article-detail"),x=document.querySelector(".article-priceInclude"),P=document.querySelector(".article-equipment"),F=document.querySelector(".article-age"),R=document.querySelector(".article-identity"),N=document.querySelector(".article-trafficLifeEquipment"),D=document.querySelector(".article-otherdetail"),O=document.querySelector(".article-contact"),y=document.querySelector(".article-qas"),h=parseInt(localStorage.getItem("userId")),Y=document.querySelector(".message-btn"),p=document.querySelector(".message-area"),G=document.querySelector(".report");d.get(`${u}rents/${m}?_expand=user`).then(function(e){let o=e.data;document.title=`${o.title}`,J(o),K(o),W(),Q(),V(o)});d.get(`${u}qas?rentId=${m}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(e){let o=e.data;b(o)});function J(e){let o=e.traffic.concat(e.lifeEquipment),n=e.canPet?"可養寵物":"不可養寵物",l=e.canCooking?"可開伙":"不可開伙",i=e.user.nickname,r=e.user.contact.phone,a=e.user.contact.line;T.textContent=`${e.title}`,U.textContent=`${e.title}`,L.innerHTML=`<div class="col-12 col-sm-6 pe-0 rounded">
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
                        </div>`,H.textContent=`${e.price.toLocaleString("zh-TW")}元/月`,z.innerHTML=`
                        <li><span class="h6 pe-2">地址:</span>${e.address} &nbsp;${e.district[0]}-${e.district[1]}</li>
                        <li><span class="h6 pe-2">格局:</span>${e.houseLayout}</li>
                        <li><span class="h6 pe-2">坪數:</span>${e["square Footage"]}坪</li>
                        <li><span class="h6 pe-2">樓層/總樓層:</span>${e.floor}F&nbsp;/&nbsp;${e.totalFloor}F</li>
                        <li><span class="h6 pe-2">房屋類型:</span>${e.type}</li>
                        <li><span class="h6 pe-2">需求人數:</span>${e.needPartner}人</li>
                        <li><span class="h6 pe-2">需求性別:</span>${e.gender}</li>
                        <li><span class="h6 pe-2">寵物:</span>${n}</li>
                        <li><span class="h6 pe-2">開伙:</span>${l}</li>
                        <li><span class="h6 pe-2">押金:</span>${e.deposit}</li>
                        <li><span class="h6 pe-2">最短租期:</span>${e.minPeriod}</li>
                        <li><span class="h6 pe-2">更新日期:</span>${e.updateDate}</li>
                        `,e.priceInclude.forEach((t,s)=>s==0?x.textContent+=`${t}`:x.textContent+=`、${t}`),e.equipment.forEach(t=>{let s="";t=="床"&&(s="single_bed"),t=="衣櫃"&&(s="dresser"),t=="沙發"&&(s="chair"),t=="桌子"&&(s="table_restaurant"),t=="椅子"&&(s="chair_alt"),t=="網路"&&(s="wifi"),t=="冰箱"&&(s="kitchen"),t=="電視"&&(s="tv"),t=="冷氣"&&(s="air"),t=="電梯"&&(s="elevator"),t=="洗衣機"&&(s="local_laundry_service"),t=="熱水器"&&(s="water_heater"),t=="天然瓦斯"&&(s="gas_meter"),t=="機車車位"&&(s="local_parking"),t=="汽車車位"&&(s="local_parking"),P.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${t}
                                </div>`}),F.innerHTML=`<span class="h6 pe-2 text-primary">適合年齡:</span>${e.minAge}&nbsp;~&nbsp;${e.maxAge}&nbsp;歲`,e.identity.forEach(t=>{let s="";t=="學生"&&(s="person"),t=="上班族"&&(s="person_apron"),t=="家庭"&&(s="groups"),R.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${t}
                                </div>`}),o.forEach(t=>{let s="";t.includes("火車站")&&(s="train"),t.includes("公車站")&&(s="directions_bus"),t.includes("捷運站")&&(s="directions_railway"),t.includes("學校")&&(s="school"),t.includes("百貨公司")&&(s="store"),t.includes("公園")&&(s="park"),t.includes("夜市")&&(s="storefront"),t.includes("醫療機構")&&(s="local_hospital"),N.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                                <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                                ${t}
                                            </div>`}),D.textContent=`${e.intro}`,O.innerHTML=`
                        <li class="d-flex align-items-center gap-2 h5">
                        <img class="photo-size object-fit-contain rounded-circle" src="${e.user.photo}" alt="user-photo">
                            <span>${i}</span></li>
                        <li class="my-2">電話: &nbsp;${r}</li>
                        <li>Line: &nbsp;${a}</li>
                        `}function b(e){e.forEach(o=>{o.userId==o.rent.userId?y.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <img class="photo-size object-fit-contain rounded-circle" src="${o.user.photo}" alt="user-photo">
                                    <span>${o.user.nickname}<span class="fs-7 border rounded bg-primary-200 mx-1">發文者</span>:</span>
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
                                    <img class="photo-size object-fit-contain rounded-circle" src="${o.user.photo}" alt="user-photo">
                                    <span>${o.user.nickname} : </span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${o.content}</p>
                                    <p class="fs-7 fw-normal">日期:${o.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `}),h?p.setAttribute("placeholder","留言給發文者吧~"):p.setAttribute("placeholder","登入即可傳送訊息!")}function K(e){let o=document.querySelector(".img-modal"),n=document.querySelector(".img-main"),l=0;L.addEventListener("click",function(t){t.target.classList.contains("img-open")&&(l=t.target.dataset.open,o.classList.remove("d-none"),o.classList.add("d-flex"),document.body.style.overflow="hidden",n.setAttribute("src",`${e.photo[l]}`))}),o.addEventListener("click",function(t){let s=t.target.classList.contains("img-fluid"),f=t.target.classList.contains("material-symbols-outlined");s||f||(o.classList.remove("d-flex"),o.classList.add("d-none"),document.body.style.overflow="auto")});let i=document.querySelector(".img-group"),r="";e.photo.forEach(function(t,s){r+=`
                <li class="col-2 col-xxl-1 cursor">           
                    <img 
                    class="img-fluid rounded" 
                    src="${t}" 
                    alt="租屋圖片"
                    data-id="${s}">
                </li>
            `,i.innerHTML=r}),i.addEventListener("click",function(t){t.target.dataset.id=="0"?(n.setAttribute("src",`${e.photo[0]}`),l=0):t.target.dataset.id=="1"?(n.setAttribute("src",`${e.photo[1]}`),l=1):t.target.dataset.id=="2"?(n.setAttribute("src",`${e.photo[2]}`),l=2):t.target.dataset.id=="3"?(n.setAttribute("src",`${e.photo[3]}`),l=3):t.target.dataset.id=="4"&&(n.setAttribute("src",`${e.photo[4]}`),l=4)}),document.querySelectorAll(".arrow").forEach(t=>{t.addEventListener("click",function(s){if(s.target.classList.contains("img-arrow-left")){if(l==0)return;l>0&&(l--,n.setAttribute("src",`${e.photo[l]}`))}if(s.target.classList.contains("img-arrow-right")){if(l==4)return;l<4&&(l++,n.setAttribute("src",`${e.photo[l]}`))}})})}function W(){let e=document.querySelector(".favorite"),o=document.querySelector("#heartIcon");e.setAttribute("data-id",m),o.setAttribute("data-id",m),e.addEventListener("click",function(n){let l=parseInt(n.target.dataset.id),i=parseInt(localStorage.getItem("userId")),r={rentId:l,userId:i};i?d.get(`${u}users/${i}/favorites`).then(function(a){const t=a.data.find(s=>s.rentId===l);t&&c.fire({icon:"warning",title:"您已經有這則貼文",showConfirmButton:!1,timer:1500}),t===void 0&&d.post(`${u}favorites`,r).then(function(s){c.fire({icon:"success",title:"添加至您的收藏",showConfirmButton:!1,timer:1500})})}):c.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})}function Q(){Y.addEventListener("click",e=>{const o=new Date,n=o.getFullYear(),l=String(o.getMonth()+1).padStart(2,"0"),i=String(o.getDate()).padStart(2,"0");if(h)if(p.value.length>0){let r={rentId:parseInt(m),userId:h,date:`${n}/${l}/${i}`,content:p.value};d.post(`${u}qas`,r).then(function(a){d.get(`${u}qas?rentId=${m}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(t){let s=t.data;y.innerHTML="",c.fire({icon:"success",title:"已留言成功",showConfirmButton:!1,timer:1500}),p.value="",b(s)})})}else c.fire({icon:"warning",title:"文字欄位不能為空",showConfirmButton:!1,timer:1500});else c.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500}),p.value="",b(api)})}G.addEventListener("click",e=>{if(h){if(e.target.classList.contains("report")||e.target.classList.contains("warning")){c.fire({html:` <p class="my-3">此貼文違反了哪一項規範事項 ?</p>
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
                        `,showConfirmButton:!1});let o=document.querySelectorAll(".form-check-input"),n=document.querySelector(".least-one");document.querySelector(".report-btn").addEventListener("click",i=>{let r=!1;if(o.forEach(a=>{a.checked&&(r=!0)}),!r)n.classList.remove("d-none");else{let a=[],t={};o.forEach(s=>{if(s.checked){let f=document.querySelector(`label[for="${s.id}"]`);a.push(`第${s.dataset.id}條:${f.textContent.trim()}`),t={rentId:parseInt(m),userId:h,content:a}}}),d.post(`${u}reports`,t).then(function(s){c.fire({icon:"success",title:"已收到您的檢舉",showConfirmButton:!1,timer:1500})})}})}}else c.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})});function V(e){let o=e.title;const l=`https://maps.googleapis.com/maps/api/geocode/json?address=${e.district[0]+e.district[1]}&key=${v}`,i=encodeURI(l);d.get(`${i}`).then(function(r){let a=r.data.results[0].geometry.location.lat,t=r.data.results[0].geometry.location.lng,s={lat:a,lng:t};function f(){const S=new google.maps.Map(document.getElementById("map"),{center:s,zoom:16});new google.maps.Marker({position:s,map:S,title:o})}var g=document.createElement("script");g.src=`https://maps.googleapis.com/maps/api/js?key=${v}&callback=initMap`,g.async=!0,window.initMap=f,document.head.appendChild(g)})}
