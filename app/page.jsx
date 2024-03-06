"use client";

import { useState, useEffect } from "react";
import MovieCard from "./movieCard";

export default function Home() {
  const [hypeMovies, setHypeMovies] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getHypeMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setHypeMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const moviesUrl = `${apiUrl}now_playing?${apiKey}`;
    getHypeMovies(moviesUrl);
  }, []);

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-20 p-6 text-center">
        {hypeMovies === 0 && <p>Loading...</p>}
        {hypeMovies.length > 0 &&
          hypeMovies.map((element) => (
            <MovieCard key={element.id} element={element} />
          ))}
      </div>
    </div>
  );
}
