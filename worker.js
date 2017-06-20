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
  channels: ['#nl_kripp', '#day9tv', '#lassiz', '#hsdogdog', '#goldglove', '#joshog', '#forsenlol', '#chu8', '#timthetatman', '#drdisrespectlive', '#lirik', '#imaqtpie', '#a_seagull', '#summit1g', '#savjz', '#greekgodx']
};
const ChannelModel = require('./db/controllers/channel.js');
const UserModel = require('./db/controllers/user.js');    
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sub_count6-15-17');

const client = new tmi.client(options);

// Connect the client to the server..
client.connect();

client.on('subscription', function (channel, username, method, message, userstate) {
  console.log(username + ' has subbed to ' + channel);
  ChannelModel.addSub(channel, username)
    .then(console.log)
    .catch(console.log);
});

client.on('resub', function (channel, username, months, message, userstate, methods) {
  console.log(username + ' has ' + months + ' resubbed to ' + channel );
  ChannelModel.addSub(channel, username, months)
    .then(console.log)
    .catch(console.log);
});

client.on('roomstate', function (channel, state) {
  console.log('joined ' + channel);

  ChannelModel.addNewChannel(channel)
    .then(console.log)
    .catch(console.log);
});
