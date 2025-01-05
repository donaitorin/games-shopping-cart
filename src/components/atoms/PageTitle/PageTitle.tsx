import React from 'react';

interface Props {
	title: string;
}

export const PageTitle: React.FC<Props> = ({ title }) => {
	return <h1 className="text-gray-page-title font-bold text-xl">{title}</h1>;
};
