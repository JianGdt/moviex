import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate("/signup?email=" + email);
	};

	return (
		<div className='relative hero-bg'>
			{/* Navbar */}
			<header className='flex items-center justify-between max-w-6xl p-4 pb-10 mx-auto'>
				<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 md:w-52' />
				<Link to={"/login"} className='px-2 py-1 text-white bg-red-600 rounded'>
					Sign In
				</Link>
			</header>

			{/* hero section */}
			<div className='flex flex-col items-center justify-center max-w-6xl py-40 mx-auto text-center text-white'>
				<h1 className='mb-4 text-4xl font-bold md:text-6xl'>Unlimited movies, TV shows, and more</h1>
				<p className='mb-4 text-lg'>Watch anywhere. Cancel anytime.</p>
				<p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>

				<form className='flex flex-col w-1/2 gap-4 md:flex-row' onSubmit={handleFormSubmit}>
					<input
						type='email'
						placeholder='Email address'
						className='flex-1 p-2 border border-gray-700 rounded bg-black/80'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className='flex items-center justify-center px-2 py-1 text-xl bg-red-600 rounded lg:text-2xl lg:px-6 md:py-2'>
						Get Started
						<ChevronRight className='size-8 md:size-10' />
					</button>
				</form>
			</div>

			{/* separator */}
			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 1st section */}
			<div className='py-10 text-white bg-black'>
				<div className='flex flex-col items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2'>
					{/* left side */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>Enjoy on your TV</h2>
						<p className='text-lg md:text-xl'>
							Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
						</p>
					</div>
					{/* right side */}
					<div className='relative flex-1'>
						<img src='/tv.png' alt='Tv image' className='relative z-20 mt-4' />
						<video
							className='absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/2'
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/hero-vid.m4v' type='video/mp4' />
						</video>
					</div>
				</div>
			</div>

			{/* separator */}
			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 2nd section */}
			<div className='py-10 text-white bg-black'>
				<div className='flex flex-col-reverse items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2'>
					{/* left side */}
					<div className='relative flex-1'>
						<div className='relative'>
							<img src='/stranger-things-lg.png' alt='Stranger Things img' className='mt-4' />

							<div
								className='absolute flex items-center w-3/4 h-24 gap-2 px-2 -translate-x-1/2 bg-black border rounded-md bottom-5 left-1/2 lg:w-1/2 border-slate-500 '
							>
								<img src='/stranger-things-sm.png' alt='image' className='h-full' />
								<div className='flex items-center justify-between w-full '>
									<div className='flex flex-col gap-0'>
										<span className='font-bold text-md lg:text-lg'>Stranger Things</span>
										<span className='text-sm text-blue-500'>Downloading...</span>
									</div>

									<img src='/download-icon.gif' alt='' className='h-12' />
								</div>
							</div>
						</div>
					</div>
					{/* right side */}

					<div className='flex-1 text-center md:text-left'>
						<h2 className='mb-4 text-4xl font-extrabold md:text-5xl text-balance'>
							Download your shows to watch offline
						</h2>
						<p className='text-lg md:text-xl'>
							Save your favorites easily and always have something to watch.
						</p>
					</div>
				</div>
			</div>

			{/* separator */}

			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 3rd section */}
			<div className='py-10 text-white bg-black'>
				<div className='flex flex-col items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2'>
					{/* left side */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>Watch everywhere</h2>
						<p className='text-lg md:text-xl'>
							Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
						</p>
					</div>

					{/* right side */}
					<div className='relative flex-1 overflow-hidden'>
						<img src='/device-pile.png' alt='Device image' className='relative z-20 mt-4' />
						<video
							className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
               max-w-[63%] 
              '
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/video-devices.m4v' type='video/mp4' />
						</video>
					</div>
				</div>
			</div>

			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 4th section*/}
			<div className='py-10 text-white bg-black'>
				<div
					className='flex flex-col-reverse items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2 '
				>
					{/* left */}
					<div className='relative flex-1'>
						<img src='/kids.png' alt='Enjoy on your TV' className='mt-4' />
					</div>
					{/* right */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>Create profiles for kids</h2>
						<p className='text-lg md:text-xl'>
							Send kids on adventures with their favorite characters in a space made just for them—free
							with your membership.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthScreen;