import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className='loadingmain'>
    <div className='loading'>
      <BallTriangle className='BallTriangle' type='Circles' color='#00BFFF' />
      <p>{message}</p>
    </div>
    </div>

  )
}

export default Spinner
