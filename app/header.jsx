import { MdLocalMovies } from "react-icons/md";

export default function Header() {
  return (
    <h1 className="flex items-center justify-center py-4 font-bold text-white bg-black shadow-yellow-shadow">
      <MdLocalMovies color="yellow" />
      ApiMovies
    </h1>
  );
}
