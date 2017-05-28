import React, { Component } from 'react';
import Close from 'react-icons/lib/md/close';

import markdownToComponentArray from '../markdown.js'

import './WhatsNewBox.css'

const title = "What's New?"

const CloseButton = (props) => {
  const onClick = props.onDialogClosed
  return <Close color='tomato' size={30} style={{float: 'right', marginTop: 8}}
    onClick={onClick} />
}

export default class WhatsNewBox extends Component {

  render() {
    const {
      onDialogClosed,
      changelog,
    } = this.props
    return (
      <div className='changelog'>
        <CloseButton onDialogClosed={onDialogClosed}  />
        <h4>{title}</h4>
        { markdownToComponentArray(changelog, 'changelog') }
      </div>
    )
  }
}
