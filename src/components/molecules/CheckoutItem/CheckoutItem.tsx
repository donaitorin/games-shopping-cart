import { useCart } from '@/context/CartContext';
import { IMAGES_ASSETS_PATHS } from '@/utils/images';
import React from 'react';

interface Props {
	game: Game;
}

export const CheckoutItem: React.FC<Props> = ({ game }) => {
	const { removeItemFromCart } = useCart();
	return (
		<div className="p-4">
			<div className="flex gap-4">
				<div className="flex flex-col lg:flex-row gap-6 flex-1">
					<div>
						<img
							src={game.image}
							alt={game.name}
							className="w-full h-40 sm:w-64 object-cover block mx-auto lg:mx-0"
						/>
					</div>
					<div className="flex flex-1 h-auto flex-col justify-between">
						<div>
							<div className="flex justify-between w-full h-fit items-center">
								<div className="w-fit">
									<h4 className="uppercase text-sm text-gray-title font-bold">
										{game.genre}
									</h4>
								</div>
							</div>
							<div>
								<div className="w-fit">
									<h2 className="mt-2 text-base font-bold">{game.name}</h2>
								</div>
							</div>
							<p className="text-gray-600 text-sm mt-2">{game.description}</p>
						</div>

						<div className="flex justify-end">
							<h3 className="text-black font-bold pt-6">${game.price}</h3>
						</div>
					</div>
				</div>
				<div className="">
					<button
						onClick={() => {
							removeItemFromCart(game.id);
						}}
					>
						<img src={IMAGES_ASSETS_PATHS.RemoveIcon} alt="an x to remove from cart" />
					</button>
				</div>
			</div>
		</div>
	);
};
