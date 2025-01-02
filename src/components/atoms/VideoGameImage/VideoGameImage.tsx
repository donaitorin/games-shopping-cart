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
			<img src={image} alt={alt} className={`${addTopRadius ? 'rounded-t-lg' : ''}`} />
			{isNew && (
				<div
					className={`absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-md text-sm`}
				>
					New
				</div>
			)}
		</div>
	);
};
