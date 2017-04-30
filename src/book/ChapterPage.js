import React, { Component } from 'react';

import { readChapter } from '../api'
import markdownToComponentArray from '../markdown'
import bookIndex from '../bookIndex.js'
import './ChapterPage.css'

class ChapterPage extends Component {

  state = {
    markdown: ""
  }

  render() {
    const {
      bookId,
      chapterIndex,
    } = this.props.match.params
    const title = bookIndex.getChapterByIndex(bookId, chapterIndex)
    return (
      <div>
        <h2 className="book-markdown">{title}</h2>
        { markdownToComponentArray(this.state.markdown, 'book-markdown') }
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
