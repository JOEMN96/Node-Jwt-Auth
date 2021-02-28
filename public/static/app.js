const signupForm = document.querySelector(".signupForm");
const loginForm = document.querySelector(".loginForm");

signupForm &&
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    console.log(password, email);
  });

loginForm &&
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    console.log(password, email);
  });
