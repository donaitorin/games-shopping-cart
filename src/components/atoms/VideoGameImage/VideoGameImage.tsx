import React from 'react';

interface Props {
	image: string;
	alt: string;
	isNew?: boolean;
	addTopRadius?: boolean;
}

export const VideoGameImage: React.FC<Props> = ({ image, alt, isNew, addTopRadius }) => {
	return (
		<div className="relative">
			<img
				src={image}
				alt={alt}
				className={`${addTopRadius ? 'rounded-t-lg' : ''} h-60 w-full object-cover`}
			/>
			{isNew && (
				<div
					className={`absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-md text-sm border border-solid`}
				>
					New
				</div>
			)}
		</div>
	);
};
