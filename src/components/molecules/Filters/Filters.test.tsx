import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from './Filters';
import { availableFilters } from '@/utils/endpoint';

describe('Filters Component', () => {
	const mockHandleGenreFilterChange = jest.fn();
	const genreValue = 'Action';

	beforeEach(() => {
		render(
			<Filters
				handleGenreFilterChange={mockHandleGenreFilterChange}
				genreValue={genreValue}
			/>
		);
	});

	it('renders the Filters component with a genre dropdown', () => {
		expect(screen.getByText('Genre')).toBeInTheDocument();

		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('calls handleGenreFilterChange when a genre is selected', () => {
		const selectElement = screen.getByRole('combobox');

		fireEvent.change(selectElement, { target: { value: availableFilters[2] } });
		expect(mockHandleGenreFilterChange).toHaveBeenCalledTimes(1);
	});

	it('passes the genreValue as the value of the TextSelect component', () => {
		const selectElement = screen.getByRole('combobox');
		expect(selectElement).toHaveValue(genreValue);
	});
});
