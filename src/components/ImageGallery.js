import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useHotkeys } from "react-hotkeys-hook";

import "./ImageGallery.css";

// ok this seems harder than i thought.
const ImageGallery = ({ gallery }) => {
	// would gallery being passed down each time cause a re render and re allocation of [sources] ?
	// guess we will have to use useMemo.
	const [n, setN] = useState(0);
	// https://i.redd.it/<id goes here>.png | .jpg | get format too. CANT | so is it always jpg ????
	const sources = gallery.map(
		(img) => `https://i.redd.it/${img.media_id}.jpg`
	);

	// if (!Array.isArray(slides) || slides.length <= 0) {
	//   return null;
	// }

	// const change = (acc) => setN((n) => n + acc);

	const next = () => setN(n === sources.length - 1 ? n : n + 1);
	const prev = () => setN(n === 0 ? 0 : n - 1);

	useHotkeys("shift + n", next);
	useHotkeys("shift + p", prev);
	// should we have multiple img tags or same img tag;
	// add blur ability too.
	return (
		<div className="gallery">
			{/*sources.map( url => <img src={url} alt=""/>)*/}
			{n === 0 ? null : (
				<FaArrowAltCircleLeft
					className="left-arrow"
					fontSize="2em"
					onClick={prev}
				/>
			)}
			<img
				height="400px"
				width="auto"
				style={{ objectFit: "contain" }}
				src={sources[n]}
				alt={`no ${n + 1}`}
				// srcset="" todo: use scrset everywhere for optimised performace.
			/>
			{n === sources.length - 1 ? null : (
				<FaArrowAltCircleRight
					fontSize="2em"
					className="right-arrow"
					onClick={next}
				/>
			)}
		</div>
	);
};

export default ImageGallery;

// todo: show imageCounter/length
// like reddit ::before pseudo-element
// but the conditional next/prev icon rendering changes the img position too often.
