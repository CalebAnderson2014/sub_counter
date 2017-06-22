'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const ChannelModel = require('./channel.js');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscriptions' }],
  months: {
    type: Number
  },
  channels: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }
  ]
}, {timestamps: true});

const UserModel = mongoose.model('User', userSchema);
UserModel.findOneOrCreate = function(username) {
  return UserModel.find({ name: username }).limit(1)
    .then((user) => {
      return !!user ? UserModel.create({name: username}) : user;
    })
}
module.exports = UserModel;
