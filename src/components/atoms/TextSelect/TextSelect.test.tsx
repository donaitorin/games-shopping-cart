import { render, screen, fireEvent } from '@testing-library/react';
import { TextSelect } from './TextSelect';

describe('TextSelect Component', () => {
	const mockOnChange = jest.fn();
	const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
	const mockValue = 'Option 1';

	it('renders the select element with the correct options', () => {
		render(<TextSelect value={mockValue} onChange={mockOnChange} options={mockOptions} />);

		const selectElement = screen.getByRole('combobox');
		expect(selectElement).toBeInTheDocument();

		const optionElements = screen.getAllByRole('option');
		expect(optionElements).toHaveLength(mockOptions.length + 1);
		expect(optionElements[0]).toHaveTextContent('All');
		expect(optionElements[1]).toHaveTextContent(mockOptions[0]);
		expect(optionElements[2]).toHaveTextContent(mockOptions[1]);
		expect(optionElements[3]).toHaveTextContent(mockOptions[2]);
	});

	it('calls the onChange handler when the value is changed', () => {
		render(<TextSelect value={mockValue} onChange={mockOnChange} options={mockOptions} />);

		const selectElement = screen.getByRole('combobox');
		fireEvent.change(selectElement, { target: { value: 'Option 2' } });

		expect(mockOnChange).toHaveBeenCalledTimes(1);
	});

	it('displays the selected value correctly', () => {
		render(<TextSelect value={mockValue} onChange={mockOnChange} options={mockOptions} />);

		const selectElement = screen.getByRole('combobox');
		expect(selectElement).toHaveValue(mockValue);
	});
});
