import fetch from 'isomorphic-fetch';

const SERVER_URL = 'http://localhost:4000/channels/';

export function fetchAllChannels() {
  return fetch(SERVER_URL)
    .then(data => data.json());
}

export function channelsNewSubs(channelName) {
  const noPound = channelName.split('').filter(char => char !== '#').join('');
  return fetch(SERVER_URL + noPound)
    .then(data => data.json());
}

export function fetchSubsPerDay(channelName) {
  const noPound = channelName.split('').filter(char => char !== '#').join('');
  return fetch(SERVER_URL + noPound + '/daily')
    .then(data => data.json());

}