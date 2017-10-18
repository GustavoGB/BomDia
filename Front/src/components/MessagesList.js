import React from 'react'
import { PropTypes } from 'prop-types'
import { Button, Row, Col } from 'reactstrap'
import './MessagesList.css'

const extractText = (content) => {
  const httpIndex = content.indexOf('http')

  if (httpIndex > 0) {
    return content.substring(0, httpIndex)
  }
  return content
}

const extractLink = (content) => {
  const httpIndex = content.indexOf('http')

  if (httpIndex > 0) {
    return content.substring(httpIndex, content.length)
  }

  return null
}

const MessagesList = ({messages, handleDelete, handleUpdate}) => {
  if (messages.length === 0) {
    return (<h4>Nenhuma mensagem encontrada. Crie uma clicando no botão azul acima </h4>)
  }

  return (
    <Row>
      { messages.map(message => (
        <Col md={6} xs={12} key={message.id}>
          <div className='message-container'>
            <div className='message-hour'>
              <i className='fa fa-clock-o' aria-hidden='true' /> {message.hour}h
            </div>

            <div className='message-towhom'>
              <i className='fa fa-phone' aria-hidden='true' /> <span className='to'>{message.toWhom}</span>
            </div>

            <p className='message-content'>
              { extractLink(message.content)
                ? <img src={extractLink(message.content)} className='content-gif' alt='gif' /> : ''
              }
              {extractText(message.content)}
            </p>

            <div className='message-status'>
              {message.isActive
                ? <i className='fa fa-check-square' aria-hidden='true' /> : ''
              }
            </div>

            <div className='message-footer'>
              <div />

              <div className='btn-group btn-group-sm' role='group' aria-label='Basic example'>
                <Button color='secondary' onClick={() => handleUpdate(message)}>
                  <i className='fa fa-pencil' aria-hidden='true' />
                </Button>
                <Button color='danger' onClick={() => handleDelete(message)}>
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

export default MessagesList

MessagesList.propTypes = {
  messages: PropTypes.array,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
}
