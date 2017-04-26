import React, { Component } from 'react';
import ArrowBack from 'react-icons/lib/md/arrow-back';
import Settings from 'react-icons/lib/md/settings';
import './NavBar.css';

export default class NavBar extends Component {
  render() {
    const {
      children,
      title } = this.props
    return (
      <div>
        <ul className="navbar">
          <li className="navbar"><a className="navbar navbar-active" href="#home"><ArrowBack /></a></li>
          <li className="navbar"><a className="navbar navbar-title" href="#home">{title}</a></li>
          <li className="right-navbar"><a className="navbar" href="#about"><Settings /></a></li>
        </ul>
        <div style={{height: '50px'}} />
        { children }
      </div>
    )
  }
}
