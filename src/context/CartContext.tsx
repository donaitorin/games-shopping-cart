'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<{
	cart: Game[];
	addItemToCart: (item: Game) => void;
	removeItemFromCart: (itemId: string) => void;
	clearCart: () => void;
}>({
	cart: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearCart: () => {},
});

interface Props {
	children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
	const [cart, setCart] = useState<Game[]>([]);
	const [initialLoad, setInitialLoad] = useState(false);

	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			setCart(JSON.parse(storedCart));
		}
		setInitialLoad(true);
	}, []);

	useEffect(() => {
		if (initialLoad) {
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}, [cart, initialLoad]);

	const addItemToCart = (item: Game) => {
		setCart([...cart, item]);
	};

	const removeItemFromCart = (itemId: string) => {
		setCart((prev) => prev.filter((item) => item.id !== itemId));
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
