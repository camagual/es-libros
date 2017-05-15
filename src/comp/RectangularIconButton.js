import React, { Component } from 'react';

import './RectangularIconButton.css'

const createIconElement = (iconClass) => {
    const iconProps = { style: {float: 'right', marginRight: '24px'}}
    const icon = iconClass ? new iconClass(iconProps) : null
    return icon
}

const createButtonStyle = (props) => {
  const {
    backgroundColor,
  } = props

  return { backgroundColor }
}

export default class RectangularIconButton extends Component {

  render() {
    const {
      iconClass,
      text,
    } = this.props

    const buttonStyle = createButtonStyle(this.props)
    return (
      <div className="icon-button" style={buttonStyle}>
        <label className="icon-button">{text}</label>
        { createIconElement(iconClass) }
      </div>
    )
  }
}
