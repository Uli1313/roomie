import axios from 'axios';
import Swal from 'sweetalert2';
import { apiKey } from '/assets/js/ignore.js'; 

const url = 'https://roomie-lfta.onrender.com/';
let api = '';

// 當前畫面的ID
const getUrl = new URL(window.location.href);
const getUrlId = getUrl.searchParams.get("id");

// DOM元素
let currentPage = document.querySelector('.current-page');
let title = document.querySelector('.article-title');
let photo = document.querySelector('.article-photo');
let costHowDay = document.querySelector('.article-costday')
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

let storageUserId = parseInt(localStorage.getItem('userId')) ;
let messageBtn = document.querySelector('.message-btn');
let messageArea = document.querySelector('.message-area');
let report = document.querySelector('.report');

// GET畫面資料
axios.get(`${url}rents/${getUrlId}?_expand=user`)
.then(function(res){
    api = res.data ;
    document.title = `${api.title}`;
    renderRentArticle(api) ;
    modal(photo);
    favorite();
    map();
});

// GET留言資料
axios.get(`${url}qas?rentId=${getUrlId}&_expand=user&_expand=rent&_sort=date&_order=asc`)
.then(function(res){
    api = res.data ;
    renderRentArticleCommet(api);
});

// 渲染畫面函式
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

    // 處理花費日期
    const dateString = `${api.updateDate}`;
    const updateDate = new Date(dateString);
    // 媒合日期
    const dateString2 = `${api.soldDate}`;
    const matchDate = new Date(dateString2);
    // 時間
    const costTime = updateDate.getTime() - matchDate.getTime();
    // 換算天數
    const costDay = Math.abs(Math.trunc(costTime / (1000 * 3600 * 24)));

    // --所有畫面渲染--
    // 麵包屑
    currentPage.textContent = `${api.title}`;
    // 標題
    title.textContent = `${api.title}`;
    // 圖片
    photo.innerHTML = `<div class="col-12 col-sm-6 pe-0 rounded">
                            <div class="overflow-hidden rounded border me-3 me-sm-0 shadow-sm">
                                <img src="${api.photo[0]}" class="img-fluid imgCursor rounded img-open" data-open="0" alt="house photo">
                            </div>    
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${api.photo[1]}" class="img-fluid imgCursor rounded img-open" data-open="1" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border shadow-sm"> 
                                <img src="${api.photo[2]}" class="img-fluid imgCursor rounded img-open" data-open="2" alt="house photo">
                            </div>   
                        </div>
                        <div class="d-none d-sm-flex col-sm-3 flex-column pe-0 gap-2 rounded">
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${api.photo[3]}" class="img-fluid imgCursor rounded img-open" data-open="3" alt="house photo">
                            </div>
                            <div class="overflow-hidden rounded border shadow-sm">
                                <img src="${api.photo[4]}" class="img-fluid imgCursor rounded img-open" data-open="4" alt="house photo">
                            </div>
                        </div>`;
    // 花費幾日媒合
    costHowDay.textContent = `${costDay}日 媒合成功`;
    // 租金
    price.textContent = `${(api.price).toLocaleString('zh-TW')}元/月`;
    // 詳細資訊
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
    // 租金包含
    api['priceInclude'].forEach((v,i) => 
        i == 0 ? priceInclude.textContent += `${v}` : priceInclude.textContent += `、${v}` 
    );
    // 設備
    api['equipment'].forEach((v) => {
        let icon =  '';
        if (v == '床') icon = 'single_bed' ;
        if (v == '衣櫃') icon = 'dresser' ;
        if (v == '沙發') icon = 'chair' ;
        if (v == '桌子') icon = 'table_restaurant' ;
        if (v == '椅子') icon = 'chair_alt' ;
        if (v == '網路') icon = 'wifi' ;
        if (v == '冰箱') icon = 'kitchen' ;
        if (v == '電視') icon = 'tv' ;
        if (v == '冷氣') icon = 'air' ;
        if (v == '電梯') icon = 'elevator' ;
        if (v == '洗衣機') icon = 'local_laundry_service' ;
        if (v == '熱水器') icon = 'water_heater' ;
        if (v == '天然瓦斯') icon = 'gas_meter' ;
        if (v == '機車車位') icon = 'local_parking' ;
        if (v == '汽車車位') icon = 'local_parking' ;   
        equipment.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${icon}</span>
                                    ${v}
                                </div>`
        }
    );
    // 年齡
    age.innerHTML = `<span class="h6 pe-2 text-primary">適合年齡:</span>${api.minAge}&nbsp;~&nbsp;${api.maxAge}&nbsp;歲`;
    // 身分
    api['identity'].forEach((v) => {
        let icon =  '';
        if (v == '學生') icon = 'person' ;
        if (v == '上班族') icon = 'person_apron' ;
        if (v == '家庭') icon = 'groups' ;
        identity.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                    <span class="material-symbols-outlined me-2 icon-size">${icon}</span>
                                    ${v}
                                </div>`
        }
    );
    // 鄰近、交通
    trafficLifeEquipmentArr.forEach((v) => {
            let icon = '';
            if (v.includes('火車站')) icon = 'train' ;
            if (v.includes('公車站')) icon = 'directions_bus' ;
            if (v.includes('捷運站')) icon = 'directions_railway' ;
            if (v.includes('學校')) icon = 'school' ;
            if (v.includes('百貨公司')) icon = 'store' ;
            if (v.includes('公園')) icon = 'park' ;
            if (v.includes('夜市')) icon = 'storefront' ;
            if (v.includes('醫療機構')) icon = 'local_hospital' ;
            trafficLifeEquipment.innerHTML += `<div class="col-5 col-sm-3 col-lg-2 mb-2 h5 fw-normal">
                                                <span class="material-symbols-outlined me-2 icon-size">${icon}</span>
                                                ${v}
                                            </div>`;
        }
    );
    // 其他事項
    otherdetail.textContent = `${api.intro}`;
    // 聯絡資訊
    contact.innerHTML = `
                        <li class="d-flex align-items-center gap-2 h5">
                            <span class="material-symbols-outlined" style="font-size: 34px;">account_circle</span>
                            <span>${person}</span></li>
                        <li class="my-2">電話: &nbsp;${phone}</li>
                        <li>Line: &nbsp;${line}</li>
                        `;
}

// 渲染留言函示
function renderRentArticleCommet(api){
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
}

// 彈跳遮罩
function modal(photo){

    let imgModal = document.querySelector('.img-modal');
    let imgMain = document.querySelector('.img-main');
    let photoNum = 0;

    // 點擊哪個圖片打開遮罩效果、並渲染大圖
    photo.addEventListener('click',function(e){
        if (e.target.classList.contains('img-open')) {
            photoNum = parseInt(e.target.dataset.open);
            imgModal.classList.remove('d-none'); 
            imgModal.classList.add('d-flex'); 
            document.body.style.overflow = 'hidden'; // 禁用背景滾動條
            
            imgMain.setAttribute('src', `${api.photo[photoNum]}`);
            
        }
    });
    
    // 關閉遮罩
    imgModal.addEventListener('click',function(e){
        let inImg = e.target.classList.contains('img-fluid');
        let inArrow = e.target.classList.contains('material-symbols-outlined');
        if(inImg || inArrow){
            return ;
        } else {
            imgModal.classList.remove('d-flex'); 
            imgModal.classList.add('d-none');
            document.body.style.overflow = 'auto'; // 啟用背景滾動
        }
    });

    
    
    let imgGroup = document.querySelector('.img-group');
    
    // 渲染下方小圖
    let ul = ''
    api.photo.forEach(function(v,i){
            ul += `
                <li class="col-2 col-xxl-1 cursor">           
                    <img 
                    class="img-fluid rounded" 
                    src="${v}" 
                    alt="租屋圖片"
                    data-id="${i}">
                </li>
            `;
        imgGroup.innerHTML = ul ;
    });

    // 接點擊小圖效果
    imgGroup.addEventListener('click',function(e){
                if (e.target.dataset.id == '0') {
                    imgMain.setAttribute('src', `${api.photo[0]}`);
                    photoNum = 0 ;
                } else if (e.target.dataset.id == '1') {
                    imgMain.setAttribute('src', `${api.photo[1]}`);
                    photoNum = 1 ;
                } else if (e.target.dataset.id == '2') {
                    imgMain.setAttribute('src', `${api.photo[2]}`);
                    photoNum = 2 ;
                } else if (e.target.dataset.id == '3') {
                    imgMain.setAttribute('src', `${api.photo[3]}`);
                    photoNum = 3 ;
                } else if (e.target.dataset.id == '4') {
                    imgMain.setAttribute('src', `${api.photo[4]}`);
                    photoNum = 4 ;
                }
            });
    
    let arrow = document.querySelectorAll('.arrow');

    // 點擊左右鍵效果
    arrow.forEach( v => {
        v.addEventListener('click', function(e) {
            if (e.target.classList.contains('img-arrow-left')) {
                if (photoNum == 0) {
                    return ;
                } else if (photoNum > 0) {
                    photoNum--;
                    imgMain.setAttribute('src', `${api.photo[photoNum]}`);
                }
            }
            if (e.target.classList.contains('img-arrow-right')) {
                if (photoNum == 4) {
                    return ;
                } else if (photoNum < 4) {
                    photoNum++;
                    imgMain.setAttribute('src', `${api.photo[photoNum]}`);
                }
            }
        });
    });
}

// 我的收藏
function favorite(){
    let favorite = document.querySelector('.favorite');
    let heartIcon = document.querySelector('#heartIcon');
    favorite.setAttribute('data-id',getUrlId);
    heartIcon.setAttribute('data-id',getUrlId);
    favorite.addEventListener('click',function(e){
            let pageRentId = parseInt(e.target.dataset.id) ;
            let storageUserId = parseInt(localStorage.getItem('userId')) ;
            let data = {
                "rentId": pageRentId,
                "userId": storageUserId
            }
            // 判斷有無登入
            if (storageUserId) {
                // GET userId的favorite資料
                axios.get(`${url}users/${storageUserId}/favorites`)
                .then(function(res){
                    // 如果userId已經有這則貼文
                    const foundProduct = res.data.find(v => v.rentId === pageRentId);
                    if (foundProduct) {
                        Swal.fire({
                            icon: 'warning',
                            title: '您已經有這則貼文',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    // 如果userId沒有這則貼文
                    if (foundProduct === undefined) {
                        axios.post(`${url}favorites`,data)
                        .then(function(res){
                            Swal.fire({
                                icon: 'success',
                                title: '添加至您的收藏',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        });
                    }    
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '請先登入帳號',
                    showConfirmButton: false,
                    timer: 1500
                }); 
            }
        })
}

// 檢舉
report.addEventListener('click',(e) => {

    // 判斷有無登入
    if (storageUserId){
        // 彈跳視窗
        if (e.target.classList.contains('report') || e.target.classList.contains('warning')) {
            const newSwal = Swal.fire({
                html: ` <p class="my-3">此貼文違反了哪一項規範事項 ?</p>
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
                        `,
                showConfirmButton: false,
            })

            let formCheckInput = document.querySelectorAll('.form-check-input');
            let leastOne = document.querySelector('.least-one')
            let reportBtn = document.querySelector('.report-btn')
            reportBtn.addEventListener('click',  e => {
                // 檢查有沒有checkbox被點擊
                let atLeastOneChecked = false;
                formCheckInput.forEach( v => {
                    if (v.checked) {
                        atLeastOneChecked = true;
                    }
                })
                // 都沒有被點擊跳出 *至少選擇一個欄位
                if (!atLeastOneChecked) {
                    leastOne.classList.remove('d-none');
                } else {
                    let arr = [] ;
                    let data = {} ;
                    // 有點擊審查點擊哪一個checkbox
                    formCheckInput.forEach( v => {
                        if (v.checked) {
                            //找到對應label的文字
                            let labelForCheckbox = document.querySelector(`label[for="${v.id}"]`);
                            arr.push(`第${v.dataset.id}條:${labelForCheckbox.textContent.trim()}`);
                            data = {
                                "rentId": parseInt(getUrlId),
                                "userId": storageUserId,
                                "content": arr
                            }
                        }
                    })
                    axios.post(`${url}reports`,data)
                    .then(function(res){
                        Swal.fire({
                            icon: 'success',
                            title: '已收到您的檢舉',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                }
            })
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: '請先登入帳號',
            showConfirmButton: false,
            timer: 1500
        });
    }
})

// 地圖
function map(){

    // 使用encode取得地址經緯度，url會得到json資料
    let markerTitle = api.title;
    let address = api.district[0] + api.district[1] ;
    const chineseAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    const encodedURI = encodeURI(chineseAddress); 

    // GET地址經緯度資料渲染地圖
    axios.get(`${encodedURI}`)
    .then(function(res){

        // 取到經緯度
        let locationLat = res.data.results[0].geometry.location.lat;
        let locationLng = res.data.results[0].geometry.location.lng;

        // 建立目標經緯度的物件
        let location = {
            lat: locationLat, 
            lng: locationLng 
        }

        // 定義初始化地圖的函式
        function initMap() {
            // 建立地圖
            const map = new google.maps.Map(document.getElementById("map"), {
                center: location, // 經緯度(剛剛創好的物件格式)
                zoom: 16,         // 地圖縮放大小
            });

            // 建立一個標記 (紅色的)
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: markerTitle // 標記標題
            });
        }

        // 動態建立並引入 Google Maps JavaScript API 的 script 標籤
        var script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;

        // 將 'initMap' 函式附加到 'window' 物件
        window.initMap = initMap;

        // 將 'script' 元素附加到 'head' 標籤
        document.head.appendChild(script);
    })
}










