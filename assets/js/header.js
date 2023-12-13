// import axios from "axios";

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

// const navLogged = document.querySelectorAll(".nav-logged");
// const navUnLogged = document.querySelectorAll(".nav-unlogged");
// const navLoggedPhoto = document.querySelectorAll(".nav-logged-photo");

// (async () => {
//   try {
//     const apiPath = `/600/users/${localUserId}`;
//     const apiUrl = `${baseUrl}${apiPath}`;
//     const response = await axios.get(apiUrl, token);
//     const photoUrl = response.data.photo;

//     navLoggedPhoto.forEach((e) => e.setAttribute("src", photoUrl));
//     user = response.data;
//     updateLocalStorage(); // 用最新的用戶資料更新 localStorage
//     navLogged.forEach((e) => {
//       e.classList.remove("d-none");
//     });
//     navUnLogged.forEach((e) => {
//       e.classList.add("d-none");
//     });
//     console.log("已登入");
//   } catch (err) {
//     console.log(err);
//     navLogged.forEach((e) => {
//       e.classList.add("d-none");
//     });
//     navUnLogged.forEach((e) => {
//       e.classList.remove("d-none");
//     });
//     console.log("未登入");
//   }
// })();

// // 用最新的用戶資料更新 localStorage
// function updateLocalStorage() {
//   localStorage.setItem("user", JSON.stringify(user));
// }
