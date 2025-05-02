"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function AddToCartButton({
  buttonColor,
  buttonHoverColor,
  onClick,
  book,
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    
    if (loading) return;

    setLoading(true);

    try {
      if (onClick) {
        await onClick(); 
      }
      
      
      setTimeout(() => {
        setLoading(false);
        toast.success(`${book.title} added to the cart!`, {
          className: "custom-toast", 
        });
      }, 0); 
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.", {
        className: "custom-toast-error", 
      });
    }
  };

  return (
    <button
      className="mt-[9px] w-full h-[48px] sm:h-[54px] text-white font-montserrat font-semibold text-[18px] sm:text-[20px] flex items-center justify-center"
      style={{ backgroundColor: buttonColor }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = buttonHoverColor;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = buttonColor;
      }}
      onClick={handleClick}
      disabled={loading} 
    >
      {loading ? (
        <div className="w-[24px] h-[24px] border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin"></div>
      ) : (
        "Add to cart"
      )}
    </button>
  );
}
