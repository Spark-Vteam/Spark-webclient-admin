import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ActiveBikesPrint from '../components/ActiveBikesPrint';

test('renders active bikes heading', () => {
    render(
        <HashRouter>
            <ActiveBikesPrint activeBikes={[]} city="Stockholm" />
        </HashRouter>
    );
    const heading = screen.getByText('Active bikes for Stockholm');
    expect(heading).toBeInTheDocument();
});


test('Correct number of Fragment elements are displayed', () => {
    const activeBikes = [
        { id: 1, Battery: 50, Position: '40.7128,-74.0060', City: 'New York' },
        { id: 2, Battery: 75, Position: '34.0522,-118.2437', City: 'Los Angeles' },
        { id: 3, Battery: 100, Position: '41.8781,-87.6298', City: 'Chicago' }
    ];
    const { getAllByTestId } = render(
        <HashRouter>
            <ActiveBikesPrint activeBikes={activeBikes} city='New York' />
        </HashRouter>
    );
    const fragmentElements = getAllByTestId('fragment');
    expect(fragmentElements).toHaveLength(activeBikes.length);
});
