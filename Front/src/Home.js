import React, { Component } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import Header from './components/Header'
import MessagesListContainer from './containers/MessagesList'
import req from 'request'
import routes from './api-routes'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showMessageModal: false,
      message: {
        id: null,
        content: '',
        toWhom: '',
        hour: '',
        isActive: true,
        gifTag: ''
      },
      shouldFetchAgain: false
    }

    this.toggleMessageClick = this.toggleMessageClick.bind(this)
    this.handleMessageRequest = this.handleMessageRequest.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  toggleMessageClick () {
    const on = this.state.showMessageModal
    this.setState({ showMessageModal: !on })
  }

  handleMessageRequest () {
    // Validations
    if (this.state.message.content.length === 0) {
      alert('Coloque um conteúdo')
      return
    }

    if (this.state.message.toWhom.length === 0) {
      alert('Coloque um telefone de envio')
      return
    }

    if (this.state.message.hour.length === 0) {
      alert('Coloque um horário de envio')
      return
    }

    let isUpdating = this.state.message.id !== null
    let url = routes.postMessage

    const message = this.state.message

    const form = {
      content: message.content,
      toWhom: message.toWhom,
      userId: this.props.userId,
      hour: message.hour,
      gifTag: message.gifTag,
      isActive: message.isActive ? 1 : 0
    }

    if (isUpdating) {
      form.id = this.state.message.id
      form.isDeleted = 0
      url = routes.postMessage + '/' + form.id
    }

    const rawMessage = {
      id: null,
      content: '',
      toWhom: '',
      hour: '',
      isActive: true,
      gifTag: ''
    }

    req.post({
      url,
      json: form
    }, (err, httpResponse, body) => {
      if (body) {
        if (body.ok) {
          this.setState({ shouldFetchAgain: true, showMessageModal: false, message: rawMessage })
        }
      }
    })
  }

  handleUpdate (message) {
    const { content, id, toWhom, isActive, hour } = message

    this.setState({
      showMessageModal: true,
      message: {
        content,
        toWhom,
        isActive,
        hour,
        id
      }
    })
  }

  handleDelete (note) {
    const form = {
      id: note.id
    }

    req.delete({
      url: `${routes.postMessage}/${note.id}`,
      json: form
    }, (err, httpResponse, body) => {
      if (body.ok) {
        this.setState({ shouldFetchAgain: true, showMessageModal: false })
      }
    })
  }

  render () {
    const handleMessageChange = (el, type) => {
      const message = this.state.message
      message[type] = el.target.value
      this.setState({ ...this.state, message })
    }

    const handleNumberChange = (number, type) => {
      if (!Number(number) && number.length > 0) {
        return
      }
      const message = this.state.message
      message[type] = number
      this.setState({ ...this.state, message })
    }

    const handleIsActiveChange = () => {
      const message = this.state.message
      message.isActive = !this.state.message.isActive
      this.setState({ ...this.state, message })
    }

    return (
      <div>

        <Header newNoteClick={this.toggleMessageClick} />
        <MessagesListContainer
          shouldFetchAgain={this.state.shouldFetchAgain}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
          userId={this.props.userId}
        />

        <Modal isOpen={this.state.showMessageModal} toggle={this.toggleMessageClick} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Novo Bom Dia</ModalHeader>
          <ModalBody>
            <Form onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Input type='textarea' placeholder='mensagem'
                  value={this.state.message.content}
                  onChange={(el) => handleMessageChange(el, 'content')}
                />
              </FormGroup>

              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <Input type='text' placeholder='para quem? (tel + DDD)'
                      value={this.state.message.toWhom}
                      onChange={(el) => handleNumberChange(el.target.value, 'toWhom')}
                    />
                  </FormGroup>

                </Col>

                <Col xs={6}>
                  <FormGroup>
                    <Input type='text' placeholder='hora de envio (ex: 9)'
                      value={this.state.message.hour}
                      onChange={(el) => handleNumberChange(el.target.value, 'hour')}
                    />
                  </FormGroup>

                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Label>Enviar com gif aleatório?</Label>
                  <InputGroup>
                    <InputGroupAddon>#</InputGroupAddon>
                    <Input
                      placeholder='tema do gif'
                      value={this.state.message.gifTag}
                      onChange={
                      (el) => handleMessageChange(el, 'gifTag')
                    }
                  />
                  </InputGroup>
                </Col>

                { this.state.message.id
                  ? <Col xs={6}>
                    <FormGroup check>
                      <Label check>
                        <Input type='checkbox' checked={this.state.message.isActive}
                          onChange={handleIsActiveChange}
                         />{' '}
                    Ativo?
                  </Label>
                    </FormGroup>
                  </Col>
                : ''
                }
              </Row>
            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggleMessageClick}>Cancelar</Button>
            <Button color='success' onClick={this.handleMessageRequest}>
              {this.state.message.id ? 'Atualizar Bom Dia' : 'Criar Bom Dia'}
            </Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

export default Home
