
// 進頁面及渲染 (依點閱率)
axios.get('http://localhost:3000/rents?_sort=view&_order=desc')
.then(function(res){
    // console.log(res.data);
    let api = res.data ;
    renderList(api);  
    sortDate(api);
    sortPrice(api);
});


// 渲染合租文章列表
function renderList(api){
    let list = document.querySelector('#list')
    let div = '';
    
    api.forEach(function(v){

        // 處理判斷、陣列類型資料
        let petYN = v.canPet ? '可養寵物':'不可養寵物' ;
        let canCookingYN = v.canCooking ? '可開伙':'不可開伙';

            // 鄰近交通陣列
        let trafficDiv = '';
        (v.traffic).forEach(function(v){
            trafficDiv += `<span class="me-3 px-1 bg-primary-200">近${v}</span>`;
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
                                <a href="rentArticle.html" class="h3 link-dark">${v.title}</a> 
                                <button class="p-3 link-dark hover-primary border-0 rounded-3">
                                    <span class="material-symbols-outlined">heart_plus</span>
                                </button></li>
                            <li class="pb-3">${v.houseLayout} | ${v['square Footage']}坪${v.floor}F/${v.totalFloor}F </li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-2 transform-y-25">location_on</span>
                                ${v.address[0]}${v.address[1]}-${v.address[2]}</li>
                            <li class="pb-3">
                                <span class="material-symbols-outlined pe-1 transform-y-25">person</span>
                                <span class="me-3 px-1 bg-primary-200">${v.gender}</span>
                                <span class="me-3 px-1 bg-primary-200">${petYN}</span>
                                <span class="me-3 px-1 bg-primary-200">${canCookingYN}</span></li>
                            <li class="pb-2">
                                <span class="material-symbols-outlined pe-1 transform-y-25">map</span>
                                ${trafficDiv}</li>
                            <li class="pb-2 h2 text-secondary text-end">${v.price}元/月</li>
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
};


// 渲染合租文章列表 - 沒找到相關內容
function renderListNoFound(){
    let list = document.querySelector('#list')
    let div = `
                <div class="row p-1 my-4 rounded">
                    <div class="col bg-white rounded p-7 d-flex flex-column justify-content-center align-items-center">
                        <p>¯\_(ツ)_/¯</p>
                        <p class="p-2 h5">對不起，沒有找到適合您的物件！</p>
                        <p>建議您：重新輸入"關鍵字"搜尋試試看唷～</p>
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


// 搜尋按鈕
let search = document.querySelector('#search');
let submit = document.querySelector('#submit');

    // 點擊事件 - 關鍵字篩選
submit.addEventListener('click',function(e){
    // 取出輸入的值
    let inputValue = search.value;
 
    // 關鍵字搜尋
    axios.get(`http://localhost:3000/rents?q=${inputValue}`)
    .then(function(res){
        let api = res.data ;
        if (api.length > 0) {
            renderList(api);
            sortDate(api);
            sortPrice(api);
        } else {
            renderListNoFound();
        }       
    });
    
});


