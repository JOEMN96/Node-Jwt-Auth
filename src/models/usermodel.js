const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    lowercase: true,
    validate: [
      (val) => {
        return validator.isEmail(val);
      },
      "Enter Proper Email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password Required"],
    minlength: [6, "Minimum 6 Chars"],
  },
});

// Mongoose Hooks

userSchema.pre("save", async function (next) {
  // Document is not created (this hook fires before the document creation)
  // This refers to the user (ini dha create aga poguthu)
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// statics method on model (statics methods are user defined methods)

userSchema.statics.logIn = async function (email, password) {
  // this refers to userSchema itself

  const user = await this.findOne({ email });
  if (user) {
    const verifyPW = await bcrypt.compare(password, user.password);
    if (verifyPW) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
