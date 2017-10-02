import React, { Component } from 'react'
import { Button, Form, Input } from 'reactstrap'
import './Login.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin () {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      alert('Coloque um usuário e uma senha')
    }

    const data = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.handleLogin(data)
  }

  render () {
    return (
      <Form className='form-signin'>
        <h2 className='form-signin-heading'>Por favor, faça o login</h2>
        <label for='inputEmail' className='sr-only'>Usuário</label>
        <Input type='text' placeholder='Usuário' required='' autofocus='' value={this.state.username}
          onChange={e => this.setState({username: e.target.value})} />
        <Input type='password' placeholder='Senha' required='' autofocus='' value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })} />

        { this.props.invalidLogin
                ? <p className='invalid'> <i className='fa fa-exclamation' aria-hidden='true' />
                    Login inválido, cheque suas informações
                 </p> : ''
        }

        <Button color='primary' size='lg' onClick={this.handleLogin}>Entrar</Button>
      </Form>
    )
  }
}

export default App
