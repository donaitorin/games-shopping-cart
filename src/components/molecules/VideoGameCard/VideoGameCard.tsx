import { OutlineButton } from '@/components/atoms/OutlineButton/OutlineButton';
import { VideoGameImage } from '@/components/atoms/VideoGameImage/VideoGameImage';
import React from 'react';

interface Props {
	id: string;
	genre: string;
	image: string;
	name: string;
	description: string;
	price: number;
	isNew: boolean;
}

export const VideoGameCard: React.FC<Props> = ({
	id,
	genre,
	image,
	name,
	description,
	price,
	isNew,
}) => {
	return (
		<div className="border border-solid rounded-lg p-5">
			<VideoGameImage image={image} alt={name} isNew={isNew} addTopRadius />
			<h2 className="text-xs font-bold mt-3 text-gray-500">{genre}</h2>
			<div className="flex justify-between items-center mt-2 mb-2">
				<h1 className="text-xs text-black font-bold">{name}</h1>
				<h2 className="text-xs text-black font-bold">${price}</h2>
			</div>
			<OutlineButton>Add To Cart</OutlineButton>
		</div>
	);
};
