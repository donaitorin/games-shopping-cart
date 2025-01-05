import { render, screen, fireEvent } from '@testing-library/react';
import { CheckoutItem } from './CheckoutItem';
import { useCart } from '@/context/CartContext';
import { IMAGES_ASSETS_PATHS } from '@/utils/images';

jest.mock('@/context/CartContext', () => ({
	useCart: jest.fn(),
}));

describe('CheckoutItem Component', () => {
	const mockRemoveItemFromCart = jest.fn();
	const mockGame = {
		id: '1',
		name: 'Test Game',
		genre: 'Action',
		description: 'A thrilling action game',
		price: 59.99,
		image: 'https://example.com/game-image.jpg',
		isNew: false,
	};

	beforeEach(() => {
		(useCart as jest.Mock).mockReturnValue({
			removeItemFromCart: mockRemoveItemFromCart,
		});
	});

	it('renders the game information correctly', () => {
		render(<CheckoutItem game={mockGame} />);

		const gameImage = screen.getByAltText(mockGame.name);
		expect(gameImage).toHaveAttribute('src', mockGame.image);
		expect(screen.getByText(mockGame.name)).toBeInTheDocument();
		expect(screen.getByText(mockGame.genre)).toBeInTheDocument();
		expect(screen.getByText(mockGame.description)).toBeInTheDocument();
		expect(screen.getByText(`$${mockGame.price}`)).toBeInTheDocument();
	});

	it('calls removeItemFromCart when remove button is clicked', () => {
		render(<CheckoutItem game={mockGame} />);

		const removeButton = screen.getByRole('button');
		fireEvent.click(removeButton);

		expect(mockRemoveItemFromCart).toHaveBeenCalledTimes(1);
		expect(mockRemoveItemFromCart).toHaveBeenCalledWith(mockGame.id);
	});

	it('renders the remove icon correctly', () => {
		render(<CheckoutItem game={mockGame} />);

		const removeIcon = screen.getByAltText('an x to remove from cart');
		expect(removeIcon).toHaveAttribute('src', IMAGES_ASSETS_PATHS.RemoveIcon);
		expect(removeIcon).toHaveAttribute('alt', 'an x to remove from cart');
	});
});
