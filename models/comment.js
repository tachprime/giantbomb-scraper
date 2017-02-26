const mongoose = require('mongoose');
const db = require('../config/connect');

const Schema = mongoose.Schema;

var commentSchema = new Schema({
    userName: String,
    commentText: String
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;