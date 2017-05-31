import { matchPath } from 'react-router-dom'
import { findBookById, findSongById } from '../server_data/PreloadedStateQueries'
import { SaveBookmarkAction, OpenSettingsAction } from './NavBarActions'
import PreloadedState from '../server_data/PreloadedState'

const matchChapterPageInPath = (pathname) => {
  const match = matchPath(pathname, { path: '/book/:bookId/:chapterIndex', exact: false })
  if (match) {
    const props = {
      bookId: match.params.bookId,
      chapterIndex: match.params.chapterIndex,
    }
    const book = findBookById(props.bookId)
    return {
      title: book.name,
      url: `/book/${props.bookId}`,
      action: () => SaveBookmarkAction(props),
    }
  }
}

const matchBookInPath = (pathname) => {
  const match = matchPath(pathname, { path: '/book/:bookId', exact: false })
  if (match) {
    const bookId = match.params.bookId
    const book = findBookById(bookId)
    return {
      title: book.name,
      url: `/book/${bookId}`,
      action: OpenSettingsAction,
    }
  }
}

const matchSongInPath = (pathname) => {
  const match = matchPath(pathname, { path: '/lyrics/:lyricsId', exact: false })
  if (match) {
    const song = findSongById(match.params.lyricsId)
    return { title: song.name, action: OpenSettingsAction }
  }
}

const matchSettingsPath = (pathname) => {
  const match = matchPath(pathname, { path: '/settings', exact: true })
  if (match) {
    return { title: "Settings", action: OpenSettingsAction }
  }
}

const matchLogin = () => {
  if (PreloadedState.needsLogin)
    return { title: 'Log In', action: OpenSettingsAction }
}
export const getTitlePropsFromRoute = (pathname) => {
  return matchLogin() || matchChapterPageInPath(pathname) || matchBookInPath(pathname)
  || matchSongInPath(pathname) || matchSettingsPath(pathname)
  || { title: "Main Menu", action: OpenSettingsAction }
}
