import fetch from 'isomorphic-fetch';

const SERVER_URL = 'https://api.twitch.tv/kraken/';

export function fetchChannelInfoForAll(channelNames) {
  const noPound = channelNames.map(channelName => channelName.split('').filter(char => char !== '#').join(''));

  return Promise.all(noPound.map(name => {
    return fetch(SERVER_URL + 'users/' + name, {
      method: 'GET',
      headers: {
        'Client-ID': '0rc2vei35oc05f5w3kz9shh5b7k6sy'
      }
    })
    .then(data => data.json())
  }))

}

export function channelsNewSubs(channelName, amount) {
  const noPound = channelName.split('').filter(char => char !== '#').join('');
  return fetch(SERVER_URL + noPound + '?amount=' + amount )
    .then(data => data.json());
}

export function fetchSubsPerDay(channelName) {
  const noPound = channelName.split('').filter(char => char !== '#').join('');
  return fetch(SERVER_URL + noPound + '/daily')
    .then(data => data.json());

}