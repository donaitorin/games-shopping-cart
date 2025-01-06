import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CatalogPage } from './CatalogPage';
import { useFetchGames } from '@/hooks/useFetchGames';

jest.mock('@/hooks/useFetchGames', () => ({
	useFetchGames: jest.fn(),
}));

describe('CatalogPage Component', () => {
	const mockHandleFetchGames = jest.fn();
	const mockSetData = jest.fn();

	const mockData = {
		games: [
			{
				id: '1',
				name: 'Game 1',
				genre: 'Action',
				image: 'path/to/image1.jpg',
				price: 59.99,
				description: 'Description 1',
				isNew: true,
			},
			{
				id: '2',
				name: 'Game 2',
				genre: 'Adventure',
				image: 'path/to/image2.jpg',
				price: 49.99,
				description: 'Description 2',
				isNew: false,
			},
		],
		totalPages: 2,
		currentPage: 0,
	};

	beforeEach(() => {
		(useFetchGames as jest.Mock).mockReturnValue({
			data: mockData,
			loading: false,
			error: null,
			handleFetchGames: mockHandleFetchGames,
			setData: mockSetData,
		});
	});

	it('renders the page title', () => {
		render(<CatalogPage />);
		expect(screen.getByText('Top Sellers')).toBeInTheDocument();
	});

	it('renders the Filters component', () => {
		render(<CatalogPage />);
		expect(screen.getByText('Genre')).toBeInTheDocument();
	});

	it('renders the GamesList component with games data', () => {
		render(<CatalogPage />);
		expect(screen.getByText('Game 1')).toBeInTheDocument();
		expect(screen.getByText('Game 2')).toBeInTheDocument();
	});

	it('calls handleFetchGames on initial render', () => {
		render(<CatalogPage />);
		expect(mockHandleFetchGames).toHaveBeenCalledWith({
			genre: '',
			page: '0',
		});
	});

	it('updates the filter and fetches games when a genre is selected', async () => {
		render(<CatalogPage />);
		const genreSelect = screen.getByRole('combobox');

		fireEvent.change(genreSelect, { target: { value: 'Action' } });

		await waitFor(() => {
			expect(mockSetData).toHaveBeenCalledWith({
				games: [],
				totalPages: 0,
				currentPage: 0,
			});
		});

		expect(mockHandleFetchGames).toHaveBeenCalledWith({
			genre: 'Action',
			page: '0',
		});
	});

	it('updates the page and fetches games when "See More" is clicked', async () => {
		render(<CatalogPage />);
		const seeMoreButton = screen.getByText('See more');

		fireEvent.click(seeMoreButton);

		await waitFor(() => {
			expect(mockHandleFetchGames).toHaveBeenCalledWith({
				genre: '',
				page: '1',
			});
		});
	});

	it('displays an error message if there is an error', () => {
		(useFetchGames as jest.Mock).mockReturnValueOnce({
			data: null,
			loading: false,
			error: 'An error occurred',
			handleFetchGames: mockHandleFetchGames,
			setData: mockSetData,
		});

		render(<CatalogPage />);
		expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
	});

	it('displays a loader when loading', () => {
		(useFetchGames as jest.Mock).mockReturnValueOnce({
			data: { games: [] },
			loading: true,
			error: null,
			handleFetchGames: mockHandleFetchGames,
			setData: mockSetData,
		});

		render(<CatalogPage />);
		expect(screen.getByRole('status')).toBeInTheDocument();
	});
});
