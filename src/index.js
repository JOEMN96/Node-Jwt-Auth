const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

// MiddleWares
app.use(express.static("public"));

// Set ups
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.listen(PORT, () => {
  console.log("Running On port 3000");
});
