import { render, screen } from '@testing-library/react';
import { CartPage } from './CartPage';
import { useCart } from '@/context/CartContext';

jest.mock('@/context/CartContext', () => ({
	useCart: jest.fn(),
}));

jest.mock('next/link', () => {
	return ({ children, href }: { children: React.ReactNode; href: string }) => (
		<a href={href}>{children}</a>
	);
});

describe('CartPage Component', () => {
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

	beforeEach(() => {
		(useCart as jest.Mock).mockReturnValue({ cart });
	});

	it('renders breadcrumb with correct link', () => {
		render(<CartPage />);
		expect(screen.getByRole('link')).toHaveAttribute('href', '/');
	});

	it('renders page title', () => {
		render(<CartPage />);
		expect(screen.getByText('Your Cart')).toBeInTheDocument();
	});

	it('renders correct number of items in the cart', () => {
		render(<CartPage />);
		expect(screen.getAllByText(`${cart.length} Items`)).toHaveLength(2);
	});

	it('renders CartList component', () => {
		render(<CartPage />);
		expect(screen.getAllByText('Game 1')).toHaveLength(2);
		expect(screen.getAllByText('Game 2')).toHaveLength(2);
	});

	it('renders SummaryCard component', () => {
		render(<CartPage />);
		expect(screen.getByText('Order Summary')).toBeInTheDocument();
	});

	it('renders Checkout button', () => {
		render(<CartPage />);
		expect(screen.getByText('Checkout')).toBeInTheDocument();
	});
});
