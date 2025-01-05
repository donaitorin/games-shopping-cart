import { IMAGES_ASSETS_PATHS } from '@/utils/images';
import Link from 'next/link';
import React from 'react';

interface Props {
	text: string;
	href: string;
}

export const Breadcrumb: React.FC<Props> = ({ text, href }) => {
	return (
		<Link href={href}>
			<div className="flex items-center gap-3">
				<div>
					<img src={IMAGES_ASSETS_PATHS.ArrowBack} alt="arrow pointing to the left" />
				</div>
				<h6 className="text-sm">{text}</h6>
			</div>
		</Link>
	);
};
