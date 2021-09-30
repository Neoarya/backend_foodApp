const express = require("express");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);


// app.get("/user", getUser);
async function getUser(req, res) {
    console.log('getUser called');
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

module.exports = userRouter;