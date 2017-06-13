'use strict';
const Channel = require('../models/channel.js');

exports.findAll = function(callback) {
  Channel.find({}, callback);
};

exports.insert = function(name, callback) {
  Channel.create(name, callback);
};

exports.addNewSub = function(channelName, username) {
  return Channel.findOne({name: channelName})
    .then(channel => {

      console.log('~~~~~~~~~~~~ ', channel.get('subscribers'))
      var oldSubCount = channel.get('subcount')
      var oldSubs = channel.get('subscribers')
      oldSubs.push({name: username})
      console.log('new stuff ', oldSubCount + 1, oldSubs)
      return channel.update({subcount: channel.get('subcount') + 1, subscribers: oldSubs})
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
      console.log('row ', row)
      if(row.length > 0) {
        return
      }
      return Channel.create(channel)
    })
    .catch(console.log)
}