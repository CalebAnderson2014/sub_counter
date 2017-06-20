import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { fetchAllChannels } from './models/channels.js';

fetchAllChannels().then(data => {
  ReactDOM.render(<App channels={data}/>, document.getElementById('app'));
});
