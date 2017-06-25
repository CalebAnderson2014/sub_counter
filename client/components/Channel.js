import React from 'react';
import moment from 'moment';
import AnalyticsPanel from './Analytics.js';

export default class Channel extends React.Component {
  constructor() {
    super();

    this.state = {
      show: {
        list: false,
        panel: false
      }
    };

    this.toggleInfo = this.toggleInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // socket.emit('room', { room: nextProps.channel.name })

  }

  toggleInfo(e) {
    console.log(e.target.className)
    const newState = e.target.className === 'toggleRecent' ? { list: !this.state.show.list } : { panel: !this.state.show.panel };
    this.setState({show: newState});
  }

  render() {
    const channel = this.props.channel;
    const latest = this.props.latest[channel.name]
    channel.testData = [{name: 'Alice', createdAt: ''}]
    return (
      <div key={channel._id}>
        <h3>{channel.name}</h3>
        <label>Newest sub</label> {latest['sub']['userName']}
        {latest['cheer']['userName'] ? latest['cheer']['userName']['display-name'] + ' cheered: ' + latest['cheer']['userName']['bits'] : null}
        <p>{channel.subcount} subscribers recorded since {moment(channel.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        <button className="toggleRecent" onClick={this.toggleInfo}>Show recent subs</button>
        {this.state.show.list ? <RecentList recentSubs={channel.recent} /> : null}
        <button className="togglePanel" onClick={this.toggleInfo}>Show analytics</button>
        {this.state.show.panel ? <AnalyticsPanel channelName={channel.name} channelData={[]} /> : null}
      </div>
    );        
  }
}


const RecentList = ({ recentSubs = [] }) => (
  <ul>
    {recentSubs.map((recent) => {
      return <li key={recent._id}>{recent.name} subbed at {moment(recent.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</li>;
    })}
  </ul>
);



// var data = [{ "_id" : ObjectId("59436c91c99cad8d404a668c"), "updatedAt" : ISODate("2017-06-16T05:28:49.329Z"), "createdAt" : ISODate("2017-06-16T05:28:49.278Z"), "name" : "JonClaudeVanDamme", "months" : 0, "channels" : [ ObjectId("59436c31fe6ec38d2c84dcdc") ], "__v" : 0 },
// { "_id" : ObjectId("59436c99c99cad8d404a668d"), "updatedAt" : ISODate("2017-06-16T05:28:57.138Z"), "createdAt" : ISODate("2017-06-16T05:28:57.131Z"), "name" : "Darkruler09", "months" : 9, "channels" : [ ObjectId("59436c83c99cad8d404a668b") ], "__v" : 0 },
// { "_id" : ObjectId("59436c9cc99cad8d404a668e"), "updatedAt" : ISODate("2017-06-16T05:29:00.784Z"), "createdAt" : ISODate("2017-06-16T05:29:00.771Z"), "name" : "I_AMWILDCAT", "months" : 30, "channels" : [ ObjectId("59436c31fe6ec38d2c84dcdc") ], "__v" : 0 },
// { "_id" : ObjectId("59436ce6c99cad8d404a668f"), "updatedAt" : ISODate("2017-06-16T05:30:14.622Z"), "createdAt" : ISODate("2017-06-16T05:30:14.612Z"), "name" : "Sapolsky", "months" : 4, "channels" : [ ObjectId("59436c31fe6ec38d2c84dcdc") ], "__v" : 0 },
// { "_id" : ObjectId("59436d02c99cad8d404a6690"), "updatedAt" : ISODate("2017-06-16T05:30:42.793Z"), "createdAt" : ISODate("2017-06-16T05:30:42.786Z"), "name" : "JustDave81Streams", "months" : 0, "channels" : [ ObjectId("59436c31fe6ec38d2c84dcdc") ], "__v" : 0 },
// { "_id" : ObjectId("59436d79c99cad8d404a6691"), "updatedAt" : ISODate("2017-06-16T05:32:41.674Z"), "createdAt" : ISODate("2017-06-16T05:32:41.666Z"), "name" : "OhalYeah", "months" : 35, "channels" : [ ObjectId("59436c35fe6ec38d2c84dcde") ], "__v" : 0 },
// { "_id" : ObjectId("59436db0c99cad8d404a6692"), "updatedAt" : ISODate("2017-06-16T05:33:36.333Z"), "createdAt" : ISODate("2017-06-16T05:33:36.324Z"), "name" : "MCerro", "months" : 0, "channels" : [ ObjectId("59436c43fe6ec38d2c84dce5") ], "__v" : 0 },
// { "_id" : ObjectId("59436dbac99cad8d404a6693"), "updatedAt" : ISODate("2017-06-16T05:33:46.934Z"), "createdAt" : ISODate("2017-06-16T05:33:46.925Z"), "name" : "nimz", "months" : 0, "channels" : [ ObjectId("59436c83c99cad8d404a668b") ], "__v" : 0 },
// { "_id" : ObjectId("59436dddc99cad8d404a6694"), "updatedAt" : ISODate("2017-06-16T05:34:21.938Z"), "createdAt" : ISODate("2017-06-16T05:34:21.930Z"), "name" : "kimfranken", "months" : 2, "channels" : [ ObjectId("59436c83c99cad8d404a668b") ], "__v" : 0 },
// { "_id" : ObjectId("59436df1c99cad8d404a6695"), "updatedAt" : ISODate("2017-06-16T05:34:42.005Z"), "createdAt" : ISODate("2017-06-16T05:34:41.997Z"), "name" : "derral", "months" : 0, "channels" : [ ObjectId("59436c45fe6ec38d2c84dce6") ], "__v" : 0 }]