import { render, screen } from '@testing-library/react';
import { PageTitle } from './PageTitle';

describe('PageTitle Component', () => {
	const mockTitle = 'Test Page Title';

	it('renders the PageTitle with the correct text', () => {
		render(<PageTitle title={mockTitle} />);

		const titleElement = screen.getByRole('heading', { name: mockTitle });
		expect(titleElement).toBeInTheDocument();
	});

	it('applies the correct classes to the title', () => {
		render(<PageTitle title={mockTitle} />);

		const titleElement = screen.getByRole('heading', { name: mockTitle });
		expect(titleElement).toHaveClass('text-gray-page-title font-bold text-xl');
	});
});
