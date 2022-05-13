export default function Footer(): JSX.Element {
	return (
		<footer id="footer">
			<div className="bg-header">
				<div className="mx-auto flex max-w-full md:max-w-[80%] w-[1280px] px-12 z-[4]">
					<div className="py-8">
						<h1 className="text-3xl border-b-2 border-b-primary pb-2 text-white">{ APP_MANIFEST.name }</h1>
						<p className="text-white text-xl pt-3">{ APP_MANIFEST.description }</p>
					</div>
				</div>
				<div className="w-full text-gray-300 font-medium bg-black/10 h-12 flex justify-center items-center font-manrope">
					<div className="mx-auto flex max-w-full md:max-w-[80%] w-[1280px] px-12 z-[4]">
						Copyright © 2022<a href="//joshmerlino.github.io"><span className="text-primary px-[6px]">Josh Merlino</span></a> - All Rights Reserved
					</div>
				</div>
			</div>
		</footer>
	);
}
