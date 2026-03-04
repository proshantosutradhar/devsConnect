const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email isnt valid");
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("pass isnt valid");
      },
    },
    age: {
      type: Number,
    },
    skills: {
      type: [String],
      default: ["js", "react"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.setJWT = async function (req, res) {
  const user = this;
  const token = await jwt.sign({ id: user._id }, "mykey", { expiresIn: "4d" });
  return token;
};
userSchema.methods.passwordCheck = async function (userPass) {
  const user = this;
  const validPass = await bcrypt.compare(userPass, user.password);

  return validPass;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
