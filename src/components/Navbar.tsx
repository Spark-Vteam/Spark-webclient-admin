// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo-admin.png'

function Navbar() {
  return (
    <div>
      <div className='topnav'>
        <img src={logo} width='50px' alt='logo' />
        <div className='topnav-right'>
          <Link to='/' className='home-link'>
            {' '}
            Home
          </Link>
          <Link to='/map' className='login-link'>
            {' '}
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
