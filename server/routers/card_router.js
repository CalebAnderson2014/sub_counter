var express = require("express");
var router = express.Router();
var ChannelModel = require("../../db/models/channel.js");
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/sub_count6-15-17');
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
