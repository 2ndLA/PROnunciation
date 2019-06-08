import React, { Component } from 'react';
import styled from 'styled-components';
import title from '../assets/title.png';
import search from '../assets/search.png';
import wordLists from '../data';
import WordTable from '../components/WordTable';
import device from '../config';

const Wrapper = styled.div`
  font-family: Helvetica;
  text-align: left;
  .title {
    font-size: 18px;
    color: #1a5288;
    line-height: 30px
  }
  .title-text{
    margin-left: 12px;
  }
  .description {
    font-size: 14px;
    color: #888888;
    line-height: 17px;
    padding-top: 6px;
    margin-left: 30px;
    margin-bottom: 18px;
  }
  .search{
    margin-bottom: 24px;
    display: flex;
  }
  .search-input-icon {
    padding-top: 2px;
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
    color: #707070;
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
    wordList: wordLists,
  }

  onInputChange = (event) => {
    this.setState({ search: event.target.value });
    this.setState({
      wordList: wordLists.map(words => words.filter(
        word => word.spell.toLowerCase().includes(event.target.value.trim().toLowerCase()),
      )),
    });
  }

  onReset = () => {
    this.setState({ wordList: wordLists });
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
          <div className="search-input-icon">
            <img src={search} alt="Search" />
          </div>
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