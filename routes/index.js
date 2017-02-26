const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Comment = require('../models/comment');
var scraper = require('../controller/scrapeControl');

/* GET home page. */
router.get('/', function (req, res, next) {

    Article.find({}, function (err, data) {
        if (err) console.log("error retrieving Article collections", err);

        res.render('index', {title: 'Web Scraper', articles: data});
    });

});

router.get('/scrape', function (req, res, next) {

    scraper.getContent(function () {

        console.log("scraping completed");
        res.redirect('/');

    });

});

router.get('/comments/:id', function (req, res, next) {

    Article.findOne({_id: req.params.id})

        .populate("comments")

        .exec(function (err, doc) {
            if (err) console.log("error retrieving comments", err);

            console.log(doc);
            res.send(doc.comments);
        });
});

router.post('/comments/:id', function (req, res, next) {
    console.log(req.body);

    var newComment = new Comment(req.body);

    newComment.save(function (err, doc) {

        if (err) res.send(err);
        else {
            Article.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {comments: doc._id}},
                {new: true},
                function (error, newDoc) {
                    if (error) res.send(error);

                    res.send(newDoc);
                });
        }

    })
});

module.exports = router;