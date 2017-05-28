
import React, { Component } from 'react';
import './YoutubePlayer.css'

export default class YoutubePlayer extends Component {
  render() {
    const url = `https://www.youtube.com/embed/${this.props.url}`
    return (
      <div className="yt-video">
        <iframe width="560" height="315" className="yt"
          src={url} frameBorder="0" allowFullScreen />
      </div>
    )
  }
}
