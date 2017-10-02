import React, { Component } from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'
import Login from './components/Login.js'
import Home from './Home'
import req from 'request'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: undefined,
      invalidLogin: false
    }

    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin (form) {
    req.post({
      url: 'http://localhost:8080/Keepy/check-user',
      form
    }, (err, httpResponse, body) => {
      if (body) {
        body = JSON.parse(body)
        if (body.status === 'error') {
          this.setState({ invalidLogin: true })
        } else {
          this.setState({ userId: body.user_id })
        }
      }
    })
  }
  render () {
    return (
      <div className='app-container'>
        <Navbar color='primary' >
          <NavbarBrand href='/' style={{color: 'white'}}>Bom Dia Grupo</NavbarBrand>
        </Navbar>

        <Container>
          {/* { this.state.userId */}
          {/* ? <Home userId={this.state.userId} /> */}
          <Home userId={1} />
          {/* : <Login handleLogin={this.handleLogin} invalidLogin={this.state.invalidLogin} /> */}
        }
        </Container>

      </div>
    )
  }
}

export default App
