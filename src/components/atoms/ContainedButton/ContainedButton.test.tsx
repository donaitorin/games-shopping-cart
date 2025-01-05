import { render, screen, fireEvent } from '@testing-library/react';
import { ContainedButton } from './ContainedButton';

describe('ContainedButton Component', () => {
	const mockOnClick = jest.fn();
	const mockChildren = 'Click Me';

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the button with the correct text', () => {
		render(<ContainedButton>{mockChildren}</ContainedButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toBeInTheDocument();
	});

	it('calls the onClick handler when clicked', () => {
		render(<ContainedButton onClick={mockOnClick}>{mockChildren}</ContainedButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('does not call the onClick handler when disabled', () => {
		render(
			<ContainedButton onClick={mockOnClick} disabled>
				{mockChildren}
			</ContainedButton>
		);

		const button = screen.getByRole('button', { name: mockChildren });
		fireEvent.click(button);

		expect(mockOnClick).not.toHaveBeenCalled();
	});

	it('applies the disabled attribute correctly', () => {
		render(<ContainedButton disabled>{mockChildren}</ContainedButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toBeDisabled();
	});

	it('applies the custom className correctly', () => {
		const customClass = 'custom-class';
		render(<ContainedButton className={customClass}>{mockChildren}</ContainedButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toHaveClass(customClass);
	});

	it('has default classes applied', () => {
		render(<ContainedButton>{mockChildren}</ContainedButton>);

		const button = screen.getByRole('button', { name: mockChildren });
		expect(button).toHaveClass(
			'text-white bg-gray-footer border border-solid p-3 text-sm uppercase font-bold border-black rounded-lg w-full hover:cursor-pointer active:bg-gray-800 disabled:opacity-50'
		);
	});
});
