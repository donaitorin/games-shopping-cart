'use client';

import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { Filters } from '@/components/molecules/Filters/Filters';
import { GamesList } from '@/components/organisms/GamesList/GamesList';
import { useFetchGames } from '@/hooks/useFetchGames';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const CatalogPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [params, setParams] = useState({
		genre: searchParams.get('genre') || '',
		page: searchParams.get('page') || '1',
	});
	const { data, loading, error, handleFetchGames, setData } = useFetchGames();

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newFilter = e.target.value;
		setParams({
			genre: newFilter,
			page: '0',
		});
		setData({
			games: [],
			totalPages: 0,
			currentPage: 0,
		});
		const params = new URLSearchParams(searchParams.toString());
		if (newFilter) {
			params.set('genre', newFilter);
			params.delete('page');
		} else {
			params.delete('genre');
			params.delete('page');
		}

		router.push(`?${params.toString()}`);
	};

	const handleSeeMore = () => {
		setParams({
			...params,
			page: (parseInt(params.page) + 1).toString(),
		});
	};

	useEffect(() => {
		handleFetchGames(params);
	}, [params]);

	return (
		<>
			<section className="layout-container">
				<div className="mt-10">
					<PageTitle title="Top Sellers" />
				</div>
				<div className="mt-10 mb-8 flex justify-end">
					<Filters
						genreValue={params.genre}
						handleGenreFilterChange={handleFilterChange}
					/>
				</div>
			</section>
			<hr />
			<section className="mt-10">
				<GamesList
					data={data}
					error={error}
					loading={loading}
					handleSeeMore={handleSeeMore}
				/>
			</section>
		</>
	);
};
