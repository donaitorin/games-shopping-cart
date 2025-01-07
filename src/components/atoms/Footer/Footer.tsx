import { IMAGES_ASSETS_PATHS } from '@/utils/images';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
	return (
		<footer className="bg-gray-footer flex justify-center items-center h-44 p-5">
			<Link href={'/'}>
				<img src={IMAGES_ASSETS_PATHS.Logo} alt="apply digital logo" className="w-44" />
			</Link>
		</footer>
	);
};
