import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import { DOMAIN, GA_DEBUG, GA_TRACKING_ID } from './config';

// react-ga docs: https://github.com/react-ga/react-ga
ReactGA.initialize(GA_TRACKING_ID, {
  debug: GA_DEBUG,
  titleCase: false,
  gaOptions: {
    // Send all hits on page
    siteSpeedSampleRate: 100,
  },
});

if (window.location.host === DOMAIN) {
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
