
import Image                 from 'next/image';
import LogoutButton          from '../components/LogoutButton';
import { getServerSession }  from 'next-auth';
import { authOptions }       from '@/app/api/auth/[...nextauth]/route';
import { redirect }          from 'next/navigation';
import Link                  from 'next/link';
import connectToDatabase     from '@/app/lib/db/mongo';
import User                  from '@/app/lib/models/User';

export const metadata = {
  title: "My Account",
  description: "View and update your personal details, track your orders, and customize your preferences at ReadHaven.",
};


export default async function AccountPage() {

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/login');
  }


  await connectToDatabase();


  const user = await User.findById(session.user.id).lean();
  const userName = user?.name || session.user.name || 'User';

  const cards = [
    { title: "Orders",      description: "View and track your orders",    icon: "order", path: "/my-account/orders" },
    { title: "Wishlist",    description: "Save books for later",           icon: "heart", path: "/my-account/wishlist" },
    { title: "Settings",    description: "Update your personal details",   icon: "setting", path: "/my-account/settings" },
    { title: "Address",     description: "Manage your shipping details",   icon: "home", path: "/my-account/address" },
    { title: "Returns",     description: "Track your returns and refunds", icon: "return", path: "/my-account/returns" },
    { title: "Gift Cards",  description: "View and manage discount codes", icon: "gift", path: "/my-account/gift-cards" },
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-14 md:py-16 bg-[#F8E9D2] min-h-screen">
     
      <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[44px] lg:leading-[48px] text-center text-[#7A4E2D] font-playfair font-bold">
        Hello, {userName}
      </h1>

   
      <p className="mt-[12px] sm:mt-[16px] md:mt-[20px] text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[24px] sm:leading-[28px] md:leading-[30px] text-[#1E3A5F] font-playfair font-medium text-center max-w-[800px]">
        Manage your profile, orders, and settings in one place.
      </p>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[32px] md:gap-[40px] lg:gap-[60px] mt-[40px] sm:mt-[60px] md:mt-[80px] lg:mt-[100px]">
        {cards.map((card, idx) => (
          <Link key={idx} href={card.path}>
            <div
              role="button"
              tabIndex={0}
              className="w-full sm:w-[280px] md:w-[320px] lg:w-[420px] h-[160px] sm:h-[190px] md:h-[210px] lg:h-[220px] rounded-[15px] bg-[#7A4E2D] shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:bg-[#162B44] transition-colors duration-300 p-4 sm:p-5 md:p-6 flex items-center justify-center cursor-pointer outline-none focus:ring-2 focus:ring-[#F8E9D2]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <h2 className="text-white text-[20px] sm:text-[26px] md:text-[32px] lg:text-[40px] leading-[26px] sm:leading-[34px] md:leading-[40px] lg:leading-[48px] font-playfair font-bold">
                    {card.title}
                  </h2>
                  <div className="relative w-[28px] sm:w-[35px] md:w-[40px] lg:w-[45px] h-[28px] sm:h-[35px] md:h-[40px] lg:h-[45px]">
                    <Image
                      src={`/icons/${card.icon}.svg`}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 35px, (max-width: 1024px) 40px, 45px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="mt-[16px] sm:mt-[20px] md:mt-[24px] lg:mt-[30px] text-white text-[14px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[20px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] font-playfair font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <LogoutButton />
    </div>
  );
}
