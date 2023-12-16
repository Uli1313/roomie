import axios from "axios";
//API網址
const webUrl = "https://roomie-lfta.onrender.com";
// userId、token
const userId = localStorage.getItem("userId");
const token = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
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
// 總樓層
const totalFloors = document.querySelector("#totalFloors");
// 房屋類型
const allHousingType = document.querySelectorAll(".housingType");
// 貼文標題
const articleTitle = document.querySelector("#articleTitle");
// 房屋坪數
const sizeofHouse = document.querySelector("#sizeofHouse");
// 格局
const layoutOfHouse = document.querySelector("#layoutOfHouse");
// 設備
const allEquipmentItem = document.querySelectorAll(".equipmentItem");
// 租金
const rent = document.querySelector("#rent");
// 押金
const deposit = document.querySelector("#deposit");
// 租金包含
const allBillItem = document.querySelectorAll(".billItem");
// 租金包含-管理費
const managementBill = document.querySelector("#managementBill");
// 管理費
const manageFee = document.querySelector("#manageFee");
// 最短租期
const minPeriod = document.querySelector("#minPeriod");
// 需求人數
const needPeople = document.querySelector("#needPeople");
// 室友身分
const allRoommateItem = document.querySelectorAll(".roommateItem");
// 室友性別
const allSexStatus = document.querySelectorAll(".sexStatus");
// 寵物
const allPetsStatus = document.querySelectorAll(".petsStatus");
// 開伙
const allCookStatus = document.querySelectorAll(".cookStatus");
// 室友年齡-最小
const minAge = document.querySelector("#minAge");
// 室友年齡-最大
const maxAge = document.querySelector("#maxAge");
// 可遷入日期
const datepicker = document.querySelector("#datepicker");
// 生活機能
const allLifeFunction = document.querySelectorAll(".lifeFunction");
// 附近交通-公車
const busStation = document.querySelector("#busStation");
// 附近交通-捷運站
const mrtStation = document.querySelector("#mrtStation");
// 附近交通-火車站
const trainStation = document.querySelector("#trainStation");
// 附近交通-高鐵站
const hightSpeedStation = document.querySelector("#hightSpeedStation");
// 其他事項
const somethingElse = document.querySelector("#somethingElse");
// 字數
const wordLength = document.querySelector("#wordLength");
// 照片上傳
const fileUploaderOne = document.querySelector(".fileUploaderOne");
const fileUploaderTwo = document.querySelector(".fileUploaderTwo");
const fileUploaderThree = document.querySelector(".fileUploaderThree");
const fileUploaderFour = document.querySelector(".fileUploaderFour");
const fileUploaderFive = document.querySelector(".fileUploaderFive");
// 聯絡資訊
const contactName = document.querySelector("#contactName");
const contactSexStatus = document.querySelectorAll(".contactSexStatus");
const contactPhoneNumber = document.querySelector("#contactPhoneNumber");
const contactEmail = document.querySelector("#contactEmail");
const contactLine = document.querySelector("#contactLine");
//是否刊登媒合成功頁面
const contactForSuccess = document.querySelectorAll(".contactForSuccess");
//草稿
const draftBtn = document.querySelector(".draftBtn");
//發表文章
const publishBtn = document.querySelector(".publishBtn");
//警告訊息
const allAlertMessage = document.querySelectorAll(".post-alert-message");

let regionTotalData;
let district = [];
let type = "";
let equipmentArr = [];
let priceContent = [];
let identity = [];
let roommateSex = "";
let canPets = false;
let canCooking = false;
let dataStr = "";
let lifeEquipment = [];
let traffic = [];
let somethingElseStr = "";
let imageTotalData = [];
let contact = {};
let agreePublish = false;
// 刊登狀態
let postState = "";
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
  let cityStr = `<option>縣市</option>`;
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
  let districtStr = `<option>行政區</option>`;
  regionTotalData.forEach((item) => {
    if (item.name === city) {
      item.districts.forEach((districtItem) => {
        districtStr += `<option  value="${districtItem}">${districtItem}</option>`;
      });
    }
  });
  districtRegion.innerHTML = districtStr;
}
// 警告訊息
function alertProcess(index, text) {
  const alertDisplay = Array.from(allAlertMessage)[index];
  let alertText = alertDisplay.children[0];
  if (text === "") {
    alertDisplay.style.display = "none";
    return;
  }
  alertDisplay.style.display = "flex";
  alertText.textContent = text;
}
// 判斷地址正確與否
function regionValueInspect() {
  if (
    cityRegion.value === "" ||
    cityRegion.value === "縣市" ||
    districtRegion.value === "" ||
    districtRegion.value === "行政區" ||
    pathRegion.value.trim() === "" ||
    laneRegion.value.trim() === ""
  ) {
    alertProcess(0, "縣市、行政區、路段/街、巷皆須完整填寫!");
    return false;
  }
  alertProcess(0);
  district.push(districtRegion.value);
  let addressStr = `${pathRegion.value}${laneRegion.value}`;
  if (alleyRegion.value !== "") {
    addressStr += `${alleyRegion.value}`;
  }
  if (numberRegion.value !== "") {
    addressStr += `${numberRegion.value}`;
  }
  district.push(addressStr);
  return true;
}
// 判斷樓層是否正確
function floorValueInspect() {
  if (floors.value.trim() === "") {
    alertProcess(1, "樓層須填寫!");
    return false;
  }
  if (totalFloors.value.trim() === "") {
    alertProcess(1, "總樓層須填寫!");
    return false;
  }
  alertProcess(1);
  return true;
}
// 判斷房屋類型
function roomTypeValueInspect() {
  const typeItemArr = Array.from(allHousingType);
  let state = false;
  typeItemArr.forEach((item) => {
    if (item.checked) {
      type = item.nextElementSibling.textContent;
      state = true;
    }
  });
  if (!state) {
    alertProcess(2, "請點選房屋類型!");
  } else {
    alertProcess(2);
  }
  return state;
}
// 判斷貼文標題
function titleValueInspect() {
  if (articleTitle.value.trim() === "") {
    alertProcess(3, "QAQ標題呢");
    return false;
  }
  alertProcess(3);
  return true;
}
// 判斷房屋坪數
function sizeValueInspect() {
  if (sizeofHouse.value.trim() === "") {
    alertProcess(4, "坪數需填寫唷!");
    return false;
  }
  alertProcess(4);
  return true;
}
// 判斷格局
function layoutValueInspect() {
  if (layoutOfHouse.value.trim() === "") {
    alertProcess(5, "格局需填寫唷!");
    return false;
  }
  alertProcess(5);
  return true;
}
// 判斷設備
function equipmentValueInspect() {
  const allEquipment = Array.from(allEquipmentItem);
  let state = true;
  if (allEquipment[allEquipment.length - 1].checked === true) {
    alertProcess(6);
    equipmentArr.push("無");
    return state;
  }
  equipmentArr = [];
  allEquipment.forEach((item) => {
    if (item.checked) {
      equipmentArr.push(item.nextElementSibling.textContent);
    }
  });
  if (equipmentArr.length === 0) {
    alertProcess(6, "請勾選一下~(沒有則是勾無)");
    state = false;
  } else {
    alertProcess(6);
  }
  return state;
}
// 判斷租金與押金
function feeValueInspect() {
  if (rent.value.trim() === "") {
    alertProcess(7, "是上天派來的天使嗎!");
    return false;
  }
  if (deposit.value === "押金") {
    alertProcess(7, "要選一或兩個月唷~");
    return false;
  }
  alertProcess(7);
  return true;
}
// 判斷租金包含
function priceContentValueInspect() {
  const allPriceContent = Array.from(allBillItem);
  let state = true;
  if (allPriceContent[allPriceContent.length - 1].checked === true) {
    alertProcess(8);
    priceContent.push("無");
    return state;
  }
  priceContent = [];
  allPriceContent.forEach((item) => {
    if (item.checked) {
      priceContent.push(item.nextElementSibling.textContent);
    }
  });
  if (priceContent.length === 0) {
    alertProcess(8, "請勾選一下~(沒有則是勾無)");
    state = false;
  } else {
    alertProcess(8);
  }
  return state;
}
// 判斷管理費
function manageFeeValueInspect() {
  const state = priceContent.some((item) => item === "管理費");
  if (!state) {
    alertProcess(9);
    return true;
  }
  if (manageFee.value.trim() === "") {
    alertProcess(9, "不填寫管委會會把你抓走!");
    return false;
  }
  if (isNaN(Number(manageFee.value))) {
    alertProcess(9, "請填寫數字~");
    return false;
  }
  alertProcess(9);
  return true;
}
// 判斷最短租期
function minPeriodValueInspect() {
  if (minPeriod.value === "時間") {
    alertProcess(10, "請填寫時間!");
    return false;
  }
  alertProcess(10);
  return true;
}
// 判斷需求人數
function needPeopleValueInspect() {
  if (needPeople.value.trim() === "") {
    alertProcess(11, "都來找合租了沒有人數合理嗎QAQ");
    return false;
  }
  alertProcess(11);
  return true;
}
// 判斷室友身分
function roommateValueInspect() {
  const roommateArr = Array.from(allRoommateItem);
  identity = [];
  roommateArr.forEach((item) => {
    if (item.checked) {
      identity.push(item.nextElementSibling.textContent);
    }
  });
  return true;
}
// 判斷室友性別
function sexStatusValueInspect() {
  const sexStatusArr = Array.from(allSexStatus);
  sexStatusArr.forEach((item) => {
    if (item.checked) {
      roommateSex = item.nextElementSibling.textContent;
    }
  });
  return true;
}
// 判斷寵物
function petsValueInspect() {
  const petStatusArr = Array.from(allPetsStatus);
  if (!petStatusArr.some((item) => item.checked)) {
    alertProcess(12, "請點選可以/不行~");
    return false;
  }
  alertProcess(12);
  if (petStatusArr[0].checked) {
    canPets = true;
  } else {
    canPets = false;
  }
  return true;
}
// 判斷開伙
function cookValueInspect() {
  const cookStatusArr = Array.from(allCookStatus);
  if (!cookStatusArr.some((item) => item.checked)) {
    alertProcess(13, "請點選可以/不行~");
    return false;
  }
  alertProcess(13);
  if (cookStatusArr[0].checked) {
    canCooking = true;
  } else {
    canCooking = false;
  }
  return true;
}
// 判斷室友年齡
function ageValueInspect() {
  const min = Number(minAge.value);
  const max = Number(maxAge.value);
  if (isNaN(min) || isNaN(max)) {
    alertProcess(14, "請填寫數字~");
    return false;
  }
  if (min > max) {
    alertProcess(14, "從低到高填~");
    return false;
  }
  if (min < 18 || max > 100) {
    alertProcess(14, "填18~100歲");
    return false;
  }
  alertProcess(14);
  return true;
}
// 判斷遷入日期
function dateValueInspect() {
  const dateArr = datepicker.value.split("/");
  if (dateArr.length === 1) {
    alertProcess(15, "總是要讓人知道日期吧!(握拳");
    return false;
  }
  alertProcess(15);
  dataStr = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  return true;
}
// 判斷生活機能
function lifeFunctionValueInspect() {
  const lifeFunction = Array.from(allLifeFunction);
  lifeEquipment = [];
  lifeFunction.forEach((item) => {
    if (item.checked) {
      lifeEquipment.push(item.nextElementSibling.textContent);
    }
  });
  return true;
}
// 判斷附近交通
function stationValueInspect() {
  traffic = [];
  let arr = [busStation, mrtStation, trainStation, hightSpeedStation];
  arr.forEach((item) => {
    if (item.value.trim() !== "") {
      traffic.push(`${item.value}${item.nextElementSibling.textContent}`);
    }
  });
  return true;
}
// 判斷其他事項
function descriptionValueInspect() {
  somethingElseStr = somethingElse.value.trim();
  return true;
}
// 判斷照片上傳
async function pictureValueInspect() {
  let arr = [
    fileUploaderOne,
    fileUploaderTwo,
    fileUploaderThree,
    fileUploaderFour,
    fileUploaderFive,
  ];
  if (arr.some((item) => item.files[0] === undefined)) {
    alertProcess(
      17,
      "不想讓大家看房間增加租客嗎!想嘛，所以請把五張照片發好發滿唷"
    );
    return false;
  }
  // 使用 Promise.all 確保所有圖片都上傳完成
  await Promise.all(
    arr.map(async (item) => {
      if (item.files[0] !== undefined) {
        if (item.files[0].type.startsWith("image/")) {
          await postPicture(item);
        }
      }
    })
  );
  alertProcess(17);
  return true;
}
function postPicture(item) {
  return new Promise((resolve, reject) => {
    const filePicture = item.files[0];
    let fileReader = new FileReader();
    const pictureTotalData = {};

    fileReader.onload = (e) => {
      const fileName = filePicture.name;
      const fileType = filePicture.type;
      const base64Data = e.target.result.split(",")[1]; // 取得 Base64 字符串
      pictureTotalData.fileName = fileName;
      pictureTotalData.fileType = fileType;
      pictureTotalData.base64Data = base64Data;

      updatePhoto(pictureTotalData)
        .then(() => resolve())
        .catch((error) => reject(error));
    };
    fileReader.readAsDataURL(filePicture);
  });
}
function updatePhoto(pictureTotalData) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://script.google.com/macros/s/AKfycbySmWyqFenx525ANUQtipn-TwPUDdThAWhaXkcCrfyS5nAeAqdo_I3kprq6H5zUTXzI/exec",
        pictureTotalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log();
        const imgURL = response.data.split("file/d/")[1].split("/view?")[0];
        imageTotalData.push(
          `https://drive.google.com/uc?export=view&id=${imgURL}`
        );
        resolve();
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}
// 判斷聯絡姓名
function contactNameValueInspect() {
  const name = contactName.value.trim();
  const infoSexArr = Array.from(contactSexStatus);
  let arr = [];
  if (name === "" || !infoSexArr.some((item) => item.checked)) {
    alertProcess(18, "這樣如何叫你啦?");
    return false;
  }
  if (name.split("").length > 2) {
    alertProcess(18, "填姓氏不是名字!");
    return false;
  }
  alertProcess(18);
  arr.push(name);
  infoSexArr.forEach((item) => {
    if (item.checked) {
      arr.push(item.nextElementSibling.textContent);
    }
  });
  contact["person"] = arr;
  return true;
}
// 判斷聯絡電話
function contactPhoneValueInspect() {
  const phone = contactPhoneNumber.value.trim();
  if (phone === "") {
    alertProcess(19, "請留下電話QAQ(跪");
    return false;
  }
  alertProcess(19);
  contact["phone"] = phone;
  return true;
}
// 判斷聯絡信箱
function contactEmailValueInspect() {
  const email = contactEmail.value.trim();
  if (email === "") {
    alertProcess(20, "發送前請留下信箱吧!");
    return false;
  }
  alertProcess(20);
  contact["email"] = email;
  return true;
}
// 判斷聯絡Line
function contactLineValueInspect() {
  const line = contactLine.value.trim();
  contact["line"] = line;
  return true;
}
// 判斷刊登媒合成功
function contactForSuccessValueInspect() {
  if (!Array.from(contactForSuccess).some((item) => item.checked)) {
    alertProcess(21, "不同意沒關係 真的沒關係，但還是要點唷");
    return;
  }
  Array.from(contactForSuccess).forEach((item) => {
    if (item.checked) {
      const agreeText = item.nextElementSibling.textContent;
      if (agreeText === "同意") {
        agreePublish = true;
      } else {
        agreePublish = false;
      }
    }
  });
  alertProcess(21);
  return true;
}
// 發表文章監聽
publishBtn.addEventListener("click", async (e) => {
  if ((await formValueCheck()) === true) {
    postState = "刊登中";
    addPost();
    addContactInfo();
    gotoPostsPage();
  }
});
// 草稿文章監聽
draftBtn.addEventListener("click", async (e) => {
  if ((await formValueCheck()) === true) {
    postState = "草稿";
    addPost();
    addContactInfo();
    gotoPostsPage();
  }
});
// 確認表單資料都正確
async function formValueCheck() {
  let arr = [];
  arr.push(regionValueInspect());
  arr.push(floorValueInspect());
  arr.push(roomTypeValueInspect());
  arr.push(titleValueInspect());
  arr.push(sizeValueInspect());
  arr.push(layoutValueInspect());
  arr.push(equipmentValueInspect());
  arr.push(feeValueInspect());
  arr.push(priceContentValueInspect());
  arr.push(manageFeeValueInspect());
  arr.push(minPeriodValueInspect());
  arr.push(needPeopleValueInspect());
  arr.push(roommateValueInspect());
  arr.push(sexStatusValueInspect());
  arr.push(petsValueInspect());
  arr.push(cookValueInspect());
  arr.push(ageValueInspect());
  arr.push(dateValueInspect());
  arr.push(lifeFunctionValueInspect());
  arr.push(stationValueInspect());
  arr.push(descriptionValueInspect());
  arr.push(await pictureValueInspect());
  arr.push(contactNameValueInspect());
  arr.push(contactPhoneValueInspect());
  arr.push(contactEmailValueInspect());
  arr.push(contactLineValueInspect());
  arr.push(contactForSuccessValueInspect());
  if (arr.every((item) => item === true)) {
    return true;
  }
}
// 管理費監聽
managementBill.addEventListener("click", (e) => {
  if (!e.target.checked) {
    manageFee.setAttribute("disabled", "disabled");
    return;
  }
  manageFee.removeAttribute("disabled");
});
// 其他事項數字監聽
somethingElse.addEventListener("input", (e) => {
  let strLength = somethingElse.value.split("").length;
  const maxLength = 500;
  if (strLength > maxLength) {
    // somethingElse.setAttribute("disabled", "disabled");
    somethingElse.value = somethingElse.value.substring(0, maxLength);
    alertProcess(16, "字數已達標，斟酌一下啦(拜託");
    return;
  } else {
    alertProcess(16);
    wordLength.textContent = somethingElse.value.split("").length;
  }
});
// 發文時間
function presentTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
// 發表貼文、草稿
function addPost() {
  const data = {
    userId: Number(userId),
    status: `${postState}`,
    updateDate: `${presentTime()}`,
    soldDate: "",
    view: 0,
    address: `${cityRegion.value}`,
    district: district,
    floor: Number(floors.value.trim()),
    totalFloor: Number(totalFloors.value.trim()),
    type: `${type}`,
    title: `${articleTitle.value.trim()}`,
    "square Footage": Number(sizeofHouse.value.trim()),
    houseLayout: `${layoutOfHouse.value.trim()}`,
    equipment: equipmentArr,
    price: Number(rent.value.trim()),
    deposit: `${deposit.value}`,
    priceInclude: priceContent,
    manageFee: Number(manageFee.value.trim()),
    minPeriod: `${minPeriod.value}`,
    needPartner: Number(needPeople.value.trim()),
    identity: identity,
    gender: `${roommateSex}`,
    canPet: canPets,
    canCooking: canCooking,
    minAge: Number(minAge.value.trim()),
    maxAge: Number(maxAge.value.trim()),
    moveInDate: `${dataStr}`,
    lifeEquipment: lifeEquipment,
    traffic: traffic,
    intro: `${somethingElseStr}`,
    photo: imageTotalData,
    agreePublish: agreePublish,
  };
  axios
    .post(`${webUrl}/600/rents`, data, token)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
}
// 發文者身分
function addContactInfo() {
  let data = {
    person: [`${contact.person[0]}`, `${contact.person[1]}`],
    phone: `${contact.phone}`,
    email: `${contact.email}`,
    line: `${contact.line}`,
  };
  axios
    .patch(
      `${webUrl}/600/users/${userId}`,
      {
        contact: data,
      },
      token
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
}
// 跳轉發文列表
function gotoPostsPage() {
  setTimeout(() => {
    window.location.href = "https://uli1313.github.io/roomie/user_posts.html";
  }, 3000);
}
