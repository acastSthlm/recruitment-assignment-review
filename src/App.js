import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import EpisodeList from "./components/EpisodeList";
import Player from "./components/Player";
import reducers from "./reducers";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Player />
        <EpisodeList />
      </Provider>
    );
  }
}
