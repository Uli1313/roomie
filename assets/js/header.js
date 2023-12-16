// import axios from "axios";
// import Swal from "sweetalert2";

// const baseUrl = "https://roomie-lfta.onrender.com";
// // const baseUrl = "http://localhost:3000";

// const localUserId = localStorage.getItem("userId");
// const localUserToken = localStorage.getItem("token");

// const token = {
//   headers: {
//     Authorization: `Bearer ${localUserToken}`,
//   },
// };

// let user;

// // 已登入時/未登入時要顯示的所有 HTML 元素
// const navLogged = document.querySelectorAll(".nav-logged");
// const navUnLogged = document.querySelectorAll(".nav-unlogged");
// const navLoggedPhoto = document.querySelectorAll(".nav-logged-photo");

// const logoutBtn = document.querySelector(".logout-btn");

// // 登入/登出狀態選單顯示
// (async () => {
//   try {
//     const apiPath = `/600/users/${localUserId}`;
//     const apiUrl = `${baseUrl}${apiPath}`;
//     const response = await axios.get(apiUrl, token);
//     const photoUrl = response.data.photo;

//     // 頭貼
//     navLoggedPhoto.forEach((e) => e.setAttribute("src", photoUrl));
//     user = response.data;
//     updateLocalStorage(); // 用最新的用戶資料更新 localStorage
//     navLogged.forEach((e) => {
//       e.classList.remove("d-none");
//     });
//     navUnLogged.forEach((e) => {
//       e.classList.add("d-none");
//     });
//   } catch (err) {
//     console.log(err);
//     navLogged.forEach((e) => {
//       e.classList.add("d-none");
//     });
//     navUnLogged.forEach((e) => {
//       e.classList.remove("d-none");
//     });
//   }
// })();

// // 用最新的用戶資料更新 localStorage
// function updateLocalStorage() {
//   localStorage.setItem("user", JSON.stringify(user));
// }

// // 登出
// logoutBtn.addEventListener("click", logout);

// function logout() {
//   Swal.fire({
//     icon: "question",
//     title: "確定要登出嗎",
//     showCancelButton: true,
//     confirmButtonText: "確定",
//     cancelButtonText: "取消",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // 移除 localStorage 的資料
//       localStorage.removeItem("userId");
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       Swal.fire({
//         icon: "success",
//         title: "已登出",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       // 回登入頁面
//       setTimeout(() => {
//         location.href = "login.html";
//       }, 1000);
//     }
//   });
// }
