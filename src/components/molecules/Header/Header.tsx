import { IMAGES_ASSETS_PATHS } from '@/utils/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
	return (
		<header className="bg-gray-header">
			<div className="layout-container">
				<div className="flex justify-between py-3">
					<div>
						<Link className="text-gray-title text-base font-semibold" href="/">
							{title}
						</Link>
					</div>
					<div>
						<Link href="/cart">
							<Image
								src={IMAGES_ASSETS_PATHS.CartIcon}
								alt="Logo"
								width={20}
								height={20}
							/>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
