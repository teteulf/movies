"use client";
import ParticlesComponent from "../particlesBackground";
import MovieCard from "../movieCard";

export default function MovieList() {
  const movieList = JSON.parse(localStorage.getItem("movieList")) || [];
  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="w-full md:w-screen flex justify-center items-center">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-20 p-6 text-center">
          {movieList.map((element) => (
            <MovieCard key={element.id} element={element} />
          ))}
        </div>
      </div>
    </>
  );
}
