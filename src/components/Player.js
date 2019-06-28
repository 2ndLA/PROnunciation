/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import styled from 'styled-components';

import playing from '../assets/play.png';
import stopped from '../assets/stop.png';

const PlayerStyle = styled.div`
.audio-player {
  width: 32px;
  height: 32px;
  -webkit-tap-highlight-color: transparent;
}
.audio-player:hover {
  cursor: pointer;
}
.playing {
  background: url(${playing}) no-repeat center bottom;
  background-size: cover;
}
.stopped {
  background: url(${stopped}) no-repeat center bottom;
  background-size: cover;
}
`;


export default class Player extends Component {
  state = {
    playing: false,
  }

  handleClick = () => {
    const audio = document.getElementById(`audio-${this.props.spell}`);
    if (this.state.playing) audio.pause();
    else audio.play();
    this.setState(prevState => ({ playing: !prevState.playing }));
  }

  handleEnded = () => {
    this.setState({ playing: false });
  }

  render() {
    return (
      <PlayerStyle>
        <div
          className={`audio-player ${this.state.playing ? 'playing' : 'stopped'}`}
          onClick={this.handleClick}
        >
          <audio preload="none" id={`audio-${this.props.spell}`} onEnded={this.handleEnded}>
            <source src={require(`../audio/${this.props.audio}`)} type="audio/mpeg" />
            您的浏览器不支持 audio 元素。
          </audio>
        </div>
      </PlayerStyle>
    );
  }
}
