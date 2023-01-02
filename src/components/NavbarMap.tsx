// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo-admin.png';

function NavbarMap({resetCity}: any) {
  return (
    <div className='topnav'>
      <img src={logo} width='50px' alt='logo' />
      <div className='topnav-right'>
        <Link to='/' className='home-link'>
          {' '}
          Home
        </Link>
        <Link to='/users' className='home-link'>
          {' '}
          Customer overview
        </Link>
        <Link to='/pricing' className='home-link'>
          {' '}
          Pricing
        </Link>
        <Link to='/map' className='login-link'>
          {' '}
          Log in
        </Link>
      </div>
    </div>
  );
}

export default NavbarMap;