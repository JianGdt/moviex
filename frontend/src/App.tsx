import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomeContainer";
import LoginPage from "./pages/User/LoginPage";
import SignUpPage from "./pages/User/SignUp";
import WatchPage from "./pages/Watch";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUsers";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchFilter";
import SearchHistoryPage from "./pages/SearchHistory";

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex items-center justify-center h-full bg-black'>
					<Loader className='text-red-600 animate-spin size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	);
}

export default App;