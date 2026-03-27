const validator = require("validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookie = await req.cookies;
    const { token } = cookie;

    if (!token) {
      res.status(401).send("Please login");
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("error " + err);
  }
};

const updateValidation = (req) => {
  const isAllowed = [
    "firstName",
    "lastName",
    "photoUrl",
    "bio",
    "age",
    "skills",
    "gender",
  ];

  const keys = Object.keys(req.body);

  const invalidFields = keys.filter((key) => !isAllowed.includes(key));
  if (invalidFields.length > 0) {
    throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
  }

  const { firstName, lastName, bio, age } = req.body;

  if (firstName !== undefined) {
    if (firstName.length <= 2 || firstName.length > 15) {
      throw new Error("First name must be between 3 and 15 characters");
    }
  }

  if (lastName !== undefined) {
    if (lastName.length <= 2 || lastName.length > 15) {
      throw new Error("Last name must be between 3 and 15 characters");
    }
  }

  if (bio !== undefined && bio.trim().length > 100) {
    throw new Error("Bio must be under 100 characters");
  }

  if (age !== undefined) {
    if (age < 18 || age >= 50) {
      throw new Error("Age must be more than 18 and less than 50");
    }
  }
};
const validateFun = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error("name field is empty");
  }

  if (!validator.isEmail(email)) {
    throw new Error("email isnt valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("enter strong password");
  }
};

module.exports = {
  validateFun,
  userAuth,
  updateValidation,
};
