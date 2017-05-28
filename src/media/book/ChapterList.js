import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PlayArrow from 'react-icons/lib/md/play-arrow';
import Bookmark from 'react-icons/lib/md/bookmark';

import './ChapterList.css'
import BottomButton from '../../comp/BottomButton.js'
import {
  getChapterListById,
  findBookmarkByBookId,
} from '../../server_data/PreloadedStateQueries.js'

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

const getStartButtonProps = (bookId) => {
    const startLinkUrl = `/book/${bookId}/`
    const bookmark = findBookmarkByBookId(bookId)

    if (bookmark !== undefined)
      return {
        to: startLinkUrl + bookmark.chapterIndex,
        text: 'Continuar',
        iconClass: Bookmark,
      }
    else
      return {
        to: startLinkUrl + 0,
        text: 'Comenzar',
        iconClass: PlayArrow,
      }
}

export default class ChapterList extends Component {

  render() {
    const bookId = this.props.match.params.bookId
    const chapters = getChapterListById(bookId)
    const startButtonProps =  getStartButtonProps(bookId)
    return (
      <div>
      <BottomButton {...startButtonProps} />
        <h3 className='chapter-list'>Chapters</h3>
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
