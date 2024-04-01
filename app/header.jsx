import { BiSolidCameraMovie } from "react-icons/bi";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-[20%] justify-center items-center bg-gray-950  shadow-yellow-shadow">
        <h1 className="flex py-4 font-bold text-white bg-opacity-90">
          <Link href={"/"} className="flex items-center">
            <BiSolidCameraMovie color="yellow" size={"20px"} />
            ApiMovies{" "}
          </Link>
        </h1>
        <h2 className="flex py-4 font-bold text-white bg-opacity-90">
          <Link href={"/movieList"} className="flex items-center">
            Movie List{" "}
          </Link>
        </h2>
        <input
          type="text"
          className="text-white w-[150px] mb-6 md:mb-0 rounded-xl bg-gray-950 border border-[#0cb7f2]"
        />
      </div>
    </>
  );
}
