"use client";

import { createContext, useEffect, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_SEARCH;

  const getSearchMovie = async (url) => {
    const getMovie = await fetch(url);
    const data = await getMovie.json();
    setValue(data.results);
  };

  useEffect(() => {
    const searchUrl = `${apiUrl}/movie?query=${searchValue}&${apiKey}`;
    getSearchMovie(searchUrl);
  }, [searchValue]);

  return (
    <ThemeContext.Provider value={{ searchValue, setSearchValue, value }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useSearch = () => useContext(ThemeContext);
