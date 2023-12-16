import{a as p,S as m}from"./bootstrap.min-acd3fe77.js";import{a as b}from"./ignore-7fb80f8e.js";const I="https://roomie-lfta.onrender.com",C=localStorage.getItem("userId"),E=localStorage.getItem("token"),j={headers:{Authorization:`Bearer ${E}`}};let L;const v=document.querySelectorAll(".nav-logged"),$=document.querySelectorAll(".nav-unlogged"),A=document.querySelectorAll(".nav-logged-photo"),M=document.querySelector(".logout-btn");(async()=>{try{const e=`/600/users/${C}`,t=`${I}${e}`,n=await p.get(t,j),l=n.data.photo;A.forEach(r=>r.setAttribute("src",l)),L=n.data,T(),v.forEach(r=>{r.classList.remove("d-none")}),$.forEach(r=>{r.classList.add("d-none")})}catch(e){console.log(e),v.forEach(t=>{t.classList.add("d-none")}),$.forEach(t=>{t.classList.remove("d-none")})}})();function T(){localStorage.setItem("user",JSON.stringify(L))}M.addEventListener("click",_);function _(){m.fire({icon:"question",title:"確定要登出嗎",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消"}).then(e=>{e.isConfirmed&&(localStorage.removeItem("userId"),localStorage.removeItem("token"),localStorage.removeItem("user"),m.fire({icon:"success",title:"已登出",timer:1500,showConfirmButton:!1}),setTimeout(()=>{location.href="login.html"},1e3))})}const h="https://roomie-lfta.onrender.com/",B=new URL(window.location.href),g=B.searchParams.get("id");let U=document.querySelector(".current-page"),H=document.querySelector(".article-title"),S=document.querySelector(".article-photo"),z=document.querySelector(".article-costday"),D=document.querySelector(".article-price"),P=document.querySelector(".article-detail"),w=document.querySelector(".article-priceInclude"),R=document.querySelector(".article-equipment"),F=document.querySelector(".article-age"),N=document.querySelector(".article-identity"),O=document.querySelector(".article-trafficLifeEquipment"),Y=document.querySelector(".article-otherdetail"),G=document.querySelector(".article-contact"),x=document.querySelector(".article-qas"),k=parseInt(localStorage.getItem("userId"));document.querySelector(".message-btn");document.querySelector(".message-area");let J=document.querySelector(".report");p.get(`${h}rents/${g}?_expand=user`).then(function(e){let t=e.data;document.title=`${t.title}`,K(t),Q(t),V(),X(t)});p.get(`${h}qas?rentId=${g}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(e){let t=e.data;W(t)});function K(e){let t=e.traffic.concat(e.lifeEquipment),n=e.canPet?"可養寵物":"不可養寵物",l=e.canCooking?"可開伙":"不可開伙",r=e.user.nickname,a=e.user.contact.phone,d=e.user.contact.line;const c=`${e.updateDate}`,i=new Date(c),u=`${e.soldDate}`,f=new Date(u),y=i.getTime()-f.getTime(),q=Math.abs(Math.trunc(y/(1e3*3600*24)));U.textContent=`${e.title}`,H.textContent=`${e.title}`,S.innerHTML=`<div class="col-12 col-sm-6 pe-0 rounded">
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
                        </div>`,z.textContent=`${q}日 媒合成功`,D.textContent=`${e.price.toLocaleString("zh-TW")}元/月`,P.innerHTML=`
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
                        `,e.priceInclude.forEach((s,o)=>o==0?w.textContent+=`${s}`:w.textContent+=`、${s}`),e.equipment.forEach(s=>{let o="";s=="床"&&(o="single_bed"),s=="衣櫃"&&(o="dresser"),s=="沙發"&&(o="chair"),s=="桌子"&&(o="table_restaurant"),s=="椅子"&&(o="chair_alt"),s=="網路"&&(o="wifi"),s=="冰箱"&&(o="kitchen"),s=="電視"&&(o="tv"),s=="冷氣"&&(o="air"),s=="電梯"&&(o="elevator"),s=="洗衣機"&&(o="local_laundry_service"),s=="熱水器"&&(o="water_heater"),s=="天然瓦斯"&&(o="gas_meter"),s=="機車車位"&&(o="local_parking"),s=="汽車車位"&&(o="local_parking"),R.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${o}</span>
                                    ${s}
                                </div>`}),F.innerHTML=`<span class="h6 pe-2 text-primary">適合年齡:</span>${e.minAge}&nbsp;~&nbsp;${e.maxAge}&nbsp;歲`,e.identity.forEach(s=>{let o="";s=="學生"&&(o="person"),s=="上班族"&&(o="person_apron"),s=="家庭"&&(o="groups"),N.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${o}</span>
                                    ${s}
                                </div>`}),t.forEach(s=>{let o="";s.includes("火車站")&&(o="train"),s.includes("公車站")&&(o="directions_bus"),s.includes("捷運站")&&(o="directions_railway"),s.includes("學校")&&(o="school"),s.includes("百貨公司")&&(o="store"),s.includes("公園")&&(o="park"),s.includes("夜市")&&(o="storefront"),s.includes("醫療機構")&&(o="local_hospital"),O.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                                <span class="material-symbols-outlined me-2 icon-size">${o}</span>
                                                ${s}
                                            </div>`}),Y.textContent=`${e.intro}`,G.innerHTML=`
                        <li class="d-flex align-items-center gap-2 h5">
                        <img class="photo-size object-fit-contain rounded-circle" src="${e.user.photo}" alt="user-photo">
                            <span>${r}</span></li>
                        <li class="my-2">電話: &nbsp;${a}</li>
                        <li>Line: &nbsp;${d}</li>
                        `}function W(e){e.forEach(t=>{t.userId==t.rent.userId?x.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <img class="photo-size object-fit-contain rounded-circle" src="${t.user.photo}" alt="user-photo">
                                    <span>${t.user.nickname}<span class="fs-7 border rounded bg-primary-200 mx-1">發文者</span>:</span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${t.content}</p>
                                    <p class="fs-7 fw-normal">日期:${t.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `:x.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <img class="photo-size object-fit-contain rounded-circle" src="${t.user.photo}" alt="user-photo">
                                    <span>${t.user.nickname} : </span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${t.content}</p>
                                    <p class="fs-7 fw-normal">日期:${t.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `})}function Q(e){let t=document.querySelector(".img-modal"),n=document.querySelector(".img-main"),l=0;S.addEventListener("click",function(c){c.target.classList.contains("img-open")&&(l=c.target.dataset.open,t.classList.remove("d-none"),t.classList.add("d-flex"),document.body.style.overflow="hidden",n.setAttribute("src",`${e.photo[l]}`))}),t.addEventListener("click",function(c){let i=c.target.classList.contains("img-fluid"),u=c.target.classList.contains("material-symbols-outlined");i||u||(t.classList.remove("d-flex"),t.classList.add("d-none"),document.body.style.overflow="auto")});let r=document.querySelector(".img-group"),a="";e.photo.forEach(function(c,i){a+=`
                <li class="col-2 col-xxl-1 cursor">           
                    <img 
                    class="img-fluid rounded" 
                    src="${c}" 
                    alt="租屋圖片"
                    data-id="${i}">
                </li>
            `,r.innerHTML=a}),r.addEventListener("click",function(c){c.target.dataset.id=="0"?(n.setAttribute("src",`${e.photo[0]}`),l=0):c.target.dataset.id=="1"?(n.setAttribute("src",`${e.photo[1]}`),l=1):c.target.dataset.id=="2"?(n.setAttribute("src",`${e.photo[2]}`),l=2):c.target.dataset.id=="3"?(n.setAttribute("src",`${e.photo[3]}`),l=3):c.target.dataset.id=="4"&&(n.setAttribute("src",`${e.photo[4]}`),l=4)}),document.querySelectorAll(".arrow").forEach(c=>{c.addEventListener("click",function(i){if(i.target.classList.contains("img-arrow-left")){if(l==0)return;l>0&&(l--,n.setAttribute("src",`${e.photo[l]}`))}if(i.target.classList.contains("img-arrow-right")){if(l==4)return;l<4&&(l++,n.setAttribute("src",`${e.photo[l]}`))}})})}function V(){let e=document.querySelector(".favorite"),t=document.querySelector("#heartIcon");e.setAttribute("data-id",g),t.setAttribute("data-id",g),e.addEventListener("click",function(n){let l=parseInt(n.target.dataset.id),r=parseInt(localStorage.getItem("userId")),a={rentId:l,userId:r};r?p.get(`${h}users/${r}/favorites`).then(function(d){const c=d.data.find(i=>i.rentId===l);c&&m.fire({icon:"warning",title:"您已經有這則貼文",showConfirmButton:!1,timer:1500}),c===void 0&&p.post(`${h}favorites`,a).then(function(i){m.fire({icon:"success",title:"添加至您的收藏",showConfirmButton:!1,timer:1500})})}):m.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})})}J.addEventListener("click",e=>{if(k){if(e.target.classList.contains("report")||e.target.classList.contains("warning")){m.fire({html:` <p class="my-3">此貼文違反了哪一項規範事項 ?</p>
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
                        `,showConfirmButton:!1});let t=document.querySelectorAll(".form-check-input"),n=document.querySelector(".least-one");document.querySelector(".report-btn").addEventListener("click",r=>{let a=!1;if(t.forEach(d=>{d.checked&&(a=!0)}),!a)n.classList.remove("d-none");else{let d=[],c={};t.forEach(i=>{if(i.checked){let u=document.querySelector(`label[for="${i.id}"]`);d.push(`第${i.dataset.id}條:${u.textContent.trim()}`),c={rentId:parseInt(g),userId:k,content:d}}}),p.post(`${h}reports`,c).then(function(i){m.fire({icon:"success",title:"已收到您的檢舉",showConfirmButton:!1,timer:1500})})}})}}else m.fire({icon:"warning",title:"請先登入帳號",showConfirmButton:!1,timer:1500})});function X(e){let t=e.title;const l=`https://maps.googleapis.com/maps/api/geocode/json?address=${e.district[0]+e.district[1]}&key=${b}`,r=encodeURI(l);p.get(`${r}`).then(function(a){let d=a.data.results[0].geometry.location.lat,c=a.data.results[0].geometry.location.lng,i={lat:d,lng:c};function u(){const y=new google.maps.Map(document.getElementById("map"),{center:i,zoom:16});new google.maps.Marker({position:i,map:y,title:t})}var f=document.createElement("script");f.src=`https://maps.googleapis.com/maps/api/js?key=${b}&callback=initMap`,f.async=!0,window.initMap=u,document.head.appendChild(f)})}
