import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './BottomButton.css'

export default class BottomButton extends Component {
  render() {
    const {
      to,
      text,
      backgroundColor,
      iconClass,

    } = this.props
    const style = { backgroundColor }
    const iconProps = { style: { marginLeft: 8 }, size:30 }
    const icon = iconClass ? new iconClass(iconProps) : null

    return (
      <Link className="bottom-button" style={style} to={to}>
        {text} {icon}
      </Link>
    )
  }
}
