'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('./user.js');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subcount: Number,
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const ChannelModel = mongoose.model('Channel', channelSchema);

module.exports = ChannelModel;


