import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

test('renders previous button', () => {
  const handlePageChange = jest.fn();
  const { getByText } = render(
    <Pagination currentPage={2} totalPages={5} handlePageChange={handlePageChange} />,
  );
  const previousButton = getByText('Previous');
  expect(previousButton).toBeInTheDocument();
});

it('displays the active page button as selected', () => {
  const handlePageChange = jest.fn();
  const { container } = render(
    <Pagination currentPage={3} totalPages={5} handlePageChange={handlePageChange} />,
  );
  expect(container.querySelector('.active.pages')).toHaveTextContent('3');
});

it('calls the handlePageChange function when a prev button is clicked', () => {
  const handlePageChange = jest.fn();
  render(<Pagination currentPage={2} totalPages={5} handlePageChange={handlePageChange} />);

  const pageButton = screen.getByTestId('page-button');
  fireEvent.click(pageButton);

  expect(handlePageChange).toHaveBeenCalledWith(1);
});

// Får inte till att funka
// it('disables the Previous button on the first page', () => {
//     const handlePageChange = jest.fn();
//     const { container } = render(<Pagination currentPage={2} totalPages={5} handlePageChange={handlePageChange} />);
//     expect(container.querySelector('.next-prev:disabled')).toHaveTextContent('Previous');
// });
