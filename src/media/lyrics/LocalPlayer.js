
import React, { Component } from 'react';
import './LocalPlayer.css'

export default class LocalPlayer extends Component {
  render() {
    const url = `/video/${this.props.url}.mp4`
    return (
      <video width="560" controls className='local-video' preload='none'>
        <source src={url} type="video/mp4" />
        Sorry, your browser does not support embedded videos,
        but do not worry, you can <a href={url}>download it</a>
        and watch it with your favorite video player!
      </video>
    )
  }
}
