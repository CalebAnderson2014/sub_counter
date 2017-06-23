import React from 'react';
import ChannelList from './ChannelList';
import * as ChannelModel from '../models/channels.js';
import Channel from './Channel';
// import io from 'socket.io-client';
// const socket = io('http://localhost:8088');
import Watcher from '../watcher/index.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const defaults = props.channels.reduce((acc, ch) => {
      acc[ch.name] = { sub: 'None yet!', cheer: {} }
      return acc
    }, {})
    this.state = {
      channels: props.channels,
      latest: defaults
    };
  }
  componentDidMount() {
    Promise.all(this.props.channels.map((ch) => ChannelModel.channelsNewSubs(ch.name)))
      .then((arr) => {
        const newState = this.state.channels.map((channel, i) => {
          channel.recent = arr[i];
          return channel;
        });
        this.setState({ channels: newState });
      });

    const watcher = new Watcher()
    watcher.start.call(this)
    // socket.on('sub', function(data) {
    //   console.log('event happening!', data);
    //   console.log(data.userName + ' just subscribed to ' + data.channelName)
    //   var copy = Object.assign({}, this.state.latest)
    //   copy[data.channelName] = data
    //   console.log('our new copy ', copy)
    //   this.setState({ latest: copy })
    // }.bind(this))
    // socket.on('connected', function(data) {
    //   console.log('connections! ', data)
    // })

  }
  render() {
    return (
      <div>
        <h2>Streamers</h2>
        <ChannelList>
          {this.state.channels.map(channel => <Channel key={channel._id} latest={this.state.latest} channel={channel} />)} 
        </ChannelList>
      </div>
    );
  }
}
