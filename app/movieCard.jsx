import { FaStar } from "react-icons/fa";
import Link from "next/link";

export default function MovieCard({ element, showLink = true }) {
  const apiImage = process.env.NEXT_PUBLIC_API_IMG;
  console.log(apiImage);
  return (
    <div className="flex flex-col gap-4 items-center p-[10px] pt-4 rounded-xl bg-slate-950 bg-opacity-60 border-[1.5px] border-[#0cb7f2] shadow-blue-shadow">
      <img
        src={apiImage + element.poster_path}
        alt={element.title}
        className="rounded-xl border border-black"
      />
      <h2 className="text-white font-bold">{element.title}</h2>
      <p className="flex items-center justify-center text-white">
        <FaStar color="#f1e702" />
        {element.vote_average}
      </p>
      <Link
        href={`/movie/${element.id}`}
        className="bg-[#d9d246] text-black font-bold py-4 px-32 rounded-xl border border-black hover:bg-[#88842e] transition duration-500"
      >
        ABOUT
      </Link>
    </div>
  );
}
