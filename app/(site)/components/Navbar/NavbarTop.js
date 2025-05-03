
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartSidebar from "../CartSidebar";
import { useCart } from "@/app/(site)/context/CartContext";
import { useSession } from "next-auth/react";  
import { signOut } from 'next-auth/react';


export default function NavbarTop() {
  const { data: session, status } = useSession();       
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { cartItems } = useCart(); 
  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const navItems = ["Home", "Categories", "Contact us", "About us"];
  const categories = [
    "All Books",
    "Best Sellers",
    "Non Fiction",
    "Fiction",
    "Romance",
    "Thriller",
  ];

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const pathname = usePathname();

  const handleLogout = () => {
    setTimeout(() => {
      signOut({ callbackUrl: '/' });
    }, 1500); 
  };

  useEffect(() => {
    if (pathname === "/") setActive("Home");
    else if (pathname.includes("contact")) setActive("Contact us");
    else if (pathname.includes("about")) setActive("About us");
    else setActive("");
  }, [pathname]);

  return (
    <nav className="w-full max-w-[1920px] h-[92px] bg-[#7A4E2D] px-[16px] md:px-[48px] flex items-center justify-between text-[#1E3A5F] relative z-50">
    <Link
  href="/"
  className="flex items-center gap-[10px] cursor-pointer md:order-1 order-2"
  onClick={() => setActive("Home")}
>
  <span className="text-white text-lg md:text-2xl font-bold font-playfair leading-snug tracking-tight">
    ReadHaven
  </span>
  <Image
    src="/icons/Group.svg"
    alt="Logo"
    width={18}
    height={18}
    className="block md:w-[23px] md:h-[23px]"
  />
</Link>

    
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-7 text-white">
        {navItems.map((item) =>
          item === "Categories" ? (
            <div
              key={item}
              className="relative flex items-center gap-1 cursor-pointer z-20"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <span className="cursor-pointer font-inter text-[16px] leading-[24px] tracking-[0.5%] font-semibold hover:text-[#F5DEB3]">
                {item}
              </span>
              <ChevronDown size={16} />
              <div
                className={`absolute left-[-10px] top-full mt-2 bg-white shadow-lg rounded-md px-4 py-2 space-y-1 z-50 w-max transition-all duration-200 ${
                  isCategoryDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {categories.map((category) => {
                  const path = `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`;
                  return (
                    <Link key={category} href={path}>
                      <div
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className={`text-sm text-[#1E3A5F] hover:bg-[#F5DEB3] px-2 py-1 rounded cursor-pointer ${
                          pathname === path ? "bg-[#F5DEB3]" : ""
                        }`}
                      >
                        {category}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <Link
              key={item}
              href={
                item === "Contact us"
                  ? "/contact"
                  : item === "About us"
                  ? "/about"
                  : "/"
              }
              passHref
            >
              <span
                className={`cursor-pointer font-inter text-[16px] leading-[24px] tracking-[0.5%] font-semibold hover:text-[#F5DEB3] ${
                  active === item
                    ? "text-[#F5DEB3] underline decoration-[#F5E8D9] underline-offset-4 decoration-2"
                    : ""
                }`}
                onClick={() => setActive(item)}
              >
                {item}
              </span>
            </Link>
          )
        )}
      </div>

     
      <div className="md:hidden order-1 absolute left-[60%] -translate-x-1/2">
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   
      <div className="flex items-center md:order-3 order-3 gap-4 md:gap-[16px] ml-auto">

<div className="hidden md:flex items-center gap-[16px]">
  {status === "loading" ? (
    <div className="w-[121px] h-[48px] bg-[#1E3A5F] text-white flex items-center justify-center">
      Loading...
    </div>
  ) : session?.user ? (
    session.user.isAdmin ? (
      <>
        <Link
          href="/add-book"
          className="w-[121px] h-[48px] rounded-[8px] bg-[#1E3A5F] text-white hover:bg-[#002244] font-inter text-[16px] font-bold flex items-center justify-center"
        >
          Add Books
        </Link>
        <button onClick={handleLogout}
          className="w-[121px] h-[48px] rounded-[8px] bg-[#1E3A5F] text-white hover:bg-[#002244] font-inter text-[16px] font-bold flex items-center justify-center"
        >
          Logout
        </button>
      </>
    ) : (
      <Link
        href="/my-account"
        className="w-[121px] h-[48px] rounded-[8px] bg-[#1E3A5F] text-white hover:bg-[#002244] font-inter text-[16px] font-bold flex items-center justify-center"
      >
        My Account
      </Link>
    )
  ) : (
    <>
      <Link
        href="/signup"
        className="w-[121px] h-[48px] rounded-[8px] bg-[#1E3A5F] text-white hover:bg-[#002244] font-inter text-[16px] font-bold flex items-center justify-center"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="w-[121px] h-[48px] rounded-[8px] border border-transparent text-white hover:bg-[#E0E8F0] hover:text-[#1E3A5F] font-inter text-[16px] font-bold flex items-center justify-center"
      >
        Log In
      </Link>
    </>
  )}
</div>




     
<div
  className="relative w-[42px] h-[36px] md:w-[50px] md:h-[44px] cursor-pointer flex items-start justify-center"
  onClick={toggleCart}
>
  <Image
    src="/icons/Shopping bag.svg"
    alt="Cart"
    width={42}
    height={36}
    className="absolute top-0 left-0 md:w-[50px] md:h-[44px]"
  />
  {status !== "loading" && (
    <span className="text-[12px] md:text-[14px] text-[#7A4E2D] font-bold z-10 leading-[22px] font-montserrat translate-y-[13px] md:translate-y-[19px]">
      {totalCount}
    </span>
  )}
</div>


      
        {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />}
      </div>

    
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#7A4E2D] text-white py-4 px-6 z-10 space-y-4">
          {navItems.map((item) =>
            item === "Categories" ? (
              <details key={item} className="group ">
                <summary className="cursor-pointer font-semibold text-[16px] flex items-center justify-between">
                  {item} <ChevronDown size={16} />
                </summary>
                <div className="ml-4 mt-2 space-y-2">
                  {categories.map((category) => {
                    const categoryPath = `/categories/${category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`;
                    return (
                      <Link key={category} href={categoryPath}>
                        <div
                          className="text-sm mt-3 text-white hover:text-[#F5DEB3] cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </details>
            ) : (
              <Link
                key={item}
                href={
                  item === "Contact us"
                    ? "/contact"
                    : item === "About us"
                    ? "/about"
                    : "/"
                }
              >
                <div
                  className={`font-inter mt-3 text-[16px] font-semibold cursor-pointer hover:text-[#F5DEB3] ${
                    active === item ? "text-[#F5DEB3]" : ""
                  }`}
                  onClick={() => {
                    setActive(item);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </div>
              </Link>
            )
          )}

        
          <div className="flex flex-col gap-3 pt-4">
            {session?.user ? (
            <Link
            href="/my-account"
            className="w-full h-[48px] bg-[#1E3A5F] rounded-[8px] flex items-center justify-center font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Account
          </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="w-full h-[48px] bg-[#1E3A5F] rounded-[8px] flex items-center justify-center font-bold"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="w-full h-[48px] border border-white rounded-[8px] flex items-center justify-center font-bold hover:bg-white hover:text-[#1E3A5F]"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
