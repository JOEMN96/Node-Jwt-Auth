require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const {
  isUserAuthinticated,
  checkUser,
} = require("./middlewares/authmiddleWare");

const PORT = process.env.PORT || 3000;

// MiddleWares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// Set ups
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

// DB connection

const uri = process.env.DB_LINK;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log("Running On port 3000");
    });
  })
  .catch((err) => console.log(err));

// Routes

app.get("*", checkUser);

app.get("/", checkUser, (req, res) => {
  // res.setHeader("set-cookie", "user=joe");
  // res.cookie("user", "mon", { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  // console.log(req.cookies);
  res.render("index");
});
app.get("/profile", isUserAuthinticated, (req, res) => res.render("profile"));
app.use(routes);
app.get("/*", (req, res) => res.render("404"));
