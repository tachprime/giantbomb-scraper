const mongoose = require('mongoose');
const db = require('../config/connect');

const Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {type: String, unique: true, dropDups: true},
    img: String,
    link: String,
    byLine: String,
    snippet: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;