import React from 'react';
import Channel from './Channel.js';

export default ({ channels }) => {
  return (
    <div>
      {channels.map(channel => <Channel key={channel._id} channel={channel} />)} 
    </div>
  );
};
