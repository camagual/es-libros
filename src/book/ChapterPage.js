import React, { Component, PropTypes } from 'react';

import { getChapterFile } from '../api'
import markdownToComponentArray from '../markdown'
import './ChapterPage.css'
class ChapterPage extends Component {

  static propTypes = {
    bookName: PropTypes.string.isRequired,
    chapter: PropTypes.string.isRequired,
  }

  state = {
    markdown: ""
  }

  render() {
    return (
      <div>
        { markdownToComponentArray(this.state.markdown, 'book-markdown') }
      </div>
    )
  }

  componentDidMount() {
    const {
      bookName,
      chapter,
    } = this.props
    getChapterFile(bookName, chapter)
      .send()
      .then((resp) => {
         this.setState({ markdown: resp.text })
      })
  }
}

export default ChapterPage;
