import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
	it('renders the Loader component', () => {
		render(<Loader />);

		const loader = screen.getByRole('status');
		expect(loader).toBeInTheDocument();
	});

	it('applies the correct class to the loader', () => {
		render(<Loader />);

		const loader = screen.getByRole('status');
		expect(loader).toHaveClass('loader');
	});
});
