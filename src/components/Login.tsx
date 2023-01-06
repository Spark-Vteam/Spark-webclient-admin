import React, { useState } from 'react';
import NavbarStart from './NavbarStart';
import Navbar from './Navbar';

import adminModels from '../models/adminModels';

function LoginForm({ setAdmin }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await adminModels.login(username, password);
      setAdmin(user.data.info);
      window.location.href = 'http://localhost:3001/#/map';
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <NavbarStart />
      <div className='form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <label className='login-label' htmlFor='username'>
            Email:
          </label>
          <input
            className='login-input'
            type='text'
            id='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label className='login-label' htmlFor='password'>
            Password:
          </label>
          <input
            className='login-input'
            type='password'
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className='btn-container-login'>
            <button className='login-btn' type='submit'>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
