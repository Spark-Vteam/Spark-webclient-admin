import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { HashRouter } from 'react-router-dom';

test('Footer is displayed', () => {
  render(
    <HashRouter>
      <Footer />
    </HashRouter>,
  );
  const spark = screen.getByText('© Spark 2022');
  expect(spark).toBeInTheDocument();
});
