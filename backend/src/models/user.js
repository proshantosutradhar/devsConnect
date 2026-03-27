const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true, lowercase: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email isnt valid");
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("pass isnt valid");
      },
    },
    age: {
      type: Number,
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?semt=ais_hybrid&w=740&q=80",
      
    },
    skills: {
      type: [String],
      default: ["javaScript"],
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

userSchema.methods.setJWT = async function (req, res) {
  const user = this;
  const token = await jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "4d" });
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
