import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { HashRouter } from 'react-router-dom';

test('renders welcome page', () => {
  render(
    <HashRouter>
      <Home />
    </HashRouter>,
  );
  const registerElement = screen.getByText('Administration');
  expect(registerElement).toBeInTheDocument();
});
