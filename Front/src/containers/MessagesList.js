import { compose } from 'react-komposer'
import MessagesList from '../components/MessagesList'
import req from 'request'
import moment from 'moment'
import routes from '../api-routes'

function dataLoader (props, onData) {
  req.get({
    url: routes.getMessages,
    qs: { user_id: props.userId }
  }, (err, httpResponse, body) => {
    if (body) {
      body = JSON.parse(body)
      return onData(null, { messages: body, handleUpdate: props.handleUpdate, handleDelete: props.handleDelete })
    }
    return onData(null, { messages: [] })
  })
}

const MessagesListContainer = compose(dataLoader)(MessagesList)
export default MessagesListContainer
