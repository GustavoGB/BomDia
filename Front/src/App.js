import React, { Component } from 'react'
import { Container, Navbar, NavbarBrand, Button } from 'reactstrap'
import Login from './components/Login.js'
import Home from './Home'
import req from 'request'
import routes from './api-routes'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: undefined,
      invalidLogin: false
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleNewAccount = this.handleNewAccount.bind(this)
  }
  handleLogin (form) {
    req.post({
      url: routes.login,
      json: form
    }, (err, httpResponse, body) => {
      if (err) {
        return alert(err)
      } else if (body.id) {
        this.setState({
          userId: body.id
        })
      } else {
        this.setState({
          invalidLogin: true
        })
      }
    })
  }

  handleNewAccount (form) {
    req.post({
      url: routes.createAccount,
      json: form
    }, (err, httpResponse, body) => {
      if (err) {
        return alert(err)
      } else if (body.id) {
        this.setState({ userId: body.id })
      } else {
        this.setState({ invalidLogin: true })
      }
    })
  }

  render () {
    const btnStyle = { position: 'absolute', top: '0.5em', right: '0.5em', color: 'white' }
    return (
      <div className='app-container'>
        <Navbar color='primary' >
          <NavbarBrand href='/' style={{ color: 'white' }}>Bom Dia Grupo</NavbarBrand>
        </Navbar>

        {this.state.userId
          ? <Button outline style={btnStyle} onClick={() => this.setState({ userId: undefined })}>
            Sair
            </Button> : ''
        }

        <Container>
          {this.state.userId
            ? <Home userId={this.state.userId} />
            : <Login handleLogin={this.handleLogin} invalidLogin={this.state.invalidLogin} handleNewAccount={this.handleNewAccount} />
          }
        </Container>

      </div>
    )
  }
}

export default App
