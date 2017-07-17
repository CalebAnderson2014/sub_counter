import React from 'react'
import { VictoryChart, VictoryLine } from 'victory'
import moment from 'moment'
import * as ChannelModel from '../models/channels.js' 
import * as ChannelController from '../controllers/channels-controller.js' 

export default class AnalyticsPanel extends React.Component {
  constructor() {
    super()
    //{date: "5/22/2017", count: 10}, {date: "5/21/2017", count: 15}, {date: "5/20/2017", count: 13}
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    ChannelController.formatSubsPerDay(this.props.channelName)
      .then((results) => {
        this.setState({ data: results }, () => console.log(this.state.data))
      })
  }
  render() {
    return (
      <div>
        <VictoryChart>
          <VictoryLine
            data={this.state.data}
            fixLabelOverlap={true}
            labels={(datum) => { console.log(datum.y); return datum.y}}
            style={{ data: { stroke: "red" }}}
            x="date"
            y="count"
            domain={{y: [0, 1000]}}
          />
        </VictoryChart>
      </div>
    )
  }
}