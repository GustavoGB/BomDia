import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import './Header.css'

class Header extends Component {
  render () {
    return (
      <div className='home-header'>
        <div className='row'>
          <div className='col-8'>
            <div className='content'>
              <i className='fa fa-comment-o' aria-hidden='true' />
              <h1>Mensagens</h1>
            </div>
          </div>
          <div className='col-4'>
            <button type='button' className='btn btn-outline-primary float-right'
              onClick={this.props.newNoteClick}>
              <i className='fa fa-plus' aria-hidden='true' /> Nova mensagem
    	    	</button>
          </div>
        </div>
        <div className='home-divider' />
      </div>

    )
  }
}

export default Header

Header.propTypes = {
  newNoteClick: PropTypes.func
}
