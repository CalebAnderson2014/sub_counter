import fetch from 'isomorphic-fetch'

export function fetchAllChannels() {
  return fetch('http://159.203.103.19:4000/channels')
    .then(data => data.json())
}
