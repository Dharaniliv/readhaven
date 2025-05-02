import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for does not exist.",
};


export default function NotFound() {
  return (
    <div className="pt-[150px] flex flex-col md:flex-row justify-center items-center px-4 sm:px-10">
   
      <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
        <Image
          src="/illustrations/404.svg"
          alt="404 Not Found"
          width={600}
          height={600}
          priority
          className="w-full h-auto"
        />
      </div>

  
      <div className="mt-[40px] md:mt-0 md:ml-[60px] w-full max-w-[624px] h-auto md:h-[336px] rounded-[15px] bg-[#7A4E2D] flex flex-col justify-center items-center text-center px-4 sm:px-6 py-10 md:py-0">
        <p className="text-white font-playfair font-semibold text-[24px] leading-[32px] sm:text-[28px] sm:leading-[36px] md:text-[40px] md:leading-[48px]">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link href="/" className="mt-[40px] md:mt-[63px] w-full flex justify-center">
          <button className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[551px] h-[50px] md:h-[64px] rounded-[6px] bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat font-semibold text-[16px] leading-[20px] sm:text-[18px] sm:leading-[22px] md:text-[20px] md:leading-[22px]">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
