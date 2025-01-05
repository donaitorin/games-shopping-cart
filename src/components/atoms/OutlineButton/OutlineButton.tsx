import React, { HtmlHTMLAttributes } from 'react';

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	className?: HtmlHTMLAttributes<HTMLButtonElement>['className'];
}

export const OutlineButton: React.FC<Props> = ({ children, onClick, className }) => {
	return (
		<button
			className={`text-black border border-solid p-3 text-sm uppercase font-bold
         border-black rounded-lg w-full hover:cursor-pointer active:bg-gray-100 ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
