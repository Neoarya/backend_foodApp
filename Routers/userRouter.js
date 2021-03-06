const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

// app.get("/user", getUser);
async function getUsers(req, res) {
  try {
    console.log("getUser called");
    let users = await userModel.find(); //mongo k collections se sare documents leaega
    if (users) {
      return res.json(users);
    } else {
      return res.json({
        message: "users not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
}

//post request
//client -> server
// app.post("/user", createUser){
function createUser(req, res) {
  user = req.body;
  res.send("data has been added successfully");
}

// app.patch("/user", updateUser);
function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  res.json(user);
}

// app.delete("/user", deleteUser);
function deleteUser(req, res) {
  user = {};
  res.json(user);
}

//param route
// app.get('/user/:id', getUserById);
function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params.id);
}

let flag = false; //user logged in
function protectRoute(req, res, next) {
  try {
    if (req.cookies) {
      if (req.cookies.login == "1234") {
        next();
      } else {
        res.json({
          message: "not authorized",
        });
      }
    } else {
      return res.json({
        message: "operation not allowed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      //internal server error
      message: err.message,
    });
  }
}

module.exports = userRouter;
