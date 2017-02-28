import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import LoginFormContainer from '../../containers/LoginFormContainer'

export const Header = (props) => {
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
      <LoginFormContainer />
    </div>
  )
}

export default Header
