import React from 'react'
import {Link} from 'react-router-dom'
const Welcome = () => {

  return (
    <>
    <div>Welcome to home page</div>
    <Link to={'/verify'}>
      verify page
    </Link>
    
    </>
  )
}

export default Welcome