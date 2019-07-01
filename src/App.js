import React, { Component } from 'react';

import MainPage from './pages/MainPage';
import { Header } from './components';
import dictionary from './data';

import './App.css';

export default class App extends Component {
  state = {
    searchText: '',
    dictionary,
  }

  handleSearch = (event) => {
    const searchText = event.target.value;
    this.setState({ searchText });
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
    this.setState({ dictionary, searchText: '' });
  }

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Header
            searchText={this.state.searchText}
            onSearch={this.handleSearch}
            onReset={this.handleReset}
          />
          <MainPage dictionary={this.state.dictionary} />
        </React.Fragment>
      </div>
    );
  }
}
