const root = 'http://localhost:8080/bomdia'

const routes = {
  login: root + '/login',
  createAccount: root + '/user',
  getMessages: root + '/messages',
  postMessage: root + '/messages',
  uploadProfilePic: 'https://api.imgur.com/3/image'
}

export default routes
