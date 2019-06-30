import React from 'react';

import MainPage from './pages/MainPage';
import { Header } from './components';

import './App.css';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Header />
        <MainPage />
      </React.Fragment>
    </div>
  );
}

export default App;
