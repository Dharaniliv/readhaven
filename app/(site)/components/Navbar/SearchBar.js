"use client";

import React, { useState, useEffect, useMemo, useRef,  useLayoutEffect } from "react";
import { useRouter, usePathname, } from "next/navigation";
import { Search as SearchIcon,Loader } from "lucide-react";
import { useSearch } from "@/app/(site)/context/SearchContext";
import Image from "next/image";


export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { suggestions, fetchSuggestions, clearSuggestions } = useSearch();
  const inputRef = useRef(null);
  
  const initialTerm = useMemo(() => {
    if (pathname.startsWith("/search/")) {
      return decodeURIComponent(pathname.replace("/search/", "")).replace(
        /-/g,
        " "
      );
    }
    return "";
  }, [pathname]);

  const [term, setTerm] = useState(initialTerm);
  const [focused, setFocused] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [navLoading, setNavLoading] = useState(false);

  useEffect(() => {
    setTerm(initialTerm);
  }, [initialTerm]);



  const onSubmit = (e) => {

    e.preventDefault();
    
    const t = term.trim();
    if (!t) return;
    const slug = t
      .replace(/[^\w\s]/g, "") 
      .replace(/\s+/g, "-")
      .toLowerCase();
  clearSuggestions();
  setTerm(""); 
  document.activeElement.blur();
      router.push(`/search/${slug}`);
      
  };
  
  
const handleSuggestionClick = (id) => {
  clearSuggestions();       
  setTerm("");
  router.push(`/book/${id}`);
};
  
  const handleChange = async (e) => {
    const v = e.target.value;
    setTerm(v);
    setFetchLoading(true);
    try {
      await fetchSuggestions(v);
    } finally {
      setFetchLoading(false);
    }
  };

  const isLoading = fetchLoading || navLoading;

  return (
    <div className="relative w-full h-[80px] md:h-[106px] bg-[#D8C3A5] shadow-[0px_3px_5px_rgba(0,0,0,0.2)] flex justify-center items-center px-4 ">
      <form onSubmit={onSubmit} className="w-full max-w-[1100px]">
        <div className="relative w-full h-[46px] bg-white rounded-[6px] flex items-center px-4">
          <SearchIcon
                    className={`w-5 h-5 mr-2 ${focused || isLoading ? "text-[#7A4E2D]" : "text-[#A08D7D]"} transition-colors duration-200`}
          />
          <input
            type="text"
              name="search"
              autoComplete="off"

            value={term}
            onChange={handleChange}
            placeholder="Search books..."
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setTimeout(() => {
                if (!navLoading) clearSuggestions();
              }, 100);
            }}
            className="w-full h-full outline-none font-montserrat text-[16px] leading-[150%] tracking-[-0.01em] text-[#333333]
              placeholder:text-[#A08D7D] placeholder:font-normal placeholder:translate-y-[1.5px] placeholder:tracking-[-0.01em]"
          />
    {isLoading && (
            <div className="absolute right-4">
              <Loader className="w-5 h-5 animate-spin text-[#7A4E2D]" />
            </div>
          )}

          
{suggestions.length > 0 && (
  <ul className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[6px] shadow-lg z-50 max-h-80 overflow-y-auto">
    {suggestions.map((b) => (
      <li
        key={b.id}
        onMouseDown={() => handleSuggestionClick(b.id)}
        className="flex items-center px-4 py-3 hover:bg-[#F5F5F5] cursor-pointer"
      >
                  <Image
                    src={b.cover}
                    alt={b.title}
                    width={26}
                    height={40}
                    className="object-cover rounded mr-4 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-playfair font-semibold text-[14px] text-[#162B44]">
                      {b.title}
                    </p>
                    <p className="text-[12px] text-[#A08D7D]">{b.author}</p>
                  </div>
                  <div className="flex flex-col items-end ml-4">
                    <span className="font-semibold text-[14px] text-[#162B44]">
                      {b.price}
                    </span>
                    {b.originalPrice && (
                      <span className="text-[12px] text-[#A08D7D] line-through">
                        {b.originalPrice}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
