import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import '@testing-library/jest-dom';
import { IMAGES_ASSETS_PATHS } from '@/utils/images';

describe('Footer Component', () => {
	const mockLogoPath = '/mock-logo.png';

	beforeAll(() => {
		IMAGES_ASSETS_PATHS.Logo = mockLogoPath;
	});

	it('renders the Footer component', () => {
		render(<Footer />);

		const footer = screen.getByRole('contentinfo');
		expect(footer).toBeInTheDocument();
	});

	it('renders the logo image with correct src and alt attributes', () => {
		render(<Footer />);

		const logoImage = screen.getByAltText('apply digital logo');
		expect(logoImage).toBeInTheDocument();
		expect(logoImage).toHaveAttribute('src', mockLogoPath);
	});

	it('applies the correct classes to the footer', () => {
		render(<Footer />);

		const footer = screen.getByRole('contentinfo');
		expect(footer).toHaveClass('bg-gray-footer flex justify-center items-center h-44 p-5');
	});

	it('applies the correct classes to the logo image', () => {
		render(<Footer />);

		const logoImage = screen.getByAltText('apply digital logo');
		expect(logoImage).toHaveClass('w-44');
	});
});
