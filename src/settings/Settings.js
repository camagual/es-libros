import React, { Component } from 'react';
import { logout } from '../api'
import './Settings.css'

const requestLogOut = () => {
  logout()
    .then(() => {
      location.reload(true)
    })
}
export default class Settings extends Component {
  render () {
    return (
      <div>
        <div style={{height: '50px'}} />
        <ul className='chapter-list'>
          <button className='settings' onClick={requestLogOut}>
            Cerrar sesión
          </button>
        </ul>
      </div>
    )
  }
}
