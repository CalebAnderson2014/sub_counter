import React from 'react';
import moment from 'moment';

export default class Channel extends React.Component {
  constructor() {
    super()

    this.state = {
      displayInfo: false
    }
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.setState({
      displayInfo: !this.state.displayInfo
    })
  }

  render() {
    const channel = this.props.channel
    return (
      <div key={channel._id}>
        <h3>{channel.name}</h3>
        <p>{channel.subcount} subscribers recorded since {moment(channel.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        <button onClick={this.toggleInfo}>Show recent subs</button>
        {this.state.displayInfo ? <RecentList recentSubs={channel.recent} /> : null}
      </div>
    )        
  }
}


const RecentList = ({ recentSubs = [] }) => (
  <ul>
    {recentSubs.map((recent) => {
      return <li key={recent._id}>{recent.name} subbed at {moment(recent.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</li>
    })}
  </ul>
)