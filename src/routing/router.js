var express = require("express");
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");
var db = require("../models");

const scraper = require("./scraper.js");

router.get("/", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
        res.render("articles", { item: dbArticle });
        })
    console.log("received!!!");
});

router.post("/submit", function(req, res) {
    db.scrapedArticles.create(req.body)
        .then(function(dbArticle) {
            //return db.Library.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });
        })

});

router.get("/scrape", function(req,res) {
    scraper.scrape();
    //res.send(scraper.dbArticle);
    db.Article.find({})
        .then(function(dbArticle) {
        console.log(dbArticle);
        res.render("scrape");
        })
    
    //still not fully working.
    // res.send(scraper.result);
    // console.log(scraper.results);
});

router.get("/delete/:id", function(req,res) {
    console.log(req.params.id);
    console.log("received Delete");
    db.Article.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Todo successfully deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
})

module.exports = router;