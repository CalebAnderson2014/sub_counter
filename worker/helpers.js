const Channel = require('../db/models/channel.js');
const User = require('../db/models/user.js');
const Cheer = require('../db/models/cheer.js');
const Subscription = require('../db/models/subscription.js');

exports.handleSubEvent = function(channel, username, userstate, message, methods, months) {
  console.log('our userstate: SUB EVENT', arguments)
  return addSub(channel, username, 0, userstate)
};

exports.handleReSubEvent = function(channel, username, userstate, message, methods, months) {
  console.log('RESUB EVENT: ', arguments)
  return addSub(channel, username, months, userstate)
};

function addSub(channel, username, months, userstate) {
  var months = months || 0;
  var user = { name: username, months: months };
  var query = { name: channel };
  var subscription = {
    channelName: channel,
    userName: username
  };

  return User.findOneOrCreate(user.name)
    .then((user) => {
      subscription.user = user._id
      return Channel.update(query, { $push: { subscribers: user._id }, $inc: { subcount: 1}});
    })
    .then((ch) => {
      return Channel.findOne(query);
    })
    .then((ch) => {
      subscription.channel = ch._id
      return User.update({ name: username }, { $push: { channels: ch._id }});
    })
    .then(() => {
      return Subscription.findOne(subscription)
        .then((sub) => {
          if(!sub) {
            subscription.started = Date.now()
            return Subscription.create(subscription)
          } else {
            return Subscription.update(subscription)
          }
        })
    })
    .then(() => subscription)
};

exports.checkStatus = function(channel, state) {

  Channel.findOneOrCreate(channel)
    .then(giveStatusReport)
    .catch(console.log)
};

exports.handleCheer = function(channel, username, userstate, message, methods, months) {
  var message = message || '';
  var user = { name: userstate['display-name'] }
  console.log('our user: ', user)
  return User.findOneOrCreate(user.name)
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

function joinRoom(channelName) {
  socket.on('room', function(data) {
    socket.join(data.room);
  });
}
function giveStatusReport(channel) {
  console.log('Status update for ' + channel.name);
  console.log('Subcount: ', channel.subcount);
};
