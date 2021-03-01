const signupForm = document.querySelector(".signupForm");
const loginForm = document.querySelector(".loginForm");
const passwordError = document.querySelector(".passwordError");
const emailError = document.querySelector(".emailError");

signupForm &&
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Reset the form
    passwordError.textContent = "";
    emailError.textContent = "";
    // Form values
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    try {
      const res = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      if (data.errors) {
        passwordError.textContent = data.errors.password;
        emailError.textContent = data.errors.email;
      }

      if (data.user) {
        location.assign("/");
      }
    } catch (err) {
      console.log(err);
    }
  });

loginForm &&
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      if (data.errors) {
        passwordError.textContent = data.errors.password;
        emailError.textContent = data.errors.email;
      }

      if (data.user) {
        location.assign("/");
      }
    } catch (e) {
      console.log(e);
    }
  });
