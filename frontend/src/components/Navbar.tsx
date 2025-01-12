import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUsers";
import { useContentStore } from "../store/movieDetails";

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
	const { setContentType } = useContentStore();

	return (
		<header className='flex flex-wrap items-center justify-between h-20 max-w-6xl p-4 mx-auto'>
			<div className='z-50 flex items-center gap-10'>
				<Link to='/'>
					<img src='/netflix-logo.svg' alt='Netflix Logo' className='w-32 sm:w-40' />
				</Link>
				<div className='items-center hidden gap-2 sm:flex'>
					<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
						Tv Shows
					</Link>
					<Link to='/history' className='hover:underline'>
						Search History
					</Link>
				</div>
			</div>

			<div className='z-50 flex items-center gap-4'>
				<Link to={"/search"}>
					<Search className='cursor-pointer size-6' />
				</Link>
				<img src={user?.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='cursor-pointer size-6' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='cursor-pointer size-6' onClick={toggleMobileMenu} />
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className='z-50 w-full mt-4 bg-black border border-gray-800 rounded sm:hidden'>
					<Link to={"/"} className='block p-2 hover:underline' onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='block p-2 hover:underline' onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to={"/history"} className='block p-2 hover:underline' onClick={toggleMobileMenu}>
						Search History
					</Link>
				</div>
			)}
		</header>
	);
};