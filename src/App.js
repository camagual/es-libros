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
    const bookName = "Harry Potter y la Piedra Filosofal"
    const chapter = "El niño que vivió"
    return (
      <div className="App">
        <NavBar title={bookName}>
          <ChapterPage bookName={bookName} chapter={chapter} />
        </NavBar>
      </div>
    );
  }
}

export default App;
