import React from "react";
import Channel from "./Channel.js";

export default ({ channels }) => {
  return (
    <div>
      {channels.map(card => (
        <div>
          <h3>{card.name}</h3>
          <img src={card.img} />
        </div>
      ))}
    </div>
  );
};
