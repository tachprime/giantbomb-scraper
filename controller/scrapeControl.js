const cheerio = require('cheerio');
const request = require('request');
const Article = require('../models/article');

var url = "http://www.giantbomb.com/videos/latest/";

function getContent(cb) {

    request(url, function (err, res, body) {

        if (err) console.log("error scraping content", err);

        var $ = cheerio.load(body);

        console.log("scraping");

        $('.editorial li').each(function (i, element) {

            //limit to top 24 videos as temp fix for extra
            //unexpected videos that don't appear in the original page
            if (i < 24) {

                //link for actual article
                var link = $(element).children("a").attr('href');
                //console.log(link);

                var img = $(element).find("img").attr('src');
               //console.log(img);

                var title = $(element).find(".title").text().trim();
               //console.log(title);

                var byLine = $(element).find(".byline").text().replace(/\s+/g, " ").trim();
               //console.log(byLine);

                var snip = $(element).find("p").last().text().trim();
                //console.log(snip);

                var videoArticle = new Article({
                    title: title,
                    img: img,
                    link: link,
                    byLine: byLine,
                    snippet: snip
                });
                
                videoArticle.save(function (err) {
                    if (err) console.log("error saving to Articles", err);

                    // console.log("saved");
                })
            }
        });

        console.log("end");

        cb();
    })

}//end of getContent

exports.getContent = getContent;