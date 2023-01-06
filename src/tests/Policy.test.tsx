import { render, screen } from '@testing-library/react';
import Policy from '../components/Policy';
import { HashRouter } from 'react-router-dom';

it('renders the first paragraph', () => {
  render(
    <HashRouter>
      <Policy />
    </HashRouter>,
  );
  const text = screen.getByText(
    'Electric Bikes, also known as e-scooters, have become a popular mode of transportation in recent years. In Sweden, the use of e-scooters is regulated by law. To learn more about the specific laws governing e-scooters in Sweden, please visit',
  );
  expect(text).toBeInTheDocument();
});
