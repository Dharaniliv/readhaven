'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function NavbarTop() {
  const [active, setActive] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'Categories', 'Contact us', 'About us'];
  const categories = ['All Books', 'Best Sellers', 'Non Fiction', 'Fiction', 'Romance', 'Thriller'];

  return (
    <nav className="w-full max-w-[1920px] h-[92px] bg-[#7A4E2D] px-[16px] md:px-[48px] flex items-center justify-between text-[#1E3A5F] relative">
      {/* Logo */}
      <div className="flex items-center gap-[6px] cursor-pointer group md:order-1 order-2">
        <span className="text-white text-lg md:text-2xl font-bold font-playfair leading-snug tracking-tight group-hover:text-[#F5E8D9] transition-colors">
          ReadHaven
        </span>
        <Image
          src="/icons/Group.svg"
          alt="Logo"
          width={18}
          height={18}
          className="block group-hover:hidden transition-opacity md:w-[23px] md:h-[23px]"
        />
        <Image
          src="/icons/Group-hover.svg"
          alt="Logo Hover"
          width={18}
          height={18}
          className="hidden group-hover:block transition-opacity md:w-[23px] md:h-[23px]"
        />
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-7 text-white">
        {navItems.map((item) =>
          item === 'Categories' ? (
            <div
              key={item}
              className="relative group flex items-center gap-1 cursor-pointer"
            >
              <span className="cursor-pointer font-inter text-[16px] leading-[24px] tracking-[0.5%] font-semibold hover:text-[#F5DEB3]">
                {item}
              </span>
              <ChevronDown size={16} />

              {/* Dropdown */}
              <div className="absolute left-[-10px] top-full mt-2 bg-white shadow-lg rounded-md px-4 py-2 space-y-1 z-50 w-max opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="text-sm text-[#1E3A5F] hover:bg-[#F5DEB3] px-2 py-1 rounded cursor-pointer"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <span
              key={item}
              className={`cursor-pointer font-inter text-[16px] leading-[24px] tracking-[0.5%] font-semibold hover:text-[#F5DEB3] ${
                active === item
                  ? 'text-[#F5DEB3] underline decoration-[#F5E8D9] underline-offset-4 decoration-2'
                  : ''
              }`}
              onClick={() => setActive(item)}
            >
              {item}
            </span>
          )
        )}
      </div>

      {/* Mobile Menu Toggle - Shifted Right */}
      <div className="md:hidden order-1 absolute left-[60%] -translate-x-1/2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Right Section - Buttons and Cart */}
      <div className="flex items-center md:order-3 order-3 gap-4 md:gap-[16px] ml-auto md:ml-auto pr-[0px] md:pr-[0px]">
        {/* Buttons */}
        <div className="hidden md:flex items-center gap-[16px]">
          <button className="w-[121px] h-[48px] rounded-[8px] bg-[#1E3A5F] text-white hover:bg-[#002244] font-inter text-[16px] leading-[24px] tracking-[0.5%] font-bold">
            Sign Up
          </button>
          <button className="w-[121px] h-[48px] rounded-[8px] border border-transparent text-white hover:bg-[#E0E8F0] hover:text-[#1E3A5F] font-inter text-[16px] leading-[24px] tracking-[0.5%] font-bold">
            Log In
          </button>
        </div>

        {/* Cart */}
        <div className="relative w-[42px] h-[36px] md:w-[50px] md:h-[44px] cursor-pointer group flex items-start justify-center">
          <Image
            src="/icons/Shopping bag.svg"
            alt="Cart"
            width={42}
            height={36}
            className="absolute top-0 left-0 group-hover:hidden transition-opacity md:w-[50px] md:h-[44px]"
          />
          <Image
            src="/icons/Shopping bag-hover.svg"
            alt="Cart Hover"
            width={42}
            height={36}
            className="absolute top-0 left-0 hidden group-hover:block transition-opacity md:w-[50px] md:h-[44px]"
          />
          <span className="text-[12px] md:text-[14px] text-[#7A4E2D] font-bold z-10 leading-[22px] font-montserrat translate-y-[13px] md:translate-y-[19px]">
            0
          </span>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#7A4E2D] text-white py-4 px-6 z-50 space-y-4">
          {navItems.map((item) =>
            item === 'Categories' ? (
              <details key={item} className="group">
                <summary className="cursor-pointer font-semibold text-[16px] flex items-center justify-between">
                  {item} <ChevronDown size={16} className="inline" />
                </summary>
                <div className="ml-4 mt-2 space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="text-sm text-white hover:text-[#F5DEB3] cursor-pointer"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </details>
            ) : (
              <div
                key={item}
                className={`font-inter text-[16px] font-semibold cursor-pointer hover:text-[#F5DEB3] ${
                  active === item ? 'text-[#F5DEB3]' : ''
                }`}
                onClick={() => {
                  setActive(item);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item}
              </div>
            )
          )}

          <div className="flex flex-col gap-3 pt-4">
            <button className="w-full h-[48px] rounded-[8px] bg-[#1E3A5F] text-white font-bold">
              Sign Up
            </button>
            <button className="w-full h-[48px] rounded-[8px] border border-white text-white font-bold hover:bg-white hover:text-[#1E3A5F]">
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}