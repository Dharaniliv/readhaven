

import { searchBooksInDB } from "@/app/lib/db/searchBooks";
import SearchGrid from "@/app/(site)/components/SearchGrid";
import Link from "next/link";

export default async function SearchPage({ params }) {
  const { query } = await params;

 
  const raw = query.replace(/-/g, " ");
  const cleanQuery = raw.trim();


  const books = await searchBooksInDB(cleanQuery);

  return (
    <div className="p-6">
      {books.length === 0 ? (
        <div className="mt-[37px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
          <div className="w-full h-[70px] bg-[#7A4E2D] flex items-center justify-center">
            <h2 className="font-playfair font-black text-[24px] sm:text-[32px] md:text-[36px] leading-[28px] sm:leading-[42px] md:leading-[48px] text-white text-center">
              No results found for &quot;{cleanQuery}&quot;
            </h2>
          </div>
          <div className="mt-10 text-center">
            <p className="text-[#7A4E2D] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px]">
              Try searching with a different keyword or check your spelling.
            </p>
          </div>

      
          <div className="mt-[150px]">
            <div className="bg-[#7A4E2D] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[376px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
              <h1 className="font-playfair font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] leading-[24px] sm:leading-[28px] md:leading-[34px] lg:leading-[38px] text-white text-left w-full max-w-[520px]">
                Didn&apos;t find what you&apos;re looking for?
              </h1>
              <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[20px] sm:leading-[22px] md:leading-[24px] lg:leading-[26px] text-white text-left w-full max-w-[520px]">
                Browse through our collection or explore different genres to
                find your next favorite book.
              </p>

             
              <Link
                href="/categories/all-books"
                className="w-full flex justify-center"
              >
                <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
                  Browse All Books
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-[37px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
            <div className="w-full h-[70px] bg-[#7A4E2D] flex items-center justify-center">
              <h2 className="font-playfair font-black text-[24px] sm:text-[32px] md:text-[36px] leading-[28px] sm:leading-[42px] md:leading-[48px] text-white text-center">
                Search results for &quot;{cleanQuery}&quot;
              </h2>
            </div>
          </div>

          <SearchGrid books={books} />
        </>
      )}
    </div>
  );
}
