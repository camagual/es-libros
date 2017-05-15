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
    marginTop,
  } = props

  return { backgroundColor, marginTop }
}

const mergeClasses = (extraClass) => {
  return extraClass ? `icon-button  ${extraClass}`
                                 : 'icon-button'
}

const getLabelClassStyling = (hasIcon) => hasIcon ? 'icon-button'
                                                  : 'no-icon-button'

export default class RectangularIconButton extends Component {

  render() {
    const {
      extraClass,
      iconClass,
      onClick,
      text,
    } = this.props

    const buttonStyle = createButtonStyle(this.props)
    const className = mergeClasses(extraClass)
    const iconElement = createIconElement(iconClass)
    const labelClass = getLabelClassStyling(iconElement)

    return (
      <div className={className} style={buttonStyle} onClick={onClick}>
        <label className={labelClass}>{text}</label>
          { createIconElement(iconClass) }
      </div>
    )
  }
}
