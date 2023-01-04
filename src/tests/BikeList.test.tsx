import { render, screen } from '@testing-library/react';
import BikeList from '../components/BikeList';

it('renders a table with the correct number of rows', () => {
    const filteredBikes = [
        { id: 123, Position: '0, 0', Battery: 100, Status: 1, City: 'San Francisco' },
        { id: 456, Position: '0, 0', Battery: 50, Status: 1, City: 'San Francisco' },
        { id: 789, Position: '0, 0', Battery: 0, Status: 2, City: 'San Francisco' },
    ];
    render(<BikeList filteredBikes={filteredBikes} />);

    expect(screen.getAllByTestId('bike-row')).toHaveLength(3);
});

it('renders the correct data for each bike in the table', () => {
    const filteredBikes = [
        { id: 123, Position: '0, 0', Battery: 100, Status: 1, City: 'San Francisco' },
    ];
    render(<BikeList filteredBikes={filteredBikes} />);
    const bikeRows = screen.getAllByTestId('bike-row');

    expect(bikeRows).toHaveLength(1);
    expect(bikeRows[0]).toContainHTML('<td>123</td>');
    expect(bikeRows[0]).toContainHTML('<td>0</td>');
    expect(bikeRows[0]).toContainHTML('<td>0</td>');
    expect(bikeRows[0]).toContainHTML('<td>100%</td>');
});