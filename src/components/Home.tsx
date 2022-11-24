import React from 'react';
import { Link } from 'react-router-dom';
import cell from '../img/cell.png';
import logo from '../img/logo-admin.png';
import spark from '../img/heading.png';

function Home() {
  return (
    <div className='App'>
      <img src={cell} className='bg-layer' alt='cellphone' />
      <div className='topnav'>
        <img src={logo} width='70px' alt='logo' />
        <div className='topnav-right'>
          <Link to='/' className='home-link'>
            {' '}
            Home
          </Link>
          <Link to='/map' className='login-link'>
            {' '}
            Log in
          </Link>
        </div>
      </div>
      <div className='heading'>
        <img src={spark} className='heading-text' alt='Spark heading' />
        <h3 className='head-text-sub'>
          <span>Administration</span>
        </h3>
      </div>
    </div>
  );
}

export default Home;
