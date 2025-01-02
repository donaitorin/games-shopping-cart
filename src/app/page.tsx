import { VideoGameCard } from '@/components/molecules/VideoGameCard/VideoGameCard';

export default async function Home() {
	return (
		<main className="">
			<div className="w-[300px]">
				<VideoGameCard
					image="https://sm.ign.com/t/ign_es/screenshot/default/final-fantasy-vii-rebirth_zz13.1200.jpg"
					name="Final Fantasy VII Rebirth"
					genre="RPG"
					description="A remake of the classic Final Fantasy VII game."
					price={59.99}
					isNew
					id="14"
				/>
			</div>
			<div className="bg-red-500 layout-container">aaa</div>
		</main>
	);
}
