import React, { HTMLAttributes, MouseEventHandler } from 'react';
interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: HTMLAttributes<HTMLButtonElement>['className'];
}

export const ContainedButton: React.FC<Props> = ({ children, onClick, disabled, className }) => {
	return (
		<button
			disabled={disabled}
			className={`text-white bg-gray-footer border border-solid p-3 text-sm uppercase font-bold
            border-black rounded-lg w-full hover:cursor-pointer active:bg-gray-800 disabled:opacity-50 ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
