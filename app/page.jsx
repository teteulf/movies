"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
      console.log(data);
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
    const moviesUrl = PageMovie(CurrentPage);
    getHypeMovies(moviesUrl);
    console.log(getHypeMovies(moviesUrl));
  }, [CurrentPage]);

  return (
    <>
      <ParticlesComponent />
      <h1 className="text-white flex items-center justify-center my-10 text-[30px]">
        SHOWING "
        <h2 className="text-[#d9d246] font-bold">RECENTLY MOVIES ON STREAM</h2>"
      </h1>
      <div className="flex justify-center items-center pt-6">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-20 text-center ">
          {hypeMovies && hypeMovies.length === 0 && (
            <div className="w-screen h-screen flex justify-center items-center -mt-[45px]">
              <AiOutlineLoading3Quarters
                size={150}
                color="white"
                className="animate-[spin_2s_linear_infinite]"
              />
            </div>
          )}
          {hypeMovies &&
            hypeMovies.length > 0 &&
            hypeMovies.map((element) => (
              <div className="">
                <MovieCard key={element.id} element={element} />
              </div>
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
