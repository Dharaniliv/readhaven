"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext"; 
import AddToCartButton from "./AddToCartButton";

export default function BookCarousel({
  books = [],
  bgColor = "#7A4E2D",
  buttonColor = "#1E3A5F",
  buttonHoverColor = "#002244",
}) {
  const { addToCart, cartItems } = useCart(); 

  const handleAddToCart = (book) => {
    return new Promise((resolve) => {
      if (
        !book ||
        !book.googleId ||
        !book.title ||
        !book.price ||
        !book.image
      ) {
        
        return resolve();
      }

      setTimeout(() => {
        const cartItem = {
          id: book.googleId,
          title: book.title,
          author: book.author || "Unknown Author",
          price: book.price, 
          image: book.image,
          quantity: 1,
        };

        addToCart(cartItem);
        resolve();
      }, 1500);
    });
  };

  const cardWidth = 249 + 30; 
  const scrollContainerRef = useRef(null);

  const [wishlistStates, setWishlistStates] = useState([]);
  useEffect(() => {
    if (wishlistStates.length !== books.length) {
      setWishlistStates(
        books.map(() => ({ isWishlisted: false, isHovering: false }))
      );
    }
  }, [books, wishlistStates.length]);

  const toggleWishlist = (index) => {
    setWishlistStates((prev) =>
      prev.map((state, i) =>
        i === index ? { ...state, isWishlisted: !state.isWishlisted } : state
      )
    );
  };

  const setHoverState = (index, hovering) => {
    setWishlistStates((prev) =>
      prev.map((state, i) =>
        i === index ? { ...state, isHovering: hovering } : state
      )
    );
  };

  const getWishlistIcon = (state) => {
    if (!state) return "/icons/wishlist1.svg";
    if (state.isWishlisted) {
      return state.isHovering
        ? "/icons/wishlist2hover.svg"
        : "/icons/wishlist2.svg";
    }
    return state.isHovering
      ? "/icons/wishlist1hover.svg"
      : "/icons/wishlist1.svg";
  };

  const [isDragging, setIsDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const getCursor = () => {
    if (isDragging) return "cursor-grabbing";
    return "cursor-grab";
  };

  const updateArrowState = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

   
      setAtStart(scrollLeft <= 30);
      setAtEnd(scrollLeft >= maxScrollLeft - 30);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateArrowState();
    container.addEventListener("scroll", updateArrowState);
    return () => {
      container.removeEventListener("scroll", updateArrowState);
    };
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: -cardWidth * 2, behavior: "smooth" });
    setTimeout(updateArrowState, 400); 
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
    setTimeout(updateArrowState, 400); 
  };

  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    container.isDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    const container = scrollContainerRef.current;
    container.isDown = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    const container = scrollContainerRef.current;
    container.isDown = false;
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    const container = scrollContainerRef.current;
    if (!container.isDown) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 1.5;
    container.scrollLeft = container.scrollLeftStart - walk;

    updateArrowState(); 
  };

  if (wishlistStates.length !== books.length) return null;

  return (
    <div
      className="w-full h-[480px] flex items-center px-4 sm:px-6 relative select-none"
      style={{ backgroundColor: bgColor }}
    >
      {!atStart && (
        <div className="hidden sm:block absolute left-[64px] sm:left-[84px] top-[60px] h-[360px] w-[30px] z-10 pointer-events-none bg-gradient-to-r from-black/10 to-transparent" />
      )}
      {!atEnd && (
        <div className="hidden sm:block absolute right-[64px] sm:right-[84px] top-[60px] h-[360px] w-[30px] z-10 pointer-events-none bg-gradient-to-l from-black/10 to-transparent" />
      )}

      <div
        className="hidden sm:block cursor-pointer shrink-0 mr-[12px] sm:mr-[20px]"
        onClick={scrollLeft}
      >
      <div className="relative w-[40px] h-[40px]">
  <Image
    src={atStart ? "/icons/leftarrow.svg" : "/icons/leftarrowhover.svg"}
    alt="Left Arrow"
    fill
    className="object-contain"
  />
</div>

      </div>

      <div
        ref={scrollContainerRef}
        className={`flex gap-[20px] sm:gap-[27px] overflow-x-auto scrollbar-hide ${getCursor()} w-full`}
        style={{ scrollBehavior: "smooth", userSelect: "none" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {books.map((book, index) => {
          const state = wishlistStates[index];
          return (
            <div
              key={book.googleId || index}
              className="w-[200px] sm:w-[249px] h-[360px] bg-[#D7B899] shadow-[0_10px_20px_rgba(0,0,0,0.25)] relative flex flex-col shrink-0"
            >
             

             
              <Link
                href={`/book/${book.googleId}`} 
                className="mt-[16px] mx-auto w-[110px] sm:w-[130px] h-[170px] sm:h-[200px] drop-shadow-[0px_5px_10px_rgba(0,0,0,0.2)] relative"
                onMouseDown={(e) => e.preventDefault()} 
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 110px, (max-width: 768px) 130px, 130px"
                  className="object-contain select-none pointer-events-none"
                  draggable={false}
                  priority
                />
              </Link>

              <div className="px-[12px] sm:px-[17px] flex flex-col flex-grow">
                <h2 className="mt-[10px] font-playfair font-bold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[26px] text-black overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {book.title}
                </h2>
                <p className="mt-[5px] font-inter font-medium text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] text-[#333333] overflow-hidden text-ellipsis whitespace-nowrap w-full">
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

              <AddToCartButton
                buttonColor={buttonColor}
                buttonHoverColor={buttonHoverColor}
                onClick={() => handleAddToCart(book)} 
                book={book}
              />
            </div>
          );
        })}
      </div>

      <div
        className="hidden sm:block cursor-pointer shrink-0 ml-[12px] sm:ml-[20px]"
        onClick={scrollRight}
      >
        <div className="relative w-[40px] h-[40px]">
        <Image
          src={atEnd ? "/icons/rightarrow.svg" : "/icons/rightarrowhover.svg"}
          alt="Right Arrow"
           fill
    className="object-contain"
        />
        </div>
      </div>
    </div>
  );
}
