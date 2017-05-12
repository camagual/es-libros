import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LibraryBooks from 'react-icons/lib/md/library-books';
import Settings from 'react-icons/lib/md/settings';
import './NavBar.css';

const TitleComponent = (props) => {
  const {
    title,
    url
  } = props
  const titleClass = "navbar navbar-title"
  if (url)
    return <Link className={titleClass} to={url}>{title}</Link>
  else
    return <a className={titleClass} >{title}</a>
}
export default class NavBar extends Component {

  render() {
    const {
      children,
      title,
      url
    } = this.props

    return (
      <div>
        <ul className="navbar">
          <li className="navbar"><Link className="navbar navbar-active" to="/"><LibraryBooks /></Link></li>
          <li className="navbar"><TitleComponent title={title} url={url} /></li>
          <li className="right-navbar"><Link className="navbar" to="/settings"><Settings /></Link></li>
        </ul>
        <div style={{height: '50px'}} />
        { children }
      </div>
    )
  }
}
