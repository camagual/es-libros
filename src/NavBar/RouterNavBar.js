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
    const bookId = match.params.bookId
    const book = findBookById(bookId)
    return {
      title: book.name,
      url: `/book/${bookId}`,
    }
  }
}

const matchSongInPath = (pathname) => {
  const match = matchPath(pathname, { path: '/lyrics/:lyricsId', exact: false })
  if (match) {
    const song = findSongById(match.params.lyricsId)
    return { title: song.name }
  }
}

const matchSettingsPath = (pathname) => {
  const match = matchPath(pathname, { path: '/settings', exact: true })
  if (match) {
    return { title: "Ajustes" }
  }
}

const getTitlePropsFromRoute = (pathname) => {
  return matchBookInPath(pathname) || matchSongInPath(pathname)
  || matchSettingsPath(pathname) || { title: "Home" }
}

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
