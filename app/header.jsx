import { MdLocalMovies } from "react-icons/md";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex w-full items-center justify-center bg-gray-950  shadow-yellow-shadow">
        <h1 className="flex  py-4 font-bold text-white bg-opacity-90">
          <Link href={"/"} className="flex items-center">
            <MdLocalMovies color="yellow" />
            ApiMovies{" "}
          </Link>
        </h1>
        <input type="text" className="text-black bg-white ml-[20%]" />
      </div>
    </>
  );
}
