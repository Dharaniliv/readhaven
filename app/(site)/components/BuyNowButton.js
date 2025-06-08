"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ amount, bookTitle, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "ReadHaven",
        description: `Purchase of ${bookTitle}`,
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
         
        },
        prefill: {},
        theme: {
          color: "#8B5E3C",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={loading}
      className="mt-[25px] sm:mt-[38px] w-full sm:w-[683px] h-[56px] sm:h-[64px] bg-[#8B5E3C] hover:bg-[#7A4E2D] text-white rounded-[6px] font-montserrat font-bold text-[18px] sm:text-[20px] leading-[22px] sm:leading-[22px] tracking-[1px]"
    >
      {loading ? "Processing..." : "BUY NOW"}
    </button>
  );
}
