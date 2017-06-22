const Channel = require('../db/models/channel.js');
const User = require('../db/models/user.js');
const Cheer = require('../db/models/cheer.js');

exports.handleSubEvent = function(channel, username, method, message, userstate) {
  console.log('our userstate: ', arguments)
  addSub(channel, username, 0, userstate)
};

exports.handleReSubEvent = function(channel, username, months, message, userstate, methods) {
  console.log(arguments)
  addSub(channel, username, months, userstate)
};

function addSub(channel, username, months = 0, userstate) {
  var user = { name: username, months: months };
  var query = { name: channel };
  
  User.findOneOrCreate(user.name)
    .then((user) => {
      return Channel.update(query, { $push: { subscribers: user._id }, $inc: { subcount: 1}});
    })
    .then((ch) => {
      return Channel.findOne(query);
    })
    .then((ch) => {
      return User.update({ name: username }, { $push: { channels: ch._id }});
    })
    .catch(console.log);
};

exports.checkStatus = function(channel, state) {
  Channel.findOneOrCreate(channel)
    .then(giveStatusReport)
    .catch(console.log)
};

exports.handleCheer = function(channel, userstate, message = '') {
  var user = { name: userstate['display-name'] }
  User.findOneOrCreate(user)
    .then((res) => {
      user = res;
      return Channel.findOne({ name: channel })
    })
    .then((ch) => {
      return Cheer.create({ user: user._id, amount: Number(userstate.bits), channel: ch._id, message: message })
    })
    .then(() => {
      console.log(`${user.name} cheer ${userstate.bits} to ${channel}`)
    })
    .catch(console.log)
};

function giveStatusReport(channel) {
  console.log('Status update for ' + channel.name);
  console.log('Subcount: ', channel.subcount);
};
