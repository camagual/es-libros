import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './ChapterList.css'
import { getChapterListById } from '../server_data/PreloadedStateQueries.js'

const ChapterItem = (props) => {
  const {
    chapterName,
    chapterIndex,
    bookId,
  } = props

  return (
    <li className='chapter-list'>
      <Link to={`/book/${bookId}/${chapterIndex}`} className='chapter-list'>
        {chapterName}
      </Link>
    </li>
  )
}

export default class ChapterList extends Component {
  render() {
    const bookId = this.props.match.params.bookId
    const chapters = getChapterListById(bookId)
    return (
      <div>
      <Link className="read-button" to={`/book/${bookId}/0`}>Comenzar</Link>
        <h3 className='chapter-list'>Capítulos</h3>
        <ul className='chapter-list'>
          {
            chapters.map((chapterName, i) =>
              <ChapterItem key={i} chapterIndex={i} bookId={bookId}
                chapterName={chapterName} />)
          }
        </ul>
        <div style={{height: '60px'}} />
      </div>
    )
  }
}
