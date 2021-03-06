const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();

const authRouter = express.Router();

//-------routes----------

authRouter.route("/signup").post(setCreatedAt, signUpUser);

authRouter
  .route("/forgetPassword")
  .get(getForgetPassword)
  .post(postForgetPassword, validateEmail);

authRouter.route("/login").post(loginUser);

//-------functions----------

function setCreatedAt(req, res, next) {
  //time at which user was created, it is a middleware thats why we use next also as one of its arguments
  let obj = req.body;
  //keys ka arr -> uska length
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res
      .status(400)
      .json({ message: "cannot create user if req.body is empty" });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signUpUser(req, res) {
  // let userDetails = req.body;
  // let name = userDetails.name;
  // let email = userDetails.email;
  // let password = userDetails.password;
  try {
    let userObj = req.body;
    // user.push({ email, name, password });
    // put all data in mongo db

    //create doc in userModel
    let user = await userModel.create(userObj);
    // console.log("user", req.body);
    res.json({
      message: "user signed up",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

function getForgetPassword(req, res) {
  res.sendFile("./public/forgetPassword.html", { root: __dirname });
}

function postForgetPassword(req, res, next) {
  let data = req.body;
  console.log("data", data);
  //check if email id is correct - validate (we will use a middleware for this purpose)
  next();
  //check if user exists in db

  // res.json({
  //   message: "data recieved",
  //   data: data.email,
  // });
}

function validateEmail(req, res) {
  console.log("in validateEmail function");
  console.log(req.body);

  // to check if email is correct or not -> @ , .
  //indexOf
  let email = req.body.email;
  let emailStr = JSON.stringify(email);
  if (emailStr.indexOf("@") !== -1 && emailStr.indexOf(".") !== -1) {
    res.send("email is ok");
  } else {
    res.send("try again");
  }

  res.json({
    message: "data recieved",
    data: req.body,
  });
}

async function loginUser(req, res) {
  try {
    //email, pass
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if ((req.body.password = user.password)) {
          res.cookie("login", "1234", { httpOnly: true });
          return res.json({
            message: "user logged in success",
          });
        } else {
          return res.json({
            message: "email or pass is wrong",
          });
        }
      } else {
        return res.json({
          message: "email or pass is wrong",
        });
      }
    } else {
      return res.json({
        message: "user is not present",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
