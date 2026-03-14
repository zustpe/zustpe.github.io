// let newPromise = new Promise((resolve, reject) => {
//   let datarecived = true;
//   if (datarecived) {
//     resolve("data is recived");
//   } else {
//     reject("data is reject");
//   }
// });
// newPromise
//   .then((message) => {
//     console.log("message is: ", message);
//   })
//   .catch((e) => {
//     console.log("error: ", e);
//   })
//   .finally(() => {
//     console.log("end");
//   });

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json()) // convert to JSON
//   .then((data) => console.log(data)) // handle data
//   .catch((error) => console.log("Error:", error)); // handle error

// function downloadFile() {
//   return new Promise((resolve, reject) => {
//     console.log("📥 Starting download...");

//     setTimeout(() => {
//       let success = true;
//       // let success = false;

//       if (success) {
//         resolve("✅ File downloaded successfully");
//       } else {
//         reject("❌ Download failed");
//       }
//     }, 5000); // 2 seconds delay
//   });
// }
// downloadFile()
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function loginUser(username, password) {
//   return new Promise((resolve, reject) => {
//     console.log("🔐 Checking credentials...");
//     setTimeout(() => {

//       // Simulate correct username and password
//       const correctUsername = "bala";
//       const correctPassword = "1234";

//       if (username === correctUsername && password === correctPassword) {
//         resolve("✅ Login successful! Welcome " + username);
//       } else {
//         reject("❌ Login failed: Invalid username or password");
//       }
//     }, 1500); // 1.5 second delay to simulate server check
//   });
// }
// // Try logging in
// loginUser("bala", "1234")
//   .then((message) => console.log(message))
//   .catch((error) => console.log(error));

// function waitOneSecond() {//
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("⏳ Done waiting 5 second");
//     }, 5000);
//   });
// }

// async function run() {
//   console.log("⏰ Waiting...");
//   const message = await waitOneSecond();
//   console.log(message);
// }
// run();

// async function fetchUsers() {
//   try {
//     // const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const response = await fetch(
//       " https://fake-json-api.mock.beeceptor.com/companies"
//     );

//     const users = await response.json();
//     console.log("👥 Users:", users);

//     for (let user of users) {
//       // console.log(
//       //   `name is : ${user.name} city is ${user.address.city} pincode is ${user.address.zipcode}`
//       // );
//       console.log(
//         `id: ${user.id} name is ${user.name}, country is: ${user.country}`
//       );
//     }
//     console.log(typeof users);
//   } catch (error) {
//     console.log("❌ Error fetching data:", error);
//     // console.log("give valid url for fetch the data");
//     // error.message = fetchUsers ? console.log("enter crct url ") : "";
//   }
// }
// fetchUsers();

const settings = [ "theme: ","dark" ];

const [ t,g, language = "en" ] = settings;

console.log(t);     // "dark"
console.log(language);  // "en"
