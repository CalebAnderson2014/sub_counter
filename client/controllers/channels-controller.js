import * as ChannelModel from '../models/channels.js'
import moment from 'moment'

exports.formatSubsPerDay = function(channelName) {
  return ChannelModel.fetchSubsPerDay(channelName)
        .then((calendar) => {
          var day = moment().get('date')
          var month = moment().get('month')
          var year = moment().get('year')
          var results = [];
          for(var i = 0; i < 10; i++) {
            var subCount = calendar[year][month][day - i]
            if(subCount >= 0) {
              results.unshift({ date: `${month}/${day - i}/${year}`, count: subCount })
            } else if(calendar[year][month - 1]) {
              var s = 31
              while(calendar[year][month - 1][s]) {
                subCount = calendar[year][month - 1][s]
                day = s
                s--
              }
              results.unshift({ date: `${month}/${day}/${year}`, count: subCount })
            } else if(calendar[year - 1]) {
              subCount = calendar[year - 1][12][31]
            } else {
              results = results || []
            }
          }
          return results
        })
}
