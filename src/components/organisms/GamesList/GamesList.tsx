'use client';

import { ContainedButton } from '@/components/atoms/ContainedButton/ContainedButton';
import { Loader } from '@/components/atoms/Loader/Loader';
import { VideoGameCard } from '@/components/molecules/VideoGameCard/VideoGameCard';
import React from 'react';

interface Props {
	handleSeeMore: () => void;
	loading?: boolean;
	error?: any;
	data: GamesResponse;
}

export const GamesList: React.FC<Props> = ({ handleSeeMore, loading, error, data }) => {
	const renderContent = () => {
		if (loading && !data?.games.length) {
			return (
				<div className="flex justify-center">
					<Loader />
				</div>
			);
		}

		if (error) {
			return <div>Error: {error}</div>;
		}

		return (
			<>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{data?.games.map((game) => (
						<VideoGameCard key={game.id} {...game} />
					))}
				</div>
				{data?.currentPage < data?.totalPages && (
					<div className="w-fit mt-8">
						<ContainedButton disabled={loading} onClick={handleSeeMore}>
							{loading ? 'Loading' : 'See more'}
						</ContainedButton>
					</div>
				)}
			</>
		);
	};

	return <div className="layout-container mb-8">{renderContent()}</div>;
};
