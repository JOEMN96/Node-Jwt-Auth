const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const isUserAuthinticated = (req, res, next) => {
  const token = req.cookies.jwt;
  //   console.log(req.cookies);
  if (token) {
    jwt.verify(token, "timesPPDD", (err, token) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "timesPPDD", async (err, decodedToken) => {
      if (err) {
        next();
        res.locals.user = null;
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { isUserAuthinticated, checkUser };
