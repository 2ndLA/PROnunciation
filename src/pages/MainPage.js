import React, { Component } from 'react';
import styled from 'styled-components';
import { device, size } from '../config';
import { WordTable, Header } from '../components';

import { dictionary } from '../data';

const Wrapper = styled.div`
  font-family: "Lato", Helvetica, sans-serif;
  text-align: left;
  padding: 1em 0;
  margin: 48px 0 24px 0;
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
  }

  handleSearch = (event) => {
    const searchText = event.target.value;
    this.setState({
      dictionary: dictionary.map((words) => {
        const filteredKeys = Object.keys(words).filter(
          word => word.toLowerCase().includes(searchText.trim().toLowerCase()),
        );
        return filteredKeys.reduce((obj, key) => ({ ...obj, [key]: words[key] }), {});
      }),
    });
  }

  handleReset = () => {
    this.setState({ dictionary });
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
            <WordTable dictionary={this.state.dictionary} />
          </div>
        </Wrapper>
      </React.Fragment>
    );
  }
}
