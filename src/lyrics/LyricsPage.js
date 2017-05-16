
import React, { Component } from 'react';

import './LyricsPage.css'

import ProgressWheel from '../comp/ProgressWheel'
import YoutubePlayer from './YoutubePlayer'
import LocalPlayer from './LocalPlayer'
import { readLyrics } from '../api'
import markdownToComponentArray from '../markdown'
import { findSongById } from '../server_data/PreloadedStateQueries.js'

const VideoPlayer = (song) => {
  if (song.local)
    return <LocalPlayer url={song.local} />
  return <YoutubePlayer url={song.youtube} />
}

export default class LyricsPage extends Component {

  state = {
    markdown: ""
  }

  renderLyrics() {
    const song = findSongById(this.props.match.params.lyricsId)
    return (
      <div>
        { VideoPlayer(song) }
        <div style={{height:'20px'}} />
        { markdownToComponentArray(this.state.markdown, 'lyrics-markdown') }
        <div style={{height:'20px'}} />
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
      return this.renderLyrics()
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
