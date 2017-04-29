import React, { Component, PropTypes } from 'react';
import './ChapterList.css'

const ChapterItem = (props) => {
  const chapter = props.chapter
  return (
    <li className='chapter-list'><a className='chapter-list'>{chapter}</a></li>
  )
}

export default class ChapterList extends Component {

  static propTypes = {
    bookName: PropTypes.string.isRequired,
  }

  state = {
    chapters: [],
  }

  render() {
    const chapters = this.state.chapters
    return (
      <div>
      <button className="read-button">Comenzar</button>
        <h3>Capítulos</h3>
        <ul className='chapter-list'>
          {
            chapters.map((chapterName, i) =>
              <ChapterItem key={i} chapter={chapterName} />)
          }
        </ul>
      </div>
    )
  }
}
