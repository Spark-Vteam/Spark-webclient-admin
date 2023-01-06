import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

test('Home is displayed', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );
  const navE = screen.getByText('Home');
  expect(navE).toBeInTheDocument();
});

test('Customer overview is displayed', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );
  const navE = screen.getByText('Customer overview');
  expect(navE).toBeInTheDocument();
});

test('City overview is displayed', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );
  const navE = screen.getByText('City overview');
  expect(navE).toBeInTheDocument();
});

test('Pricing is displayed', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );
  const navE = screen.getByText('Pricing');
  expect(navE).toBeInTheDocument();
});

test('Log in is displayed', () => {
  render(
    <HashRouter>
      <Navbar />
    </HashRouter>,
  );
  const navE = screen.getByText('Log in');
  expect(navE).toBeInTheDocument();
});
