"use client";

import MovieCard from "../movieCard";
import { useSearch } from "../hooks/useContext";

export default function SearchMovie() {
  const { value } = useSearch();

  return (
    <div className="">
      {value && value.length > 0 ? (
        <div className="">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-center gap-20">
            {value.map((element) => (
              <div key={element.id}>
                <MovieCard element={element} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="fixed text-[40px] text-white">Loading ...</div>
      )}
    </div>
  );
}
