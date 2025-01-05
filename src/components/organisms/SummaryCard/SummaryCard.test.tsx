import { render, screen } from '@testing-library/react';
import { SummaryCard } from './SummaryCard';

describe('SummaryCard Component', () => {
	const cart = [
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
	];

	it('renders order summary header', () => {
		render(<SummaryCard cart={cart} />);
		expect(screen.getByText('Order Summary')).toBeInTheDocument();
	});

	it('renders the correct number of items in the cart', () => {
		render(<SummaryCard cart={cart} />);
		expect(screen.getByText(`${cart.length} Items`)).toBeInTheDocument();
	});

	it('renders individual items in the cart', () => {
		render(<SummaryCard cart={cart} />);

		cart.forEach((game) => {
			expect(screen.getByText(game.name)).toBeInTheDocument();
			expect(screen.getByText(`$${game.price.toFixed(2)}`)).toBeInTheDocument();
		});
	});

	it('renders the order total correctly', () => {
		render(<SummaryCard cart={cart} />);
		const totalPrice = cart.reduce((acc, game) => acc + game.price, 0);
		expect(screen.getByText(`$${totalPrice.toFixed(2)}`)).toBeInTheDocument();
	});
});
