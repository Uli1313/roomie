import axios from "axios";
import { tree } from "d3";
//API網址
const webUrl = "https://roomie-lfta.onrender.com";
// const webUrl = "http://localhost:3000";
// 宣告變數
const confirmEmailBtn = document.querySelector(".confirmEmail");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const inputConfirmPassword = document.querySelector("#inputConfirmPassword");
const rulesChecked = document.querySelector("#rulesChecked");
const inputSecurityCode = document.querySelector("#inputSecurityCode");
const confirmSecurityCodeBtn = document.querySelector(".confirmSecurityCode");
let passwordArr = [];
let allTrueArr = [];
let securityCode;

// 判斷輸入是否錯誤
function inputInspect(inputState, value) {
  const valueTrim = value.trim();
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
// 不符合規定時顯示警告
function alertContext(inputState, context) {
  inputState.parentElement.children[2].style.display = "flex";
  inputState.parentElement.children[2].children[0].children[0].textContent = `${context}`;
}
//判斷Password是否正確
function passwordInspect(inputState, password) {
  let state = false;

  // 判斷是否為連續超過6個數字或英文
  if (!/^(?!.*\d{6,})(?!.*(.)\1{4,}).{6,12}$/.test(password)) {
    state = true;
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

    return state;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return false; // 或者返回一個錯誤狀態
  }
}
//確認註冊成功寄信
function signUpSuccess(arr) {
  const email = arr[0];
  securityCode = generateRandomCode(5);
  let body = `使用者:Email:${email}<br/>驗證碼:${securityCode}<br/>Messages:申請註冊roomie會員<br/> `;

  Email.send({
    SecureToken: "64af44cb-e8aa-46d2-9138-00053a70aca2",
    To: `${email}`,
    From: "roomie0921@gmail.com",
    Subject: "親愛的會員您好，Roomie客服中心寄送驗證碼來囉~",
    Body: body,
  })
    .then((message) => alert("已傳送驗證碼到信箱"))
    .catch((err) => {
      console.log(err.response);
    });
}
// 隨機產生驗證碼
function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}
// 驗證碼判斷
function securityCodeMessage(state) {
  confirmSecurityCodeBtn.nextElementSibling.style.display = "flex";
  if (state) {
    confirmSecurityCodeBtn.nextElementSibling.textContent = "註冊成功";
    confirmSecurityCodeBtn.nextElementSibling.style.color = "green";
  } else {
    confirmSecurityCodeBtn.nextElementSibling.textContent = "驗證失敗";
    confirmSecurityCodeBtn.nextElementSibling.style.color = "red";
  }
}
// 跳轉進入登入頁面
function gotoLogInPage() {
  setTimeout(() => {
    window.location.href = "https://uli1313.github.io/roomie/login.html";
  }, 1000);
}
//註冊到data
function signUp(allTrueArr) {
  axios
    .post(webUrl + "/users", {
      email: `${allTrueArr[0]}`,
      password: `${allTrueArr[1]}`,
      name: "",
      nickname: "",
      gender: "",
      photo: "",
      contact: {
        person: ["", ""],
        phone: "",
        email: "",
        line: "",
      },
      about: "",
    })
    .then((res) => {
      console.log(res.data);
      gotoLogInPage();
    })
    .catch((err) => {
      console.log(err.response);
    });
}
// 確認輸入監聽
confirmEmailBtn.addEventListener("click", async (e) => {
  const signUpArr = [inputEmail, inputPassword, inputConfirmPassword];
  allTrueArr = [];
  for (const item of signUpArr) {
    if (item === inputEmail) {
      const email = inputInspect(item, item.value);
      if (
        typeof inputInspect(item, item.value) === "string" &&
        (await checkUserInfo(email))
      ) {
        allTrueArr.push(email);
      }
    } else if (inputInspect(item, item.value)) {
      allTrueArr.push(item.value.trim());
    }
  }
  if (rulesChecked.checked) {
    rulesChecked.parentElement.children[2].style.display = "none";
    allTrueArr.push(rulesChecked.checked);
  } else {
    alertContext(rulesChecked, "閱讀完請勾選");
  }
  if (allTrueArr.length === 4) {
    inputSecurityCode.parentElement.style.display = "flex";
    signUpSuccess(allTrueArr);
  }
});
// 確認驗證碼輸入
confirmSecurityCodeBtn.addEventListener("click", (e) => {
  if (inputSecurityCode.value === securityCode) {
    securityCodeMessage(true);
    signUp(allTrueArr);
  } else {
    securityCodeMessage(false);
  }
});
