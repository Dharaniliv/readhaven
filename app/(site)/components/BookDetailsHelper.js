
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function BookDetailsHelper({
  quantity,
  setQuantity,
  bookId,
  userEmail,
  book,       
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [toggling, setToggling] = useState(false);
  const router = useRouter();

 
  useEffect(() => {
    if (!userEmail) return;
    const key = `wishlist_${userEmail}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    setWishlisted(existing.some(b => b.googleId === bookId));
  }, [userEmail, bookId]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < 9) setQuantity(prev => prev + 1);
  };

  const toggleWishlist = () => {
    if (toggling) return;              
    if (!userEmail) {
      router.replace(`/login?redirect=/book/${bookId}`);

      return;
    }

    setToggling(true);
    const key = `wishlist_${userEmail}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    let updated;

    if (wishlisted) {
     
      updated = existing.filter(b => b.googleId !== bookId);
      toast.info(`${book.title} removed from your wishlist`, {
        className: 'custom-toast'
      });
    } else {
    
      updated = [
        ...existing,
        {
          googleId: book.googleId,
          title: book.title,
          author: book.author,
          price: book.price,
          originalPrice: book.originalPrice,
          image: book.image,
          description: book.description,
          category: book.category,
        },
      ];
      toast.success(`${book.title} added to your wishlist`, {
        className: 'custom-toast'
      });
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setWishlisted(!wishlisted);

   
    setTimeout(() => setToggling(false), 4000);
  };

  return (
    <div className="mt-[20px] sm:mt-[25px] flex items-center gap-[10px] sm:gap-[20px]">
 
      <div className="w-[120px] sm:w-[160px] h-[48px] sm:h-[54px] border border-[#7A4E2D] flex justify-between items-center px-[8px] sm:px-[10px]">
        <Image
          src={quantity > 1 ? '/icons/minus.svg' : '/icons/nominus.svg'}
          alt="minus"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleDecrease}
        />
        <p className="font-inter font-semibold text-[16px] sm:text-[18px] leading-[22px] sm:leading-[24px] tracking-[0.3%]">
          {quantity}
        </p>
        <Image
          src={quantity < 9 ? '/icons/plus.svg' : '/icons/noplus.svg'}
          alt="plus"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleIncrease}
        />
      </div>


      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={toggleWishlist}
        className={`transition-all duration-300 transform ${
          isHovering ? 'scale-110' : ''
        } ${toggling ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Image
          src={wishlisted ? '/icons/wishlist2.svg' : '/icons/wishlist1.svg'}
          alt="wishlist"
          width={24}
          height={24}
          className={`cursor-pointer ${isHovering ? 'opacity-80' : ''}`}
        />
      </div>
    </div>
  );
}
