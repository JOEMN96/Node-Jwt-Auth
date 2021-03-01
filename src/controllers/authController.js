const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

// SignUp ROutes
const signUp_get = (req, res) => {
  res.render("signup");
};

const signUp_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createTokens(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 259200 });
    res.status(201).send({ user: user._id });
  } catch (err) {
    let errors = handleError(err);
    res.status(400).json({ errors });
  }
};

// Login Routes

const login_get = (req, res) => {
  res.render("login");
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.logIn(email, password);
    const jwtToken = createTokens(user._id);
    res.cookie("jwt", jwtToken, { httpOnly: true, maxAge: 259200 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

// Handle errors

function handleError(err) {
  let error = { email: "", password: "" };
  if (err.message == "Incorrect Email") {
    error.email = "Incorrect Email ID";
  }

  if (err.message == "Incorrect Password") {
    error.password = "Incorrect Password";
  }

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

// Create Tokens

function createTokens(id) {
  return jwt.sign({ id }, "timesPPDD", { expiresIn: "3 days" });
}

module.exports = {
  signUp_get,
  signUp_post,
  login_get,
  login_post,
  logout_get,
};
