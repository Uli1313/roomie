import axios from 'axios';

const url = 'https://roomie-nnwq.onrender.com/';

// 取得當前畫面的id
const getUrl = new URL(window.location.href);
const getUrlId = getUrl.searchParams.get("id");

// 宣告要用的DOM元素
let title = document.querySelector('.article-title');
let photo = document.querySelector('.article-photo');
let price = document.querySelector('.article-price');
let detail = document.querySelector('.article-detail');
let priceInclude = document.querySelector('.article-priceInclude');
let equipment = document.querySelector('.article-equipment');
let age = document.querySelector('.article-age');
let identity = document.querySelector('.article-identity');
let trafficLifeEquipment = document.querySelector('.article-trafficLifeEquipment');
let otherdetail = document.querySelector('.article-otherdetail');
let contact = document.querySelector('.article-contact');
let qas = document.querySelector('.article-qas');

// get資料渲染畫面
axios.get(`${url}rents/${getUrlId}?_expand=user`)
.then(function(res){
    let api = res.data ;
    renderRentArticle(api)
    
});

// 渲染畫面
function renderRentArticle(api){
    // 處理交通、設施陣列
    let trafficLifeEquipmentArr = api.traffic.concat(api.lifeEquipment);
    
    // 處理寵物、開火判斷
    let petYN = api.canPet ? '可養寵物':'不可養寵物' ;
    let canCookingYN = api.canCooking ? '可開伙':'不可開伙';

    // 處理聯絡資訊
    let person = api.user.contact.person[0]+api.user.contact.person[1] ;
    let phone = api.user.contact.phone;
    let line = api.user.contact.line;

    // 所有畫面渲染
    title.textContent = `${api.title}`;
    photo.innerHTML = `<div class="col-12 col-sm-6 pe-0 rounded">
                            <div class="overflow-hidden rounded border me-3 me-sm-0">
                                <img src="${api.photo[0]}" class="img-fluid imgCursor rounded" alt="house photo">
                            </div>    
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border">
                                <img src="${api.photo[1]}" class="img-fluid imgCursor rounded" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border"> 
                                <img src="${api.photo[2]}" class="img-fluid imgCursor rounded" alt="house photo">
                            </div>   
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border">
                                <img src="${api.photo[3]}" class="img-fluid imgCursor rounded" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border">
                                <img src="${api.photo[4]}" class="img-fluid imgCursor rounded" alt="house photo">
                            </div>
                        </div>`;
    price.textContent = `${(api.price).toLocaleString('zh-TW')}元/月`;
    detail.innerHTML = `
                        <li><span class="h6 pe-2">地址:</span>${api.address} &nbsp;${api.district[0]}-${api.district[1]}</li>
                        <li><span class="h6 pe-2">格局:</span>${api.houseLayout}</li>
                        <li><span class="h6 pe-2">坪數:</span>${api['square Footage']}坪</li>
                        <li><span class="h6 pe-2">樓層/總樓層:</span>${api.floor}F&nbsp;/&nbsp;${api.totalFloor}F</li>
                        <li><span class="h6 pe-2">房屋類型:</span>${api.type}</li>
                        <li><span class="h6 pe-2">需求人數:</span>${api.needPartner}人</li>
                        <li><span class="h6 pe-2">需求性別:</span>${api.gender}</li>
                        <li><span class="h6 pe-2">寵物:</span>${petYN}</li>
                        <li><span class="h6 pe-2">開伙:</span>${canCookingYN}</li>
                        <li><span class="h6 pe-2">押金:</span>${api.deposit}</li>
                        <li><span class="h6 pe-2">最短租期:</span>${api.minPeriod}</li>
                        <li><span class="h6 pe-2">更新日期:</span>${api.updateDate}</li>
                        `;
    api['priceInclude'].forEach((v,i) => 
        i == 0 ? priceInclude.textContent += `${v}` : priceInclude.textContent += `、${v}` 
    );
    api['equipment'].forEach((v) => 
        equipment.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal"><span class="material-symbols-outlined me-2 icon-size">air</span>${v}</div>`
    );
    age.innerHTML = `<span class="h6 pe-2">適合年齡:</span>${api.minAge}&nbsp;~&nbsp;${api.maxAge}&nbsp;歲`
    api['identity'].forEach((v) => 
        identity.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal"><span class="material-symbols-outlined me-2 icon-size">person</span>${v}</div>`
    );
    trafficLifeEquipmentArr.forEach((v) => {
            if (v.includes('火車站') || v.includes('公車站') || v.includes('捷運站')) {
                trafficLifeEquipment.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal"><span class="material-symbols-outlined me-2 icon-size">train</span>${v}</div>`;
            } else if (v == ('公園') || v == ('學校') || v == ('夜市') || v == ('百貨公司') || v == ('醫療機構') || v == ('便利商店')){
                trafficLifeEquipment.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal"><span class="material-symbols-outlined me-2 icon-size">distance</span>${v}</div>`;
            }  
        }
    );
    otherdetail.textContent = `${api.intro}`;
    contact.innerHTML = `
                        <li class="d-flex align-items-center gap-2 h5">
                            <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                            <span>${person}</span></li>
                        <li class="my-2">電話: &nbsp;${phone}</li>
                        <li>Line: &nbsp;${line}</li>
                        `;
}

axios.get(`${url}qas?rentId=${getUrlId}&_expand=user&_expand=rent&_sort=date&_order=asc`)
.then(function(res){
    let api = res.data ;
    console.log(api);

    api.forEach((v) => {
            if (v.userId == v.rent.userId){
            qas.innerHTML += `
                            <li class="h5">
                                    <div class="d-flex align-items-center gap-2 my-4">
                                        <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                                        <span>${v.user.contact.person[0]+v.user.contact.person[1]}<span class="fs-7 border rounded bg-primary-200 mx-1">發文者</span>:</span>
                                    </div>
                                    <div class="d-flex justify-content-between px-2">
                                        <p class="fw-normal">${v.content}</p>
                                        <p class="fs-7 fw-normal">日期:${v.date}</p>
                                    </div>
                                    <hr class="m-1">
                            </li>
                            `;
            } else {
                qas.innerHTML += `
                            <li class="h5">
                                    <div class="d-flex align-items-center gap-2 my-4">
                                        <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                                        <span>${v.user.contact.person[0]+v.user.contact.person[1]} : </span>
                                    </div>
                                    <div class="d-flex justify-content-between px-2">
                                        <p class="fw-normal">${v.content}</p>
                                        <p class="fs-7 fw-normal">日期:${v.date}</p>
                                    </div>
                                    <hr class="m-1">
                            </li>
                            `;
            }
        }
    );
});





