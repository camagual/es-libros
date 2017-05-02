import React, { Component } from 'react';

import { readChapter } from '../api'
import markdownToComponentArray from '../markdown'
import { getChapterByIndex } from '../server_data/PreloadedStateQueries.js'
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
    const title = getChapterByIndex(bookId, chapterIndex)
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
