import"./bootstrap.min-e773685c.js";import{a as c}from"./axios-28bc18a3.js";const d="https://roomie-lfta.onrender.com/";let i="";const $=new URL(window.location.href),u=$.searchParams.get("id");let y=document.querySelector(".current-page"),b=document.querySelector(".article-title"),g=document.querySelector(".article-photo"),L=document.querySelector(".article-price"),q=document.querySelector(".article-detail"),m=document.querySelector(".article-priceInclude"),w=document.querySelector(".article-equipment"),x=document.querySelector(".article-age"),_=document.querySelector(".article-identity"),S=document.querySelector(".article-trafficLifeEquipment"),E=document.querySelector(".article-otherdetail"),v=document.querySelector(".article-contact"),f=document.querySelector(".article-qas");c.get(`${d}rents/${u}?_expand=user`).then(function(t){i=t.data,A(i),M(g),document.querySelector(".favorite").addEventListener("click",function(l){let o={rentId:u,userId:1};c.post(`${d}favorites`,o).then(function(r){console.log(r)})})});c.get(`${d}qas?rentId=${u}&_expand=user&_expand=rent&_sort=date&_order=asc`).then(function(t){i=t.data,C(i)});function A(t){let n=t.traffic.concat(t.lifeEquipment),l=t.canPet?"可養寵物":"不可養寵物",o=t.canCooking?"可開伙":"不可開伙",r=t.user.contact.person[0]+t.user.contact.person[1],a=t.user.contact.phone,p=t.user.contact.line;y.textContent=`${t.title}`,b.textContent=`${t.title}`,g.innerHTML=`<div class="col-12 col-sm-6 pe-0 rounded">
                            <div class="overflow-hidden rounded border me-3 me-sm-0">
                                <img src="${t.photo[0]}" class="img-fluid imgCursor rounded img-open" data-open="0" alt="house photo">
                            </div>    
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border">
                                <img src="${t.photo[1]}" class="img-fluid imgCursor rounded img-open" data-open="1" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border"> 
                                <img src="${t.photo[2]}" class="img-fluid imgCursor rounded img-open" data-open="2" alt="house photo">
                            </div>   
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border">
                                <img src="${t.photo[3]}" class="img-fluid imgCursor rounded img-open" data-open="3" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border">
                                <img src="${t.photo[4]}" class="img-fluid imgCursor rounded img-open" data-open="4" alt="house photo">
                            </div>
                        </div>`,L.textContent=`${t.price.toLocaleString("zh-TW")}元/月`,q.innerHTML=`
                        <li><span class="h6 pe-2">地址:</span>${t.address} &nbsp;${t.district[0]}-${t.district[1]}</li>
                        <li><span class="h6 pe-2">格局:</span>${t.houseLayout}</li>
                        <li><span class="h6 pe-2">坪數:</span>${t["square Footage"]}坪</li>
                        <li><span class="h6 pe-2">樓層/總樓層:</span>${t.floor}F&nbsp;/&nbsp;${t.totalFloor}F</li>
                        <li><span class="h6 pe-2">房屋類型:</span>${t.type}</li>
                        <li><span class="h6 pe-2">需求人數:</span>${t.needPartner}人</li>
                        <li><span class="h6 pe-2">需求性別:</span>${t.gender}</li>
                        <li><span class="h6 pe-2">寵物:</span>${l}</li>
                        <li><span class="h6 pe-2">開伙:</span>${o}</li>
                        <li><span class="h6 pe-2">押金:</span>${t.deposit}</li>
                        <li><span class="h6 pe-2">最短租期:</span>${t.minPeriod}</li>
                        <li><span class="h6 pe-2">更新日期:</span>${t.updateDate}</li>
                        `,t.priceInclude.forEach((e,s)=>s==0?m.textContent+=`${e}`:m.textContent+=`、${e}`),t.equipment.forEach(e=>{let s="";e=="床"&&(s="single_bed"),e=="衣櫃"&&(s="dresser"),e=="沙發"&&(s="chair"),e=="桌子"&&(s="table_restaurant"),e=="椅子"&&(s="chair_alt"),e=="網路"&&(s="wifi"),e=="冰箱"&&(s="kitchen"),e=="電視"&&(s="tv"),e=="冷氣"&&(s="air"),e=="電梯"&&(s="elevator"),e=="洗衣機"&&(s="local_laundry_service"),e=="熱水器"&&(s="water_heater"),e=="天然瓦斯"&&(s="gas_meter"),e=="機車車位"&&(s="local_parking"),e=="汽車車位"&&(s="local_parking"),w.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${e}
                                </div>`}),x.innerHTML=`<span class="h6 pe-2">適合年齡:</span>${t.minAge}&nbsp;~&nbsp;${t.maxAge}&nbsp;歲`,t.identity.forEach(e=>{let s="";e=="學生"&&(s="person"),e=="上班族"&&(s="person_apron"),e=="家庭"&&(s="groups"),_.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                    ${e}
                                </div>`}),n.forEach(e=>{let s="";e.includes("火車站")&&(s="train"),e.includes("公車站")&&(s="directions_bus"),e.includes("捷運站")&&(s="directions_railway"),e.includes("學校")&&(s="school"),e.includes("百貨公司")&&(s="store"),e.includes("公園")&&(s="park"),e.includes("夜市")&&(s="storefront"),e.includes("醫療機構")&&(s="local_hospital"),S.innerHTML+=`<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                                <span class="material-symbols-outlined me-2 icon-size">${s}</span>
                                                ${e}
                                            </div>`}),E.textContent=`${t.intro}`,v.innerHTML=`
                        <li class="d-flex align-items-center gap-2 h5">
                            <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                            <span>${r}</span></li>
                        <li class="my-2">電話: &nbsp;${a}</li>
                        <li>Line: &nbsp;${p}</li>
                        `}function C(t){t.forEach(n=>{n.userId==n.rent.userId?f.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                                    <span>${n.user.contact.person[0]+n.user.contact.person[1]}<span class="fs-7 border rounded bg-primary-200 mx-1">發文者</span>:</span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${n.content}</p>
                                    <p class="fs-7 fw-normal">日期:${n.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `:f.innerHTML+=`
                        <li class="h5">
                                <div class="d-flex align-items-center gap-2 my-4">
                                    <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                                    <span>${n.user.contact.person[0]+n.user.contact.person[1]} : </span>
                                </div>
                                <div class="d-flex justify-content-between px-2">
                                    <p class="fw-normal">${n.content}</p>
                                    <p class="fs-7 fw-normal">日期:${n.date}</p>
                                </div>
                                <hr class="m-1">
                        </li>
                        `})}function M(t){let n=document.querySelector(".img-modal"),l=document.querySelector(".img-main"),o=0;t.addEventListener("click",function(e){e.target.classList.contains("img-open")&&(o=parseInt(e.target.dataset.open),n.classList.remove("d-none"),n.classList.add("d-flex"),document.body.style.overflow="hidden",l.setAttribute("src",`${i.photo[o]}`))}),n.addEventListener("click",function(e){let s=e.target.classList.contains("img-fluid"),h=e.target.classList.contains("material-symbols-outlined");s||h||(n.classList.remove("d-flex"),n.classList.add("d-none"),document.body.style.overflow="auto")});let r=document.querySelector(".img-group"),a="";i.photo.forEach(function(e,s){a+=`
                <li class="col-1 cursor">           
                    <img 
                    class="img-fluid rounded" 
                    src="${e}" 
                    alt="租屋圖片"
                    data-id="${s}">
                </li>
            `,r.innerHTML=a}),r.addEventListener("click",function(e){e.target.dataset.id=="0"?(l.setAttribute("src",`${i.photo[0]}`),o=0):e.target.dataset.id=="1"?(l.setAttribute("src",`${i.photo[1]}`),o=1):e.target.dataset.id=="2"?(l.setAttribute("src",`${i.photo[2]}`),o=2):e.target.dataset.id=="3"?(l.setAttribute("src",`${i.photo[3]}`),o=3):e.target.dataset.id=="4"&&(l.setAttribute("src",`${i.photo[4]}`),o=4)}),document.querySelectorAll(".arrow").forEach(e=>{e.addEventListener("click",function(s){if(s.target.classList.contains("img-arrow-left")){if(o==0)return;o>0&&(o--,l.setAttribute("src",`${i.photo[o]}`))}if(s.target.classList.contains("img-arrow-right")){if(o==4)return;o<4&&(o++,l.setAttribute("src",`${i.photo[o]}`))}})})}
