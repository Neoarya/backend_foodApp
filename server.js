const express = require("express");
const app = express();
// const router = express.Router();

app.listen("5000", function () {
  console.log("server listening on port 5000");
});

app.use(express.json());
app.use(express.static("public"));

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);
//mounting in express
userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter.route("/signup").post(signUpUser);

authRouter
  .route("/forgetPassword")
  .get(getForgetPassword)
  .post(postForgetPassword, validateEmail);

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
  if(emailStr.indexOf('@') !== -1 && emailStr.indexOf('.') !== -1){
    res.send('email is ok')
  }else{
    res.send('try again')
  }
   
  res.json({
    message: "data recieved",
    data: req.body,
  });
}

let user = [];

//client <- server
app.get("/", (req, res) => {
  res.send("Home Page");
});

// app.get("/user", getUser);
function getUser(req, res) {
  res.json(user);
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

function signUpUser(req, res) {
  // let userDetails = req.body;
  // let name = userDetails.name;
  // let email = userDetails.email;
  // let password = userDetails.password;

  let { email, name, password } = req.body;
  // user.push({ email, name, password });
  // put all data in mongo db
  console.log("user", req.body);
  res.json({
    message: "user signed up",
    user: req.body,
  });
}

//REDIRECTS
app.get("/user-all", (req, res) => {
  res.redirect("/user");
});

//HOW TO MAKE A 404 PAGE FOR WRONG URL
//always keep it last
app.use((req, res) => {
  res.sendFile("public/404.html", { root: __dirname });
});
