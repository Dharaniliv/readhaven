"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ amount, bookTitle }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);


  useEffect(() => {
    if (document.getElementById("razorpay-sdk")) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setScriptReady(true);
    script.onerror = () => {
      alert("Failed to load payment gateway. Please try again later.");
    };
    document.body.appendChild(script);
  }, []);

  const handleBuyNow = async () => {

    if (status === "loading") return;
   
    if (!session) {
      router.push(`/login?redirect=${window.location.pathname}`);
      return;
    }
   
    if (!scriptReady) {
      alert("Payment gateway is not ready yet. Please wait a moment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }),
      });
      const { orderId, error } = await res.json();
      if (!orderId) throw new Error(error || "Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "ReadHaven",
        description: `Purchase of ${bookTitle}`,
        order_id: orderId,
        handler(response) {
          alert("Payment successful! ID: " + response.razorpay_payment_id);
          router.push("/ordersuccess");
        },
        prefill: {
          name: session.user?.name || "",
          email: session.user?.email || "",
        },
        theme: { color: "#7A4E2D" },
        modal: { ondismiss: () => setLoading(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message);
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
      {loading ? "Processing…" : "BUY NOW"}
    </button>
  );
}
