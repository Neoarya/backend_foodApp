const express = require("express");

const app = express();
// const router = express.Router();

app.listen("5000", function () {
  console.log("server listening on port 5000");
});

app.use(express.json());
app.use(express.static("public"));

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
app.use("/user", userRouter);
app.use("/auth", authRouter);

// let user = [];

// //client <- server
// app.get("/", (req, res) => {
//   res.send("Home Page");
// });


// //REDIRECTS
// app.get("/user-all", (req, res) => {
//   res.redirect("/user");
// });

// //HOW TO MAKE A 404 PAGE FOR WRONG URL
// //always keep it last
// app.use((req, res) => {
//   res.sendFile("public/404.html", { root: __dirname });
// });
