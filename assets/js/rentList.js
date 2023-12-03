import axios from 'axios';

const url = 'https://roomie-lfta.onrender.com/';

// 分頁
let totalData ;
let totalPages ;
let limit = 4 ; 
let currentPage = 1 ;
let resultUrl = '';
let pagination = document.querySelector(".pagination");


// 進頁面及渲染 (依點閱率)
function inRender(){
    resultUrl = '_sort=view&_order=desc';
    axios.get(`${url}rents?${resultUrl}`)
    .then(function(res){
        let api = res.data ;
        // render(api);
        getData(resultUrl,currentPage, limit);
        paginationPN(api);
    });
}
inRender();




// 頁碼本身渲染(有幾頁)
function paginationPN(api){
    totalData = api.length;
    totalPages = Math.ceil(totalData / limit);
    let str = "";
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


// 渲染當前頁面資料(第幾頁)
function getData(resultUrl,currentPage, limit) {
    axios.get(`${url}rents?${resultUrl}&_page=${currentPage}&_limit=${limit}`)
      .then((res) => {
        let api = res.data ;
        render(api);
      })
}

// 監聽分頁
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


// 渲染合租文章列表
function renderList(api){
    let list = document.querySelector('#list')
    let div = '';
    
    api.forEach(function(v){

            // 處理寵物、開火判斷
        let petYN = v.canPet ? '可養寵物':'不可養寵物' ;
        let canCookingYN = v.canCooking ? '可開伙':'不可開伙';

            // 鄰近交通陣列
        let trafficDiv = '';
        let trafficArr = v.traffic ;
        trafficArr.forEach(function(i){
            trafficDiv += `<span class="me-3 px-1 bg-primary-200">近${i}</span>`;
        });

        div += `<div class="row p-1 my-4 rounded hover-primary-2">
                    <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
                        <img 
                            src="${v.photo[0]}" 
                            style="width:auto;height:100%;object-fit: cover;object-position: center;" 
                            alt="house photo"
                            class="rounded-top rounded-md-start">
                    </div>
                    <div class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end">
                        <ul>
                            <li class="w-100 d-flex justify-content-between align-items-center py-2">
                                <a href="rentArticle.html?id=${v.id}" class="h3 link-dark link-title">${v.title}</a> 
                                <button class="p-3 link-dark hover-primary border-0 rounded-3">
                                    <span class="material-symbols-outlined">heart_plus</span>
                                </button></li>
                            <li class="pb-3">${v.houseLayout} | ${v['square Footage']}坪 | ${v.floor}F/${v.totalFloor}F </li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-2 transform-y-25">location_on</span>
                                ${v.address} ${v.district[0]}-${v.district[1]}</li>
                            <li class="pb-3">
                                <span class="material-symbols-outlined pe-1 transform-y-25">person</span>
                                <span class="me-3 px-1 bg-primary-200">${v.gender}</span>
                                <span class="me-3 px-1 bg-primary-200">${petYN}</span>
                                <span class="me-3 px-1 bg-primary-200">${canCookingYN}</span></li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-1 transform-y-25">map</span>
                                ${trafficDiv}</li>
                            <li class="pb-2 h2 text-secondary text-end">${(v.price).toLocaleString('zh-TW')}元/月</li>
                            <li class="d-flex justify-content-between">更新日期:${v.updateDate} 
                                <div>
                                    <span class="material-symbols-outlined transform-y-25">visibility</span>
                                    <span class="ps-2">${v.view}</span>
                                </div></li>
                        </ul>
                    </div>
                </div>`
    });
    list.innerHTML = div ;

    // 處理點擊連結view數會+1
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


// 時間、租金排序 渲染合租文章列表
let filterDate = document.querySelector('#filterDate');
let filterPrice = document.querySelector('#filterPrice');

    // 點擊事件 - 時間篩選
function sortDate(api){
    // 初始排序狀態
    let sortOrder = 'desc' ;
    filterDate.addEventListener('click',function(e){
        if (sortOrder === 'desc') {
            api.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
            sortOrder = 'asc'; 
        } else {
            api.sort((a, b) => new Date(a.updateDate) - new Date(b.updateDate));
            sortOrder = 'desc'; 
        }
        renderList(api);
    });
}

    // 點擊事件 - 租金篩選
function sortPrice(api){
    // 初始排序狀態
    let sortOrder = 'desc' ;
    filterPrice.addEventListener('click',function(e){
        if (sortOrder === 'desc') {
            api.sort((a, b) => new Date(b.price) - new Date(a.price));
            sortOrder = 'asc'; 
        } else {
            api.sort((a, b) => new Date(a.price) - new Date(b.price));
            sortOrder = 'desc'; 
        }
        renderList(api);
    });
}


// 綜合渲染畫面 (畫面、租金、時間)
function render(api){
    renderList(api);  
    sortPrice(api);
    sortDate(api);
}


// 搜尋按鈕
let search = document.querySelector('#search');
let submit = document.querySelector('#submit');

    // 點擊事件 - 關鍵字篩選
submit.addEventListener('click',function(e){
    // 取出輸入的值
    let inputValue = search.value;
    let resultUrl = `q=${inputValue}`;
    // 關鍵字搜尋
    axios.get(`${url}rents?q=${inputValue}`)
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

            if (e.target.type === 'radio' && e.target.classList.contains('cityRadio')) {
                urlStr = `address_like=${labelText}`;
            
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('districtCheckbox')) {
                urlStr += `&district_like=${labelText}`;

            } else if (e.target.type === 'radio' && e.target.classList.contains('priceRadio')) {
                urlPrice = `&${e.target.dataset.price}`;

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('houseCheckbox')) {
                urlStr += `&type=${labelText}`;

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('lifeEquipmentCheckbox')) {
                urlStr += `&lifeEquipment_like=${labelText}`;

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('equipmentCheckbox')) {
                urlStr += `&equipment_like=${labelText}`;

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('identityCheckbox')) {
                urlStr += `&identity_like=${labelText}`;

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('genderCheckbox')) {
                urlStr += `&gender=${labelText}`;

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('canPetCookCheckbox')) {
                
                if (labelText == '可開伙') {
                    urlStr += `&canCooking=${true}`;

                } else {
                    urlStr += `&canPet=${true}`;

                }
                
                
            }

            resultUrl = urlStr + urlPrice ;
            axios.get(`${url}rents?${resultUrl}`)
            .then(function(res){
                if (res.data.length > 0){
                    let api = res.data;
                    getData(resultUrl,currentPage, limit);
                    paginationPN(api);
                } else {
                    renderListNoFound()
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

            resultUrl = urlStr + urlPrice ;
            axios.get(`${url}rents?${resultUrl}`)
            .then(function(res){
                if (res.data.length > 0){
                    let api = res.data;
                    getData(resultUrl,currentPage, limit);
                    paginationPN(api);
                } else {
                    renderListNoFound()
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


















  
