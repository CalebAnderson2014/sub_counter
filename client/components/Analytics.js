import React from 'react'
import { VictoryChart, VictoryLine } from 'victory'
import moment from 'moment'
import * as ChannelModel from '../models/channels.js' 

export default class AnalyticsPanel extends React.Component {
  constructor() {
    super()
    //{date: "5/22/2017", count: 10}, {date: "5/21/2017", count: 15}, {date: "5/20/2017", count: 13}
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    ChannelModel.fetchSubsPerDay(this.props.channelName)
      .then((calendar) => {
        var day = moment().get('date')
        var month = moment().get('month')
        var year = moment().get('year')
        var results = [];
        for(var i = 0; i < 10; i++) {
          var subCount = calendar[year][month][day - i]
          console.log(subCount)
          if(subCount >= 0) {
            results.push({ date: `${month}/${day}/${year}`, count: subCount })
          } else if(calendar[year][month - 1]) {
            var s = 31
            while(calendar[year][month - 1][s]) {
              subCount = calendar[year][month - 1][s]
              day = s
              s--
            }
            results.push({ date: `${month}/${day}/${year}`, count: subCount })
          } else if(calendar[year - 1]) {
            subCount = calendar[year - 1][12][31]
          } else {
            results = results || []
          }
        }
        this.setState({ data: results }, () => console.log(this.state.data))
      })
  }
  render() {
    return (
      <div>
        <h4>Wow a panel!</h4>
        <VictoryChart>
          <VictoryLine
            data={this.state.data}
            x="date"
            y="count"
          />
        </VictoryChart>
      </div>
    )
  }
}