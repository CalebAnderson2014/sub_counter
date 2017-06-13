'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const ChannelModel = require('./channel.js')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  months: {
    type: Number,
    required: true
  },
  channels: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }
  ]
}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
