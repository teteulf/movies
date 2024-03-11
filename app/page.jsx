"use client";

import { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import ParticlesComponent from "./particlesBackground";
import { FiTriangle } from "react-icons/fi";

export default function Home() {
  const [hypeMovies, setHypeMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
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

  const PageMovie = async (page) => {
    try {
      const fetchPage = `${apiUrl}now_playing?page=${page}&${apiKey}`;
      const response = await fetch(fetchPage);
      const data = await response.json();
      setHypeMovies(data.results);
    } catch (error) {
      onsole.error("Error fetching data:", error);
    }
  };

  function changePagePlusOne() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function changePageLessOne() {
    if (CurrentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
    }
  }

  useEffect(() => {
    const moviesUrl = `${apiUrl}now_playing?${apiKey}`;
    getHypeMovies(moviesUrl);
    console.log(getHypeMovies(moviesUrl));
  }, []);

  useEffect(() => {
    PageMovie(CurrentPage);
  }, [CurrentPage]);

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="w-full md:w-screen flex justify-center items-center">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-20 p-6 text-center">
          {hypeMovies && hypeMovies.length === 0 && (
            <p className="text-white">Loading...</p>
          )}
          {hypeMovies &&
            hypeMovies.length > 0 &&
            hypeMovies.map((element) => (
              <MovieCard key={element.id} element={element} className="z-1" />
            ))}
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-10 pb-16 mt-10">
        <FiTriangle
          onClick={changePageLessOne}
          color="#0cb7f2"
          size={"32px"}
          className="-rotate-90 cursor-pointer hover:text-[#020203]"
        >
          troca pagina
        </FiTriangle>
        <p className="text-[#0cb7f2] text-[30px] ">{CurrentPage}</p>
        <FiTriangle
          onClick={changePagePlusOne}
          color="#0cb7f2"
          size={"32px"}
          className="rotate-90 cursor-pointer"
        >
          {" "}
          troca pagina
        </FiTriangle>
      </div>
    </>
  );
}
