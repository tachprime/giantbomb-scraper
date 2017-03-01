const Promise = require('bluebird');
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || "mongodb://localhost/articles";
mongoose.Promise = Promise;

mongoose.connect(url);
var db = mongoose.connection;

db.on("error", function (err) {
    console.log("DB error: ", err);
});

db.once("open", function () {
    console.log("Mongoose connected!!!");
});

module.exports = db;