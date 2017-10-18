import React, { Component } from 'react'
import { Button, FormGroup, Label, FormText, Form, Input, Row, Col } from 'reactstrap'
import FileBase64 from 'react-file-base64'
import './Login.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: 'marcelo',
      password: '123456',
      newAccount: false,
      phone: '970691356',
      profilePic: undefined,
      loading: false

    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleNewAccount = this.handleNewAccount.bind(this)
  }

  handleLogin () {
    if (this.state.name.length === 0 || this.state.password.length === 0) {
      return alert('Coloque um usuário e uma senha')
    }

    const data = {
      phone: this.state.phone,
      password: this.state.password
    }

    this.setState({
      loading: true
    })
    this.props.handleLogin(data)
  }

  handleNewAccount () {
    if (this.state.name.length === 0 || this.state.password.length === 0 || this.state.phone.length === 0) {
      return alert('Coloque um usuário, uma senha e um telefone')
    }

    const data = {
      name: this.state.name,
      password: this.state.password,
      phone: this.state.phone,
      profilePic: this.state.profilePic
    }

    this.setState({
      loading: true
    })

    this.props.handleNewAccount(data)
  }

  getProfilePic (data) {
    const index = data.base64.indexOf('base64,')

    if (index > 0) {
      this.setState({
        profilePic: data.base64.substring(index + 7, data.base64.length)
      })
    }
  }

  render () {
    const handlePhone = (el) => {
      if (Number(el.target.value)) {
        this.setState({
          phone: el.target.value
        })
      }
    }

    const isLoading = this.state.loading

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

          <div style={{ marginBottom: '1em' }} />
          Foto de perfil:
          <FileBase64
            onDone={this.getProfilePic.bind(this)} />

          {this.props.invalidLogin
            ? <p className='invalid'> <i className='fa fa-exclamation' aria-hidden='true' />
              Login inválido, cheque suas informações
                 </p> : ''
          }

          <div style={{ marginBottom: '1em' }} />

          <Row>
            <Col xs='12'>
              <Button color='primary' size='lg' onClick={this.handleNewAccount} style={{ width: '100%' }}>
                {isLoading ? 'Carregando...' : 'Nova Conta'}
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

        <Input type='text' placeholder='Telefone' value={this.state.phone}
          onChange={e => this.setState({ phone: e.target.value })} />
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
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default App
