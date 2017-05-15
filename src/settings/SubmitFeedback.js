import React, { Component } from 'react';

import FormError from '../comp/FormError'
import MaterialTextArea from '../comp/MaterialTextArea'
import ProgressWheel from '../comp/ProgressWheel'
import RectangularIconButton from '../comp/RectangularIconButton'
import { sendFeedback } from '../api'

import './Feedback.css'

const feedbackMsg = "Is something broken? Got any requests? Want a specific book/song? You can submit any feedback you've got and I'll try to do something about it."
const doneMsg = "Success! Thank you for your feedback!"

const FSM = {
  drafting: 0,
  posting: 1,
  done: 2,
}

const isValidFeedback = (feedbackText) => feedbackText.length > 0
                                       && feedbackText.length < 500

export default class SubmitFeedback extends Component {
  state = {
    value: FSM.drafting,
    validationError: null,
  }

  sendFeedbackRequest = (feedbackText) => {
    this.setState({ value: FSM.posting })
    const success = () => this.setState({ value: FSM.done })
    const failiure = () => this.setState({ value: FSM.drafting,
          validationError: 'Network error. Please try again' })
    sendFeedback(feedbackText)
      .then(success, failiure)

  }

  setValidationError = () => {
    this.setState({ validationError: 'Please set a valid message'})
  }

  onSubmitFeedback = () => {
    const feedbackText = this.textInput.value.trim()
    if (isValidFeedback(feedbackText))
      this.sendFeedbackRequest(feedbackText)
    else
      this.setValidationError()

  }

  renderDrafting = () => {
    return (
      <div className='feedback-container'>
        <p className='feedback'>
          {feedbackMsg}
        </p>
        <MaterialTextArea inputRef={(input) => this.textInput = input} label='' />
        <FormError error={this.state.validationError} />
        <RectangularIconButton marginTop='16px' text='submit'
          onClick={this.onSubmitFeedback} />
      </div>
    )
  }

  renderPosting = () => <ProgressWheel marginTop='32px' />

  renderDone = () => (
    <div className='feedback-container'>
      <p className='feedback'> {doneMsg} </p>
    </div>
  )

  render () {
    switch (this.state.value) {
      case FSM.posting:
        return this.renderPosting()
      case FSM.done:
        return this.renderDone()
      default:
        return this.renderDrafting()
    }
  }

}
