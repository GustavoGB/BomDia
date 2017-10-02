import { compose } from 'react-komposer'
import NotesList from '../components/NotesList'
import req from 'request'
import moment from 'moment'

function dataLoader (props, onData) {
  req.get({
    url: 'http://localhost:8080/Keepy/notes',
    qs: { user_id: props.userId }
  }, (err, httpResponse, body) => {
    if (body) {
      body = JSON.parse(body)
      const notes = body.map(a => {
        const b = a
        b.date_created = moment(a.date_created)
        return b
      })
      onData(null, { notes, handleUpdate: props.handleUpdate, handleDelete: props.handleDelete })
    }
  })
}

const NotesListContainer = compose(dataLoader)(NotesList)
export default NotesListContainer
