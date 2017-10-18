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
      user: {},
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
          userId: body.id,
          user: body
        })
        localStorage.setItem('user', JSON.stringify(body))
      } else {
        this.setState({
          invalidLogin: true
        })
      }
    })
  }

  handleNewAccount (form) {
    if (form.profilePic) {
      req.post({
        url: routes.uploadProfilePic,
        json: { image: form.profilePic },
        headers: {
          'Authorization': 'Client-ID c617d0edea36c6f'
        }
      }, (err, httpResponse, body) => {
        if (body.data.link) {
          const profilePicture = body.data.link
          const user = {...form, profilePicture}
          req.post({
            url: routes.createAccount,
            json: user
          }, (err, httpResponse, body) => {
            if (err) {
              return alert(err)
            } else if (body.id) {
              this.setState({ userId: body.id, user })
            } else {
              this.setState({ invalidLogin: true })
            }
          })
        } else {
          return alert('Houve um problema para fazer o upload da foto de perfil')
        }
      })
    } else {
      req.post({
        url: routes.createAccount,
        json: form
      }, (err, httpResponse, body) => {
        if (err) {
          return alert(err)
        } else if (body.id) {
          this.setState({ userId: body.id, user: form})
        } else {
          this.setState({ invalidLogin: true })
        }
      })
    }
  }

  componentWillMount () {
    const local = JSON.parse(localStorage.getItem('user') || '{}')

    if (local) {
      this.setState({
        user: local,
        userId: local.id
      })
    }
  }

  render () {
    const handleLogout = () => {
      localStorage.setItem('user', '{}')
      this.setState({
        userId: undefined
      })
    }
    const btnStyle = { position: 'absolute', top: '0.5em', right: '0.5em', color: 'white' }
    return (
      <div className='app-container'>
        <Navbar color='primary' >
          <NavbarBrand href='/' style={{ color: 'white' }}>Bom Dia Grupo</NavbarBrand>
        </Navbar>

        {this.state.userId
          ? <Button outline style={btnStyle} onClick={handleLogout}>
              Sair
            </Button> : ''
        }

        <Container fluid>
          {this.state.userId
            ? <Home userId={this.state.userId} user={this.state.user} />
            : <Login handleLogin={this.handleLogin} invalidLogin={this.state.invalidLogin} handleNewAccount={this.handleNewAccount} />
          }
        </Container>

      </div>
    )
  }
}

export default App
