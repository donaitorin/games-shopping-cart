import { render, screen, fireEvent } from '@testing-library/react';
import { VideoGameCard } from './VideoGameCard';
import { useCart } from '@/context/CartContext';

jest.mock('@/context/CartContext', () => ({
	useCart: jest.fn(),
}));

describe('VideoGameCard Component', () => {
	const game = {
		id: '1',
		genre: 'Action',
		image: 'path/to/image.jpg',
		name: 'Awesome Game',
		price: 59.99,
		isNew: true,
		description: 'This is a description',
	};

	const addItemToCartMock = jest.fn();
	const removeItemFromCartMock = jest.fn();

	beforeEach(() => {
		(useCart as jest.Mock).mockReturnValue({
			cart: [],
			addItemToCart: addItemToCartMock,
			removeItemFromCart: removeItemFromCartMock,
		});

		render(<VideoGameCard {...game} />);
	});

	it('renders the game information correctly', () => {
		expect(screen.getByText(game.genre)).toBeInTheDocument();
		expect(screen.getByText(game.name)).toBeInTheDocument();
		expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();

		const image = screen.getByAltText(game.name);
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', game.image);
	});

	it('renders the button with "Add to cart" when the game is not in the cart', () => {
		const button = screen.getByRole('button', { name: /add to cart/i });
		expect(button).toBeInTheDocument();
	});

	it('calls addItemToCart when "Add to cart" is clicked', () => {
		const button = screen.getByRole('button', { name: /add to cart/i });
		fireEvent.click(button);

		expect(addItemToCartMock).toHaveBeenCalledWith(game);
	});

	it('renders the button with "Remove from cart" when the game is in the cart', () => {
		(useCart as jest.Mock).mockReturnValue({
			cart: [game],
			addItemToCart: jest.fn(),
			removeItemFromCart: jest.fn(),
		});

		render(<VideoGameCard {...game} />);

		const button = screen.getByRole('button', { name: /remove from cart/i });
		expect(button).toBeInTheDocument();
	});

	it('calls removeItemFromCart when "Remove from cart" is clicked', () => {
		(useCart as jest.Mock).mockReturnValue({
			cart: [game],
			addItemToCart: jest.fn(),
			removeItemFromCart: removeItemFromCartMock,
		});

		render(<VideoGameCard {...game} />);

		const button = screen.getByRole('button', { name: /remove from cart/i });
		fireEvent.click(button);

		expect(removeItemFromCartMock).toHaveBeenCalledWith(game.id);
	});
});
