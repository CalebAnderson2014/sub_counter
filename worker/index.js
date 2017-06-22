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
const helpers = require('./helpers.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sub_count_test');

const client = new tmi.client(options);

// Connect the client to the server..
client.connect();

client.on('subscription', helpers.handleSubEvent);

client.on('resub', helpers.handleReSubEvent);

client.on('cheer', helpers.handleCheer);

client.on('roomstate', helpers.checkStatus);
