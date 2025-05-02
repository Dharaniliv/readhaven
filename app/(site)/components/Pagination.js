"use client";
import Image from "next/image";
import { useState } from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [hoveredPage, setHoveredPage] = useState(null);
  const [hoverArrow, setHoverArrow] = useState({ left: false, right: false });

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center gap-[12px] sm:gap-[20px] mt-[40px] flex-wrap">
     
      <div
  className={`w-[40px] h-[40px] sm:w-[64px] sm:h-[64px] rounded-[6px] border flex items-center justify-center ${
    currentPage === 1
      ? "border-[#BCBCBC] cursor-default"
      : "border-[#7A4E2D] cursor-pointer hover:bg-[#7A4E2D]"
  }`}
  onClick={() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }}
  onMouseEnter={() =>
    currentPage !== 1 && setHoverArrow((prev) => ({ ...prev, left: true }))
  }
  onMouseLeave={() =>
    setHoverArrow((prev) => ({ ...prev, left: false }))
  }
>
  <Image
    src={
      currentPage === 1
        ? "/icons/paginationleftdisabled.svg"
        : hoverArrow.left
        ? "/icons/paginationlefthover.svg"
        : "/icons/paginationleft.svg"
    }
    alt="Previous"
    width={20}
    height={20}
    className="w-auto h-auto"
    draggable="false"
  />
</div>


     
      {pageNumbers.map((page, index) => {
        const isActive = page === currentPage;
        const isHover = hoveredPage === page;

        if (page === "...") {
          return (
            <div
              key={`ellipsis-${index}`}
              className="w-[40px] h-[40px] sm:w-[64px] sm:h-[64px] flex items-center justify-center font-inter text-[14px] sm:text-[22px] text-[#7A4E2D] font-bold select-none"
            >
              ...
            </div>
          );
        }

        return (
          <div
            key={page}
            className={`w-[40px] h-[40px] sm:w-[64px] sm:h-[64px] rounded-[6px] border font-inter text-[12px] sm:text-[18px] font-extrabold leading-none flex items-center justify-center transition-colors duration-200
              ${
                isActive
                  ? "bg-[#7A4E2D] text-white border-[#7A4E2D] cursor-default"
                  : isHover
                  ? "bg-[#7A4E2D] text-white border-[#7A4E2D] cursor-pointer"
                  : "border-[#7A4E2D] text-[#7A4E2D] cursor-pointer"
              }`}
            onClick={() => !isActive && onPageChange(page)}
            onMouseEnter={() => !isActive && setHoveredPage(page)}
            onMouseLeave={() => setHoveredPage(null)}
          >
            {page}
          </div>
        );
      })}

    
      <div
  className={`w-[40px] h-[40px] sm:w-[64px] sm:h-[64px] rounded-[6px] border flex items-center justify-center ${
    currentPage === totalPages
      ? "border-[#BCBCBC] cursor-default"
      : "border-[#7A4E2D] cursor-pointer hover:bg-[#7A4E2D]"
  }`}
  onClick={() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }}
  onMouseEnter={() =>
    currentPage !== totalPages && setHoverArrow((prev) => ({ ...prev, right: true }))
  }
  onMouseLeave={() =>
    setHoverArrow((prev) => ({ ...prev, right: false }))
  }
>
  <Image
    src={
      currentPage === totalPages
        ? "/icons/paginationrightdisabled.svg"
        : hoverArrow.right
        ? "/icons/paginationrighthover.svg"
        : "/icons/paginationright.svg"
    }
    alt="Next"
    width={20}
    height={20}
    className="w-auto h-auto"
    draggable="false"
  />
</div>

    </div>
  );
}
