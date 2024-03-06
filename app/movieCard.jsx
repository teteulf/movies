import { FaStar } from "react-icons/fa";

export default function MovieCard({ element, showLink = true }) {
  const apiImage = process.env.NEXT_PUBLIC_API_IMG;
  console.log(apiImage);
  return (
    <div className="items-center border-[10px] rounded-xl border-slate-500 bg-slate-500">
      <img
        src={apiImage + element.poster_path}
        alt={element.title}
        className="rounded-xl"
      />
      <h2 className="text-white">{element.title}</h2>
      <p className="flex items-center justify-center text-white">
        <FaStar color="#f1e702" />
        {element.vote_average}
      </p>
    </div>
  );
}
