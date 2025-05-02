
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/app/(site)/context/CartContext";

export default function BookCard({
  book,
  index,
  wishlistState,
  onToggleWishlist,
  onHoverWishlist,
  onHoverCartButton,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    router.push(`/book/${book.googleId}`);
  };

  const handleAddToCart = () => {
    if (loading) return;
    setLoading(true);

    
    const cartItem = {
      id: book.googleId, 
      title: book.title,
      author: book.author || "Unknown Author",
      price: book.price,
      image: book.image,
    };

    setTimeout(() => {
      addToCart(cartItem);
      setLoading(false);
      toast.success(`${book.title} added to the cart!`, {
        className: "custom-toast",
      });
    }, 1500);
  };


  const cardHoverShadow =
   wishlistState.isHoveringCart
      ? ""
      : "hover:shadow-[0_10px_20px_rgba(0,0,0,0.25)]";

  return (
    <div
      className={`w-full h-[360px] bg-[#D7B899] relative flex flex-col cursor-pointer transition-shadow duration-200 ${cardHoverShadow}`}
      onClick={handleCardClick}
    >

     
      <div className="mt-[16px] mb-0 mx-auto w-[110px] h-[170px] sm:w-[130px] sm:h-[200px] relative drop-shadow-[0px_5px_10px_rgba(0,0,0,0.2)]">
      <Image
  src={book.image}
  alt="Book Cover"
  fill
  sizes="(max-width: 640px) 110px, (max-width: 768px) 130px, 130px"
  className="object-contain select-none pointer-events-none w-auto h-auto"
  draggable={false}
  priority
/>
      </div>

    
      <div className="px-[12px] sm:px-[17px] flex flex-col flex-grow select-none">
        <h2 className="mt-[10px] font-playfair font-bold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[26px] text-black truncate">
          {book.title}
        </h2>
        <p className="mt-[5px] font-inter font-medium text-[14px] sm:text-[16px] leading-[20px] text-[#333333] truncate">
          by {book.author}
        </p>
        <div className="mt-[5px] flex items-center">
          <span className="font-inter font-semibold text-[16px] sm:text-[18px] text-black">
            {book.price}.00
          </span>
          <span className="ml-[8px] mt-[1px] font-inter text-[13px] sm:text-[14px] text-[#888888] line-through">
            {book.originalPrice}.00
          </span>
        </div>
      </div>

      
      <button
        className="mt-[9px] w-full h-[48px] sm:h-[54px] text-white font-montserrat font-semibold text-[18px] sm:text-[20px] bg-[#1E3A5F] hover:bg-[#002244] transition-colors duration-200 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation(); 
          handleAddToCart();
        }}
        onMouseEnter={() => onHoverCartButton(index, true)}
        onMouseLeave={() => onHoverCartButton(index, false)}
        disabled={loading}
      >
        {loading ? (
          <div className="w-[24px] h-[24px] border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin"></div>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
}
