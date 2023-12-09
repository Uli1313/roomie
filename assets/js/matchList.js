import axios from 'axios';

const url = 'https://roomie-lfta.onrender.com/';

// 紀錄資料
let resultUrl = '';
let api = [];

// 渲染合租文章列表
function renderList(api){
    let list = document.querySelector('#list')
    let div = '';
    api.forEach(function(v){
        
        // 上傳日期
        const dateString = `${v.updateDate}`;
        const updateDate = new Date(dateString);
        // 媒合日期
        const dateString2 = `${v.soldDate}`;
        const matchDate = new Date(dateString2);
        // 今天日期
        const todayDate = new Date();
        // 時間
        const costTime = updateDate.getTime() - matchDate.getTime();
        const daysAwayTime = matchDate.getTime() - todayDate.getTime();
        // 換算天數
        const costDay = Math.abs(Math.trunc(costTime / (1000 * 3600 * 24)));
        const daysAway = Math.abs(Math.trunc(daysAwayTime / (1000 * 3600 * 24)));

        div += `<div class="col-12 my-3 p-1 hover-primary-2 rounded">
                    <div class="col-12 p-3 bg-white d-flex flex-wrap justify-content-evenly align-items-center text-end text-lg-center border rounded">
                        <div class="col-12 col-lg-4"><a href="matchArticle.html?id=${v.id}" class="link-dark fw-bold">${v.title}</a></div>
                        <div class="col-12 col-lg pb-1 pb-lg-0"><span class="text-primary">${daysAway}日前&nbsp;</span>媒合成功</div>
                        <div class="col-12 col-lg pb-1 pb-lg-0">${v['square Footage']}坪&nbsp;/&nbsp;${v.type}</div>
                        <div class="col-12 col-lg fw-bold text-primary">${(v.price).toLocaleString('zh-TW')}元/月</div>
                        <div class="col-12 col-lg">
                            <span class="text-primary">花費${costDay}日&nbsp;</span>
                            媒合成功
                            <span class="material-symbols-outlined ps-1 text-danger" style="transform: translateY(24%);">verified</span>
                        </div>
                    </div>
                </div>
                `
    });
    list.innerHTML = div ;
    viewNum(); 
};


// 渲染合租文章列表 - 沒找到相關內容
function renderListNoFound(){
    let list = document.querySelector('#list')
    let div = `
                <div class="row rounded">
                    <div class="col bg-white rounded m-5 p-5 d-flex flex-column justify-content-center align-items-center ">
                        <p>¯\_(ツ)_/¯</p>
                        <p class="p-2 h5">對不起，沒有找到適合您的物件！</p>
                        <p>建議您：重新篩選或搜尋試試看唷～</p>
                    </div>
                </div>`;
    list.innerHTML = div ;
};


// 進頁面及渲染 (依點閱率)
function inRender(){
    resultUrl = '_sort=view&_order=desc&status=已媒合';
    axios.get(`${url}rents?${resultUrl}`)
    .then(function(res){
        api = res.data ;
        getData(resultUrl,currentPage, limit);
        paginationPN(api);
    });
}
inRender();


// 時間、租金排序 渲染合租文章列表
let filterDate = document.querySelector('#filterDate');
let filterPrice = document.querySelector('#filterPrice');

let dateUp = '&_sort=soldDate&_order=asc';
let dateDown = '&_sort=soldDate&_order=desc' ;
let priceUp = '&_sort=price&_order=asc';
let priceDown = '&_sort=price&_order=desc' ;
let origin = '_sort=view&_order=desc';

// -時間
function sortdate(){
    
    // 監聽時間按鈕
    filterDate.addEventListener('click',function(e){
        // 如果resultUrl有含dateUp，變成dateDown
        if (resultUrl.includes(dateUp)) {
            resultUrl = resultUrl.replace(dateUp,dateDown);
        }
        // 如果resultUrl有含dateDown，變成dateUp
        else if (resultUrl.includes(dateDown)) {
            resultUrl = resultUrl.replace(dateDown,dateUp);
        }
        // 如果resultUrl有含priceUp，變成dateUp
        else if (resultUrl.includes(priceUp)) {
            resultUrl = resultUrl.replace(priceUp,dateUp);
        }
        // 如果resultUrl有含priceDown，變成dateUp
        else if (resultUrl.includes(priceDown)) {
            resultUrl = resultUrl.replace(priceDown,dateUp);
        }
        // 如果resultUrl有含origin，變成dateUp
        else if (resultUrl.includes(origin)) {
            resultUrl = resultUrl.replace(origin,dateUp);
        }
        // 如果都沒有含，變成dateUp
        else {
            resultUrl +=  dateUp;
        }
        
        // 組好result路徑後，GET資料渲染
        axios.get(`${url}rents?${resultUrl}`)
        .then(function(res){
            api = res.data ;
            if (api.length > 0) {
                getData(resultUrl,1, limit);
                currentPage = 1 ;
                paginationPN(api);
            } else {
                renderListNoFound();
                currentPage = 1 ;
                paginationPN(api);
            }
        });

    });
}
sortdate();

// -租金
function sortPrice(){
    
    // 監聽租金按鈕
    filterPrice.addEventListener('click',function(e){
        // 如果resultUrl有含PriceUp，變成priceDown
        if (resultUrl.includes(priceUp)) {
            resultUrl = resultUrl.replace(priceUp,priceDown);
        }
        // 如果resultUrl有含dateDown，變成priceUp
        else if (resultUrl.includes(priceDown)) {
            resultUrl = resultUrl.replace(priceDown,priceUp);
        }
        // 如果resultUrl有含priceUp，變成priceUp
        else if (resultUrl.includes(dateUp)) {
            resultUrl = resultUrl.replace(dateUp,priceUp);
        }
        // 如果resultUrl有含priceDown，變成priceUp
        else if (resultUrl.includes(dateDown)) {
            resultUrl = resultUrl.replace(dateDown,priceUp);
        }
        // 如果resultUrl有含origin，變成priceUp
        else if (resultUrl.includes(origin)) {
            resultUrl = resultUrl.replace(origin,priceUp);
        }
        // 如果都沒有含，變成priceUp
        else {
            resultUrl += priceUp;
        }
        
        // 組好result路徑後，GET資料渲染
        axios.get(`${url}rents?${resultUrl}`)
        .then(function(res){
            api = res.data ;
            if (api.length > 0) {
                getData(resultUrl,1, limit);
                currentPage = 1 ;
                paginationPN(api);
            } else {
                renderListNoFound();
                currentPage = 1 ;
                paginationPN(api);
            }
        });

    });
}
sortPrice();


// 分頁
let totalData ;
let totalPages ;
let limit = 4 ; 
let currentPage = 1 ;
let pagination = document.querySelector(".pagination");

// -渲染當前頁面資料(第幾頁)
function getData(resultUrl,currentPage, limit) {
    axios.get(`${url}rents?${resultUrl}&_page=${currentPage}&_limit=${limit}`)
      .then((res) => {
        let data = res.data ;
        renderList(data); 
      })
}

// -頁碼本身渲染(有幾頁)
function paginationPN(api){
    totalData = api.length;
    totalPages = Math.ceil(totalData / limit);
    let str = "";
    if (totalData == 0) {
        str = '';
    } else {
        // 組上一頁
        str += `<li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
            <span class="material-icons align-bottom">
            chevron_left
            </span>
        </a>
        </li>`;
        // 組中間頁數
        for (let i = 1; i <= totalPages; i++) {
            str += `<li class="page-item">
            <a class="page-link" href="#">${i}</a>
        </li>`;
        }
        // 組下一頁
        str += `<li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
            <span class="material-icons"> navigate_next </span>
        </a>
        </li>`;
    }
    pagination.innerHTML = str;

    // 移除上、下一頁按鈕的 focus 效果
    const pageLink = document.querySelectorAll(".page-link");
    pageLink.forEach((e) => {
        
        if (e.textContent.trim() === "chevron_left" || e.textContent.trim() === "navigate_next") {
            e.blur();
        }
    });
    // 當前頁增加 active
    pageLink[currentPage].classList.add("active");
    
}

// -監聽分頁
pagination.addEventListener("click", (e) => {
    // 移除所有 active 樣式
    const pageLink = document.querySelectorAll(".page-link");
    pageLink.forEach((e) => {
        e.classList.remove("active");
    });
    // 判斷點擊的位置
    if (e.target.textContent.trim() === "chevron_left") {
        // 上一頁按鈕
        // 當前已是最前頁則在該頁加上 active ，不重新撈取資料
        if (currentPage === 1) {
        pageLink[currentPage].classList.add("active");
        e.preventDefault();
        return;
        }
        if (currentPage > 1) {
        currentPage--;
        pageLink[currentPage].classList.add("active");
        getData(resultUrl,currentPage, limit);
        }
    } else if (e.target.textContent.trim() === "navigate_next") {
        // 下一頁按鈕
        if (currentPage === totalPages) {
        pageLink[currentPage].classList.add("active");
        e.preventDefault();
        return;
        }
        if (currentPage < totalPages) {
        currentPage++;
        pageLink[currentPage].classList.add("active");
        getData(resultUrl,currentPage, limit);
        }
    } else {
        // 數字按鈕
        currentPage = Number(e.target.textContent.trim());
        pageLink[currentPage].classList.add("active");
        getData(resultUrl,currentPage, limit);
    }
});


// 搜尋按鈕
let search = document.querySelector('#search');
let submit = document.querySelector('#submit');

    // -監聽搜尋
submit.addEventListener('click',function(e){
    // 取出輸入的值
    let inputValue = search.value;
    let resultUrl = `q=${inputValue}&status=已媒合`;
    // 關鍵字搜尋
    axios.get(`${url}rents?${resultUrl}`)
    .then(function(res){
        let api = res.data ;
        if (api.length > 0) {
            getData(resultUrl,currentPage, limit);
            paginationPN(api);
        } else {
            renderListNoFound();
        }       
    });
    
});


// 縣市、行政區複選篩選(含渲染畫面)
axios.get('https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json')
.then(function(res){
    
    // console.log(res.data[0].name); 台北市
    // console.log(res.data[0].districts[0].name); 中正區
    let api = res.data ;

    // 處理資料 => {name: '臺北市', districts: Array(12)}   Array(12):[['中正區', '大同區', '中山區'...]
    let data = api.map(function(item) {
        return {
            name: item.name,
            districts: item.districts.map(function(district) {
                return district.name;
            })
        };
    });

    // 處理資料，因為多了海南島跟釣魚台，把這兩個縣除去掉
    let newData = data.filter(item => item.name !== '釣魚臺' && item.name !== '南海島');
    
    // 自訂排序函式，根據我的排序方式排列物件
    function customSort(a, b) {
        const order = [
        '臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '臺中市', '彰化縣', '苗栗縣', '南投縣',
        '雲林縣', '高雄市', '臺南市', '嘉義市', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣',
        '金門縣', '連江縣'
        ];
    
        return order.indexOf(a.name) - order.indexOf(b.name);
    }
    
    // 使用自訂的排序函式來排序陣列
    newData.sort(customSort);

    // 處理點選縣市跑出行政區功能
    let countyCity = document.querySelectorAll('.countyCity'); // 全部的縣市
    let btnTitle = document.querySelector('.btnTitle'); // 下拉選單按鈕的文字(縣市)
    let dropdownTitle = document.querySelector('.dropdownTitle') // 下拉選單的標題 (縣市)
    let districtList = document.querySelector('.districtList'); // 下拉選單的清單(行政區)
    let allCheckBox = document.querySelectorAll('.form-check-input');
    
    // 用foreach去跑每一個縣市，當點擊任一縣市，就會跑出對應的行政區
    countyCity.forEach(function(radio) {
        
        // 點擊事件
        radio.addEventListener('change', function(e) {
            
            

                // 點擊縣市之後移除行政區的 disable
                document.querySelector('#disabled-events').classList.remove('disabled-events');  

                // 根據不同的 radio 索引去選擇
                // countyCity是NodeList，似陣列但非陣列，不能用indexOf，所以要先轉成真正的陣列
                let dataIndex = Array.from(countyCity).indexOf(radio); 
                let selectedData = newData[dataIndex];
                
                let strBtnTitle = `${selectedData.name}`;
                let strTitle = `${selectedData.name}`;
                let strContent = '';

                selectedData.districts.forEach(function(district, i) {
                        strContent += ` 
                                        <li class="pb-2">
                                            <div class="form-check-inline cursor">
                                                <input class="form-check-input cursor districtCheckbox" type="checkbox" id="district${i}" value="${selectedData.name}">
                                                <label class="form-check-label cursor districtLabelText" for="district${i}">${district}</label>
                                            </div>
                                        </li>
                                        `;

                });
                btnTitle.textContent = strBtnTitle;
                dropdownTitle.textContent = strTitle ;
                districtList.innerHTML = strContent;

                allCheckBox = document.querySelectorAll('.form-check-input');
        });  

        
    });


// 組好篩選路徑渲染畫面
    let row = document.querySelector('#row');
    let urlStr = '';
    let urlPrice = '';

    row.addEventListener('change',function(e){

        const labelElement = document.querySelector(`label[for='${e.target.id}']`); 
        const labelText = (labelElement.textContent).trim();

        if (e.target.checked) {
            // 縣市
            if (e.target.type === 'radio' && e.target.classList.contains('cityRadio')) {
                urlStr = `address_like=${labelText}`;
            // 行政區
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('districtCheckbox')) {
                urlStr += `&district_like=${labelText}`;
            // 租金
            } else if (e.target.type === 'radio' && e.target.classList.contains('priceRadio')) {
                urlPrice = `&${e.target.dataset.price}&_sort=price&_order=desc`;
            // 房屋類型
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('houseCheckbox')) {
                urlStr += `&type=${labelText}`;
            // 鄰近
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('lifeEquipmentCheckbox')) {
                urlStr += `&lifeEquipment_like=${labelText}`;
            // 設備
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('equipmentCheckbox')) {
                urlStr += `&equipment_like=${labelText}`;
            // 身分
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('identityCheckbox')) {
                urlStr += `&identity_like=${labelText}`;
            // 性別
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('genderCheckbox')) {
                urlStr += `&gender=${labelText}`;
            // 寵物、開火
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('canPetCookCheckbox')) {
                
                if (labelText == '可開伙') {
                    urlStr += `&canCooking=${true}`;

                } else {
                    urlStr += `&canPet=${true}`;

                }
                  
            }

            resultUrl = urlStr + urlPrice + '&status=已媒合' ;
            axios.get(`${url}rents?${resultUrl}`)
            .then(function(res){
                if (res.data.length > 0){
                    api = res.data;
                    getData(resultUrl,1, limit);
                    currentPage = 1 ;
                    paginationPN(api);
                } else {
                    api = res.data;
                    renderListNoFound();
                    currentPage = 1 ;
                    paginationPN(api);
                }
            })

        } else {

            if (e.target.type === 'radio' && e.target.classList.contains('cityRadio')) {
                urlStr = urlStr.replace(`address_like=${labelText}`,'');
            
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('districtCheckbox')) {
                urlStr = urlStr.replace(`&district_like=${labelText}`,'');

            } else if (e.target.type === 'radio' && e.target.classList.contains('priceRadio')) {
                urlPrice = urlStr.replace(`&${e.target.dataset.price}`,'');

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('houseCheckbox')) {
                urlStr = urlStr.replace(`&type=${labelText}`,'');

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('lifeEquipmentCheckbox')) {
                urlStr = urlStr.replace(`&lifeEquipment_like=${labelText}`,'');

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('equipmentCheckbox')) {
                urlStr = urlStr.replace(`&equipment_like=${labelText}`,'');

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('identityCheckbox')) {
                urlStr = urlStr.replace(`&identity_like=${labelText}`,'');

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('genderCheckbox')) {
                urlStr = urlStr.replace(`&gender=${labelText}`,'');

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('canPetCookCheckbox')) {
                
                if (labelText == '可開伙') {
                    urlStr = urlStr.replace(`&canCooking=${true}`,'');

                } else {
                    urlStr = urlStr.replace(`&canPet=${true}`,'');

                }
                      
            }

            resultUrl = urlStr + urlPrice + '&status=已媒合' ;
            axios.get(`${url}rents?${resultUrl}`)
            .then(function(res){
                if (res.data.length > 0){
                    api = res.data;
                    getData(resultUrl,1, limit);
                    currentPage = 1 ;
                    paginationPN(api);
                } else {
                    api = res.data;
                    renderListNoFound();
                    currentPage = 1 ;
                    paginationPN(api);
                }
            })
        }
    }); 
});


// 清空按鈕
let close = document.querySelector('#close');
close.addEventListener('click',function(e){
    location.reload();
});


// 點閱數
function viewNum(){
    
    let linkTitles = document.querySelectorAll('.link-title');

    linkTitles.forEach(linkTitle => {
        linkTitle.addEventListener('click', function(e) {

            // 先阻止直接進入連結
            e.preventDefault();

            // 取到點擊連結的id
            const currentUrl = new URL(e.target.href);
            const searchParams = new URLSearchParams(currentUrl.search);
            const id = searchParams.get('id');

            // 先get出資料取得他的原本view數
            axios.get(`${url}rents/${id}`)
            .then(function(res) {
                const api = res.data; // 假設後端回傳的資料是一個 rent 物件

                // 建立view數+1的物件
                let newData = {
                    'view': parseInt(api.view) + 1
                }

                // patch讓帶入view數+1的物件
                axios.patch(`${url}rents/${id}`,newData)
                .then(function(res) {
                    // 處理完最後進入連結
                    window.location.href = e.target.href;
                })
                .catch(function(err) {
                    console.error(err);
                });
            })
            .catch(function(err) {
                console.error(err);
            });
        });
    });
}