"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import ParticlesComponent from "./particlesBackground";
import PageNavigation from "./navigation";
import useFetchMovies from "./hooks/hooks";
import { useSearch } from "./hooks/useContext";

export default function Home() {
  const [hypeMovies, setHypeMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { pageIntro, setpageIntro } = useSearch();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const getHypeMovies = async (url) => {
    try {
      const data = await useFetchMovies(url);
      setHypeMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PageMovie = async (page) => {
    try {
      const fetchPage = `${apiUrl}now_playing?page=${page}&${apiKey}`;
      useFetchMovies(fetchPage);
      setHypeMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <div className="w-full h-screen flex items-center justify-center -mt-[3%]">
          <div className="relative flex items-center justify-center bg-white w-[90%] h-[70%] md:w-[50%] md:h-[70%] rounded-[10px] p-6">
            <div className="relative flex flex-col justify-center items-center gap-20 -top-16">
              <h1 className="text-[30px] font-bold ">Welcome to my APP</h1>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Similique obcaecati numquam consectetur sint, odit quibusdam, hic
              blanditiis, assumenda placeat enim quidem aliquid error
              voluptatibus neque! Incidunt sint assumenda ut fugit. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Magnam delectus eius
              culpa esse sint veniam. Numquam sapiente esse totam optio
              dignissimos tempora. Quis nam dolorem, molestiae ut eligendi
              laborum sapiente.
            </div>
            <button
              className="absolute bottom-4 p-2 rounded-xl bg-slate-400"
              onClick={handleIntroDismiss}
            >
              Entendido!
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-white flex items-center justify-center my-10 text-[30px]">
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
          />
        </>
      )}
    </>
  );
}
