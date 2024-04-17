"use client";

import { BiSolidCameraMovie } from "react-icons/bi";
import Link from "next/link";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useSearch } from "./hooks/useContext";

export default function Header() {
  const [hover, setHover] = useState(false);
  const { searchValue, setSearchValue } = useSearch();

  return (
    <div className="flex flex-col md:flex-row w-full gap-[20%] justify-center items-center bg-gray-950 shadow-yellow-shadow">
      <h1 className="flex py-4 font-bold text-white bg-opacity-90">
        <Link href={"/"} className="flex items-center">
          <BiSolidCameraMovie color="yellow" size={"20px"} />
          ApiMovies
        </Link>
      </h1>
      <h2 className="flex py-4 font-bold text-white bg-opacity-90">
        <Link href={"/movieList"} className="flex items-center">
          Movie List
        </Link>
      </h2>
      <div className="flex h-6 items-center py-6 pb-8 md:py-0 md:pb-0">
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          id="search"
          type="text"
          className="text-white w-[150px] md:mb-0 rounded-xl bg-gray-950 border-2 border-[#0cb7f2]"
        />
        <Link href={"/search"} className="cursor-pointer">
          <IoSearchCircleOutline
            color={hover ? "white" : "#0cb7f2"}
            size={35}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </Link>
      </div>
    </div>
  );
}
