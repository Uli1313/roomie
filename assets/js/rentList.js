import axios from 'axios';

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




// 縣市、行政區複選篩選
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
    
    // 用foreach去跑每一個縣市，當點擊任一縣市，就會跑出對應的行政區
    countyCity.forEach(function(radio) {
        
        // 點擊事件
        radio.addEventListener('change', function(e) {
            
            if (e.target.checked) {

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
                
                
            }
        });  
    });

    let row = document.querySelector('#row');
    let cityRadio = document.querySelectorAll('.cityRadio');
    let districtCheckbox = document.querySelectorAll('.districtCheckbox');
    let priceRadio = document.querySelectorAll('.priceRadio');
    let houseCheckbox = document.querySelectorAll('.houseCheckbox');
    let otherCheckbox = document.querySelectorAll('.otherCheckbox');
    let nowCity = '' ;
    let nowDistict = '' ;
    let cityData = [] ;
    let districtData = [] ;
    

    row.addEventListener('change',function(e){

        if (e.target.checked){

            const labelElement = document.querySelector(`label[for='${e.target.id}']`); 
            const labelText = (labelElement.textContent).trim();
            

            if (e.target.type === 'radio' && e.target.classList.contains('cityRadio')) {
                axios.get(`http://localhost:3000/rents?q=${labelText}`)
                .then(function(res){
                    cityData = res.data ;
                    nowCity = labelText ;
                    console.log(cityData);




                    
                })
            } else if (e.target.type === 'checkbox' && e.target.classList.contains('districtCheckbox') ) {
                axios.get(`http://localhost:3000/rents?q=${labelText}`)
                .then(function(res){
                    let filterdata = res.data.filter( (v) => v.address[0] === e.target.value)
                    districtData.push(filterdata);
                    nowDistict = labelText ;
                    console.log(districtData.flat());
                    
                    
                })

            } else if (e.target.type === 'radio' && e.target.classList.contains('priceRadio')) {
                axios.get(`http://localhost:3000/rents?${e.target.dataset.price}`)
                .then(function(res){
    
                    if (nowCity == ''){
                        console.log(res.data);
                    } else {
                        let filterdata = res.data.filter( (v) => v.address[0] == nowCity && v.address[1] == nowDistict)
                        console.log(filterdata);
                    }
                    




                    
                })

            } else if (e.target.type === 'checkbox' && e.target.classList.contains('houseCheckbox')) {
            }
            
        }
        
        
    });
    // // 處理行政區渲染畫面的地方函示
    // let radioArr = [] ;
    // let checkboxArr = [];
    


    // // 選取所有 checkbox、radio
    // let selectBox = document.querySelectorAll('.selectBox');
    // let eventArr = Array.from(selectBox);
    

    // eventArr.forEach(item => {
    //     item.addEventListener('change', function(e) {
    //         const labelElement = document.querySelector(`label[for='${e.target.id}']`); 
    //         const labelText = (labelElement.textContent).trim();
            
    //             if (e.target.checked) {
                    
    //                 if (item.type == 'radio') {
    //                     if (labelText === '不限') {
                            
    //                             axios.get(`http://localhost:3000/rents?_sort=price&_order=desc`)
    //                             .then(function(res){
    //                                 radioArr = [] ;
    //                                 radioArr.push(res.data);
    //                                 console.log(radioArr);
                                    
                                    
    //                             })
                            
    //                     } else if (labelText === '5,000 - 10,000 元') {
                            
    //                             axios.get(`http://localhost:3000/rents?price_gte=5000&price_lte=10000`)
    //                             .then(function(res){
    //                                 radioArr = [] ;
    //                                 radioArr.push(res.data);
    //                                 console.log(radioArr);
    //                             })
                            
    //                     } else if (labelText === '10,000 - 20,000 元') {
                            
    //                             axios.get(`http://localhost:3000/rents?price_gte=10000&price_lte=20000`)
    //                             .then(function(res){
    //                                 radioArr = [] ;
    //                                 radioArr.push(res.data);
    //                                 console.log(radioArr);
                                    
    //                             })
                            
    //                     } else if (labelText === '20,000 - 30,000 元') {
                            
    //                             axios.get(`http://localhost:3000/rents?price_gte=20000&price_lte=30000`)
    //                             .then(function(res){
    //                                 radioArr = [] ;
    //                                 radioArr.push(res.data);
    //                                 console.log(radioArr);
                                    
    //                             })
                            
    //                     } else if (labelText === '30,000 元以上') {
                            
    //                             axios.get(`http://localhost:3000/rents?price_gte=30000`)
    //                             .then(function(res){
    //                                 radioArr = [] ;
    //                                 radioArr.push(res.data);
    //                                 console.log(radioArr);
                                    
    //                             })
                            
    //                     } else {
    //                             axios.get(`http://localhost:3000/rents?q=${labelText}`)
    //                             .then(function(res){
    //                                 radioArr = [] ;
    //                                 checkboxArr = [] ;
    //                                 radioArr.push(res.data);
    //                                 console.log(radioArr);

    //                                 document.querySelector('.districtList').addEventListener('change', function(e) {
            
    //                                     const target = e.target;
    //                                     if (target.classList.contains('selectBox')) {
    //                                         const district = target.nextElementSibling.textContent.trim();

    //                                         if (e.target.checked) {

    //                                             if (target.type === 'checkbox') {
                                
    //                                                 if (district) {
    //                                                     axios.get(`http://localhost:3000/rents?q=${district}`)
    //                                                     .then(function(res){
    //                                                         // checkboxArr.push(res.data);
    //                                                         // let newArr = radioArr.concat(checkboxArr).flat();
    //                                                         console.log(res.data);
    //                                                         api = res.data;
    //                                                         let filterData = api.filter(v => v.address[0].includes(labelText));
    //                                                         console.log(filterData);

    //                                                     })
    //                                                 }
                                                    
    //                                             }
    //                                         }
                                            
                                            
    //                                     }
    //                                 });


                                    
    //                             })

                                
                            
                                
                            
    //                     }
                        
    //                 }

    //                 if (item.type == 'checkbox') {
    //                     if (labelText === '可養寵物') {
                            
    //                             axios.get(`http://localhost:3000/rents?canPet=true`)
    //                             .then(function(res){
    //                                 checkboxArr.push(res.data);
    //                                 console.log(checkboxArr)
                                    
    //                             })
                            

    //                     } else if (labelText === '可開伙') {
                            
    //                             axios.get(`http://localhost:3000/rents?canCooking=true`)
    //                             .then(function(res){
    //                                 checkboxArr.push(res.data);
    //                                 console.log(checkboxArr)
                                    
    //                             })
                            
                        
    //                     } else {
                            
    //                             axios.get(`http://localhost:3000/rents?q=${labelText}`)
    //                             .then(function(res){
    //                                 checkboxArr.push(res.data);
    //                                 console.log(checkboxArr)
                                    
    //                             })

    //                     }
                        
    //                 }
    //             } 
    //     });
    // });


});












  
