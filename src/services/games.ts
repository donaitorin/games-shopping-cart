const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchGames = async (params: Record<string, string>) => {
	const queryString = new URLSearchParams(params).toString();
	const url = `/games?${queryString || ''}`;
	const response = await fetch(BASE_URL + url, {});
	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}
	return await response.json();
};
