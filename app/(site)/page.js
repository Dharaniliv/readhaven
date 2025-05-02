import Image from "next/image";
import BookCarousel from "./components/BookCarousel";
import { getAllBooksFromDB } from "../lib/db/allbooks";
import { getBestSellerBooksFromDB } from "../lib/db/bestsellers";
import { getFictionBooksFromDB } from "../lib/db/fiction";
import { getRomanceBooksFromDB } from "../lib/db/romance";
import { getNonFictionBooksFromDB } from "../lib/db/nonfiction";
import { getThrillerBooksFromDB } from "../lib/db/thriller";
import Link from "next/link";

export default async function HomePage() {
  const allBooks = await getAllBooksFromDB();
  const fiction = await getFictionBooksFromDB();
  const romance = await getRomanceBooksFromDB();
  const nonFiction = await getNonFictionBooksFromDB();
  const thriller = await getThrillerBooksFromDB();
  const bestSeller = await getBestSellerBooksFromDB();

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 lg:py-20">
  
      <div className="flex flex-col lg:flex-row items-center gap-[40px] sm:gap-[50px] md:gap-[60px] lg:gap-[95px]">
       
        <div className="ml-[-10px] sm:ml-[-30px] min-w-[220px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[697px] min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[543px] shrink-0">
          <Image
            src="/illustrations/illustration1.svg"
            alt="Illustration"
            width={697}
            height={543}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="bg-[#7A4E2D] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[376px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
          <h1 className="font-playfair font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[30px] sm:leading-[34px] md:leading-[42px] lg:leading-[48px] text-white text-left w-full max-w-[520px]">
            Find Your Next Favorite Book!
          </h1>
          <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-white text-left w-full max-w-[520px]">
            Explore a vast collection of books across all genres. Buy your next
            read today!
          </p>

    
          <Link
            href="/categories/all-books"
            className="w-full flex justify-center"
          >
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Shop Now
            </button>
          </Link>
        </div>
      </div>


      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <BookCarousel books={allBooks.slice(0, 15)} />
      </div>

 
      <div className="mt-[80px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <div className="w-full h-[70px] bg-[#1E3A5F] flex items-center justify-center">
          <h2 className="font-playfair font-black text-[32px] sm:text-[36px] md:text-[40px] leading-[42px] sm:leading-[44px] md:leading-[48px] text-white uppercase text-center">
            Best Seller
          </h2>
        </div>
      </div>


      <div className="mt-[25px] flex flex-col-reverse lg:flex-row items-center gap-[25px] sm:gap-[40px] md:gap-[50px] lg:gap-[80px]">

        <div className="bg-[#1E3A5F] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[376px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
          <h1 className="font-playfair font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[30px] sm:leading-[34px] md:leading-[42px] lg:leading-[48px] text-white text-center w-full max-w-[520px] whitespace-nowrap">
            Top Reads Loved by Millions
          </h1>
          <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-white text-left w-full max-w-[520px]">
            Explore the most popular books loved by readers worldwide. Find your
            next must-read bestseller today!
          </p>

   
          <Link
            href="/categories/best-sellers"
            className="w-full flex justify-center"
          >
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#8B5E3C] hover:bg-[#7A4E2D] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Best Sellers
            </button>
          </Link>
        </div>

   
        <div className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[600px] h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px] shrink-0">
          <Image
            src="/illustrations/illustration2.svg"
            alt="Top Reads Illustration"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>

      
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <BookCarousel
          books={bestSeller.slice(0, 15)}
          bgColor="#1E3A5F"
          buttonColor="#8B5E3C"
          buttonHoverColor="#7A4E2D"
        />
      </div>

      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <div className="w-full h-[70px] bg-[#D96666] flex items-center justify-center">
          <h2 className="font-playfair font-black text-[32px] sm:text-[36px] md:text-[40px] leading-[42px] sm:leading-[44px] md:leading-[48px] text-white uppercase text-center">
            Romance
          </h2>
        </div>
      </div>


      <div className="mt-[25px] flex flex-col lg:flex-row items-center gap-[25px] sm:gap-[40px] md:gap-[50px] lg:gap-[80px]">
     
        <div className="ml-[-10px] sm:ml-[-30px] min-w-[220px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[664px] min-h-[220px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[664px] shrink-0">
          <Image
            src="/illustrations/illustration3.svg"
            alt="Romance Illustration"
            width={664}
            height={664}
            className="w-full h-auto"
          />
        </div>

        <div className="bg-[#D96666] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[420px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
          <h1 className="font-playfair font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[30px] sm:leading-[34px] md:leading-[42px] lg:leading-[48px] text-white text-left w-full max-w-[520px]">
            Love Stories to Warm Your Heart!
          </h1>
          <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-white text-left w-full max-w-[520px]">
            Heartfelt stories of love, passion, and romance await you. Dive into
            a world of unforgettable emotions!
          </p>

          <Link
            href="/categories/romance"
            className="w-full flex justify-center"
          >
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Explore Romance
            </button>
          </Link>
        </div>
      </div>

    
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <BookCarousel
          books={romance.slice(0, 15)}
          bgColor="#D96666"
          buttonColor="#1E3A5F"
        />
      </div>
 
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <div className="w-full h-[70px] bg-[#4B785D] flex items-center justify-center">
          <h2 className="font-playfair font-black text-[32px] sm:text-[36px] md:text-[40px] leading-[42px] sm:leading-[44px] md:leading-[48px] text-white uppercase text-center">
            Fiction
          </h2>
        </div>
      </div>

     
      <div className="mt-[25px] flex flex-col-reverse lg:flex-row items-center gap-[25px] sm:gap-[40px] md:gap-[50px] lg:gap-[80px]">
  
        <div className="bg-[#4B785D] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[376px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
          <h1 className="font-playfair font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[30px] sm:leading-[34px] md:leading-[42px] lg:leading-[48px] text-white text-left w-full max-w-[520px]">
            Unleash Your Imagination
          </h1>
          <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-white text-left w-full max-w-[520px]">
            Escape into worlds of imagination with gripping fiction and fantasy
            tales that captivate your mind!
          </p>

          <Link
            href="/categories/fiction"
            className="w-full flex justify-center"
          >
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Dive In
            </button>
          </Link>
        </div>

    
        <div className="min-w-[220px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[664px] min-h-[220px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[664px] shrink-0">
          <Image
            src="/illustrations/illustration4.svg"
            alt="Fiction Illustration"
            width={664}
            height={664}
            className="w-full h-auto"
          />
        </div>
      </div>

      
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <BookCarousel
          books={fiction.slice(0, 15)}
          bgColor="#4B785D"
          buttonColor="#1E3A5F"
        />
      </div>

  
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <div className="w-full h-[70px] bg-[#BA68C8] flex items-center justify-center">
          <h2 className="font-playfair font-black text-[32px] sm:text-[36px] md:text-[40px] leading-[42px] sm:leading-[44px] md:leading-[48px] text-white uppercase text-center">
            Thriller
          </h2>
        </div>
      </div>

   
      <div className="mt-[25px] flex flex-col lg:flex-row items-center gap-[25px] sm:gap-[40px] md:gap-[50px] lg:gap-[80px]">
 
        <div className="ml-[-10px] sm:ml-[-30px] min-w-[220px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[664px] min-h-[220px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[664px] shrink-0">
          <Image
            src="/illustrations/illustration5.svg" 
            alt="Mystery Illustration"
            width={664}
            height={664}
            className="w-full h-auto"
          />
        </div>

     
        <div className="bg-[#BA68C8] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[420px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
          <h1 className="font-playfair font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[30px] sm:leading-[34px] md:leading-[42px] lg:leading-[48px] text-white text-left w-full max-w-[520px]">
            Unravel the Mystery, Feel the Thrill!
          </h1>
          <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-white text-left w-full max-w-[520px]">
            From gripping whodunits to pulse-pounding thrillers, these books
            will keep you on the edge of your seat until the last page.
          </p>

          <Link
            href="/categories/thriller"
            className="w-full flex justify-center"
          >
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Discover the Mystery
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <BookCarousel
          books={thriller.slice(0, 15)}
          bgColor="#BA68C8"
          buttonColor="#1E3A5F"
        />
      </div>
     
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <div className="w-full h-[70px] bg-[#7A4E2D] flex items-center justify-center">
          <h2 className="font-playfair font-black text-[32px] sm:text-[36px] md:text-[40px] leading-[42px] sm:leading-[44px] md:leading-[48px] text-white uppercase text-center">
            Non-Fiction
          </h2>
        </div>
      </div>

 
      <div className="mt-[25px] flex flex-col-reverse lg:flex-row items-center gap-[25px] sm:gap-[40px] md:gap-[50px] lg:gap-[80px]">
      
        <div className="bg-[#7A4E2D] w-full sm:w-[400px] md:w-[500px] lg:w-[621px] h-auto lg:h-[420px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
          <h1 className="font-playfair font-bold text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[30px] sm:leading-[34px] md:leading-[42px] lg:leading-[48px] text-white text-left w-full max-w-[520px]">
            Expand Your Knowledge with Non-Fiction
          </h1>
          <p className="mt-[16px] sm:mt-[20px] md:mt-[25px] font-playfair font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-white text-left w-full max-w-[520px]">
            Discover insightful books that challenge your thinking, inspire
            growth, and provide real-world knowledge.
          </p>

          <Link
            href="/categories/non-fiction"
            className="w-full flex justify-center"
          >
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[480px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Unlock Wisdom
            </button>
          </Link>
        </div>

    
        <div className="min-w-[220px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[664px] min-h-[220px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[664px] shrink-0">
          <Image
            src="/illustrations/illustration6.svg"
            alt="Non-Fiction Illustration"
            width={664}
            height={664}
            className="w-full h-auto"
          />
        </div>
      </div>

   
      <div className="mt-[67px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <BookCarousel
          books={nonFiction.slice(0, 15)}
          bgColor="#7A4E2D"
          buttonColor="#1E3A5F"
        />
      </div>
    </div>
  );
}
