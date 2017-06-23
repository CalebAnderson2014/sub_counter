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

const client = new tmi.client(options);

class Watcher {
  constructor() {
    client.connect();
  }

  start() {
    console.log(this)
    client.on('subscription', updateLatest('sub').bind(this));

    client.on('resub', updateLatest('sub').bind(this));

    client.on('cheer', updateLatest('cheer').bind(this));
  }
}

export default Watcher

function updateLatest(event) {
  return function(channel, username, userstate, message, methods, months) {
    console.log('our userstate: SUB EVENT', this);
    var current = Object.assign({}, this.state);
    current['latest'][channel][event] = event === 'cheer' ? { userName: username, amount: userstate.bits } : { userName: username, months: months }
    var idx = current['channels'].findIndex(ch => ch.name === channel)
    current['channels'][idx].subCount += 1;
    this.setState(current)
  };
}
