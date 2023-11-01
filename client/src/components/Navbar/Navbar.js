import React, { useEffect, useState } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar() {
const [user, setUser] = useState({});

useEffect(()=>{
  const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
  setUser(storageUse);
},[])

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
            Hello, {user.name || "User!"}

           { user?.name ? (<span className='navbar-logout'
            onClick={()=>{
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}>
              Logout</span>)
               :null}
                 
          </div>
        </div>


  )
}

export default Navbar
