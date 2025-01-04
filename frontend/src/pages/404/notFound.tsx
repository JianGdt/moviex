import { Link } from "react-router-dom";

export default function NotFoundPage(){
	return (
		<div
			className='flex flex-col items-center justify-center min-h-screen bg-black bg-center bg-cover'
		>
			<header className='absolute top-0 left-0 w-full p-4 bg-black '>
				<Link to={"/"}>
					<img src='/netflix-logo.svg' alt='Netflix' className='h-8' />
				</Link>
			</header>
			<main className='z-10 text-center'>
				<h1 className='mb-4 font-semibold text-white text-7xl'>Not Found...</h1>
				<Link to={"/"} className='px-4 py-2 text-white rounded bg-slate-800'>
					 Go Back
				</Link>
			</main>
		</div>
	);
};