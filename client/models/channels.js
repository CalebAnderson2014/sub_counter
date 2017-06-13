import fetch from 'isomorphic-fetch'

export function fetchAllChannels() {
  return fetch('http://localhost:4000/channels')
    .then(data => data.json())
}
