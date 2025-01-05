import { render, screen } from '@testing-library/react';
import { CartList } from './CartList';
import { CheckoutItem } from '@/components/molecules/CheckoutItem/CheckoutItem';

jest.mock('@/components/molecules/CheckoutItem/CheckoutItem', () => ({
	CheckoutItem: jest.fn(() => <div>Checkout Item</div>),
}));

describe('CartList Component', () => {
	const items = [
		{
			id: '1',
			genre: 'Action',
			image: 'path/to/image1.jpg',
			name: 'Awesome Game 1',
			price: 59.99,
			isNew: true,
			description: 'This is a description',
		},
		{
			id: '2',
			genre: 'Adventure',
			image: 'path/to/image2.jpg',
			name: 'Awesome Game 2',
			price: 49.99,
			isNew: false,
			description: 'This is another description',
		},
	];

	beforeEach(() => {
		render(<CartList items={items} />);
	});

	it('renders a CheckoutItem for each game in the list', () => {
		expect(CheckoutItem).toHaveBeenCalledTimes(2);

		items.forEach((game) => {
			expect(CheckoutItem).toHaveBeenCalledWith(expect.objectContaining({ game }), {});
		});
	});

	it('renders the correct number of CheckoutItem components', () => {
		const checkoutItems = screen.getAllByText('Checkout Item');
		expect(checkoutItems).toHaveLength(items.length);
	});
});
