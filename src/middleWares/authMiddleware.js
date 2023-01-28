require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = JSON.parse(process.env.salt);
const { User } = require("../models/userModel");
const privateKey = process.env.secret_key;
// To store password in hash format

const authMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;
  let admin_mail = email.split("@");
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).send({ msg: "user Alredy Presnt with this mail Id" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Store hash in your password DB.

      if (err) {
        res.status(500).send({ msg: "something went wrong to store password" });
      }

      if (hash) {
        if (admin_mail[1] === "masaischool.com") {
          req.body.password = hash;
          req.body.is_admin = true;
          next();
        } else {
          req.body.password = hash;
          req.body.is_admin = false;
          next();
        }
      }
    });
  }
};

//Verify password hash with the actual password

const authLoginMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        res.status(500).send({ msg: "Password verification Error !" });
      }

      if (result) {
        req.body.user = user;
        next();
      } else {
        res.status(200).send({ msg: "Invalid Credentials" });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Invalid Credentials" });
  }
};

const authValidator = (req, res, next) => {
  const { authorization } = req.headers;
  const valid = authorization.split(" ")[1];

  var decoded = jwt.verify(valid, privateKey);

  if (decoded) {
    req.body.user_id = decoded.user._id;
    req.body.user = decoded.user;
    next();
  }
};

const adminValidator = (req, res, next) => {
  const { authorization } = req.headers;
  const valid = authorization.split(" ")[1];

  var decoded = jwt.verify(valid, privateKey);

  if (decoded) {
    if (decoded.user.is_admin) {
      next();
    } else {
      res.status(200).send({ msg: "You are Not authorized !" });
    }
  }
};

module.exports = {
  authMiddleWare,
  authLoginMiddleWare,
  authValidator,
  adminValidator,
};
