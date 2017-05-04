import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { readChapter } from '../api'
import markdownToComponentArray from '../markdown'
import { getChapterByIndex } from '../server_data/PreloadedStateQueries.js'
import './ChapterPage.css'

const NextChapterButton = (props) => {
  const bookId  = props.bookId
  const chapterIndex  = props.chapterIndex
  if (chapterIndex)
    return (
      <Link className="next-chapter" to={`/book/${bookId}/${chapterIndex}`}>
        Siguiente Capitulo
      </Link>
    )
  return null
}

const nextIndex = (i) => {
  return parseInt(i, 10) + 1
}

class ChapterPage extends Component {

  state = {
    markdown: ""
  }

  render() {
    const {
      bookId,
      chapterIndex,
    } = this.props.match.params
    const title = getChapterByIndex(bookId, chapterIndex)
    return (
      <div>
        <h2 className="book-markdown">{title}</h2>
        { markdownToComponentArray(this.state.markdown, 'book-markdown') }
        <NextChapterButton bookId={bookId} chapterIndex={nextIndex(chapterIndex)} />
      </div>
    )
  }

  componentDidMount() {
    const {
      bookId,
      chapterIndex,
    } = this.props.match.params
    readChapter(bookId, chapterIndex)
      .send()
      .then((resp) => {
         this.setState({ markdown: resp.text })
      })
  }
}

export default ChapterPage;
