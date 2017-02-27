import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

let loginObj = {
  user: '',
  password: ''
}

const usernameOnChange = (e) => {
  loginObj.user = e.target.value
}

const passwordOnChange = (e) => {
  loginObj.password = e.target.value
}

const prepareLoginJSX = (props) => (
  <div>
    <form onSubmit={props.handleLogin.bind(undefined, loginObj)}>
      <input
        type='input'
        placeholder='username'
        style={{ width: 100 }}
        name='username'
        onChange={usernameOnChange} />
      <input
        type='input'
        placeholder='password'
        style={{ width: 100 }}
        name='password'
        onChange={passwordOnChange} />
      <input
        type='submit'
        value={'Login Now'} />
    </form>
  </div>
)

export const Header = (props) => {
  let loginFormJSX
  let loginMessageJSX = null

  if (props.session.isNotLoggedIn) {
    if (props.session.loginToken === 'invalid') {
      loginMessageJSX = <p>Invalid login details, please try with correct user and password</p>
    }

    loginFormJSX = prepareLoginJSX(props)
  } else {
    loginFormJSX = null
  }

  return (
    <div>
      <h1>React Redux Starter Kit</h1>
      <div>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
        {' · '}
        <Link to='/counter' activeClassName='route--active'>
          Counter
        </Link>
        {' . '}
        <Link to='/dashboard' activeClassName='route--active'>
          Dashboard
        </Link>
      </div>
      {loginFormJSX}
      {loginMessageJSX}
    </div>
  )
}

Header.propTypes = {
  session: React.PropTypes.object.isRequired
}

prepareLoginJSX.propTypes = {
  handleLogin: React.PropTypes.func.isRequired
}

export default Header
