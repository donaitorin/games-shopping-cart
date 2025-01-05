type Game = {
	id: string;
	name: string;
	price: number;
	image: string;
	description: string;
	isNew: boolean;
	genre: string;
};

type GamesResponse = {
	games: Game[];
	totalPages: number;
	currentPage: number;
};
