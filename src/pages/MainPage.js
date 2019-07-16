import React, { Component } from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/UnfoldLess';
import ArrowLeftIcon from '@material-ui/icons/UnfoldMore';
import { colors, Fab } from '@material-ui/core';

import { device, size } from '../config';
import { WordTable, Header } from '../components';
import { dictionary } from '../data';

const Wrapper = styled.div`
  font-family: "Lato", Helvetica, sans-serif;
  text-align: left;
  padding: 1em 0;
  margin: 48px 0 24px 0;

  #words-toggle {
    position: fixed;
    bottom: 0.7rem;
    right: 0.6rem;
    background-color: white;
    color: ${colors.cyan[900]};
    opacity: 1;
    &:hover{
      opacity: 0.7;
    }
  }

  @media ${device.mobileM} {
    padding: 1em 2em;
  }
  @media ${device.mobileL} {  
    margin-left: auto;
    margin-right: auto;
    margin-top: 64px;
    max-width: ${size.tablet};
    padding: 1em 2em;
  }
`;

export default class MainPage extends Component {
  state = {
    dictionary,
    expand: true,
  }

  handleSearch = (event) => {
    const searchText = event.target.value;
    if (searchText) {
      const words = Object.assign({}, ...dictionary.map(row => row.words));
      const filteredKeys = Object.keys(words).filter(
        word => word.toLowerCase().includes(searchText.trim().toLowerCase()),
      );
      const filterWords = filteredKeys.reduce(
        (obj, key) => ({ ...obj, [key]: words[key] }), {},
      );
      const result = [{
        header: {
          letter: 'Search Result',
          expand: true,
        },
        words: filterWords,
      }];
      this.setState({ dictionary: result });
    } else {
      this.handleReset();
    }
  }

  handleReset = () => {
    this.setState({ dictionary });
  }

  onToggle = () => {
    this.setState(prevState => ({
      expand: !prevState.expand,
      dictionary: prevState.dictionary.map(
        section => (
          {
            ...section,
            header: { ...section.header, expand: !prevState.expand },
          }),
      ),
    }));
  }

  onHeaderClick = (letter) => {
    this.setState(prevState => ({
      dictionary: prevState.dictionary.map(
        (section) => {
          if (section.header.letter === letter) {
            return {
              ...section,
              header: { ...section.header, expand: !section.header.expand },
            };
          }
          return section;
        },
      ),
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Header
          onSearch={this.handleSearch}
          onReset={this.handleReset}
        />
        <Wrapper>
          <div className="word-table">
            <WordTable dictionary={this.state.dictionary} onHeaderClick={this.onHeaderClick} />
          </div>
          <Fab
            size="medium"
            id="words-toggle"
            onClick={this.onToggle}
          >
            {this.state.expand
              ? <ArrowDropDownIcon />
              : <ArrowLeftIcon />}
          </Fab>
        </Wrapper>
      </React.Fragment>
    );
  }
}
