import { CheckoutItem } from '@/components/molecules/CheckoutItem/CheckoutItem';
import React from 'react';

interface Props {
	items: Game[];
}

export const CartList: React.FC<Props> = ({ items }) => {
	return (
		<div className="grid grid-cols-1 divide-y-2">
			{items.map((game) => (
				<CheckoutItem key={game.id} game={game} />
			))}
		</div>
	);
};
