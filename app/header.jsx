import { MdLocalMovies } from "react-icons/md";
import Link from "next/link";

export default function Header() {
  return (
    <h1 className="flex items-center justify-center py-4 font-bold text-white bg-gray-950 shadow-yellow-shadow">
      <Link href={"/"} className="flex items-center">
        <MdLocalMovies color="yellow" />
        ApiMovies{" "}
      </Link>
    </h1>
  );
}
