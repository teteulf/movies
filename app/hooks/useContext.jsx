"use client";

import { createContext, useEffect, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState([]);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageIntro, setpageIntro] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_SEARCH;

  const getSearchMovie = async (url) => {
    const getMovie = await fetch(url);
    const data = await getMovie.json();
    setValue(data.results);
    sethasNextPage(data.results.length > 0);
  };

  useEffect(() => {
    const searchUrl = `${apiUrl}/movie?query=${searchValue}&page=${currentPage}&${apiKey}`;

    getSearchMovie(searchUrl);
  }, [searchValue, currentPage]);

  return (
    <ThemeContext.Provider
      value={{
        searchValue,
        setSearchValue,
        value,
        currentPage,
        setcurrentPage,
        pageIntro,
        setpageIntro,
        hasNextPage,
        sethasNextPage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useSearch = () => useContext(ThemeContext);
