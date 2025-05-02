"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useSession } from "next-auth/react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loaded, setLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [date, setDate] = useState("");
  const { clearCart } = useCart();

  
  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("orderCartItems") || "[]");
    const normalized = raw.map((item) => {
      let p = item.price;
      if (typeof p === "string") {
        const digitsOnly = p.replace(/\D/g, "");
        p = parseInt(digitsOnly, 10) || 0;
      }
      return { ...item, price: p };
    });

    setCartItems(normalized);
    setOrderId("RDH" + Date.now().toString().slice(-8));
    setDate(
      new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    setLoaded(true);
  }, []);

 
  useEffect(() => {
    if (!loaded) return;
    if (cartItems.length === 0) {
      router.replace("/categories/all-books");
    } else {
      localStorage.removeItem("orderCartItems");
    }
  }, [loaded, cartItems, router]);

  
  useEffect(() => {
    const isPaymentSuccess = localStorage.getItem("paymentSuccess");
    if (isPaymentSuccess === "true") {
      clearCart();
      localStorage.removeItem("paymentSuccess");
    }
  }, [clearCart]);


  useEffect(() => {
    if (
      loaded &&
      cartItems.length > 0 &&
      orderId &&
      date &&
      status !== "loading"
    ) {
      const key = session?.user?.email
        ? `orders-${session.user.email}`
        : "orders-guest";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const newOrder = { orderId, date, items: cartItems };
      localStorage.setItem(key, JSON.stringify([...existing, newOrder]));
    }
  }, [loaded, cartItems, orderId, date, status, session]);


  if (!loaded) return null;
  if (cartItems.length === 0) return null;


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl text-center font-semibold text-[#2E7D32] mb-10">
        Order Placed Successfully!
      </h1>

      <Link
        href="/categories/all-books"
        className="flex items-center text-[#8B5E3C] font-medium gap-2 mb-4"
      >
        <Image src="/icons/lefticon.svg" alt="Back" width={20} height={20} />
        <span>Continue Shopping</span>
      </Link>

      <div className="bg-[#834f24] text-white rounded-xl overflow-hidden">
        
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/30">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/order1.svg"
              alt="Order"
              width={40}
              height={40}
            />
            <span className="font-semibold">Order ID: #{orderId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/calender.svg"
              alt="Date"
              width={20}
              height={20}
            />
            <span>{date}</span>
          </div>
        </div>

  
        <div className="divide-y divide-white/20">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={`${item.title} cover`}
                  width={40}
                  height={56}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-white/80">by {item.author}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">× {item.quantity}</p>
                <p className="text-sm mt-1">Rs. {item.price * item.quantity}.00</p>
              </div>
            </div>
          ))}
        </div>


        <div className="flex justify-between items-center px-4 py-3 border-t border-white/30">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/processing.svg"
              alt="Processing"
              width={20}
              height={20}
            />
            <span>Processing</span>
          </div>
          <div className="font-semibold">Total: Rs. {total}.00</div>
        </div>
      </div>
    </div>
  );
}