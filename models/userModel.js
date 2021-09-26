const mongoose = require("mongoose");

const {db_link} = require ('../secrets.js');

const validator = require("email-validator");

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      //npm i email-validator
      return validator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
});

const userModel = mongoose.model("userModel", userSchema);

(async function createUser() {
  let user = {
    name: "Neo",
    age: 20,
    email: "abcd@gmail.com",
    password: "123456789",
    confirmPassword: "123456789",
  };
  let userObj = await userModel.create(user);
  console.log(userObj); 
})();
