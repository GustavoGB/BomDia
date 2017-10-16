import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Button, Row, Col } from 'reactstrap'
import './MessagesList.css'

class MessagesList extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    if (this.props.messages.length === 0) {
      return (<h4>Nenhuma mensagem encontrada. Crie uma clicando no botão verde acima </h4>)
    }

    return (
      <Row>
        <Col xs={6}>
          <div className='message-container'>
            <div className='message-hour'>
              <i className='fa fa-clock-o' aria-hidden='true' /> 9h
            </div>

            <p className='message-content'>
              Bom dia flor do dia! Que seu dia seja regado de notícias boas. Deus é fiel.
            </p>

            <div className='message-status'>
              <i className='fa fa-check-square' aria-hidden='true' />
            </div>

          </div>
        </Col>

        { this.props.messages.map(message => (
          <Col xs={6} key={message.id}>
            <div className='message-container'>
              <div className='message-hour'>
                <i className='fa fa-clock-o' aria-hidden='true' /> {message.hour}
              </div>

              <p className='message-content'> {message.content} </p>

              <div className='message-status'>
                <i className='fa fa-check-square' aria-hidden='true' />
              </div>

              <div className='message-footer'>
                <div className='message-towhom'>
                  <span className='light'>Para</span><span className='to'>{message.toWhom}</span>
                </div>

                <div className='btn-group btn-group-sm' role='group' aria-label='Basic example'>
                  <Button color='secondary' onClick={() => this.props.handleUpdate()}>
                    <i className='fa fa-pencil' aria-hidden='true' />
                  </Button>
                  <Button color='danger' onClick={() => this.props.handleDelete()}>
                    <i className='fa fa-trash-o' aria-hidden='true' />
                  </Button>
                </div>
              </div>

            </div>
          </Col>
          ))
        }

      </Row >
    )
  }
}

export default MessagesList

MessagesList.propTypes = {
  messages: PropTypes.array,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
}
