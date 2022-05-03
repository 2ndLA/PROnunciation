/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import styled from 'styled-components';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/PauseCircleFilled';
import LoadIcon from '@material-ui/icons/AutorenewRounded';
import { fade } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const PlayerStyle = styled.div`
.player:hover {
  cursor: pointer;
  color: ${fade(colors.cyan[900], 0.8)};
}
.player {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${fade(colors.cyan[900], 0.6)};
}
.player svg {
  width: 100%;
  height: 100%;
}
.loading svg {
  animation: loading-frames 1s linear infinite;
}
@keyframes loading-frames{
  0% { -webkit-transform: rotate(0deg); }
  25%{ -webkit-transform: rotate(90deg); }
  50%{ -webkit-transform: rotate(180deg); }
  75%{ -webkit-transform: rotate(270deg); }
  100%{ -webkit-transform: rotate(360deg); }
}
`;

export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      loaded: false,
    };
  }

  handleClick = () => {
    const audio = document.getElementById(`audio-${this.props.spell}`);
    if (this.state.playing) {
      audio.pause();
    } else {
      audio.play();
    }
    this.setState((prevState) => ({ playing: !prevState.playing }));
  };

  handleEnded = () => {
    this.setState({ playing: false });
  };

  handleCanPlay = () => {
    this.setState({ loaded: true });
  };

  render() {
    let PlayerIcon;
    const { playing, loaded } = this.state;
    if (!playing) PlayerIcon = PlayIcon;
    else if (loaded) PlayerIcon = StopIcon;
    else PlayerIcon = LoadIcon;
    return (
      <PlayerStyle>
        <div className="audio-player" onClick={this.handleClick}>
          <span className={`player ${playing && !loaded && 'loading'}`}><PlayerIcon /></span>
          <audio
            preload="none"
            id={`audio-${this.props.spell}`}
            onEnded={this.handleEnded}
            onCanPlay={this.handleCanPlay}
            style={{ zIndex: 500 }}
          >
            <source src={require(`../audio/${this.props.audio}`)} type="audio/mpeg" />
            您的浏览器不支持 audio 元素。
          </audio>
        </div>
      </PlayerStyle>
    );
  }
}
