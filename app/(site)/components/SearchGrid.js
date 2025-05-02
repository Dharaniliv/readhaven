
'use client';

import { useState, useEffect, useRef } from 'react';
import Pagination from './Pagination';
import SearchCard from './SearchCard';

export default function SearchGrid({ books }) {
  const [wishlistStatus, setWishlistStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(25);

  const gridRef = useRef(null);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBooksPerPage(15);
      } else {
        setBooksPerPage(25);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const visibleBooks = books.slice(start, end);

  useEffect(() => {
    const startIdx = (currentPage - 1) * booksPerPage;
    const endIdx = startIdx + booksPerPage;
    const currentBooks = books.slice(startIdx, endIdx);

    setWishlistStatus(
      currentBooks.map(() => ({
        isWishlisted: false,
        isHoveringWishlist: false,
        isHoveringCart: false,
      }))
    );
  }, [booksPerPage, currentPage, books]);

  const toggleWishlist = (index) => {
    setWishlistStatus(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          isWishlisted: !updated[index].isWishlisted,
        };
      }
      return updated;
    });
  };

  const handleHoverWishlist = (index, hovering) => {
    setWishlistStatus(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          isHoveringWishlist: hovering,
        };
      }
      return updated;
    });
  };

  const handleHoverCart = (index, hovering) => {
    setWishlistStatus(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          isHoveringCart: hovering,
        };
      }
      return updated;
    });
  };

  return (
    <>
     
      {visibleBooks.length === 0 ? (
        <div className="w-full text-center text-gray-500 font-inter text-[18px] sm:text-[20px] mt-[40px] mb-[60px]">
          No books found.
        </div>
      ) : (
        <div
          ref={gridRef}
          className="px-[35px] sm:px-6 md:px-10 lg:px-16 xl:px-20 mt-[40px] mb-[60px] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[50px] sm:gap-[30px]"
        >
          {visibleBooks.map((book, index) => {
            const state = wishlistStatus[index];
            if (!state) return null;

            return (
              <SearchCard
                key={book.id}
                book={book}
                index={index}
                wishlistState={state}
                onToggleWishlist={toggleWishlist}
                onHoverWishlist={handleHoverWishlist}
                onHoverCartButton={handleHoverCart}
              />
            );
          })}
        </div>
      )}


      {totalPages > 1 && visibleBooks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            if (gridRef.current) {
              gridRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
        />
      )}
    </>
  );
}
