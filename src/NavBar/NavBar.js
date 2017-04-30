import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LibraryBooks from 'react-icons/lib/md/library-books';
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
          <li className="navbar"><Link className="navbar navbar-active" to="/"><LibraryBooks /></Link></li>
          <li className="navbar"><a className="navbar navbar-title">{title}</a></li>
          <li className="right-navbar"><Link className="navbar" to="/settings"><Settings /></Link></li>
        </ul>
        <div style={{height: '50px'}} />
        { children }
      </div>
    )
  }
}
