'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full h-[80px] md:h-[106px] bg-[#D8C3A5] shadow-[0px_3px_5px_rgba(0,0,0,0.2)] flex justify-center items-center px-4">
      <div className="w-full max-w-[1100px] h-[46px] bg-white rounded-[6px] flex items-center px-4">
        <Search
          className={`w-5 h-5 mr-2 transition-colors duration-200 ${
            isFocused ? 'text-[#7A4E2D]' : 'text-[#A08D7D]'
          }`}
        />
        <input
          type="text"
          placeholder="Search books..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full outline-none font-montserrat text-[16px] leading-[150%] tracking-[-0.01em] text-[#333333] focus:font-medium
            placeholder:text-[#A08D7D] placeholder:font-normal placeholder:translate-y-[1.5px] placeholder:tracking-[-0.01em]"
        />
      </div>
    </div>
  );
}
