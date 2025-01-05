import { render, screen, fireEvent } from '@testing-library/react';
import { OutlineButton } from './OutlineButton';

describe('OutlineButton Component', () => {
	const mockOnClick = jest.fn();
	const mockChildren = 'Click Me';

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the button with the correct text', () => {
		render(<OutlineButton>{mockChildren}</OutlineButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toBeInTheDocument();
	});

	it('calls the onClick handler when clicked', () => {
		render(<OutlineButton onClick={mockOnClick}>{mockChildren}</OutlineButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('applies the custom className correctly', () => {
		const customClass = 'custom-class';
		render(<OutlineButton className={customClass}>{mockChildren}</OutlineButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toHaveClass(customClass);
	});

	it('applies the correct default classes to the button', () => {
		render(<OutlineButton>{mockChildren}</OutlineButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toHaveClass(
			'text-black border border-solid p-3 text-sm uppercase font-bold border-black rounded-lg w-full hover:cursor-pointer active:bg-gray-100'
		);
	});
});
