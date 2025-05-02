'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '@/app/(site)/context/CartContext';

export default function AddToCartButtonWrapper({ book, quantity }) {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (loading) return;
    setLoading(true);

    const safeBook = {
      id: book.googleId || book._id,
      author: book.author || 'Unknown Author',
      title: book.title || 'Unknown Title',
      price: book.price || 0,
      image: book.image || '/path/to/fallback-image.jpg',
      quantity,
    };

    setTimeout(() => {
      addToCart(safeBook);
      setLoading(false);
      toast.success(`${safeBook.title} (x${quantity}) added to the cart!`, {
        className: 'custom-toast',
      });
    }, 1500);
  };

  return (
    <button
      className="mt-[25px] sm:mt-[38px] w-full sm:w-[683px] h-[56px] sm:h-[64px] border-2 border-[#7A4E2D] rounded-[6px] text-[#7A4E2D] hover:bg-[#F5E1C8] font-montserrat font-semibold text-[18px] sm:text-[20px] leading-[22px] sm:leading-[22px] tracking-[1px] relative flex items-center justify-center"
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? (
        <div className="w-[24px] h-[24px] border-4 border-t-4 border-transparent border-t-[#7A4E2D] rounded-full animate-spin"></div>
      ) : (
        'ADD TO CART'
      )}
    </button>
  );
}
