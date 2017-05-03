import React, { Component } from 'react'
import './Login.css'
import { login } from '../api.js'
import { validarLogin } from '../validation.js'

const LoginError = (props) => {
  if(props.error)
    return <a style={{color: '#FF0000'}}>{props.error}</a>
  return null
}

export default class Login extends Component {

  state = {
    error: null,
  }

  submitLogin = () => {
    const success = () => {
      console.log('OK')
      location.reload(true)
    }
    const failiure = (err) => {
      this.setState({error: err.response.text})
    }

    const user = this.userInput.value
    const pass = this.passInput.value
    const submitError = validarLogin(user, pass)

    if (submitError)
      this.setState({error: submitError})
    else
      login(user, pass)
      .then(success, failiure)
  }

  render() {
    return (
      <form className="login-form">
      	<h2>Por favor inicia sesión</h2>
        <LoginError error={this.state.error} />
      	<fieldset className="material-login">
      		<input ref={(input) => this.userInput = input} className="material-login" type="text" required/>
      		<hr className="material-login" />
      		<label className="material-login">User</label>
      	</fieldset>
      	<fieldset className="material-login">
      		<input ref={(input) => this.passInput = input} className="material-login" type="password" required/>
      		<hr className="material-login"/>
      		<label className="material-login">Password</label>
      	</fieldset>
        <input className="login-button" type="button" value="Log In"
        onClick={this.submitLogin} />
      </form>
    )
  }
}
