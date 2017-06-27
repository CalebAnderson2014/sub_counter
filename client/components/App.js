import React from 'react';
import ChannelList from './ChannelList';
import * as ChannelModel from '../models/channels.js';
import Channel from './Channel';
import Watcher from '../watcher/index.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const defaults = props.channels.reduce((acc, ch) => {
      acc[ch.name] = { sub: 'None yet!', cheer: {} };
      return acc;
    }, {});
    this.state = {
      channels: props.channels,
      latest: defaults
    };
  }
  componentDidMount() {
    Promise.all(this.props.channels.map((ch) => ChannelModel.channelsNewSubs(ch.name, 10)))
      .then((arr) => {
        const newState = this.state.channels.map((channel, i) => {
          channel.recent = arr[i];
          return channel;
        });
        this.setState({ channels: newState });
      });

    const watcher = new Watcher();
    watcher.start.call(this);
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
