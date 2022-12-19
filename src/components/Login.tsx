import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Skapa en begäran med POST-metoden för att logga in användaren
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Hämta JWT:en från responsen
      const { token } = await response.json();

      // Spara JWT:en i webbläsarens localStorage
      localStorage.setItem('token', token);

      // Redirecta användaren till en skyddad sida
      window.location.href = '/protected';
    } catch (error: any) {
      // Om det inte lyckades, visa ett felmeddelande
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Email:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Log in</button>
    </form>
  );
}
export default LoginForm;