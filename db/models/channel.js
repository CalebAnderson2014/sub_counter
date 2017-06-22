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
  broadcasts: [{
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now }
  }],
  subcount: { type: Number, default: 0 },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const ChannelModel = mongoose.model('Channel', channelSchema);

ChannelModel.findOneOrCreate = function(channelName) {
  return ChannelModel.findOne({ name: channelName })
    .then((channel) => {
      return !!channel ? channel: ChannelModel.create({name: channelName});
    })
}

module.exports = ChannelModel;


