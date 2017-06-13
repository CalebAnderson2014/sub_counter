'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subcount: Number,
  subscribers: [{ name: String }]
});

const ChannelModel = mongoose.model('Channel', channelSchema);

module.exports = ChannelModel;


