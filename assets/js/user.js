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

function init() {
  getUserInfo();
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
    updateLocalStorage(); // 用最新的用戶資料更新 localStorage
    renderData();
  } catch (err) {
    console.log(err);
  }
}

// 用最新的用戶資料更新 localStorage
function updateLocalStorage() {
  localStorage.setItem("user", JSON.stringify(user));
}

// 從 localStorage 載入用戶資料
function loadUserFromLocalStorage() {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user = JSON.parse(storedUser);
    renderData();
  }
}

// 初始檢查 localStorage 是否有用戶資料
loadUserFromLocalStorage();

// 在頁面上渲染用戶資料
function renderData() {
  if (nickNameInput && nameInput && genderMale && genderFemal) {
    nickNameInput.value = user.nickname;
    nameInput.value = user.name;

    document.getElementById("userNickName").textContent = user.nickname;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("signupEmail").value = user.email;

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
});

infoSaveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  toggleEditState(inputFields, true, true);

  const formData = {
    nickname: nickNameInput.value.trim(),
    name: nameInput.value.trim(),
    gender: genderMale.checked ? "male" : "female",
    about: aboutMeTextarea.value.trim(),
  };

  // 更新用戶資訊到伺服器
  const updatedUserData = await updateUser(formData);
  // 用最新的資料從伺服器更新本地端的用戶物件
  user = { ...user, ...updatedUserData };
  // 用最新的用戶資料更新 localStorage
  updateLocalStorage();

  infoEditBtn.classList.remove("d-none");
  infoSaveBtn.classList.add("d-none");
});

// 變更密碼
const changePwdForm = document.querySelector("#changePwdForm");
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
      alert("成功");
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}
changePwdForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nowPwd = document.querySelector("#nowPwd");
  const setNewPwd = document.querySelector("#setNewPwd");
  const rePwd = document.querySelector("#rePwd");

  if (
    nowPwd.value.trim() === "" ||
    setNewPwd.value.trim() === "" ||
    rePwd.value.trim() === ""
  ) {
    alert("欄位不得為空");
  } else if (setNewPwd.value.trim() !== rePwd.value.trim()) {
    alert("密碼不一致");
  } else if (setNewPwd.value.trim() === rePwd.value.trim()) {
    patchPwd(setNewPwd.value);
  }
});
