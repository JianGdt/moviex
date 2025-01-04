import { useEffect, useState } from "react";
import { useContentStore } from "../store/movieDetails";
import axios from "axios";

const useGetTrendingMovie = () => {
	const [trendingContent, setTrendingContent] =  useState<ComponentProps.TrendingContent | null>(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/trending`);
            console.log("res", res)
			setTrendingContent(res.data.content);
		};
		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};

export default useGetTrendingMovie;