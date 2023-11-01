import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div>
      <navbar>
        <div className='navbar'>
          <div>
            <Link to="/">Navbar</Link>
          </div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </div>
        </div>
      </navbar>
    </div>
  )
}

export default Navbar
