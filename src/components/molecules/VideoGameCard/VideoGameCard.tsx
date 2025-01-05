import { OutlineButton } from '@/components/atoms/OutlineButton/OutlineButton';
import { VideoGameImage } from '@/components/atoms/VideoGameImage/VideoGameImage';
import { useCart } from '@/context/CartContext';
import React from 'react';

export const VideoGameCard: React.FC<Game> = (game) => {
	const { cart, addItemToCart, removeItemFromCart } = useCart();
	const { id, genre, image, name, price, isNew } = game;
	const gameInCart = cart.find((item) => item.id === id);

	return (
		<div className="border border-solid rounded-lg p-5">
			<VideoGameImage image={image} alt={name} isNew={isNew} addTopRadius />
			<h2 className="text-xs font-bold mt-3 text-gray-500">{genre}</h2>
			<div className="flex justify-between items-center mt-2 mb-2 gap-3">
				<h1 className="text-xs text-black font-bold">{name}</h1>
				<h2 className="text-xs text-black font-bold">${price}</h2>
			</div>
			<OutlineButton
				onClick={() => {
					gameInCart ? removeItemFromCart(id) : addItemToCart(game);
				}}
				className={`${gameInCart ? 'bg-red-500 text-white' : ''}`}
			>
				{gameInCart ? 'Remove from cart' : 'Add to cart'}
			</OutlineButton>
		</div>
	);
};
