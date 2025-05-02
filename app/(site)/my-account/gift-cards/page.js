import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Your Gift Cards",
  description: "Give the gift of reading! Purchase ReadHaven gift cards for your loved ones, perfect for book lovers and those seeking their next favorite read.",
};


export default async function GiftCardsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/login');
  }
    return (
      <div className="min-h-screen bg-[#F8E9D2] py-10 sm:py-14 md:py-16">
       
        <h1 className="text-center text-[#7A4E2D] font-playfair font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[48px]">
          My Gift Cards
        </h1>
  

        <div className="flex justify-center mt-[120px] sm:mt-[120px] md:mt-[200px]">
          <div className="w-[90%] sm:w-[90%] md:w-[717px] h-[148px] bg-[#7A4E2D] rounded-[15px] flex items-center justify-center">
            <p className="text-white font-playfair font-semibold text-[17px] sm:text-[24px] md:text-[40px] leading-[28px] sm:leading-[34px] md:leading-[48px]">
              You have no active gift cards
            </p>
          </div>
        </div>
      </div>
    );
  }
  