import CategoryBookSection from "@/app/(site)/components/CategoryBookSection";
import Link from "next/link";


export const metadata = {
  title: "Fiction Books - Explore Top Fiction Titles at ReadHaven",
  description: "Dive into the world of fiction with the best books in various genres, from classics to modern stories, available at ReadHaven.",
};


export default function FictionPage() {
  return (
    <>
      <div className="mt-[60px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
        <div className="w-full h-[70px] bg-[#4B785D] flex items-center justify-center">
          <h2 className="font-playfair font-black text-[32px] sm:text-[36px] md:text-[40px] leading-[42px] sm:leading-[44px] md:leading-[48px] text-white uppercase text-center">
            Fiction
          </h2>
        </div>
      </div>

      <CategoryBookSection category="fiction" color="#4B785D" />

      <div className="mt-[170px] px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-y-[40px] lg:gap-x-[20px]">
       
        <div className="bg-[#7A4E2D] w-full sm:w-[350px] md:w-[450px] lg:w-[621px] h-auto lg:h-[420px] rounded-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 lg:py-0 mx-auto">
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
            <button className="mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[22px] tracking-[0.01em] rounded-[6px] w-full max-w-[543px] h-[48px] sm:h-[54px] md:h-[58px] lg:h-[64px]">
              Discover the Mystery
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
