import { fetchGames } from './games';

global.fetch = jest.fn();

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

describe('fetchGames', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('constructs the correct URL and fetches data successfully', async () => {
		const mockParams = { genre: 'Action', page: '1' };
		const mockResponse = {
			games: [{ id: '1', name: 'Game 1' }],
			totalPages: 1,
			currentPage: 1,
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockResponse),
		});

		const result = await fetchGames(mockParams);

		expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/games?genre=Action&page=1`, {});
		expect(result).toEqual(mockResponse);
	});

	it('handles empty parameters correctly', async () => {
		const mockResponse = { games: [], totalPages: 0, currentPage: 0 };

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockResponse),
		});

		const result = await fetchGames({});

		expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/games?`, {});
		expect(result).toEqual(mockResponse);
	});

	it('throws an error if the fetch response is not ok', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
		});

		await expect(fetchGames({ genre: 'Action' })).rejects.toThrow('Failed to fetch products');

		expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/games?genre=Action`, {});
	});

	it('throws an error if the fetch fails', async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

		await expect(fetchGames({ genre: 'Action' })).rejects.toThrow('Network Error');

		expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/games?genre=Action`, {});
	});

	it('handles special characters in parameters correctly', async () => {
		const mockParams = { genre: 'Sci-Fi/Fantasy', page: '2' };
		const encodedParams = encodeURIComponent(mockParams.genre);
		const mockResponse = { games: [], totalPages: 1, currentPage: 2 };

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockResponse),
		});

		const result = await fetchGames(mockParams);

		expect(global.fetch).toHaveBeenCalledWith(
			`${BASE_URL}/games?genre=${encodedParams}&page=2`,
			{}
		);
		expect(result).toEqual(mockResponse);
	});
});
