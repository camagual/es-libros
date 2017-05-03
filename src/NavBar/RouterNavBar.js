import React from 'react';
import { matchPath, Route } from 'react-router-dom'

import NavBar from './NavBar';
import ChapterPage from '../book/ChapterPage.js'
import ChapterList from '../book/ChapterList.js'
import LyricsPage from '../lyrics/LyricsPage.js'
import BookList from '../book/BookList.js'
import Login from '../login/Login.js'
import Settings from '../settings/Settings.js'
import PreloadedState from '../server_data/PreloadedState.js'
import { findBookById, findSongById } from '../server_data/PreloadedStateQueries.js'

const matchBookInPath = (pathname) => {
  const match = matchPath(pathname, { path: '/book/:bookId', exact: false })
  if (match) {
    const book = findBookById(match.params.bookId)
    return book.name
  }
}

const matchSongInPath = (pathname) => {
  const match = matchPath(pathname, { path: '/lyrics/:lyricsId', exact: false })
  if (match) {
    const song = findSongById(match.params.lyricsId)
    return song.name
  }
}

const matchSettingsPath = (pathname) => {
  const match = matchPath(pathname, { path: '/settings', exact: true })
  if (match) {
    return "Ajustes"
  }
}

const getTitleFromRoute = (pathname) => {
  return matchBookInPath(pathname) || matchSongInPath(pathname)
  || matchSettingsPath(pathname) || "Home"
}

export default class RouterNavBar extends React.Component {

  render() {
    const pathname = this.props.location.pathname
    const params = this.props.match.params
    if (PreloadedState.needsLogin)
      return (
        <NavBar title={getTitleFromRoute(pathname, params)}>
          <Login />
        </NavBar>
      )

    return (
      <NavBar title={getTitleFromRoute(pathname, params)}>
        <Route exact path="/" component={BookList} />
        <Route exact path="/book/:bookId" component={ChapterList} />
        <Route path="/book/:bookId/:chapterIndex" component={ChapterPage} />
        <Route path="/lyrics/:lyricsId" component={LyricsPage} />
        <Route path="/settings" component={Settings} />
      </NavBar>
    )
  }
}
