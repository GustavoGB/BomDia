import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Header from './components/Header'
import NotesListContainer from './containers/NotesList'
import req from 'request'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showNoteModal: false,
      note: {
        title: '',
        id: null,
        description: ''
      },
      shouldFetchAgain: false,
      updateNote: undefined
    }

    this.rawNote = {
      title: '',
      id: null,
      description: ''
    }

    this.toggleNoteClick = this.toggleNoteClick.bind(this)
    this.handleNoteRequest = this.handleNoteRequest.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  toggleNoteClick () {
    const on = this.state.showNoteModal
    const rawNote = {
      title: '',
      id: null,
      description: ''
    }
    this.setState({ showNoteModal: !on, note: rawNote })
  }

    /**
     * Cria ou atualiza uma nota
     */
  handleNoteRequest () {
    if (this.state.note.title.length === 0) {
      alert('Coloque um título')
      return
    }

    let isUpdating = this.state.note.id !== null
    let url = 'http://localhost:8080/Keepy/create-note'

    const form = {
      title: this.state.note.title,
      description: this.state.note.description,
      user_id: this.props.userId
    }

    if (isUpdating) {
      form.id = this.state.note.id
      url = 'http://localhost:8080/Keepy/update-note'
    }

    const rawNote = {
      title: '',
      id: null,
      description: ''
    }

    req.post({
      url,
      form
    }, (err, httpResponse, body) => {
      if (body) {
        this.setState({ shouldFetchAgain: true, showNoteModal: false, note: rawNote })
      }
    })
  }

  handleUpdate (note) {
    const { title, id, description } = note
    this.setState({
      showNoteModal: true,
      note: {
        title,
        id,
        description
      }
    })
  }

  handleDelete (note) {
    const form = {
      id: note.id
    }

    req.post({
      url: 'http://localhost:8080/Keepy/delete-note',
      form
    }, (err, httpResponse, body) => {
      if (body) {
        this.setState({ shouldFetchAgain: true, showNoteModal: false })
      }
    })
  }

  render () {
    const handleTitleChange = (el) => {
      const note = this.state.note
      note.title = el.target.value
      this.setState({ note })
    }
    const handleDescriptionChange = (el) => {
      const note = this.state.note
      note.description = el.target.value
      this.setState({ note })
    }

    return (
      <div>

        <Header newNoteClick={this.toggleNoteClick} />
        <NotesListContainer
          shouldFetchAgain={this.state.shouldFetchAgain}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
          userId={this.props.userId}
        />

        <Modal isOpen={this.state.showNoteModal} toggle={this.toggleNoteClick} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Nova Nota</ModalHeader>
          <ModalBody>
            <Form onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label for='noteTitle'>Título</Label>
                <Input type='text' name='title' id='noteTitle' placeholder='obrigatório'
                  defaultValue={this.state.note.title}
                  onChange={handleTitleChange}
                                />
              </FormGroup>

              <FormGroup>
                <Label for='noteTitle'>Descrição</Label>
                <Input type='textarea' name='description' id='noteTitle' placeholder='obrigatório'
                  defaultValue={this.state.note.description}
                  onChange={handleDescriptionChange}
                                />
              </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.handleNoteRequest}>Adicionar</Button>
            <Button color='secondary' onClick={this.toggleNoteClick}>Cancelar</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

export default Home
