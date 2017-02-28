import React from 'react'
import { connect } from 'react-redux'
import { loginAsync } from '../modules/session'
import LoginForm from '../components/LoginForm'

const mapDispatchToProps = {
  loginAsync
}

const mapStateToProps = (state) => ({
  session: state.session
})

class LoginFormContainer extends React.Component {
  static propTypes = {
    session: React.PropTypes.object.isRequired,
    loginAsync: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.passwordOnChange = this.passwordOnChange.bind(this)
    this.usernameOnChange = this.usernameOnChange.bind(this)

    this.state = {
      user: '',
      password: ''
    }
  }

  handleLogin (e) {
    e.preventDefault()
    this.props.loginAsync(this.state)
  }

  passwordOnChange = (e) => {
    this.setState({ password: e.target.value })
  }

  usernameOnChange = (e) => {
    this.setState({ user: e.target.value })
  }

  isInvalidLogin = (session) => {
    let inValid = false
    if (session.isNotLoggedIn) {
      if (this.props.session.loginToken === 'invalid') {
        inValid = true
      }
    }
    return inValid
  }

  render () {
    if (this.props.session.isNotLoggedIn) {
      return (
        <LoginForm
          isInvalidLogin={this.isInvalidLogin(this.props.session)}
          handleLogin={this.handleLogin}
          passwordOnChange={this.passwordOnChange}
          usernameOnChange={this.usernameOnChange}
        />
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)
