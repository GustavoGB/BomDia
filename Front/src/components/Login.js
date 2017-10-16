import React, { Component } from 'react'
import { Button, Form, Input, Row, Col } from 'reactstrap'
import './Login.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: 'marcelo',
      password: '123456',
      newAccount: true,
      phone: '970691356'

    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleNewAccount = this.handleNewAccount.bind(this)
  }

  handleLogin () {
    if (this.state.name.length === 0 || this.state.password.length === 0) {
      return alert('Coloque um usuário e uma senha')
    }

    const data = {
      name: this.state.name,
      password: this.state.password
    }

    this.props.handleLogin(data)
  }

  handleNewAccount () {
    if (this.state.name.length === 0 || this.state.password.length === 0 || this.state.phone.length === 0) {
      return alert('Coloque um usuário, uma senha e um telefone')
    }

    const data = {
      name: this.state.name,
      password: this.state.password,
      phone: this.state.phone
    }

    this.props.handleNewAccount(data)
  }

  render () {
    const handlePhone = (el) => {
      if (Number(el.target.value)) {
        this.setState({
          phone: el.target.value
        })
      }
    }

    if (this.state.newAccount) {
      return (
        <Form className='form-signin'>
          <h2 className='form-signin-heading'>Criar conta</h2>

          <div style={{ marginBottom: '1em' }}>
            <a className='text-muted' onClick={() => this.setState({ newAccount: false })}>
              Já tem uma conta?
          </a>
          </div>

          <Input type='text' placeholder='Usuário' value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })} />
          <Input type='password' placeholder='Senha' value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })} />

          <Input type='text' placeholder='Telefone com DDD' value={this.state.phone}
            onChange={handlePhone} />

          {this.props.invalidLogin
            ? <p className='invalid'> <i className='fa fa-exclamation' aria-hidden='true' />
              Login inválido, cheque suas informações
                 </p> : ''
          }

          <div style={{ marginBottom: '1em' }} />

          <Row>
            <Col xs='12'>
              <Button color='primary' size='lg' onClick={this.handleNewAccount} style={{ width: '100%' }}>
                Nova Conta
            </Button>
            </Col>
          </Row>
        </Form>
      )
    }

    return (
      <Form className='form-signin'>
        <h2 className='form-signin-heading'>Por favor, faça o login</h2>

        <div style={{ marginBottom: '1em' }}>
          <a className='text-muted' onClick={() => this.setState({ newAccount: true })}>
            Não tem uma conta?
          </a>
        </div>

        <Input type='text' placeholder='Usuário' value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} />
        <Input type='password' placeholder='Senha' value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })} />

        {this.props.invalidLogin
          ? <p className='invalid'> <i className='fa fa-exclamation' aria-hidden='true' />
            Login inválido, cheque suas informações
                 </p> : ''
        }

        <Row>
          <Col xs='12'>
            <Button color='success' size='lg' onClick={this.handleLogin} style={{ width: '100%' }}>
              Entrar
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default App
