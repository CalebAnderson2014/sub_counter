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
var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//... 


mongoose.connect('mongodb://localhost/sub_count2');

const client = new tmi.client(options);

// Connect the client to the server..
client.connect();

io.on('connection', function (socket) {
  console.log('SOCKETS ONLINE!!!!!!!!!!!!!!!!')
  client.on('subscription', function() {
    console.log('1. SUB EVENT FIRING~~~~~~~~~~~~')
    var args = Array.prototype.slice.call(arguments);
    helpers.handleSubEvent.apply(null, args)
      .then((sub) => {
        console.log(typeof socket, 'emmiting sub')
        socket.emit('sub', sub)
      });
  })

  client.on('resub',  function() {
    console.log('1. RESUB EVENT FIRING !!!~~~~~~~~~~~~~~')
    var args = Array.prototype.slice.call(arguments);
    helpers.handleReSubEvent.apply(null, args)
      .then((sub) => {
        socket.emit('sub', sub)
      });
  });

  client.on('cheer', helpers.handleCheer);

  client.on('roomstate', helpers.checkStatus);

})
server.listen(8088);