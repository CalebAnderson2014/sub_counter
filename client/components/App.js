import React from "react";
import ChannelList from "./ChannelList";
import * as ChannelModel from "../models/channels.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: props.channels
    };
  }
  componentDidMount() {
    Promise.all(this.props.channels.map((ch) => ChannelModel.channelsNewSubs(ch.name)))
      .then((arr) => {
        const newState = this.state.channels.map((channel, i) => {
          channel.recent = arr[i]
          return channel
        })
        this.setState({ channels: newState })
      })
  }
  render() {
    return (
      <div>
        <h2>Streamers</h2>
        <ChannelList channels={this.state.channels}/>
      </div>
    );
  }
}
