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
  channels: ["#drdisrespectlive"]
};
const ChannelModel = require('./db/controllers/channel.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sub_count');

const client = new tmi.client(options);

// // Connect the client to the server..
client.connect();
// ChannelModel.addNewChannel('#test')
//   .then(console.log)
//   .catch(console.log)
// ChannelModel.addNewSub('#test', 'twitchsubber')
//   .then(console.log)
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
