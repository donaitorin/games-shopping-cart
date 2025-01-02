import React from 'react';

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
}

export const OutlineButton: React.FC<Props> = ({ children, onClick }) => {
	return (
		<button
			className="text-black border border-solid p-3 text-sm uppercase font-bold
         border-black rounded-lg w-full hover:cursor-pointer active:bg-gray-100"
			onClick={onClick}
		>
			{children}
		</button>
	);
};
