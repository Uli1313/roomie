import axios from "axios";

//API網址
const webUrl = "https://roomie-lfta.onrender.com";
// 設定變數
const confirmEmailBtn = document.querySelector(".confirmEmail");
const inputEmail = document.querySelector("#inputEmail");
const inputSecurityCode = document.querySelector("#inputSecurityCode");
const securityCodeBtn = document.querySelector("#securityCodeBtn");
const inputPassword = document.querySelector("#inputPassword");
const inputConfirmPassword = document.querySelector("#inputConfirmPassword");
const resetPasswordBtn = document.querySelector("#resetPasswordBtn");
let userId;
let securityCode;
let passwordArr = [];

// 判斷輸入是否錯誤
async function inputInspect(inputState, value) {
  const valueTrim = value.trim();
  if (valueTrim === "") {
    alertContext(inputState, "請勿空白!");
    return false;
  } else if (inputState === inputEmail && (await checkUserInfo(valueTrim))) {
    alertContext(inputState, "這個帳號尚未註冊過");
    return false;
  } else if (
    (inputState === inputPassword || inputState === inputConfirmPassword) &&
    passwordInspect(inputState, valueTrim)
  ) {
    alertContext(inputState, "請填寫正確密碼!");
    return false;
  } else {
    inputState.parentElement.children[2].style.display = "none";
    return true;
  }
}
//警告訊息
function alertContext(inputState, context) {
  inputState.parentElement.children[2].style.display = "flex";
  inputState.parentElement.children[2].children[0].children[0].textContent = `${context}`;
}
//確認是否註冊過
async function checkUserInfo(email) {
  try {
    const res = await axios.get(webUrl + "/users");
    const dataEmail = res.data;
    let state = false;
    const dataFilter = dataEmail.filter((item) => item.email === email);
    if (dataFilter.length === 1) {
      userId = dataFilter[0].id;
    } else {
      state = true;
    }
    return state;
  } catch (error) {
    console.error("Error fetching user information:", error); // 或者返回一個錯誤狀態
  }
}
//確認Email成功寄信
function emailSuccess(email) {
  securityCode = generateRandomCode(5);
  let body = `使用者:Email:${email}<br/>驗證碼:${securityCode}<br/>Messages:roomie會員忘記密碼，需要重新設定<br/> `;
  Email.send({
    SecureToken: "64af44cb-e8aa-46d2-9138-00053a70aca2",
    To: email,
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
  securityCodeBtn.parentElement.previousElementSibling.style.display = "flex";
  if (!state) {
    securityCodeBtn.parentElement.previousElementSibling.textContent =
      "驗證失敗";
    securityCodeBtn.parentElement.previousElementSibling.style.color = "red";
  }
}
// 步驟完成
function stepFinish(input) {
  input.parentElement.parentElement.style.display = "none";
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
//確認password成功修改
function updatePassword(password) {
  axios
    .patch(webUrl + `/users/${userId}`, {
      password: `${password}`,
    })
    .then((res) => {
      console.log(res.data);
      gotoLogInPage();
    })
    .catch((err) => {
      console.log(err.response);
    });
}
// 跳轉進入登入頁面
function gotoLogInPage() {
  setTimeout(() => {
    // 在实际应用中，你可能需要根据token跳转到不同的页面
    // 例如：window.location.href = "/memberPage";
    window.location.href = "http://localhost:5173/roomie/pages/login.html";
  }, 1000);
}
// email監聽
confirmEmailBtn.addEventListener("click", async (e) => {
  if (await inputInspect(inputEmail, inputEmail.value)) {
    emailSuccess(inputEmail.value.trim());
    securityCodeBtn.parentElement.parentElement.style.display = "flex";
    stepFinish(inputEmail);
  }
});
// 驗證碼監聽
securityCodeBtn.addEventListener("click", (e) => {
  //   if (inputSecurityCode.value === securityCode) {
  //     securityCodeMessage(true);
  //     stepFinish(securityCodeBtn);
  //     resetPasswordBtn.parentElement.parentElement.style.display = "block";
  //   } else {
  //     securityCodeMessage(false);
  //   }
});
// 重設密碼與確認密碼監聽
resetPasswordBtn.addEventListener("click", async (e) => {
  const newPassword = inputPassword.value;
  const newCheck = inputConfirmPassword.value;

  if (
    (await inputInspect(inputPassword, newPassword)) &&
    (await inputInspect(inputConfirmPassword, newCheck))
  ) {
    updatePassword(newPassword);
  }
});
