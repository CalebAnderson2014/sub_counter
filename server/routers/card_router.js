var express = require('express');
var router = express.Router();
var ChannelModel = require('../../db/models/channel.js');
var ChannelController = require('../../db/controllers/channel.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sub_count_test');
// define the home page route
router.get('/', function(req, res) {
  console.log(req.url);
  ChannelModel.
    find({}).
    sort('-subcount').
    exec(function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send();
      }
      res.send(JSON.stringify(data));
    });
});

router.get('/:channelName', function(req, res) {
  console.log('channel name: ', req.params.channelName);
  ChannelController.getNewSubs('#' + req.params.channelName)
    .then((subs) => {
      res.send(JSON.stringify(subs));
    })
    .catch(res.error);
});

router.get('/:channelName/daily', function(req, res) {
  console.log('channel name: ', req.params.channelName);
  ChannelController.getSubsPerDay('#' + req.params.channelName)
    .then((subs) => {
      res.send(JSON.stringify(subs));
    })
    .catch(res.error);
});

module.exports = router;
