import React, { Component } from "react";
import { connect } from "react-redux";
import { getEpisodes } from "../selectors/episodes";
import _ from "lodash";

class EpisodeList extends Component {
  componentDidMount() {
    window.fetch("http://localhost:8080/api/episodes").then(response => {
      response.json().then(episodes => {
        this.props.dispatch({
          type: "GET_EPISODES",
          episodes
        });
      });
    });
  }

  playEpisode = index => {
    this.props.dispatch({
      type: "START_EPISODE",
      index
    });
  };

  render() {
    return (
      <div>
        Episodes:
        {_.map(this.props.episodes, (e, index) => (
          <div key={index}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                this.playEpisode(index);
              }}
            >
              {e.name}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  episodes: getEpisodes(state) || []
}))(EpisodeList);
