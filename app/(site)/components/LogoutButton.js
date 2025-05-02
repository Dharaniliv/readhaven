'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = () => {
    setTimeout(() => {
      signOut({ callbackUrl: '/' });
    }, 1500); 
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-[100px] bg-[#1E3A5F] hover:bg-[#002244] text-white text-[18px] sm:text-[20px] font-montserrat font-semibold px-8 py-3 rounded-[6px] transition-colors duration-300"
    >
      Logout
    </button>
  );
}
