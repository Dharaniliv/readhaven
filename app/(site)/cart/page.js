"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import EmptyCart from "../components/EmptyCard";
import { useCart } from "@/app/(site)/context/CartContext";
import { toast } from "react-toastify"; 
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { data: session, status } = useSession();
  
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const maxQuantity = 9;

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  

const loadRazorpayScript = () =>
  new Promise((resolve) => {
   
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
  
  


  useEffect(() => setMounted(true), []);

  


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?redirect=/cart`);

    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  if (!mounted) return null;
  if (cartItems.length === 0) return <EmptyCart />;

  if (status === "loading") return null;

 
  const handleCheckout = async () => {
    setIsCheckingOut(true); 
  
   
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const payload = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      quantity: item.quantity,
      image: item.image || "/default-book-image.jpg",
    }));
    localStorage.setItem("orderCartItems", JSON.stringify(payload));
  
  
    let orderData;
    try {
      const res = await fetch("/api/razorpay-order", {
        method: "POST",
      });
      orderData = await res.json();
      if (!orderData.orderId) {
        toast.error("Failed to create Razorpay order.");
        setIsCheckingOut(false);
        return;
      }
    } catch (err) {
      toast.error("Payment initialization failed.");
      setIsCheckingOut(false);
      return;
    }
  
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      setIsCheckingOut(false);
      return;
    }
  
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 10 * 100,
      currency: "INR",
      name: "ReadHaven",
      description: "Fixed ₹10 charge",
      order_id: orderData.orderId,
      handler(response) {
       
      
        
        localStorage.setItem("paymentSuccess", "true");
      
      
        localStorage.setItem("razorpayPaymentId", response.razorpay_payment_id);
      
      
        setTimeout(() => router.push("/ordersuccess"), 2000);
      },
      
      prefill: {
        name: "User",
        email: "user@example.com",
        contact: "1234567890",
      },
      theme: { color: "#7A4E2D" },
      modal: {
        ondismiss: () => setIsCheckingOut(false), 
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
    setIsCheckingOut(false);
  };
  


 
  const initialHeight = isMobile ? 420 : 250;
  const rowHeight = isMobile ? 420 : 190;
  const boxHeight =
    initialHeight + Math.max(0, cartItems.length - 1) * rowHeight;
   
 
  const totalPrice = cartItems.reduce((sum, item) => {
    const parsed = parseFloat(String(item.price).replace(/[^0-9]/g, "")) || 0;
    const safePrice = Math.round(parsed);
    return sum + safePrice * item.quantity;
  }, 0);

  return (
    <>
      <div className="flex flex-col items-center px-4 sm:px-10 pb-20">
        <div className="h-[57px]" />
        <h1 className="text-[#7A4E2D] font-['Playfair_Display'] font-bold text-3xl sm:text-[40px] leading-[40px] sm:leading-[48px]">
          Your Cart
        </h1>
        <div className="h-[50px] sm:h-[94px]" />

        <div className="w-full max-w-[1229px]">
          <Link
            href="/categories/all-books"
            className="flex items-center gap-2 mb-6"
          >
            <Image
              src="/icons/lefticon.svg"
              alt="Back"
              width={24}
              height={24}
            />
            <span className="text-[#7A4E2D] font-['Montserrat'] font-semibold text-lg sm:text-[20px]">
              Continue Shopping
            </span>
          </Link>

          <div
            className="bg-[#7A4E2D] rounded-[10px] px-4 sm:px-[35px] pt-6 sm:pt-[35px] text-white relative"
            style={{ height: `${boxHeight}px` }}
          >
           
            <div className="hidden sm:flex items-center font-['Inter'] font-bold text-[24px] leading-[24px] tracking-[0.003em]">
              <div>Product Details</div>
              <div className="ml-[390px]">Price</div>
              <div className="ml-[145px]">Quantity</div>
              <div className="ml-[155px]">Total</div>
            </div>
            <div className="hidden sm:block h-[19px]" />
            <div className="hidden sm:block absolute top-[80px] left-0 right-0 border-t-[2px] border-white" />
            <div className="hidden sm:block h-[26px]" />

            
            {cartItems.map((item) => {
              const parsed =
                parseFloat(String(item.price).replace(/[^0-9]/g, "")) || 0;
              const safePrice = Math.round(parsed);
              const lineTotal = safePrice * item.quantity;
              const isDeleting = deletingId === item.id;
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[55px] mb-16 sm:mb-[80px] text-center sm:text-left"
                >
                  <Link href={`/book/${item.id}`} passHref>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={70}
                      height={107}
                      className="object-cover cursor-pointer"
                    />
                  </Link>

                  <div className="flex flex-col justify-center sm:flex-grow">
                    <h2 className="text-white font-['Playfair_Display'] font-semibold text-lg sm:text-[20px] leading-[26px] sm:leading-[30px] max-w-[31ch] sm:max-w-[20ch] break-words">
                      {item.title}
                    </h2>
                    {item.author && (
                      <p className="text-white font-['Inter'] font-medium text-sm sm:text-[14px] leading-[20px] sm:leading-[28px] tracking-[0.003em]">
                        by {item.author}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 sm:mt-0 sm:ml-[90px] flex-shrink-0">
                    <p className="text-white font-['Inter'] font-semibold text-base sm:text-[18px] leading-[20px] tracking-[0.003em]">
                      Rs. {safePrice}.00
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-[42px] mt-2 sm:mt-0">
                    <div className="border-[2px] border-white rounded-[5px] px-3 sm:px-[16px] py-3 w-[120px] sm:w-[160px] h-[50px] flex items-center justify-between ml-0 sm:ml-[55px]">
                      <Image
                        src={
                          item.quantity > 1
                            ? "/icons/minus2.svg"
                            : "/icons/nominus2.svg"
                        }
                        alt="Decrease"
                        width={20}
                        height={20}
                        className={
                          item.quantity <= 1
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      />
                      <span className="text-white font-['Inter'] font-semibold text-base sm:text-[18px]">
                        {item.quantity}
                      </span>
                      <Image
                        src={
                          item.quantity < maxQuantity
                            ? "/icons/plus2.svg"
                            : "/icons/noplus2.svg"
                        }
                        alt="Increase"
                        width={20}
                        height={20}
                        className={
                          item.quantity >= maxQuantity
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
                        onClick={() =>
                          item.quantity < maxQuantity &&
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 sm:ml-[50px] mt-4 sm:mt-0">
                    <div className="text-white font-['Inter'] font-bold text-base sm:text-[18px]">
                      Rs. {lineTotal}.00
                    </div>
                    {isDeleting ? (
                      <div className="loader"></div>
                    ) : (
                      <Image
                        src="/icons/bin2.svg"
                        alt="Delete"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={() => {
                          setDeletingId(item.id);
                          setTimeout(() => {
                            removeFromCart(item.id);
                            setDeletingId(null);
                            toast.success(
                              `${item.title} deleted from the cart!`,
                              {
                                className: "custom-toast",
                              }
                            );
                          }, 1000);
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>


          <div className="bg-[#7A4E2D] rounded-[15px] w-full sm:w-[586px] text-white flex flex-col justify-between px-6 sm:px-[35px] py-6 sm:py-[35px] mt-[70px] ml-auto">
            <div className="flex justify-between items-center">
              <h2 className="font-['Playfair_Display'] font-bold text-xl sm:text-[28px] leading-[32px] sm:leading-[38px]">
                Subtotal
              </h2>
              <p className="font-['Inter'] font-bold text-xl sm:text-[28px]">
                Rs. {totalPrice}.00
              </p>
            </div>

            <div className="h-[24px]" />

            <div className="flex justify-between items-center text-xl sm:text-[28px] leading-[32px] sm:leading-[38px]">
              <h2 className="font-['Playfair_Display'] font-bold text-xl sm:text-[28px]">
                Discount
              </h2>
              <p className="font-['Inter'] font-bold text-green-500 text-xl sm:text-[28px]">
                - Rs. 100.00
              </p>
            </div>

            <div className="h-[24px]" />

            <div className="flex justify-between items-center text-xl sm:text-[28px] leading-[32px] sm:leading-[38px]">
              <h2 className="font-['Playfair_Display'] font-bold text-xl sm:text-[28px]">
                Shipping
              </h2>
              <p className="font-['Inter'] font-bold text-xl sm:text-[28px]">
                Rs. 50.00
              </p>
            </div>

            <div className="mt-[24px] -mx-6 sm:-mx-[35px]">
              <div className="h-[1px] w-full bg-white" />
            </div>

            <div className="flex justify-between items-center text-xl sm:text-[28px] leading-[32px] sm:leading-[38px] mt-[21px]">
              <h2 className="font-['Playfair_Display'] font-extrabold text-xl sm:text-[28px]">
                Total
              </h2>
              <p className="font-['Inter'] font-extrabold text-xl sm:text-[28px]">
                Rs. {totalPrice - 100 + 50}.00
              </p>
            </div>

            <div className="mt-[21px] -mx-6 sm:-mx-[35px]">
              <div className="h-[1px] w-full bg-white" />
            </div>

            <div className="mt-[38px] flex justify-center">
            <button
  onClick={handleCheckout}
  disabled={isCheckingOut}
  className="bg-[#1E3A5F] w-full sm:w-[551px] h-[60px] sm:h-[71px] rounded-[6px] text-white hover:bg-[#002244] font-['Montserrat'] text-lg sm:text-[24px] font-extrabold tracking-[0.01em] flex items-center justify-center"
>
  {isCheckingOut ? (
    <div className="loaderButton" />
  ) : (
    "CHECKOUT"
  )}
</button>




            </div>
          </div>
        </div>
      </div>

  
      <style jsx>{`
  .loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #fff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  .loaderButton {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #fff;
    border-radius: 50%;
    width: 22px;
    height: 22px;
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

    </>
  );
}
