import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import NavbarMap from '../components/NavbarMap';

test('Customer overview is displayed', () => {
  render(
    <HashRouter>
      <NavbarMap />
    </HashRouter>,
  );
  const navE = screen.getByText('Customer overview');
  expect(navE).toBeInTheDocument();
});

test('Pricing is displayed', () => {
  render(
    <HashRouter>
      <NavbarMap />
    </HashRouter>,
  );
  const navE = screen.getByText('Pricing');
  expect(navE).toBeInTheDocument();
});

test('Log out is displayed', () => {
  render(
    <HashRouter>
      <NavbarMap />
    </HashRouter>,
  );
  const navE = screen.getByText('Log out');
  expect(navE).toBeInTheDocument();
});
