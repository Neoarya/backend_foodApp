const express = require("express");

//server creation
const app = express();
let port = "8080";
app.listen(port, function () {
  console.log(`server is listening on port ${port}`);
});

let obj ={
    'name': 'Neo Arya 22'
}

//types of request -> get post put delete

app.get("/user", (req, res) => {
  res.json(obj);
});

app.get("/home", (req, res) => {
//   console.log('users');
  console.log(__dirname);

  res.sendFile('./views/index.html',{root:__dirname});
});

