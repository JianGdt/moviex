import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/movieDetails";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constant";
import { formatReleaseDate } from "../utils/dateFormatted";
// import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});
	const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();

	const sliderRef = useRef(null);

	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				setTrailers(res.data.trailers);
			} catch (error) {
				if (error.message.includes("404")) {
					setTrailers([]);
				}
			}
		};

		getTrailers();
	}, [contentType, id]);

	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
				setSimilarContent(res.data.similar);
			} catch (error) {
				if (error.message.includes("404")) {
					setSimilarContent([]);
				}
			}
		};

		getSimilarContent();
	}, [contentType, id]);

	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
				setContent(res.data.content);
			} catch (error) {
				if (error.message.includes("404")) {
					setContent(null);
				}
			} finally {
				setLoading(false);
			}
		};

		getContentDetails();
	}, [contentType, id]);

	const handleNext = () => {
		if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
	};
	const handlePrev = () => {
		if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
	};

	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	if (loading)
		return (
			<div className='min-h-screen p-10 bg-black'>
				<WatchPageSkeleton />
			</div>
		);

	if (!content) {
		return (
			<div className='h-screen text-white bg-black'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='h-full px-4 py-8 mx-auto mt-40 text-center'>
						<h2 className='text-2xl font-bold sm:text-5xl text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen text-white bg-black'>
			<div className='container h-full px-4 py-8 mx-auto'>
				<Navbar />

				{trailers.length > 0 && (
					<div className='flex items-center justify-between mb-4'>
						<button
							className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
								currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
							}}
							`}
							disabled={currentTrailerIdx === 0}
							onClick={handlePrev}
						>
							<ChevronLeft size={24} />
						</button>

						<button
							className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
								currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed " : ""
							}}
							`}
							disabled={currentTrailerIdx === trailers.length - 1}
							onClick={handleNext}
						>
							<ChevronRight size={24} />
						</button>
					</div>
				)}

				<div className='p-2 mb-8 aspect-video sm:px-10 md:px-32'>
					{trailers.length > 0 && (
						<ReactPlayer
							controls={true}
							width={"100%"}
							height={"70vh"}
							className='mx-auto overflow-hidden rounded-lg'
							url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
						/>
					)}

					{trailers?.length === 0 && (
						<h2 className='mt-5 text-xl text-center'>
							No trailers available for{" "}
							<span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
						</h2>
					)}
				</div>

				{/* movie details */}
				<div
					className='flex flex-col items-center justify-between max-w-6xl gap-20 mx-auto md:flex-row'
				>
					<div className='mb-4 md:mb-0'>
						<h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>

						<p className='mt-2 text-lg'>
							{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
							{content?.adult ? (
								<span className='text-red-600'>18+</span>
							) : (
								<span className='text-green-600'>PG-13</span>
							)}{" "}
						</p>
						<p className='mt-4 text-lg'>{content?.overview}</p>
					</div>
					<img
						src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
						alt='Poster image'
						className='max-h-[600px] rounded-md'
					/>
				</div>

				{similarContent.length > 0 && (
					<div className='relative max-w-5xl mx-auto mt-12'>
						<h3 className='mb-4 text-3xl font-bold'>Similar Movies/Tv Show</h3>

						<div className='flex gap-4 pb-4 overflow-x-scroll scrollbar-hide group' ref={sliderRef}>
							{similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/watch/${content.id}`} className='flex-none w-52'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}

							<ChevronRight
								className='absolute w-8 h-8 text-white transition-all duration-300 -translate-y-1/2 bg-red-600 rounded-full opacity-0 cursor-pointer top-1/2 right-2 group-hover:opacity-100'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute w-8 h-8 text-white transition-all duration-300 -translate-y-1/2 bg-red-600 rounded-full opacity-0 cursor-pointer top-1/2 left-2 group-hover:opacity-100'
								onClick={scrollLeft}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default WatchPage;