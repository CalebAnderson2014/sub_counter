import React from "react";
import Channel from "./Channel.js";
import moment from "moment";

export default ({ channels }) => {
  return (
    <div>
      {channels.map(channel => {
        return <div key={channel._id}>
          <h3>{channel.name}</h3>
          <p>{channel.subcount} subscribers recorded since {moment(channel.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        </div>
      })}
    </div>
  );
};
