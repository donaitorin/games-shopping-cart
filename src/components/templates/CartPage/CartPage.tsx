'use client';

import { Breadcrumb } from '@/components/atoms/Breadcrumb/Breadcrumb';
import { ContainedButton } from '@/components/atoms/ContainedButton/ContainedButton';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { CheckoutItem } from '@/components/molecules/CheckoutItem/CheckoutItem';
import { CartList } from '@/components/organisms/CartList/CartList';
import { SummaryCard } from '@/components/organisms/SummaryCard/SummaryCard';
import { useCart } from '@/context/CartContext';
import React from 'react';

export const CartPage = () => {
	const { cart } = useCart();
	return (
		<div className="layout-container">
			<div className="mt-8">
				<Breadcrumb text="Back to Catalog" href="/" />
			</div>
			<div className="mt-10">
				<PageTitle title="Your Cart" />
			</div>
			<div>
				<h5 className="mt-2">{cart.length} Items</h5>
			</div>
			<div className="grid lg:grid-cols-2 mt-8 mb-10 gap-8">
				<CartList items={cart} />
				<div>
					<SummaryCard cart={cart} />
					<div className="mt-6">
						<ContainedButton className="capitalize">Checkout</ContainedButton>
					</div>
				</div>
			</div>
		</div>
	);
};
