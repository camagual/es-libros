import React from 'react';
import { matchPath, Route } from 'react-router-dom'

import NavBar from './NavBar';
import bookIndex from '../bookIndex.js'
import ChapterPage from '../book/ChapterPage.js'
import ChapterList from '../book/ChapterList.js'
import BookList from '../book/BookList.js'

const getTitleFromRoute = (pathname, params) => {
  const match = matchPath(pathname, { path: '/book/:bookId', exact: false })
  if (match) {
    const book = bookIndex.findBookById(match.params.bookId)
    return book.name
  }
  return "Libros"
}

export default class RouterNavBar extends React.Component {
  render() {
    const pathname = this.props.location.pathname
    const params = this.props.match.params
    return (
      <NavBar title={getTitleFromRoute(pathname, params)}>
        <Route exact path="/" component={BookList} />
        <Route exact path="/book/:bookId" component={ChapterList} />
        <Route path="/book/:bookId/:chapterIndex" component={ChapterPage} />
      </NavBar>
    )
  }
}
