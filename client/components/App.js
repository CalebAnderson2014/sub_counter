import React from "react";
import ChannelList from "./ChannelList";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <ChannelList channels={this.props.channels}/>
      </div>
    );
  }
}
