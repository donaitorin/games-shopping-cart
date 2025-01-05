import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';
import { IMAGES_ASSETS_PATHS } from '@/utils/images';

jest.mock('next/link', () => {
	return ({ children, href }: { children: React.ReactNode; href: string }) => (
		<a href={href}>{children}</a>
	);
});

describe('Breadcrumb Component', () => {
	const mockText = 'Home';
	const mockHref = '/';
	const mockImageSrc = '/mock-arrow-back.png';

	beforeAll(() => {
		IMAGES_ASSETS_PATHS.ArrowBack = mockImageSrc;
	});

	it('renders the Breadcrumb with correct text', () => {
		render(<Breadcrumb text={mockText} href={mockHref} />);

		const textElement = screen.getByText(mockText);
		expect(textElement).toBeInTheDocument();
	});

	it('renders the Breadcrumb with correct href', () => {
		render(<Breadcrumb text={mockText} href={mockHref} />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveAttribute('href', mockHref);
	});

	it('renders the Breadcrumb with the correct image', () => {
		render(<Breadcrumb text={mockText} href={mockHref} />);

		const imgElement = screen.getByAltText('arrow pointing to the left');
		expect(imgElement).toBeInTheDocument();
		expect(imgElement).toHaveAttribute('src', mockImageSrc);
	});

	it('renders all elements with correct structure', () => {
		render(<Breadcrumb text={mockText} href={mockHref} />);

		const container = screen.getByRole('link');
		expect(container).toBeInTheDocument();

		const image = screen.getByAltText('arrow pointing to the left');
		expect(image).toBeInTheDocument();

		const textElement = screen.getByText(mockText);
		expect(textElement).toBeInTheDocument();
	});
});
