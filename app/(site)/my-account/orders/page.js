"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);
  
  
  useEffect(() => {
  
    if (status === "loading") return;

  
    const storageKey = session?.user?.email
      ? `orders-${session.user.email}`
      : "orders-guest";

    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setOrders(stored);
    setLoaded(true);
  }, [session, status]);

  const hasOrders = orders.length > 0;

  return (
    <div className="min-h-screen bg-[#F8E9D2] py-10 sm:py-14 md:py-16 px-4">

      <h1 className="text-center text-[#7A4E2D] font-playfair font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[48px]">
        My Orders
      </h1>

      {loaded && !hasOrders && (
        <div className="flex justify-center mt-[120px] sm:mt-[120px] md:mt-[200px]">
          <div className="w-full max-w-[681px] h-[265px] bg-[#7A4E2D] rounded-[15px] flex flex-col items-center justify-center px-4">
            <p className="text-white text-center font-playfair font-semibold text-[17px] sm:text-[24px] md:text-[40px] leading-[28px] sm:leading-[34px] md:leading-[48px]">
              You haven’t placed any orders yet
            </p>
            <Link
              href="/categories/all-books"
              className="mt-[40px] sm:mt-[53px] w-full max-w-[551px] h-[56px] sm:h-[64px] bg-[#1E3A5F] hover:bg-[#002244] rounded-[6px] flex items-center justify-center transition-colors duration-300"
            >
              <p className="text-white font-montserrat font-semibold text-[16px] sm:text-[18px] md:text-[20px] leading-[22px]">
                Start Shopping
              </p>
            </Link>
          </div>
        </div>
      )}

      
      {loaded && hasOrders && (
        <div className="max-w-5xl mx-auto mt-[80px]">
          {orders.map((order, idx) => (
            <div key={order.orderId} className={`${idx !== 0 ? "mt-[100px]" : ""}`}>
              <div className="bg-[#834f24] text-white rounded-[15px] overflow-hidden">
          
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/30">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/order1.svg" alt="Order" width={40} height={40} />
                    <span className="font-semibold">Order ID: #{order.orderId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/icons/calender.svg" alt="Date" width={20} height={20} />
                    <span>{order.date}</span>
                  </div>
                </div>

                <div className="divide-y divide-white/20">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.image}
                          alt={item.title}
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
                        <p className="text-sm mt-1">
                          Rs. {item.price * item.quantity}.00
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                
                <div className="flex justify-between items-center px-4 py-3 border-t border-white/30">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/shipped.svg"
                      alt="Processing"
                      width={20}
                      height={20}
                    />
                    <span>Shipped</span>
                  </div>
                  <div className="font-bold">
                    Total: Rs.{" "}
                    {order.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                    .00
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
