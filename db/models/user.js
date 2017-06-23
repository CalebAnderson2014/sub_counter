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
  console.log('finding by ', username)
  return UserModel.findOne({ name: username })
    .then((user) => {
      console.log('our user is ', user)
      return !!user ? user : UserModel.create({name: username});
    })
}
module.exports = UserModel;
