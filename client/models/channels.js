import fetch from 'isomorphic-fetch'

export function fetchAllChannels() {
  return fetch('http://159.203.103.19:4000/channels')
    .then(data => data.json())
}

export function channelsNewSubs(channelName) {
  const noPound = channelName.split('').filter(char => char !== '#').join('')
  return fetch('http://localhost:4000/channels/' + noPound)
    .then(data => data.json())
}