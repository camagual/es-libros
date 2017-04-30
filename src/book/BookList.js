import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './BookList.css'
import bookIndex from '../bookIndex.json'

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

export default class BookList extends Component {

  static propTypes = {
  }

  state = {
    books: [],
  }

  render() {
    return (
      <div>
        <ul className='book-list'>
          {
            bookIndex.map((book, i) => <BookItem key={i} index={i} book={book} />)
          }
        </ul>
      </div>
    )
  }

}
