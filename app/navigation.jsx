import React from "react";
import { FiTriangle } from "react-icons/fi";

const PageNavigation = ({
  currentPage,
  changePagePlusOne,
  changePageLessOne,
}) => {


  
  return (
    <div className="flex items-center justify-center gap-10 pb-16 mt-10">
      <FiTriangle
        onClick={changePageLessOne}
        color="#0cb7f2"
        size={"32px"}
        className="-rotate-90 cursor-pointer hover:text-[#020203]"
      >
        troca pagina
      </FiTriangle>

      <p className="text-[#0cb7f2] text-[30px] ">{currentPage}</p>

      <FiTriangle
        onClick={changePagePlusOne}
        color="#0cb7f2"
        size={"32px"}
        className="rotate-90 cursor-pointer"
      >
        troca pagina
      </FiTriangle>
    </div>
  );
};

export default PageNavigation;
