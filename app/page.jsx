"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import ParticlesComponent from "./particlesBackground";
import PageNavigation from "./navigation";
import useFetchMovies from "./hooks/hooks";

export default function Home() {
  const [hypeMovies, setHypeMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getHypeMovies = async (url) => {
    try {
      useFetchMovies(url);
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

  const changePagePlusOne = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const changePageLessOne = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const moviesUrl = PageMovie(currentPage);
    getHypeMovies(moviesUrl);
    console.log(getHypeMovies(moviesUrl));
  }, [currentPage]);

  return (
    <>
      <ParticlesComponent />

      <dialog className="w-full">
        <div className="bg-white">teste</div>
      </dialog>
      <h1 className="text-white flex items-center justify-center my-10 text-[30px]">
        SHOWING "
        <strong className="text-[rgb(217,210,70)]">
          CURRENTLY MOVIES ON STREAM
        </strong>
        "
      </h1>
      <div className=" flex justify-center items-center pt-6">
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
      <PageNavigation
        currentPage={currentPage}
        changePagePlusOne={changePagePlusOne}
        changePageLessOne={changePageLessOne}
      />
    </>
  );
}
