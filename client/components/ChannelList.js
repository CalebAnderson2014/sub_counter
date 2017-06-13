import React from "react";
import Channel from "./Channel.js";

export default ({ channels }) => {
  return (
    <div>
      {channels.map(channel => (
        <div key={channel._id}>
          <h3>{channel.name}</h3>
          <p> Sub count: {channel.subcount}</p>
        </div>
      ))}
    </div>
  );
};
