import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import './logo.svg';
import './App.css';
import RouterNavBar from './NavBar/RouterNavBar.js'

class App extends Component {

  //context for react-icons
  static childContextTypes = {
    reactIconBase: PropTypes.object
  };

  getChildContext() {
    return {
      reactIconBase: {
          size: 22,
        }
    }
  }

  render() {
    return (
      <Router>
          <Route path="/" component={RouterNavBar} />
      </Router>
    );
  }
}

export default App;
