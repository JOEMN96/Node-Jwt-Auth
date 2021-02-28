const User = require("../models/usermodel");

// SignUp ROutes

const signUp_get = (req, res) => {
  res.render("signup");
};

const signUp_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).send(user);
  } catch (err) {
    let errors = handleError(err);
    res.status(400).send(errors);
  }
};

// Login Routes

const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  res.send("user logged in");
};

// Handle errors

function handleError(err) {
  let error = { email: "", password: "" };
  // unique id error (Email already taken)
  if (err.code === 11000) {
    error.email = "This email is already taken";
    return error;
  }
  // validation logic
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((item) => {
      error[item.path] = item.properties.message;
    });
  }
  return error;
}

module.exports = {
  signUp_get,
  signUp_post,
  login_get,
  login_post,
};
