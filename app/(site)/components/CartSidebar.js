"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "../context/CartContext"; 

import CancelIcon from "@/public/icons/cancel.svg";
import MinusIcon from "@/public/icons/minus.svg";
import NoMinusIcon from "@/public/icons/nominus.svg";
import PlusIcon from "@/public/icons/plus.svg";
import NoPlusIcon from "@/public/icons/noplus.svg";
import BinIcon from "@/public/icons/bin.svg";
import Book1 from "@/public/images/book1.png"; 


const CartItem = ({
  id,
  title,
  author,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
  onRemove,
  loading,
  onClose,
}) => {
  const maxQuantity = 9;
  const safePrice = parseFloat(String(price).replace("Rs.", "").trim()) || 0;

  return (
    <div className="flex items-start gap-[24px] mb-[24px] w-full relative">
      <Link href={`/book/${id}`} className="cursor-pointer" onClick={onClose}>
        <Image
          src={image || Book1}
          alt="Book"
          width={80}
          height={120}
          className="object-cover rounded"
        />
      </Link>

      <div className="flex-1">
        <p className="text-[#7A4E2D] font-inter font-semibold text-[14px] sm:text-[16px] leading-[22px]">
          {title}
        </p>
        <p className="text-[#7A4E2D] font-inter font-medium text-[12px] sm:text-[14px] mt-[3px]">
          by {author}
        </p>
        <p className="text-[#7A4E2D] font-inter font-semibold text-[12px] sm:text-[14px] mt-[5px]">
          {`${quantity} × ₹${safePrice.toFixed(2)}`}
        </p>

        <div className="mt-[12px] flex items-center justify-between w-[120px] h-[40px] border border-[#7A4E2D]">
          <button
            className="w-1/3 flex justify-center items-center"
            onClick={onDecrease}
            disabled={quantity === 1 || loading}
          >
            <Image
              src={quantity === 1 ? NoMinusIcon : MinusIcon}
              alt="Minus"
              width={20}
              height={20}
            />
          </button>
          <div className="w-1/3 text-center font-inter text-[#7A4E2D] text-[14px] sm:text-[16px]">
            {quantity}
          </div>
          <button
            className="w-1/3 flex justify-center items-center"
            onClick={onIncrease}
            disabled={quantity === maxQuantity || loading}
          >
            <Image
              src={quantity === maxQuantity ? NoPlusIcon : PlusIcon}
              alt="Plus"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

   
      <div
        className={`mt-[12px] ml-[10px] cursor-pointer ${loading ? "pointer-events-none" : ""}`}
        onClick={loading ? undefined : onRemove}
      >
        {loading ? (
          <div className="spinner"></div> 
        ) : (
          <Image src={BinIcon} alt="Remove" width={18} height={18} />
        )}
      </div>

   
      <style jsx>{`
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #7a4e2d;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};


const CartSidebar = ({ onClose, isOpen }) => {
  const sidebarRef = useRef();
  const router = useRouter();

  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);
 

 
  const increaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

 
  const removeItem = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setLoadingId(null); 
    }, 1000); 
  };

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const priceString = String(item.price); 
      const safePrice = parseFloat(priceString.replace("Rs.", "").trim()) || 0; 
      return acc + safePrice * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

        
          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed right-0 top-0 h-screen w-[90%] sm:w-[400px] bg-[#FDF1E7] shadow-lg z-50 flex flex-col"
          >
            <div className="p-[20px] sm:p-[26px] flex justify-between items-center">
              <h2 className="text-[24px] sm:text-[32px] leading-[28px] sm:leading-[38px] text-[#7A4E2D] font-playfair font-semibold">
                My Cart
              </h2>
              <button onClick={onClose}>
                <Image
                  src={CancelIcon}
                  alt="Close"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </div>

            <div className="mt-[1px] h-[1px] bg-[#7A4E2D] w-full" />

            
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-[90%] max-w-[280px] bg-[#7A4E2D] rounded-[15px] text-center px-4 py-6">
                  <p className="text-white font-playfair font-semibold text-[18px]">
                    Your cart is empty!
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      router.push("/categories/all-books");
                    }}
                    className="w-[80%] mt-[20px] h-[50px] bg-[#1E3A5F] text-white font-montserrat font-semibold rounded-[6px]"
                  >
                    Browse All Books
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1 px-[20px] pt-[30px]">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.title}-${item.author}`}>
                    <CartItem
                      id={item.id}
                      title={item.title}
                      author={item.author}
                      quantity={item.quantity}
                      price={item.price}
                      image={item.image}
                      onIncrease={() => increaseQty(item.id)}
                      onDecrease={() => decreaseQty(item.id)}
                      onRemove={() => removeItem(item.id)}
                      loading={loadingId === item.id}
                      onClose={onClose}
                    />
                    <div className="h-[1px] bg-[#7A4E2D] w-full mb-[24px]" />
                  </div>
                ))}
              </div>
            )}

          
            {cartItems.length !== 0 && (
              <>
                <div className="mt-[20px] h-[1px] bg-[#7A4E2D] w-full" />
                <div className="text-center text-[#7A4E2D] text-[20px] font-bold mt-[16px]">
                  Subtotal: ₹{Number(total).toFixed(2)}
                </div>
                <div className="mt-[20px] h-[1px] w-full bg-[#7A4E2D]" />
                <div className="flex justify-center mt-[24px] mb-[20px]">
                  <button
                    onClick={() => {
                      onClose();
                      router.push("/cart");
                    }}
                    className="w-[80%] h-[48px] bg-[#7A4E2D] text-white rounded-[6px] font-semibold"
                  >
                    View Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
