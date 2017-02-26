const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/articles");
var db = mongoose.connection;

db.on("error", function (err) {
    console.log("DB error: ", err);
});

db.once("open", function () {
    console.log("Mongoose connected!!!");
});

module.exports = db;