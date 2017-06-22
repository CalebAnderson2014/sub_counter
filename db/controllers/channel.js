'use strict';
const Channel = require('../models/channel.js');
const User = require('../models/user.js');
const Subscription = require('../models/subscription.js');
const moment = require('moment');


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

exports.getSubsPerDay = function(channelName) {

  return Subscription.find({ channelName: channelName })
    .then((subs) => {
      console.log(subs);
      return subs.reduce((calendar, sub) => {
        var date = moment(sub.updated);
        var month = date.get('month')
        var year = date.get('year')
        var day = date.get('date')
        if(!calendar[year]) {
          calendar[year] = {}
        }
        if(!calendar[year][month]) {
          calendar[year][month] = {}
        }
        if(!calendar[year][month][day]) {
          calendar[year][month][day] = 0;
        } 
        calendar[year][month][day] += 1;
        
        return calendar
      }, {})
    })
}

exports.findSharedSubs = function() {};

