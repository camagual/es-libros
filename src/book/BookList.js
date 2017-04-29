import React, { Component } from 'react';
import './BookList.css'
import bookIndex from '../bookIndex.json'

const BookItem = (props) => {
  const book = props.book
  return (
    <li>
      <a href="#boek2" className="book-link">
        <span className="book-title">{book.name}</span>
        <br />
        <span className="book-subtitle">{`${book.author} (${book.year})`}</span>
      </a>
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
            bookIndex.map((book, i) => <BookItem key={i} book={book} />)
          }
        </ul>
      </div>
    )
  }

}
