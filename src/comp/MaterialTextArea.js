
import React, { Component } from 'react';
import './MaterialTextArea.css'

export default class MaterialTextArea extends Component {
  render() {
    const {
      inputRef,
      label,
    } = this.props

    return (
      <div className="material-text">
      	<textarea ref={inputRef} rows="5" className="material-text" type="text" required/>
      	<hr className="material-text" />
      	<label className="material-text">{label}</label>
      </div>
    )
  }
}
