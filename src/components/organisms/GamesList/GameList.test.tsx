import { render, screen, fireEvent } from '@testing-library/react';
import { GamesList } from './GamesList';

jest.mock('@/components/atoms/ContainedButton/ContainedButton', () => ({
	ContainedButton: jest.fn(({ children, ...props }) => <button {...props}>{children}</button>),
}));

jest.mock('@/components/atoms/Loader/Loader', () => ({
	Loader: jest.fn(() => <div>Loading...</div>),
}));

jest.mock('@/components/molecules/VideoGameCard/VideoGameCard', () => ({
	VideoGameCard: jest.fn(({ name }) => <div>{name}</div>),
}));

describe('GamesList Component', () => {
	const handleSeeMore = jest.fn();
	const data = {
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
		currentPage: 1,
		totalPages: 2,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders loader when loading and no games', () => {
		render(
			<GamesList
				handleSeeMore={handleSeeMore}
				loading={true}
				data={{ games: [], totalPages: 0, currentPage: 0 }}
			/>
		);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('renders error message when error is provided', () => {
		render(
			<GamesList
				handleSeeMore={handleSeeMore}
				error="Network error"
				data={{ games: [], totalPages: 0, currentPage: 0 }}
			/>
		);

		expect(screen.getByText('Error: Network error')).toBeInTheDocument();
	});

	it('renders game cards when data is provided', () => {
		render(<GamesList handleSeeMore={handleSeeMore} loading={false} data={data} />);

		data.games.forEach((game) => {
			expect(screen.getByText(game.name)).toBeInTheDocument();
		});
	});

	it('renders "See more" button if more pages are available', () => {
		render(<GamesList handleSeeMore={handleSeeMore} loading={false} data={data} />);

		expect(screen.getByText('See more')).toBeInTheDocument();
	});

	it('disables "See more" button when loading', () => {
		render(<GamesList handleSeeMore={handleSeeMore} loading={true} data={data} />);

		const seeMoreButton = screen.getByText('Loading');
		expect(seeMoreButton).toBeDisabled();
	});

	it('calls handleSeeMore when "See more" is clicked', () => {
		render(<GamesList handleSeeMore={handleSeeMore} loading={false} data={data} />);

		const seeMoreButton = screen.getByText('See more');
		fireEvent.click(seeMoreButton);

		expect(handleSeeMore).toHaveBeenCalledTimes(1);
	});
});
