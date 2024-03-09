"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ParticlesComponent from "@/app/particlesBackground";

export default function AboutMovie() {
  const { id } = useParams();
  const [Movie, setMovie] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiImage = process.env.NEXT_PUBLIC_API_IMG;

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
  return (
    <>
      <ParticlesComponent id="particles" />
      <main className="flex w-full justify-center ">
        <div className="lg:flex gap-[5%] mt-[2%] p-4 pb-32 justify-center w-[50%] rounded-xl bg-slate-950 bg-opacity-60 border-[1.5px] border-[#0cb7f2] shadow-blue-shadow">
          {Movie && (
            <img
              src={`${apiImage}${Movie.poster_path}`}
              alt={Movie.title}
              className="w-[500px] rounded-xl "
            ></img>
          )}
          <main className="flex flex-col gap-4 w-full">
            <h1 className="text-white text-[30px] underline">
              {Movie && Movie.title}
            </h1>
            <p className="text-white text-[20px]">{Movie && Movie.overview}</p>
          </main>
        </div>
      </main>
    </>
  );
}
