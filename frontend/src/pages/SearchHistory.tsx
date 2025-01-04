import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../constant/constant";
import { Trash } from "lucide-react";
import { toast } from 'react-toastify';
import { formatDate } from "../helpers/dateFormatted";

export default function SearchHistoryPage() {
  const [searchHistory, setSearchHistory] = useState<ComponentProps.SearchHistoryEntry[]>([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const { data } = await axios.get<{ content: ComponentProps.SearchHistoryEntry[] }>("/api/v1/search/history");
        setSearchHistory(data.content);
      } catch {
        setSearchHistory([]);
      }
    };
    fetchSearchHistory();
  }, []);

  const handleDelete = async (entry: ComponentProps.SearchHistoryEntry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory((prevHistory) => prevHistory.filter(({ id }) => id !== entry.id));
    } catch {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory.length === 0) {
    return (
      <div className="min-h-screen text-white bg-black">
        <Navbar />
        <div className="max-w-6xl px-4 py-8 mx-auto">
          <h1 className="mb-8 text-3xl font-bold">Search History</h1>
          <div className="flex items-center justify-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Search History</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {searchHistory.map((entry) => (
            <div key={entry.id} className="flex items-start p-4 bg-gray-800 rounded">
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="object-cover mr-4 rounded-full size-16"
              />
              <div className="flex flex-col">
                <span className="text-lg text-white">{entry.title}</span>
                <span className="text-sm text-gray-400">{formatDate(entry.createdAt)}</span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className="ml-4 cursor-pointer size-5 hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

