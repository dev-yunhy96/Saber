import { createInstance } from "./index";
// async function loginUser(credentials) {
//   return await fetch("https://www.mecallapi.com/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: credentials.email,
//       password: credentials.password,
//     }),
//   })
//     .then((data) => {
//       return data.json();
//     })
//     .catch((error) => console.error(error));
// }

// async function getUser() {
//   return await fetch("https://www.mecallapi.com/api/users", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((data) => {
//       return data.json();
//     })
//     .catch((error) => console.error(error));
// }
// const instance = createInstance();
// async function getUser() {
//   return await instance
//     .get()
//     .then((success) => success)
//     .catch((faill) => faill);
// }

const getUser = async () => {
  const res = await createInstance.get().then((re) => re);
  return res;
};

export { getUser };
