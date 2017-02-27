import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'
import { loginAsync } from '../../modules/session'

const mapActionCreators = {
  loginAsync
}

const mapStateToProps = (state) => ({
  session: state.session
})

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    loginAsync: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (loginObj, e) {
    e.preventDefault()
    this.props.loginAsync(loginObj)
  }

  render () {
    return (
      <div className='container text-center'>
        <Header
          handleLogin={this.handleLogin}
          session={this.props.session} />
        <div className='core-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)
