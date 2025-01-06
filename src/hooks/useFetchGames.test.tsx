import { act, renderHook } from '@testing-library/react';
import { useFetchGames } from './useFetchGames';
import { fetchGames } from '@/services/games';

jest.mock('@/services/games');

describe('useFetchGames', () => {
	const mockFetchGames = fetchGames as jest.MockedFunction<typeof fetchGames>;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('initializes with default state', () => {
		const { result } = renderHook(() => useFetchGames());

		expect(result.current.loading).toBe(true);
		expect(result.current.error).toBeUndefined();
		expect(result.current.data).toEqual({
			games: [],
			totalPages: 0,
			currentPage: 0,
		});
	});

	it('fetches games and updates data state on success', async () => {
		const mockResponse = {
			games: [{ id: '1', name: 'Game 1', price: 59.99 }],
			totalPages: 2,
			currentPage: 1,
		};

		mockFetchGames.mockResolvedValue(mockResponse);

		const { result } = renderHook(() => useFetchGames());

		await act(async () => {
			await result.current.handleFetchGames({ genre: 'Action', page: '0' });
		});

		expect(mockFetchGames).toHaveBeenCalledWith({ genre: 'Action', page: '0' });
		expect(result.current.data).toEqual(mockResponse);
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBeUndefined();
	});

	it('appends games to the existing list when fetching more', async () => {
		const initialData = {
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
			],
			totalPages: 2,
			currentPage: 0,
		};

		const additionalGames = {
			games: [
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
			currentPage: 1,
		};

		mockFetchGames.mockResolvedValue(additionalGames);

		const { result } = renderHook(() => useFetchGames());

		act(() => {
			result.current.setData(initialData);
		});

		await act(async () => {
			await result.current.handleFetchGames({ genre: 'Action', page: '1' });
		});

		expect(result.current.data.games).toEqual([...initialData.games, ...additionalGames.games]);
	});

	it('handles errors and updates the error state', async () => {
		const mockError = new Error('Failed to fetch games');

		mockFetchGames.mockRejectedValue(mockError);

		const { result } = renderHook(() => useFetchGames());

		await act(async () => {
			await result.current.handleFetchGames({ genre: 'Action', page: '0' });
		});

		expect(result.current.error).toBe('Failed to fetch games');
		expect(result.current.loading).toBe(false);
	});

	it('allows manual data updates using setData', () => {
		const { result } = renderHook(() => useFetchGames());

		const newData = {
			games: [
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
			totalPages: 1,
			currentPage: 0,
		};

		act(() => {
			result.current.setData(newData);
		});

		expect(result.current.data).toEqual(newData);
	});

	it('sets loading to true while fetching', async () => {
		mockFetchGames.mockResolvedValue({
			games: [],
			totalPages: 0,
			currentPage: 0,
		});

		const { result } = renderHook(() => useFetchGames());

		await act(async () => {
			const fetchPromise = result.current.handleFetchGames({ genre: 'Action', page: '0' });
			expect(result.current.loading).toBe(true);
			await fetchPromise;
		});

		expect(result.current.loading).toBe(false);
	});
});
