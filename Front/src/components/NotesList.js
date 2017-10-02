import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Card, CardBlock, CardSubtitle, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import './NotesList.css'

class NotesList extends Component {
  constructor (props) {
    super(props)
    console.log(props)
  }
  render () {
    // if (this.props.messages.length === 0) {
    //   return (<h4>Nenhuma nota encontrada </h4>)
    // }

    return (
      <Row>
        <Col xs={12}>
          <div className='message-container'>
            <div className='message-hour'>
              <i className='fa fa-clock-o' aria-hidden='true' /> 9h30
            </div>

            <p className='message-content'>
              Bom dia flor do dia! Que seu dia seja regado de notícias boas. Deus é fiel.
            </p>

            <div className='message-status'>
              <i className='fa fa-check-square' aria-hidden='true' />
            </div>

          </div>
        </Col>

        {this.props.messages.map(note => (
          <Col xs={12} key={note.id}>
            <Card>
              <CardBlock>
                <CardTitle>{note.title}</CardTitle>
                <CardSubtitle>{note.userId}</CardSubtitle>
                <CardText>{note.description}</CardText>
                <div className='card--footer'>
                  <div className='card-time'>
                    <i className='fa fa-calendar-o' aria-hidden='true' />
                    {note.date_created.format('DD/MM')}
                  </div>

                  <div className='btn-group btn-group-sm' role='group' aria-label='Basic example'>
                    <Button color='secondary' onClick={() => this.props.handleUpdate(note)}>
                      <i className='fa fa-pencil' aria-hidden='true' />
                    </Button>
                    <Button color='danger' onClick={() => this.props.handleDelete(note)}>
                      <i className='fa fa-trash-o' aria-hidden='true' />
                    </Button>
                  </div>
                </div>
              </CardBlock>
            </Card>
          </Col>
          ))}

      </Row >
    )
  }
}

export default NotesList

NotesList.propTypes = {
  messages: PropTypes.array,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
}
