import { FormEvent, useState } from "react";
import { useContentStore } from "../store/movieDetails";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

export default function SearchFilter(){
    const [activeTab, setActiveTab] = useState<"movie" | "tv" | "person">("movie");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<ComponentProps.Result[]>([]);
    const { setContentType } = useContentStore();

    const handleTabClick = (tab: "movie" | "tv" | "person"): void => {
        setActiveTab(tab);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        tab === "movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
      };
    

      const handleSearch = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
          const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
          setResults(res.data.content);
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            toast.error("Pag wala, wala, wag ipilit");
          } else {
            toast.error("wait lang ssob");
          }
        }
      };
    

	return (
		<div className='min-h-screen text-white bg-black'>
			<Navbar />
			<div className='container px-4 py-8 mx-auto'>
				<div className='flex justify-center gap-3 mb-4'>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("movie")}
					>
						Movies
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("tv")}
					>
						TV Shows
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "person" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("person")}
					>
						Person
					</button>
				</div>

				<form className='flex items-stretch max-w-2xl gap-2 mx-auto mb-8' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 text-white bg-gray-800 rounded'
					/>
					<button className='p-2 text-white bg-red-600 rounded hover:bg-red-700'>
						<Search className='size-6' />
					</button>
				</form>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{results.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;

						return (
							<div key={result.id} className='p-4 bg-gray-800 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='mx-auto rounded max-h-96'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};