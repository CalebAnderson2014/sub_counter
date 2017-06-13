// React package that deals with DOM interactions
import ReactDOM from "react-dom";

// React package for constructing components (and all non-DOM related actions)
import React from "react";

// Import React component from PetShopWindow
import App from "./components/App";

import { fetchAllChannels } from "./models/channels.js";

fetchAllChannels().then(data => {
  console.log(data)
  ReactDOM.render(<App channels={data}/>, document.getElementById("app"));
});
// Render that component to the DOM!
