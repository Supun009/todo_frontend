// export const validateEmail = (email, setError) => {
//     console.log("Validating email...");
//     if (!email) {
//       setError((prev) => ({ ...prev, email: "Email is required" }));
//       return false;
//     }
//     if (!validator.isEmail(email)) {
//       setError((prev) => ({ ...prev, email: "Please enter a valid email address" }));
//       return false;
//     }
//     return true;
//   };
  
//   export const validateUsername = (username, setError) => {
//     console.log("Validating username...");
//     if (!username) {
//       setError((prev) => ({ ...prev, username: "Username is required" }));
//       return false;
//     }
//     if (username.length < 3) {
//       setError((prev) => ({ ...prev, username: "Username must be at least 3 characters long" }));
//       return false;
//     }
//     if (username.length > 20) {
//       setError((prev) => ({ ...prev, username: "Username cannot exceed 20 characters" }));
//       return false;
//     }
//     if (!/^[a-zA-Z0-9_]+$/.test(username)) {
//       setError((prev) => ({ ...prev, username: "Username can only contain letters, numbers, and underscores" }));
//       return false;
//     }
//     return true;
//   };
  
//   export const validatePassword = (password, setError) => {
//     console.log("Validating password...");
//     if (!password) {
//       setError((prev) => ({ ...prev, password: "Password is required" }));
//       return false;
//     }
//     if (password.length < 8) {
//       setError((prev) => ({ ...prev, password: "Password must be at least 8 characters long" }));
//       return false;
//     }
//     if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
//       setError((prev) => ({
//         ...prev,
//         password: "Password must include uppercase, lowercase, number, and special character",
//       }));
//       return false;
//     }
//     return true;
//   };
  