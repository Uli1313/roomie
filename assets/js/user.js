import { loading } from './loading';
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "https://roomie-lfta.onrender.com";
// const baseUrl = "http://localhost:3000";
const localUserId = localStorage.getItem("userId");
const localUserToken = localStorage.getItem("token");
const token = {
  headers: {
    Authorization: `Bearer ${localUserToken}`,
  },
};
const nickNameInput = document.querySelector("#nickName");
const nameInput = document.querySelector("#name");
const genderMale = document.querySelector("#genderMale");
const genderFemal = document.querySelector("#genderFemal");
const phoneInput = document.querySelector("#phone");
const lineInput = document.querySelector("#line");

function init() {
  getUserInfo();
  getdashboard();
}
init();

let user;
// 從 API 取得用戶資訊
async function getUserInfo() {
  try {
    const apiPath = `/600/users/${localUserId}`;
    const apiUrl = `${baseUrl}${apiPath}`;
    const response = await axios.get(apiUrl, token);
    user = response.data;

    // 把原始資料渲染至畫面
    renderData();

  } catch (err) {
    console.log(err);
    if (err.response.status === 401 || err.response.statusText === 'Unauthorized') {
      // 登入過期要回到登入頁
      const needBack = ['user.html', 'user_posts.html', 'user_favorites.html', 'user_messages.html']
      if (needBack.some(pageName => location.pathname.match(pageName))) {
        const swal = Swal.fire({
          icon: "warning",
          title: "請重新登入",
          scrollbarPadding: false,
          didClose: () => {
            clearUserInfo();
            location.href = 'login.html';
          }
        });
      }
    }
  }
}

// 在頁面上渲染用戶資料
function renderData() {
  if (nickNameInput && nameInput && genderMale && genderFemal && phoneInput && lineInput) {
    nickNameInput.value = user.nickname;
    nameInput.value = user.name;
    phoneInput.value = user.phone;
    lineInput.value = user.line;

    document.getElementById("userNickName").textContent = user.nickname;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("signupEmail").value = user.email;
    document.getElementById("userPhoto").src = user.photo;
    document.getElementById("phone").textContent = user.phone;
    document.getElementById("line").textContent = user.line;
    document.getElementById("aboutMe").textContent = user.about;

    if (user.gender === "male") {
      genderMale.checked = true;
    } else {
      genderFemal.checked = true;
    }
  }
}

// 編輯用戶資訊
const infoEditBtn = document.querySelector(".infoEdit-btn");
const infoSaveBtn = document.querySelector(".infoSave-btn");
const inputFields = document.querySelectorAll(".editable-input");
const aboutMeTextarea = document.querySelector("#aboutMe");
const updateFile = document.querySelector('#updateFile');
const selectFile = document.querySelector('.selectFile');
const imageData = {};
const toggleEditState = (editable, readOnly, disabled) => {
  editable.forEach((inputElement) => {
    inputElement[readOnly ? "setAttribute" : "removeAttribute"](
      "readonly",
      readOnly
    );
    inputElement.value = inputElement.value.trim();
  });
  genderMale.disabled = disabled;
  genderFemal.disabled = disabled;
  aboutMeTextarea.readOnly = readOnly;
};
// 修改用戶資訊
const updateUser = async (data, useNewSwal = false) => {
  try {
    const res = await axios.patch(`${baseUrl}/users/${localUserId}`, data);
    !useNewSwal &&
      Swal.fire({
        scrollbarPadding: false,
        icon: "success",
        title: "修改成功",
        showCancelButton: false,
        timer: 1500,
      });
    // console.log(res.data)
    return res.data;
  } catch (err) {
    console.error(err);
    throw err; // 將錯誤重新拋出，以便其他部分處理
  }
};

infoEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleEditState(inputFields, false, false);
  infoEditBtn.classList.add("d-none");
  infoSaveBtn.classList.remove("d-none");
  selectFile.classList.remove("d-none");
});

infoSaveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  toggleEditState(inputFields, true, true);

  const formData = {
    nickname: nickNameInput.value.trim(),
    name: nameInput.value.trim(),
    gender: genderMale.checked ? "male" : "female",
    about: aboutMeTextarea.value.trim(),
    photo: imageData.base64Image,
    contact: {
      person: [
        "",
        ""
      ],
      email: "",
      phone: phoneInput.value.trim(),
      line: lineInput.value.trim()
    },
    phone: phoneInput.value.trim(),
    line: lineInput.value.trim()
  };

  // 更新用戶資訊到伺服器
  const updatedUserData = await updateUser(formData);
  // 用最新的資料從伺服器更新本地端的用戶物件
  user = { ...user, ...updatedUserData };

  infoEditBtn.classList.remove("d-none");
  infoSaveBtn.classList.add("d-none");
  selectFile.classList.add("d-none");
});
// 上傳圖片
updateFile.addEventListener('change', (e) => {
  const selectFile = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const base64Data = e.target.result;
    imageData.base64Image = base64Data;
    imageData.fileName = selectFile.name;

    let imgDom = document.getElementById('userPhoto');
    imgDom.src = imageData.base64Image;
  };
  reader.readAsDataURL(selectFile);
});

// 取得發文/收藏/留言數量
let rentsData = [];
let favsData = [];
let commentsData = [];
function getdashboard() {
  // 發文
  axios.get(`${baseUrl}/rents?userId=${localUserId}`)
    .then((res) => {
      rentsData = res.data;
      renderdashboard(rentsData, favsData, commentsData)
    })
    .catch((err) => {
      console.log((err))
    })
  // 收藏
  axios.get(`${baseUrl}/favorites?userId=${localUserId}`)
    .then((res) => {
      favsData = res.data;
      renderdashboard(rentsData, favsData, commentsData)
    })
    .catch((err) => {
      console.log((err))
    })
  // 留言
  axios.get(`${baseUrl}/qas?userId=${localUserId}`)
    .then((res) => {
      commentsData = res.data;
      renderdashboard(rentsData, favsData, commentsData)
    })
    .catch((err) => {
      console.log((err))
    })
}
getdashboard()
// 渲染發文/收藏/留言數量
const postsNum = document.querySelector('.postsNum');
const favsNum = document.querySelector('.favsNum');
const commentsNum = document.querySelector('.commentsNum');
function renderdashboard(rentsData, favsData, commentsData) {
  postsNum.textContent = rentsData.length;
  favsNum.textContent = favsData.length;
  commentsNum.textContent = commentsData.length;
}

// 變更密碼表單
const changePwdForm = document.querySelector("#changePwdForm");

changePwdForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});
// 修改密碼
function patchPwd(password) {
  axios
    .patch(
      `${baseUrl}/600/users/${localUserId}`,
      {
        password: password,
      },
      token
    )
    .then((res) => {
      changePwdForm.reset();
      const swal = Swal.fire({
        icon: "success",
        title: "變更密碼成功",
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          clearUserInfo();
          location.href = "login.html";
        },
      });
      changePwdForm.classList.remove("was-validated");
    })
    .catch((err) => {
      console.log(err);
    });
}
function checkInputs() {
  const nowPwd = document.querySelector("#nowPwd");
  const setNewPwd = document.querySelector("#setNewPwd");
  const rePwd = document.querySelector("#rePwd");
  const nowPwdValue = nowPwd.value.trim();
  const setNewPwdValue = setNewPwd.value.trim();
  const rePwdValue = rePwd.value.trim();

  if (nowPwdValue === "") {
    setErrorFor(nowPwd, "欄位不得為空");
  } else {
    setSuccessFor(nowPwd);
  }
  if (setNewPwdValue === "") {
    setErrorFor(setNewPwd, "欄位不得為空");
  } else if (isConsecutive(setNewPwdValue) || isWeakPassword(setNewPwdValue)) {
    setErrorFor(setNewPwd, "密碼不安全");
  } else {
    setSuccessFor(setNewPwd);
  }
  if (rePwdValue === "") {
    setErrorFor(rePwd, "欄位不得為空");
  } else if (setNewPwdValue !== rePwdValue) {
    setErrorFor(rePwd, "密碼不一致");
  } else if (setNewPwdValue === rePwdValue) {
    patchPwd(setNewPwdValue);
    return;
  }
}
function setErrorFor(input, message) {
  const formFloating = input.parentElement;
  const errTxt = formFloating.querySelector(".invalid-feedback");
  errTxt.innerText = message;
  formFloating.classList.add("was-validated");
}
function setSuccessFor(input) {
  const formFloating = input.parentElement;
  formFloating.classList.add("was-validated");
}

// 檢查密碼是否包含連續數字或字母的函數
function isConsecutive(password) {
  const consecutiveRegex =
    /123456|234567|345678|456789|567890|abcdefghijklmnopqrstuvwxyz|zyxwvutsrqponmlkjihgfedcba/i;
  return consecutiveRegex.test(password);
}

// 檢查弱密碼（少於6個字符）
function isWeakPassword(password) {
  return password.length < 6;
}

function clearUserInfo() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}
