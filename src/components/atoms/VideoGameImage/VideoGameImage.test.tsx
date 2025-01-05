import { render, screen } from '@testing-library/react';
import { VideoGameImage } from './VideoGameImage';

describe('VideoGameImage Component', () => {
	const mockImage = 'https://example.com/image.jpg';
	const mockAlt = 'Mock Video Game Image';

	it('renders the image with correct src and alt attributes', () => {
		render(<VideoGameImage image={mockImage} alt={mockAlt} />);

		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', mockImage);
		expect(image).toHaveAttribute('alt', mockAlt);
	});

	it('applies the "rounded-t-lg" class when addTopRadius is true', () => {
		render(<VideoGameImage image={mockImage} alt={mockAlt} addTopRadius={true} />);

		const image = screen.getByRole('img');
		expect(image).toHaveClass('rounded-t-lg');
	});

	it('does not apply the "rounded-t-lg" class when addTopRadius is false', () => {
		render(<VideoGameImage image={mockImage} alt={mockAlt} addTopRadius={false} />);

		const image = screen.getByRole('img');
		expect(image).not.toHaveClass('rounded-t-lg');
	});

	it('renders the "New" badge when isNew is true', () => {
		render(<VideoGameImage image={mockImage} alt={mockAlt} isNew={true} />);

		const badge = screen.getByText('New');
		expect(badge).toBeInTheDocument();
	});

	it('does not render the "New" badge when isNew is false', () => {
		render(<VideoGameImage image={mockImage} alt={mockAlt} isNew={false} />);

		const badge = screen.queryByText('New');
		expect(badge).toBeNull();
	});
});
