'use client';

import { TextSelect } from '@/components/atoms/TextSelect/TextSelect';
import { availableFilters } from '@/utils/endpoint';
import React from 'react';

interface Props {
	handleGenreFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	genreValue: string;
}

export const Filters: React.FC<Props> = ({ handleGenreFilterChange, genreValue }) => {
	return (
		<div className="flex gap-4">
			<div>
				<h4 className="text-gray-title font-bold">Genre</h4>
			</div>
			<div className="border border-solid border-gray-500" />
			<div>
				<TextSelect
					value={genreValue}
					options={availableFilters}
					onChange={handleGenreFilterChange}
				/>
			</div>
		</div>
	);
};
