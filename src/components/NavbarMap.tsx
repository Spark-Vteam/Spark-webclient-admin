// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo-admin.png';

function NavbarMap() {
  return (
    <div className='topnav'>
      <img src={logo} width='50px' alt='logo' />
      <div className='topnav-right'>
        <Link to='/users' className='home-link'>
          {' '}
          Customer overview
        </Link>
        <Link to='/pricing' className='home-link'>
          {' '}
          Pricing
        </Link>
        <button
          className='btn-logout'
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavbarMap;
