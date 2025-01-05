import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('next/image', () => ({
	__esModule: true,
	default: jest.fn((props) => <img {...props} />),
}));

describe('Header Component', () => {
	const title = 'My App';

	beforeEach(() => {
		render(<Header title={title} />);
	});

	it('renders the title in a Link', () => {
		const titleLink = screen.getByRole('link', { name: title });
		expect(titleLink).toBeInTheDocument();
		expect(titleLink).toHaveAttribute('href', '/');
	});

	it('renders the cart icon', () => {
		const cartIcon = screen.getByAltText('a cart icon');
		expect(cartIcon).toBeInTheDocument();
	});
});
