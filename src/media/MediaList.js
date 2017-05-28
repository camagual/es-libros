import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './MediaList.css'
import WhatsNewBox from './WhatsNewBox'
import { bookIndex, lyricsIndex, changelogMarkdown } from '../server_data/PreloadedStateQueries.js'

const BookItem = (props) => {
  const book = props.book
  const index = props.index
  return (
    <li className="book-list">
      <Link to={`/book/${index}`} className="book-link">
        <span className="book-title">{book.name}</span>
        <br />
        <span className="book-subtitle">{`${book.author} (${book.year})`}</span>
      </Link>
    </li>
  )
}

const LyricsItem = (props) => {
  const lyrics = props.lyrics
  const index = props.index
  return (
    <li className="book-list">
      <Link to={`/lyrics/${index}`} className="book-link">
        <span className="book-title">{lyrics.name}</span>
        <br />
        <span className="book-subtitle">{lyrics.artist}</span>
      </Link>
    </li>
  )
}

export default class MediaList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      changelog: changelogMarkdown,
    }
  }

  removeChangelog = () => {
    this.setState({ changelog: [] })
  }

  renderChangelog = () => {
    const changelog = this.state.changelog
    if (changelog.length > 0)
      return <WhatsNewBox changelog={changelog} onDialogClosed={this.removeChangelog} />
    return null
  }

  render() {
    return (
      <div>
        { this.renderChangelog() }
        <h2 className='media-list'>Books</h2>
        <ul className='book-list'>
          {
            bookIndex.map((book, i) => <BookItem key={i} index={i} book={book} />)
          }
        </ul>
        <h2 className='media-list'>Songs</h2>
        <ul className='book-list'>
          {
            lyricsIndex.map((lyrics, i) => <LyricsItem key={i} index={i} lyrics={lyrics} />)
          }
        </ul>
      </div>
    )
  }

}
