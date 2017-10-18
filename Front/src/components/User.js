import React from 'react'
import './User.css'

const User = ({user}) => {
  return (
    <div className='user-container'>
      { user.profilePicture
        ? <img src={user.profilePicture} className='profile-pic' alt='gif' /> : ''
      }
      <i className='fa fa-user' aria-hidden='true' /> <span className='to'>{user.name}</span>
      <br />
      <i className='fa fa-phone' aria-hidden='true' /> <span className='to'>{user.phone}</span>
    </div>
  )
}

export default User
