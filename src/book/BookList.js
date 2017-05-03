import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './BookList.css'
import { bookIndex, lyricsIndex } from '../server_data/PreloadedState.js'

const BookItem = (props) => {
  const book = props.book
  const index = props.index
  return (
    <li>
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
    <li>
      <Link to={`/lyrics/${index}`} className="book-link">
        <span className="book-title">{lyrics.name}</span>
        <br />
        <span className="book-subtitle">{lyrics.artist}</span>
      </Link>
    </li>
  )
}

export default class BookList extends Component {

  static propTypes = {
  }

  render() {
    return (
      <div>
        <h2 className='media-list'>Libros</h2>
        <ul className='book-list'>
          {
            bookIndex.map((book, i) => <BookItem key={i} index={i} book={book} />)
          }
        </ul>
        <h2 className='media-list'>Canciones</h2>
        <ul className='book-list'>
          {
            lyricsIndex.map((lyrics, i) => <LyricsItem key={i} index={i} lyrics={lyrics} />)
          }
        </ul>
      </div>
    )
  }

}
