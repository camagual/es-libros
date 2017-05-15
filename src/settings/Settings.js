import React, { Component } from 'react';
import PowerSettingsNew from 'react-icons/lib/md/power-settings-new';
import Feedback from 'react-icons/lib/md/feedback';

import RectangularIconButton from '../comp/RectangularIconButton'
import { logout } from '../api'
import './Settings.css'

const requestLogOut = () => {
  logout()
    .then(() => {
      location.reload(true)
    })
}

const goToSubmitFeedback = () => {
  location.href = '/feedback'
}
export default class Settings extends Component {
  render () {
    return (
      <div>
        <div style={{height: '35px'}} />
        <ul className='chapter-list'>
          <RectangularIconButton iconClass={Feedback} text='Send Feedback'
             onClick={goToSubmitFeedback}/>
          <RectangularIconButton marginTop='12px' iconClass={PowerSettingsNew}
            text='Log Out' extraClass='sign-out' onClick={requestLogOut}/>
        </ul>
      </div>
    )
  }
}
