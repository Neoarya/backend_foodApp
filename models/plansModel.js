const mongo = require("mongoose");

const { db_link } = require("../secrets");

const validator = require("email-validator");

mongo
    .connect(db_link)
    .then(function(db){
        console.log("connected to db");
    })
    .catch(function(err){
        console.log(err);
    })


const plansModel = new mongo.Schema({
    id: {
        type: Number
    },
    name: {
        type:String,
        required: true,
    },
    ratings: {
        type: Number,
        min: 10,
    },
    price: {
        type: Number
    },
    delivery: {
        type: Boolean,
        required: true,
    },
    meals: {
        type: Number
    },
    description: {
        type: String
    }

})

