import React, { Component } from 'react';
import './ProgressWheel.css'

export default class ProgressWheel extends Component {

  render() {
    const style = {}
    if (this.props.marginTop)
      style.marginTop = this.props.marginTop
    return <div style={style} className="loader"></div>
  }

}
