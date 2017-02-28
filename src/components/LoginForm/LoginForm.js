import React from 'react'

export const LoginForm = (props) => {
  let loginMessage
  if (props.isInvalidLogin) {
    loginMessage = <p>Invalid login details, please try with correct user and password</p>
  } else {
    loginMessage = null
  }

  return (
    <div>
      <div>
        <form onSubmit={props.handleLogin}>
          <input
            type='input'
            placeholder='username'
            style={{ width: 100 }}
            name='username'
            onChange={props.usernameOnChange} />
          <input
            type='input'
            placeholder='password'
            style={{ width: 100 }}
            name='password'
            onChange={props.passwordOnChange} />
          <input
            type='submit'
            value={'Login Now'} />
        </form>
      </div>
      {loginMessage}
    </div>
  )
}

LoginForm.propTypes = {
  isInvalidLogin: React.PropTypes.bool.isRequired,
  handleLogin: React.PropTypes.func.isRequired,
  usernameOnChange: React.PropTypes.func.isRequired,
  passwordOnChange: React.PropTypes.func.isRequired
}

export default LoginForm
