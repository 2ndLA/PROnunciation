import React, { Component } from 'react';
import styled from 'styled-components';
import ListPNG from '../assets/list.png';
import ListDownPNG from '../assets/list-down.png';
import searchIcon from '../assets/search.png';
import dictionary from '../data';
import { device, size } from '../config';
import { WordTable } from '../components';

const Wrapper = styled.div`
  font-family: "Lato", Helvetica, sans-serif;
  text-align: left;
  .title-icon {
    :hover {
      cursor: pointer;
    }
  }
  .title {
    margin-top: 12px;
    font-size: 18px;
    color: #0277bd;
    line-height: 30px;
    margin-bottom: 16px;
    position: relative;
  }

  .title-text{
    margin-left: 12px;
  }
  .description {
    font-size: 14px;
    line-height: 17px;
    color: #0277bd;
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
  .search-input-reset {
    opacity: 0.6;
    :hover{
      cursor: pointer;
    }
  }

  @media ${device.laptopS} {  
    margin: 0 auto;
    max-width: ${size.tablet};
  }
  @media ${device.mobileL} {  
    padding: 2em;
  }
`;

export default class MainPage extends Component {
  state = {
    search: '',
    dictionary,
    expand: false,
  }

  onInputChange = (event) => {
    const search = event.target.value;
    this.setState({ search });
    this.setState({
      dictionary: dictionary.map((words) => {
        const filteredKeys = Object.keys(words).filter(
          word => word.toLowerCase().includes(search.trim().toLowerCase()),
        );
        return filteredKeys.reduce((obj, key) => ({ ...obj, [key]: words[key] }), {});
      }),
    });
  }

  onExpand = () => {
    this.setState(prevState => ({ expand: !prevState.expand }));
  }

  onReset = () => {
    this.setState({ dictionary, search: '' });
  }

  render() {
    return (
      <Wrapper>
        <div className="title">
          <img src={this.state.expand ? ListDownPNG : ListPNG} alt="title icon" onClick={this.onExpand} className="title-icon" />
          <span className="title-text">PROnunciation</span>
          {this.state.expand && (
            <div className="description">
              Correct pronunciation makes you sound more professional(and causes lesser mishering).
              In addition, the writing is also the official way.
            </div>
          )}
        </div>
        <div className="search">
          <div className="search-input-icon">
            <img src={searchIcon} alt="Search" />
          </div>
          <input
            className="search-input"
            type="text"
            value={this.state.search}
            placeholder="Type in to Search..."
            onChange={this.onInputChange}
          />
          {this.state.search
            && <span onClick={this.onReset} className="search-input-reset">×</span>}
        </div>
        <div className="word-table">
          <WordTable dictionary={this.state.dictionary} />
        </div>
      </Wrapper>
    );
  }
}
