import axios from "axios";
//API網址
const webUrl = "http://localhost:3000";
// 宣告變數
const confirmEmailBtn = document.querySelector(".confirmEmail");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const inputConfirmPassword = document.querySelector("#inputConfirmPassword");
const rulesChecked = document.querySelector("#rulesChecked");
let passwordArr = [];
let allTrueArr = [];
console.log(rulesChecked.checked);
// 不符合規定時顯示警告
function alertContext(inputState, context) {
  inputState.parentElement.children[2].style.display = "flex";
  inputState.parentElement.children[2].children[0].children[0].textContent = `${context}`;
}
//判斷Password是否正確
function passwordInspect(inputState, password) {
  let state = false;
  // 判斷是否為連續超過7個數字或英文
  if (!/^[a-zA-Z0-9]{8,}$/.test(password)) {
    state = true;
  } else {
    // 判斷是否大於等於6或小於等於12
    if (password.length < 6 || password.length > 12) {
      state = true;
    }
  }
  if (inputState === inputConfirmPassword && password !== passwordArr[0]) {
    state = true;
  } else if (inputState === inputPassword && state === false) {
    passwordArr.push(password);
  } else {
    passwordArr = [];
  }
  return state;
}
//判斷Email是否正確
function emailInspect(email) {
  const emailArr = ["gmail.com", "yahoo.com.tw"];
  let state = false;
  function emailSomeLoop() {
    for (let i = 0; i < emailArr.length; i++) {
      if (emailArr[i] === email[1]) {
        return false;
      }
    }
    return true;
  }
  if (
    email.length !== 2 ||
    email.some((item) => {
      return item === "";
    }) ||
    emailSomeLoop()
  ) {
    state = true;
  }
  return state;
}
// 判斷輸入是否錯誤
function inputInspect(inputState, value) {
  const valueTrim = value.trim();
  console.log(typeof valueTrim);
  if (valueTrim === "") {
    alertContext(inputState, "請勿空白!");
    return false;
  } else if (inputState === inputEmail && emailInspect(valueTrim.split("@"))) {
    alertContext(inputState, "請填寫正確信箱!");
    return false;
  } else if (
    (inputState === inputPassword || inputState === inputConfirmPassword) &&
    passwordInspect(inputState, valueTrim)
  ) {
    alertContext(inputState, "請填寫正確密碼!");
    return false;
  } else {
    inputState.parentElement.children[2].style.display = "none";
    return valueTrim;
  }
}
//確認是否註冊過
async function checkUserInfo(email) {
  try {
    const res = await axios.get(webUrl + "/users");
    const dataEmail = res.data;

    let state = true;

    dataEmail.forEach((item) => {
      if (item.email === email) {
        alertContext(inputEmail, "這個帳號已經註冊過");
        state = false;
      }
    });

    console.log("state", state);
    return state;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return false; // 或者返回一個錯誤狀態
  }
}
// 確認
// 確認輸入監聽
confirmEmailBtn.addEventListener("click", async (e) => {
  const signUpArr = [inputEmail, inputPassword, inputConfirmPassword];
  signUpArr.forEach(async (item) => {
    if (item === inputEmail) {
      if (typeof inputInspect(item, item.value) === String) {
        const email = inputInspect(item, item.value);
        console.log("等待結果" + (await checkUserInfo(email)));
      }
    } else {
      allTrueArr.push(inputInspect(item, item.value));
    }
  });
  console.log(allTrueArr);
});
