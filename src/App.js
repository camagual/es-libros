import React, { Component, PropTypes } from 'react';
import './logo.svg';
import './App.css';
import ChapterPage from './book/ChapterPage.js'
import NavBar from './NavBar/NavBar.js'

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
      <div className="App">
        <NavBar>
          <ChapterPage />
        </NavBar>
      </div>
    );
  }
}

export default App;
