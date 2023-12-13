import axios from "axios";
import Swal from "sweetalert2";

const url = "https://roomie-lfta.onrender.com";

const localUserId = localStorage.getItem("userId");
const localUserToken = localStorage.getItem("token");
const token = {
    headers: {
      Authorization: `Bearer ${localUserToken}`,
    },
};

// API、DOM
let apiUrl = `${url}/660/favorites?userId=${localUserId}&_expand=rent`;
let api = [] ;

let favoritesList = document.querySelector('.favorites-list');
let filterDate = document.querySelector('#filterDate');
let filterSquare = document.querySelector('#filterSquare');
let filterPrice = document.querySelector('#filterPrice');

// GET userId 收藏
function getPublishData() {
    axios.get(apiUrl,token)
      .then((res) => {
        api = res.data;
        renderList(api);
        deleteOne();
        deleteAll();
    })
}
getPublishData();

// 渲染畫面
function renderList(api){
    
    if (api.length == 0) {
        favoritesList.innerHTML = ` <div class="d-flex justify-content-center align-items-center">
                                        <p>這裡什麼都沒有，先去找找看有沒有喜歡的物件，再加入收藏單吧！ ¯\_(ツ)_/¯</p>
                                    </div>`;
        return;
    }

    let list = '';
    api.forEach(v => {

        // 鄰近交通陣列
        let trafficDiv = '';
        let trafficArr = v.rent.traffic ;
        trafficArr.forEach(function(i){
            trafficDiv += `<span class="me-3 px-1 bg-primary-200">近${i}</span>`;
        });

        list += `
            <div class="row p-1 rounded hover-primary-2">
                <div class="col-12 col-md-3 p-0 rounded-top rounded-md-start">
                <img
                    src="${v.rent.photo[0]}"
                    style="
                    width: auto;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    "
                    alt="house photo"
                    class="rounded-top rounded-md-start"
                />
                </div>
                <div
                class="col-12 col-md-9 py-3 px-5 border border-start-sm-0 bg-white rounded-bottom rounded-md-end"
                >
                <ul>
                    <li
                    class="w-100 d-flex justify-content-between align-items-center py-2"
                    >
                    <a href="rentArticle.html?id=${v.rent.id}" class="h3 link-dark"
                        >${v.rent.title}</a
                    >
                    <button
                        class="p-3 link-dark hover-primary border-0 rounded-3 d-flex justify-content-center align-items-center"
                    >
                        <span class="material-symbols-outlined delete-one-btn" data-id="${v.id}"
                        >close</span
                        >
                    </button>
                    </li>
                    <li class="pb-3">${v.rent.houseLayout} | ${v.rent['square Footage']}坪 | ${v.rent.floor}F/${v.rent.totalFloor}F</li>
                    <li class="pb-2">
                    <span
                        class="material-symbols-outlined pe-2"
                        style="transform: translateY(25%)"
                        >location_on</span
                    >${v.rent.address}${v.rent.district[0]}-${v.rent.district[1]}
                    </li>
                    <li class="pb-3">
                    <span
                        class="material-symbols-outlined pe-1"
                        style="transform: translateY(25%)"
                        >person</span
                    >
                    <span class="me-3 px-1 bg-primary-200">${v.rent.gender}</span
                    ><span class="me-3 px-1 bg-primary-200"
                        >${v.rent.canCooking ? '可開伙':'不可開伙'}</span
                    ><span class="me-3 px-1 bg-primary-200"
                        >${v.rent.canPet ? '可養寵物':'不可養寵物'}</span
                    >
                    </li>
                    <li class="pb-2">
                    <span
                        class="material-symbols-outlined pe-1"
                        style="transform: translateY(25%)"
                        >map</span>
                        ${trafficDiv}
                    </li>
                    <li class="pb-2 h2 text-secondary text-end">
                    ${v.rent.price.toLocaleString('zh-TW')}元/月
                    </li>
                    <li class="d-flex justify-content-between">
                    更新日期:${v.rent.updateDate}
                    <div>
                        <span
                        class="material-symbols-outlined"
                        style="transform: translateY(25%)"
                        >visibility</span
                        ><span class="ps-2">${v.rent.view}</span>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        `
    })
    favoritesList.innerHTML = list ;
}

// 刪除特定文章
function deleteOne(){
    let deleteOneBtn = document.querySelectorAll('.delete-one-btn');
    deleteOneBtn.forEach(v => {
        v.addEventListener('click',e => {
            let itemId = e.target.dataset.id;
            const apiUrl = `${url}/660/favorites/${itemId}`;
            axios.delete(apiUrl,token)
            .then(function (res) {
                api = res.data;
                Swal.fire({
                icon: 'success',
                title: '刪除成功!!',
                showConfirmButton: false,
                timer: 2000 
                });
                getPublishData();
            })
        })
    })
}

// 刪除全部文章
function deleteAll(){
    let deleteAllBtn = document.querySelector('.delete-all-btn');
    deleteAllBtn.addEventListener('click',e => {

        const ids = api.map(v => v.id);
        const maxId = Math.max(...ids);

        for (let i = 1; i <= maxId; i++) {
            const apiUrl = `${url}/660/favorites/${i}`;
            axios.delete(apiUrl,token)
            .then(function (res) {
                api = res.data;
                Swal.fire({
                    icon: 'success',
                    title: '全部刪除成功!!',
                    showConfirmButton: false,
                    timer: 2000 
                });
                getPublishData();
            })
        }
    })
}

// 時間排序
function sortdate(){

    let sortDirection = 'asc'; // 初始排序為升序

    filterDate.addEventListener('click', function (e) {
        axios.get(apiUrl, token)
        .then((res) => {
            api = res.data;

            const sortedData = api.sort((a, b) => {
                const dateA = new Date(a.rent.updateDate).getTime();
                const dateB = new Date(b.rent.updateDate).getTime();

                if (sortDirection === 'asc') {
                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;
                    return 0;
                } else {
                    if (dateA > dateB) return -1;
                    if (dateA < dateB) return 1;
                    return 0;
                }
            });
            renderList(sortedData);
            // 儲存排序狀態
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        })
    });
}
sortdate();

// 坪數排序
function sortSquare(){

    let sortDirection = 'asc'; // 初始排序為升序

    filterSquare.addEventListener('click', function (e) {
        axios.get(apiUrl, token)
        .then((res) => {
            api = res.data;

            const sortedData = api.sort((a, b) => {
                const squareA = a.rent['square Footage']; // 取得第一個項目的坪數
                const squareB = b.rent['square Footage']; // 取得第二個項目的坪數

                if (sortDirection === 'asc') {
                    if (squareA < squareB) return -1;
                    if (squareA > squareB) return 1;
                    return 0;
                } else {
                    if (squareA > squareB) return -1;
                    if (squareA < squareB) return 1;
                    return 0;
                }
            });
            renderList(sortedData);
            // 儲存排序狀態
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        })
    });
}
sortSquare();

// 租金排序
function sortPrice(){

    let sortDirection = 'asc'; // 初始排序為升序

    filterPrice.addEventListener('click', function (e) {
        axios.get(apiUrl, token)
        .then((res) => {
            api = res.data;

            const sortedData = api.sort((a, b) => {
                const priceA = a.rent.price; // 取得第一個項目的價格
                const priceB = b.rent.price; // 取得第二個項目的價格

                if (sortDirection === 'asc') {
                    if (priceA < priceB) return -1;
                    if (priceA > priceB) return 1;
                    return 0;
                } else {
                    if (priceA > priceB) return -1;
                    if (priceA < priceB) return 1;
                    return 0;
                }
            });
            renderList(sortedData);
            // 儲存排序狀態
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        })
    });
}
sortPrice();

