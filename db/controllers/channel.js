'use strict';
const Channel = require('../models/channel.js');
const User = require('../models/user.js');

exports.findAll = function() {
  return Channel.find({});
};

exports.model = function() {
  return User;
};

exports.insert = function(name) {
  Channel.create(name);
};

exports.getChannelSubs = function(channelName) {
  return Channel.findOne({ name: channelName })
    .populate('subscribers')
    .then((ch) => {
      return ch.subscribers;
    });
};

exports.getNewSubs = function(channelName) {
  console.log('getting new subs for: ', channelName);
  return new Promise((resolve, reject) => {
    Channel.findOne({ name: channelName })
      .populate({
        path: 'subscribers',
        options: {
          limit: 15,
          sort: { 'createdAt': -1 }
        } 
      })
      .exec((err, channel) => {
        if (err) {
          reject(err);
        }
        console.log('~~~~~~~channel subs: ', channel.subscribers);
        resolve(channel.subscribers);
      });
  });
};

exports.getAllNewest5Subs = function() {
  return new Promise((resolve, reject) => {
    Channel.find({})
      .populate({
        path: 'subscribers',
        match: { months: 0 },
        options: { limit: 5 }
      })
      .exec((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
  });
};

exports.findSharedSubs = function() {};

