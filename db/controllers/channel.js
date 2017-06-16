'use strict';
const Channel = require('../models/channel.js');
const User = require('../models/user.js');

exports.findAll = function() {
  return Channel.find({});
};

exports.model = function() {
  return User
}

exports.insert = function(name) {
  Channel.create(name);
};

exports.getChannelSubs = function(channelName) {
  return Channel.findOne({ name: channelName })
    .populate('subscribers')
    .then((ch) => {
      return ch.subscribers
    })

};

exports.findSharedSubs = function() {};

exports.addSub = function(channelName, username, months) {
  var months = months || 0;
  var user = new User({ name: username, months: months });
  var existingUser;
  var query = { name: channelName };
  return user.validate()
    .then(() => {
      return user.save()
    })
    .catch(err => {
      if(err.message.includes('dup key')) {
        return User.find({ name: username })
      }
      throw new Error('something bad')
    })
    .then((d) => {
      return Channel.update(query, { $push: { subscribers: user._id }, $inc: { subcount: 1}})
    })
    .then((ch) => {
      return Channel.findOne(query)
    })
    .then((ch) => {
      return User.update({ name: username }, { $push: {channels: ch._id }})
    })
    .catch(console.log)
}

exports.addNewChannel = function(name) {
  var channel = {
    name: name,
    subcount: 0,
    subscribers: []
  }
  return Channel.find({name: channel.name})
    .then((row) => {
      if(row.length > 0) {
        return
      }
      return Channel.create(channel)
    })
    .catch(console.log)
}