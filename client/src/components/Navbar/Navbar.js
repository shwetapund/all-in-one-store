import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
function Navbar() {
  return (


        <div className='navbar'>
          <div>
            <Link to="/" className='navbar-brand'>All In One Store</Link>
          </div>
          <div>
            <Link to="/login" className='navbar-link'>Login</Link>
            <Link to="/signup" className='navbar-link'>Signup</Link>
            <Link to="/orders" className='navbar-link'>My Orders</Link>
          </div>

          <div>
            Hello, User
          </div>
        </div>


  )
}

export default Navbar
