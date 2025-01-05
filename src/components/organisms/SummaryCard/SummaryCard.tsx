import React from 'react';

interface Props {
	cart: Game[];
}

export const SummaryCard: React.FC<Props> = ({ cart }) => {
	return (
		<div className="border border-solid rounded-md h-fit pt-8 px-6 pb-12">
			<h2 className="text-gray-title font-bold text-lg">Order Summary</h2>
			<h5 className="mt-1">{cart.length} Items</h5>
			<div className="mt-8 grid gap-2">
				{cart.map((game) => (
					<div key={game.id} className="flex justify-between">
						<h6 className="text-gray-title">{game.name}</h6>
						<h6 className="text-gray-title">${game.price}</h6>
					</div>
				))}
			</div>
			<hr className="my-6" />
			<div className="flex justify-between">
				<h2 className="text-gray-title font-bold text-lg">Order Total</h2>
				<h2 className="text-gray-title font-bold text-lg">
					${cart.reduce((acc, game) => acc + game.price, 0)}
				</h2>
			</div>
		</div>
	);
};
