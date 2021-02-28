require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/authRouter");
const cookie = require("cookie-parser");

const PORT = process.env.PORT || 3000;

// MiddleWares
app.use(express.static("public"));
app.use(express.json());
app.use(cookie());

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

app.get("/", (req, res) => {
  // res.setHeader("set-cookie", "user=joe");
  res.cookie("user", "mon", { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  // console.log(req.cookies);
  res.render("index");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});
app.use(routes);
app.get("/*", (req, res) => {
  res.render("404");
});
