import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { HashRouter } from 'react-router-dom';

test('Links "About" and "Policy" are displayed', () => {
  render(
    <HashRouter>
      <Footer />
    </HashRouter>,
  );
  const about = screen.getByText('About');
  const policy = screen.getByText('Policy');
  expect(about).toBeInTheDocument();
  expect(policy).toBeInTheDocument();
});
