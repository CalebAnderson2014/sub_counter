import React from 'react'
import { VictoryChart, VictoryLine } from 'victory'

export default ({ channelData }) => (
  <VictoryChart>
    <VictoryLine data={channelData} />
  </VictoryChart>
)