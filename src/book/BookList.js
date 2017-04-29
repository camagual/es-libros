import React, { Component, PropTypes } from 'react';
import './BookList.css'

import { getBookIndex } from '../api'

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
    const books = this.state.books
    return (
      <div>
        <ul className='book-list'>
          {
            books.map((book, i) =>
              <BookItem key={i} book={book} />)
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
    getBookIndex()
      .send()
      .then((textResp) => {
        console.log(textResp.text)
        const resp = JSON.parse(textResp.text)
        this.setState({ books: resp })
      })
  }
}
