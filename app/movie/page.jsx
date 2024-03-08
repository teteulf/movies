"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AboutMovie() {
  const { id } = useParams();

  const [Movie, setMovie] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const movieUrl = `${apiUrl}${id}?${apiKey}`;
    getMovies(movieUrl);
  }, []);
  return <div className="text-white">{Movie && Movie.title}</div>;
}
