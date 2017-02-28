import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => {
  return (
    <div className='container text-center'>
      <Header />
      <div className='core-layout__viewport'>
        {props.children}
      </div>
    </div>
  )
}
CoreLayout.propTypes = {
  children: React.PropTypes.object.isRequired
}

export default CoreLayout
