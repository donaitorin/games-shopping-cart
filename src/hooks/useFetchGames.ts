import { fetchGames } from '@/services/games';
import { useEffect, useState } from 'react';

export const useFetchGames = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [data, setData] = useState<GamesResponse>({
		games: [],
		totalPages: 0,
		currentPage: 0,
	});

	const handleFetchGames = async (customParams: Record<string, string>) => {
		setLoading(true);
		try {
			const response = await fetchGames(customParams);
			setData({
				...response,
				games: [...data.games, ...response.games],
			});
		} catch (error: any) {
			setError(error.message);
		}
		setLoading(false);
	};

	return { loading, error, data, handleFetchGames, setData };
};
