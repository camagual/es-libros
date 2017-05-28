import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { readChapter, unauthorizedResponseHandler } from '../../api'
import markdownToComponentArray from '../../markdown'
import { getChapterByIndex } from '../../server_data/PreloadedStateQueries.js'
import { scrollByFraction } from '../../dom/Scroll'
import ProgressWheel from '../../comp/ProgressWheel'

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

const nextIndex = (bookId, i) => {
  const newIndex = parseInt(i, 10) + 1
  if (getChapterByIndex(bookId, newIndex))
    return newIndex
}

class ChapterPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markdown: ""
    }
    this.bookmark = undefined
  }

  pageHasChanged = (nextProps) => {

    const {
      bookId,
      chapterIndex,
    } = this.props.match.params
    const {
      nextBookId,
      nextChapterIndex,
    } = nextProps.match.params

    return nextBookId !== bookId || nextChapterIndex !== chapterIndex
  }

  fetchChapter = (props) => {
    const {
      bookId,
      chapterIndex,
    } = props.match.params
    readChapter(bookId, chapterIndex)
      .send()
      .then((resp) => {
         const respBody = resp.body
         this.bookmark = respBody.bookmark
         this.setState({ markdown: respBody.markdown })
      }, unauthorizedResponseHandler())
  }

  renderChapterText = () => {
    const {
      bookId,
      chapterIndex,
    } = this.props.match.params
    const title = getChapterByIndex(bookId, chapterIndex)
    const nextChapter = nextIndex(bookId, chapterIndex)
    return (
      <div>
        <h2 className="book-markdown">{title}</h2>
        { markdownToComponentArray(this.state.markdown, 'book-markdown') }
        <NextChapterButton bookId={bookId} chapterIndex={nextChapter} />
      </div>
    )
  }

  renderProgressWheel = () => {
    return <ProgressWheel />
  }

  render() {
    if (this.state.markdown === "")
      return this.renderProgressWheel()
    else
      return this.renderChapterText()


  }

  componentWillReceiveProps(nextProps) {
    if (this.pageHasChanged(nextProps)) {
      this.setState({markdown: ""})
      this.fetchChapter(nextProps)
    }
  }

  componentDidMount() {
    this.fetchChapter(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    const didDownloadMarkdown = prevState.markdown === ""
                            && this.state.markdown !== prevState.markdown
                            && this.bookmark
    if (didDownloadMarkdown)
      scrollByFraction(this.bookmark)
    this.bookmark = undefined
  }
}

export default ChapterPage;
