export const metadata = {
  title: "Shipping & Returns",
  description: "Learn about ReadHaven's shipping policies, delivery options, and how to return items with ease.",
};

import React from 'react';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-[#F5E8D9] px-4 sm:px-6 md:px-20 lg:px-48 pt-[67px] pb-20">
   
      <h1 className="text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[48px] text-center text-[#7A4E2D] font-playfair font-bold">
        Shipping & Returns Policy
      </h1>

 
      <div className="mt-[50px] sm:mt-[67px]">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
          1. Shipping Information
        </h2>
        <ul className="mt-4 list-disc pl-5 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
          <li><strong>Processing Time</strong> – Orders are processed within <strong>1-2 business days</strong>.</li>
          <li><strong>Delivery Time</strong> – Estimated delivery is <strong>3-7 business days</strong>, depending on location.</li>
          <li><strong>Shipping Charges</strong> – Free shipping on orders above <strong>₹799</strong>. Standard shipping fees apply for other orders.</li>
          <li><strong>Tracking</strong> – A tracking link will be sent via email once your order is shipped.</li>
        </ul>
      </div>

    
      <div className="mt-[30px] sm:mt-[36px]">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
          2. Return & Refund Policy
        </h2>
        <ul className="mt-4 list-disc pl-5 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
          <li><strong>Eligibility for Returns</strong> – Items can be returned within <strong>7 days of delivery</strong> if they meet the return criteria.</li>
          <li><strong>Return Criteria</strong> – Books must be unused, undamaged, and returned in their original packaging.</li>
          <li><strong>Non-Returnable Items</strong> – Digital products, eBooks, and gift cards are non-refundable.</li>
        </ul>
      </div>

    
      <div className="mt-[30px] sm:mt-[36px]">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
          3. Refund Process
        </h2>
        <ul className="mt-4 list-disc pl-5 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
          <li><strong>Inspection</strong> – Once we receive your returned item, we will inspect it within <strong>3 business days</strong>.</li>
          <li><strong>Refund Method</strong> – Refunds will be issued to the original payment method within <strong>5-7 business days</strong>.</li>
          <li><strong>Exchange Option</strong> – If eligible, you can opt for a replacement instead of a refund.</li>
        </ul>
      </div>

   
      <div className="mt-[30px] sm:mt-[36px]">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
          4. Cancellations
        </h2>
        <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
          Orders can be canceled <strong>within 24 hours</strong> of purchase. After this period, cancellations may not be possible if the order is already shipped.
        </p>
      </div>


      <div className="mt-[30px] sm:mt-[36px]">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
          5. Contact Us
        </h2>
        <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
          For any queries related to shipping or returns, reach out to <strong>support@readhaven.com</strong>.
        </p>
      </div>
    </div>
  );
}
