"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import ParticlesComponent from "./particlesBackground";
import PageNavigation from "./navigation";
import useFetchMovies from "./hooks/hooks";
import { useSearch } from "./hooks/useContext";

export default function Home() {
  const [hypeMovies, setHypeMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { pageIntro, setpageIntro } = useSearch();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getHypeMovies = async (url) => {
    try {
      const data = await useFetchMovies(url);
      setHypeMovies(data.results);
      setHasNextPage(data.results.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PageMovie = async (page) => {
    try {
      const fetchPage = `${apiUrl}now_playing?page=${page}&${apiKey}`;
      const data = await useFetchMovies(fetchPage);
      setHypeMovies(data.results);
      setHasNextPage(data.results.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkNextPage = async (page) => {
    const fetchPage = `${apiUrl}now_playing?page=${page}&${apiKey}`;
    const data = await useFetchMovies(fetchPage);
    return data.results.length > 0;
  };

  const changePagePlusOne = async () => {
    const nextPage = currentPage + 1;
    const hasMore = await checkNextPage(nextPage);
    if (hasMore) {
      setCurrentPage(nextPage);
    } else {
      setHasNextPage(false);
    }
  };

  const changePageLessOne = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setHasNextPage(true); // Reset to true since we are moving to a known page
    }
  };

  useEffect(() => {
    const moviesUrl = `${apiUrl}now_playing?page=${currentPage}&${apiKey}`;
    PageMovie(currentPage);
    console.log(getHypeMovies(moviesUrl));
  }, [currentPage]);

  const handleIntroDismiss = () => {
    setpageIntro(false);
  };

  return (
    <>
      <ParticlesComponent />
      {pageIntro ? (
        <div className="w-full h-screen flex items-center justify-center md:-mt-[3%] text-white">
          <div
            className="relative flex items-center justify-center bg-gray-950 w-[90%] 
           md:w-[50%] h-[70%] md:h-[70%] rounded-[10px] p-6 border border-[#0cb7f2]"
          >
            <div className=" flex flex-col justify-center items-center -top-16">
              <div className="flex flex-col justify-center items-center gap-0 md:gap-4">
                <div className="absolute right-0 top-0 transform transition-transform duration-300 hover:rotate-90 cursor-pointer">
                  <IoMdClose size={30} onClick={handleIntroDismiss} />
                </div>
                <h1 className="absolute top-0 text-[30px] font-bold">
                  Welcome to my APP
                </h1>
                <div className="absolute top-10 min-h-500:top-16 flex items-center gap-6">
                  <a className="cursor-pointer hover:animate-bounce">
                    <FaWhatsapp />
                  </a>
                  <a className="cursor-pointer hover:animate-bounce">
                    <FaLinkedinIn />
                  </a>
                  <a className="cursor-pointer hover:animate-bounce">
                    <FaGithub />
                  </a>
                </div>
              </div>
              <p className="h-full text-center">
                This is a website created by Theo Vargas Lefèvre, web developer.
                The purpose of creating this App is to put into practice the
                knowledge acquired from my studies. Here I used the MovieDB API
                <a
                  className="text-blue-500 underline hover:text-blue-700 ml-2"
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.themoviedb.org/
                </a>
                . <br />
                You can check the code used to create this app on my github, by
                clicking on the icon's up there
              </p>
            </div>
            <button
              className="absolute w-[200px] hover:bg-[#88842e] transition duration-500 bottom-4 p-2 rounded-xl bg-[#d9d246] text-black invisible min-h-500:visible"
              onClick={handleIntroDismiss}
            >
              <strong>Got it</strong>
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-white flex items-center justify-center my-10 text-[15px] md:text-[30px]">
            SHOWING "
            <strong className="text-[rgb(217,210,70)]">
              CURRENTLY MOVIES ON STREAM
            </strong>
            "
          </h1>
          <div className="flex justify-center items-center pt-6">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-20 text-center">
              {hypeMovies && hypeMovies.length === 0 ? (
                <div className="w-screen h-screen flex justify-center items-center -mt-[45px]">
                  <AiOutlineLoading3Quarters
                    size={150}
                    color="white"
                    className="animate-spin"
                  />
                </div>
              ) : (
                hypeMovies.map((element) => (
                  <div key={element.id}>
                    <MovieCard element={element} />
                  </div>
                ))
              )}
            </div>
          </div>
          <PageNavigation
            currentPage={currentPage}
            changePagePlusOne={changePagePlusOne}
            changePageLessOne={changePageLessOne}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </>
  );
}
