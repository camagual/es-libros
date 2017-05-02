
import React, { Component } from 'react';

import './LyricsPage.css'

import { readLyrics } from '../api'
import markdownToComponentArray from '../markdown'
import { findSongById } from '../server_data/PreloadedStateQueries.js'

export default class LyricsPage extends Component {

  state = {
    markdown: ""
  }

  render() {
    const song = findSongById(this.props.match.params.lyricsId)
    return (
      <div>
        <div className="music-video">
          <iframe width="560" height="315" className="yt"
            src={song.youtube} frameBorder="0" allowFullScreen />
        </div>
        <div style={{height:'20px'}} />
        { markdownToComponentArray(this.state.markdown, 'lyrics-markdown') }
        <div style={{height:'20px'}} />
      </div>
    )
  }

  componentDidMount() {
    const lyricsId = this.props.match.params.lyricsId
    readLyrics(lyricsId)
      .send()
      .then((resp) => {
         this.setState({ markdown: resp.text })
      })

  }
}
