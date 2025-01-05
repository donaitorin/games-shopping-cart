import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/molecules/Header/Header';
import { CartProvider } from '@/context/CartContext';
import { Footer } from '@/components/atoms/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Apply Digital Test',
	description: 'Frontend development test for Apply Digital',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<CartProvider>
					<Header title="GamerShop" />
					<main className="min-content-height">{children}</main>
					<Footer />
				</CartProvider>
			</body>
		</html>
	);
}
