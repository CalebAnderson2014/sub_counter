var express = require("express");
var router = express.Router();
var ChannelModel = require("../../db/controllers/channel.js");
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cardstone');
// define the home page route
router.get("/", function(req, res) {
  ChannelModel.find({}, function(err, data) {
    if(err) {
      console.log(err)
      res.status(500).send()
    }
    console.log(data)
    res.send(JSON.stringify(data))
  });
});

module.exports = router;
