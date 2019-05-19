import React, { Component } from 'react';
import styled from 'styled-components';
import title from '../assets/title.png';
import search from '../assets/search.png';
import words from '../data';
import WordTable from '../components/WordTable';
import device from '../config';

const Wrapper = styled.div`
  font-family: Helvetica;
  text-align: left;
  .title {
    font-size: 18px;
    color: #808080;
    line-height: 30px
  }
  .title-text{
    margin-left: 12px;
  }
  .description {
    font-size: 14px;
    color: #999999;
    line-height: 17px;
    padding-top: 6px;
    margin-left: 30px;
    margin-bottom: 18px;
  }
  .search{
    margin-bottom: 24px;
  }
  .search-input {
    padding: 0px;
    margin-left: 12px;
    border: 0;
    border-bottom: 2px solid #ffffff;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    background: transparent;
   }
  .search-input:focus {
    outline: 0;
    color: #808080;
  }

  @media ${device.laptop} {  
    margin: 0 auto;
    max-width: 800px;
  }
  @media ${device.mobileL} {  
    padding: 2.5em;
  }
`;

export default class MainPage extends Component {
  state = {
    search: '',
    wordList: words,
  }

  onInputChange = (event) => {
    this.setState({ search: event.target.value });
    this.setState({
      wordList: words.filter(word => word.spell.includes(event.target.value)),
    });
  }

  onReset = () => {
    this.setState({ wordList: words });
  }

  render() {
    return (
      <Wrapper>
        <div className="title">
          <img src={title} alt="Logo" />
          <span className="title-text">PROnunciation</span>
        </div>
        <div className="description">
          Correct pronunciation makes you sound more professional(and causes lesser mishering).
          In addition, the writing is also the official way.
        </div>
        <div className="search">
          <img src={search} alt="Search" className="search-input-icon" />
          <input
            className="search-input"
            type="text"
            value={this.state.search}
            placeholder="Type in to Search..."
            onChange={this.onInputChange}
          />
        </div>
        <div className="word-table">
          <WordTable words={this.state.wordList} />
        </div>
      </Wrapper>
    );
  }
}
