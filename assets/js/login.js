import axios from "axios";

//API網址
const webUrl = "https://roomie-lfta.onrender.com";
// 設定變數
const confirmEmailBtn = document.querySelector(".confirmEmail");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");

// 判斷輸入是否錯誤
async function inputInspect(inputState, value) {
  const valueTrim = value.trim();
  if (valueTrim === "") {
    alertContext(inputState, "請勿空白!");
    return false;
  } else if (inputState === inputEmail && (await checkUserInfo(valueTrim))) {
    alertContext(inputState, "這個帳號尚未註冊過");
    return false;
  } else {
    inputState.parentElement.children[2].style.display = "none";
    return true;
  }
}
// 不符合規定時顯示警告
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
    dataFilter.length === 1 ? state : (state = true);
    return state;
  } catch (error) {
    console.error("Error fetching user information:", error); // 或者返回一個錯誤狀態
  }
}
//登入
function logIn(email, password) {
  axios
    .post(webUrl + "/login", {
      email: `${email}`,
      password: `${password}`,
    })
    .then((res) => {
      inputPassword.parentElement.children[2].style.display = "none";
      console.log(res.data);
      const token = res.data.accessToken;
      const id = res.data.user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      gotoUserPage();
    })
    .catch((err) => {
      alertContext(inputPassword, "會員密碼不正確");
    });
}
// 跳轉進入會員頁面
function gotoUserPage() {
  setTimeout(() => {
    // 在实际应用中，你可能需要根据token跳转到不同的页面
    // 例如：window.location.href = "/memberPage";
    window.location.href = "http://localhost:5173/roomie/pages/user.html";
  }, 1000);
}
confirmEmailBtn.addEventListener("click", async (e) => {
  if (
    inputInspect(inputEmail, inputEmail.value) &&
    (await inputInspect(inputPassword, inputPassword.value))
  ) {
    logIn(inputEmail.value, inputPassword.value);
  }
});
