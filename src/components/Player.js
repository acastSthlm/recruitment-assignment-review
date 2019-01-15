import React, { Component } from "react";
import { connect } from "react-redux";
import BackwardIcon from "../icons/backward.png";
import ForwardIcon from "../icons/forward.png";
import PauseIcon from "../icons/pause.png";
import PlayIcon from "../icons/play.png";
import { getEpisodes } from "../selectors/episodes";

class Player extends Component {
  constructor() {
    super();
    this.state = {
      currentEpisode: undefined,
      audio: undefined,
      paused: true
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.player.currentEpisode !== this.props.player.currentEpisode) {
      this.loadEpisode(this.props.episodes[this.props.player.currentEpisode]);
    }
  }

  loadEpisode(episode) {
    if (this.state.audio) {
      this.state.audio.pause();
    }

    const audio = new Audio(episode.audio);

    audio.ondurationchange = () => {
      this.setState({
        episode: episode,
        audio: audio
      });
    };

    audio.ontimeupdate = () => {
      this.forceUpdate();
    };

    audio.onended = () => {
      this.setState({
        paused: true
      });
    };
  }

  onSeek = e => {
    const time = Math.round(
      (e.target.value * Math.round(this.state.audio.duration)) / 100
    );

    this.state.audio.currentTime = time;
  };

  getMarker() {
    let currentMarker;

    this.state.episode.markers.map(m => {
      if (
        this.state.audio.currentTime > m.start &&
        this.state.audio.currentTime < m.start + m.duration
      ) {
        currentMarker = m;
      }
    });

    if (currentMarker) {
      const markerTypes = {
        ad: (
          <a className="marker" href={currentMarker.link}>
            {currentMarker.content}
          </a>
        ),
        text: <p className="marker">{currentMarker.content}</p>,
        image: (
          <img
            className="marker"
            src={`http://localhost:8080${currentMarker.content}`}
          />
        )
      };

      return markerTypes[currentMarker.type];
    } else {
      return undefined;
    }
  }

  getProgressPerc = () => {
    if (!this.state.audio.duration) {
      return 0;
    }

    return Math.round(
      (100 * this.state.audio.currentTime) / this.state.audio.duration
    );
  };

  togglePause = () => {
    if (this.state.paused) {
      this.state.audio.play();
      this.setState({ paused: false });
    } else {
      this.state.audio.pause();
      this.setState({ paused: true });
    }
  };

  skipTime = sec => {
    this.state.audio.currentTime = this.state.audio.currentTime + sec;
  };

  render() {
    return (
      <div>
        <div>{this.state.episode && this.getMarker()}</div>

        {this.state.episode ? this.state.episode.name : "--"}

        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={this.state.audio ? this.getProgressPerc() : 0}
            onChange={this.onSeek}
          />
        </div>

        <img src={BackwardIcon} onClick={() => this.skipTime(-5)} />

        {this.state.paused ? (
          <img src={PlayIcon} onClick={this.togglePause} />
        ) : (
          <img src={PauseIcon} onClick={this.togglePause} />
        )}

        <img src={ForwardIcon} onClick={() => this.skipTime(5)} />
      </div>
    );
  }
}

export default connect(state => ({
  episodes: getEpisodes(state) || [],
  player: state.player
}))(Player);
