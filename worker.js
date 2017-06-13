'use strict';
const tmi = require('tmi.js');
const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  channels: ["#drdisrespectlive", "#lirik", "#imaqtpie", "#a_seagull", "#summit1g", "#savjz", "#greekgodx"]
};
const ChannelModel = require('./db/controllers/channel.js');
const UserModel = require('./db/controllers/user.js');

// User.create({name: 'tester'})
//   .then(() => {
//     return User.exists({name: 'tester'})
//   })
//   .then(data => console.log(data));
// ChannelModel.addNewChannel('#test')
//   .then(() => {
//     return ChannelModel.addNewSub('#test', 'testerson')
//       .then(console.log)
//       .then(UserModel.findAll)
//       .then(console.log)
//   })
    
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sub_count');

const client = new tmi.client(options);

// Connect the client to the server..
client.connect();

client.on("subscription", function (channel, username, method, message, userstate) {
    console.log(username + ' has subbed to ' + channel)
    ChannelModel.addNewSub(channel, username)
      .then(console.log)
});

client.on("roomstate", function (channel, state) {
    // Do your stuff.
    console.log('joined ' + channel)

    ChannelModel.addNewChannel(channel)
      .then(console.log)
      .catch(console.log)
});
