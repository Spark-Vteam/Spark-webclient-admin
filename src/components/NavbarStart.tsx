// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo-admin.png';

function Navbar() {
  return (
    <div className='topnav'>
      <img src={logo} width='50px' alt='logo' />
      <div className='topnav-right'>
        <Link to='/login' className='login-link'>
          {' '}
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
