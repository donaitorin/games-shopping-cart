'use client';

import React from 'react';

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: string[];
}
export const TextSelect: React.FC<Props> = ({ value, onChange, options }) => {
	return (
		<select value={value} onChange={onChange}>
			<option value="">All</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};
