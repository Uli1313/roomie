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

// (async () => {
//   try {
//     const apiPath = `/600/users/${localUserId}`;
//     const apiUrl = `${baseUrl}${apiPath}`;
//     const response = await axios.get(apiUrl, token);

//     updateLocalStorage(); // 用最新的用戶資料更新 localStorage
//     navLogged.forEach((e) => {
//       e.classList.add("d-block");
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
//       e.classList.add("d-block");
//     });

//     // if (err.response.status === 401 || err.response.statusText === 'Unauthorized') {
//     //   // 登入過期要回到登入頁
//     //   const needBack = ['user.html', 'user_posts.html', 'user_favorites.html', 'user_messages.html']
//     //   if (needBack.some(pageName => location.pathname.match(pageName))) {
//     //     const swal = Swal.fire({
//     //       icon: "warning",
//     //       title: "請重新登入",
//     //       scrollbarPadding: false,
//     //       didClose: () => {
//     //         clearUserInfo();
//     //         location.href = 'login.html';
//     //       }
//     //     });
//     //   }
//     // }
//   }
// })();

// // 用最新的用戶資料更新 localStorage
// function updateLocalStorage() {
//   localStorage.setItem("user", JSON.stringify(user));
// }
