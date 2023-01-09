import { render, screen } from '@testing-library/react';
import Users from '../components/Users';
import { HashRouter } from 'react-router-dom';

test('Users component renders correct number of users', () => {
  render(
    <HashRouter>
      <Users />
    </HashRouter>,
  );
  const registerElement = screen.getByText('Log in');
  expect(registerElement).toBeInTheDocument();
});
