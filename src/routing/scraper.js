var cheerio = require("cheerio");
var request = require("request");
// var Article = require("")

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/scrapedData');

var db = require("../models");


var scrape = function () {
  
  request("https://www.reddit.com/r/learnprogramming/", function(error, response, html) {
    var $ = cheerio.load(html);


    $("p.title").each(function(i, element) {
      var result = {};
      var title = $(element).text();
      var link = $(element).children().attr("href");

      //creates object that gets pushed into the results array
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Article.create(result)
        .then(function(dbArticle) {

        })
        .catch(function(err) {
          return res.json(err);
        });
    });
  });
};

module.exports = {
  scrape
};