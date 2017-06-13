'use strict';
const Channel = require('../models/channel.js');
const User = require('../models/user.js');
exports.findAll = function() {
  return Channel.find({});
};

exports.insert = function(name) {
  Channel.create(name);
};

exports.addNewSub = function(channelName, username) {
  var user = new User({ name: username });
  var existingUser;
  var query = { name: channelName };
  return user.validate()
    .then(() => {
      return user.save()
    })
    .catch(err => {
      console.log()
      if(err.message.includes('dup key')) {
        return User.find({ name: username })
      }
      throw new Error('something bad')
    })
    .then((u) => {
      existingUser = u
      return
    })
    .then((d) => {
      console.log(d)
      return Channel.update(query, { $push: { subscribers: user }, $inc: { subcount: 1}})
    })
    .then((ch) => {

      return Channel.find(query)
    })
    .then((ch) => {
      console.log('should be our channel ', ch);
      return User.update({ name: username }, { $push: {channels: ch }})
    })
  

    // .then(() => Channel.findOne({name: channelName}))
    // .then(channel => {

    //   console.log('~~~~~~~~~~~~ ', channel.get('subscribers'))
    //   var oldSubCount = channel.get('subcount')
    //   var oldSubs = channel.get('subscribers')
    //   oldSubs.push({name: username})
    //   console.log('new stuff ', oldSubCount + 1, oldSubs)
    //   return channel.update({subcount: channel.get('subcount') + 1, subscribers: oldSubs})
    // })
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