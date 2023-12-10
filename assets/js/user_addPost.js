import axios from "axios";
//API網址
const webUrl = "https://roomie-lfta.onrender.com";
// 設定變數
// 縣市
const cityRegion = document.querySelector("#cityRegion");
// 行政區
const districtRegion = document.querySelector("#districtRegion");
// 路、街
const pathRegion = document.querySelector("#pathRegion");
// 巷
const laneRegion = document.querySelector("#laneRegion");
// 弄
const alleyRegion = document.querySelector("#alleyRegion");
// 號
const numberRegion = document.querySelector("#numberRegion");
// 樓層
const floors = document.querySelector("#floors");
// 房屋類型
const allHousingType = document.querySelectorAll(".housingType");
// console.log(Array.from(allHousingType)[0].checked);
// 貼文標題
const articleTitle = document.querySelector("#articleTitle");
// 房屋坪數
const sizeofHouse = document.querySelector("#sizeofHouse");
// 格局
const layoutofHouse = document.querySelector("#layoutofHouse");
// 設備
const allEquipmentItem = document.querySelectorAll(".equipmentItem");
// console.log(Array.from(allEquipmentItem)[0].nextElementSibling.textContent);

let regionTotalData;

// 縣市、行政區複選篩選
axios
  .get(
    "https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json"
  )
  .then(function (res) {
    let apiData = res.data;
    // 處理資料 => {name: '臺北市', districts: Array(12)}   Array(12):[['中正區', '大同區', '中山區'...]
    let data = apiData.map(function (item) {
      return {
        name: item.name,
        districts: item.districts.map(function (district) {
          return district.name;
        }),
      };
    });
    // 處理資料，因為多了海南島跟釣魚台，把這兩個縣除去掉
    regionTotalData = data.filter(
      (item) => item.name !== "釣魚臺" && item.name !== "南海島"
    );
    addCity();
  });

// 縣市列印
function addCity() {
  let cityStr = `<option value="縣市">縣市</option>`;
  regionTotalData.forEach((item) => {
    cityStr += `<option  value="${item.name}">${item.name}</option>`;
  });
  cityRegion.innerHTML = cityStr;
}

// 縣市監聽&呼叫行政區出來
cityRegion.addEventListener("change", (e) => {
  addDistrict(e.target.value);
});

// 行政區列印
function addDistrict(city) {
  let districtStr = `<option value="行政區">行政區</option>`;
  regionTotalData.forEach((item) => {
    if (item.name === city) {
      item.districts.forEach((districtItem) => {
        districtStr += `<option  value="${districtItem}">${districtItem}</option>`;
      });
    }
  });
  districtRegion.innerHTML = districtStr;
}
