import React from 'react';
import { Route } from 'react-router-dom'

import NavBar from './NavBar';
import ChapterPage from '../book/ChapterPage.js'
import ChapterList from '../book/ChapterList.js'
import LyricsPage from '../lyrics/LyricsPage.js'
import BookList from '../book/BookList.js'
import Login from '../login/Login.js'
import Settings from '../settings/Settings.js'
import PreloadedState from '../server_data/PreloadedState'
import { getTitlePropsFromRoute } from './RouteTitleProps.js'



export default class RouterNavBar extends React.Component {
  render() {
    const pathname = this.props.location.pathname
    const titleProps = getTitlePropsFromRoute(pathname)

    if (PreloadedState.needsLogin)
      return (
        <NavBar {...titleProps}>
          <Login />
        </NavBar>
      )

    return (
      <NavBar {...titleProps}>
        <Route exact path="/" component={BookList} />
        <Route exact path="/book/:bookId" component={ChapterList} />
        <Route path="/book/:bookId/:chapterIndex" component={ChapterPage} />
        <Route path="/lyrics/:lyricsId" component={LyricsPage} />
        <Route path="/settings" component={Settings} />
      </NavBar>
    )
  }
}
