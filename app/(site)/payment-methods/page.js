export const metadata = {
  title: "Payment Methods",
  description: "Choose your preferred payment method to complete your purchase on ReadHaven.",
};


export default function PaymentMethods() {
    return (
      <div className="bg-[#F5E8D9] px-4 sm:px-6 md:px-20 lg:px-48 pt-[67px] pb-20">
     
        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[48px] text-center text-[#7A4E2D] font-playfair font-bold">
          Payment Methods
        </h1>
  
       
        <div className="mt-[50px] sm:mt-[67px]">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
            1. Accepted Payment Options
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
            At ReadHaven, we provide a variety of <strong>safe and flexible payment methods</strong> to make your shopping experience smooth and convenient.
          </p>
          <ul className="mt-2 list-disc pl-5 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
            <li><strong>Credit/Debit Cards</strong> – We accept all major cards including <strong>Visa, Mastercard, and Rupay</strong>.</li>
            <li><strong>UPI & Digital Wallets</strong> – Seamless payments via <strong>Google Pay, PhonePe, Paytm</strong>, and other UPI-enabled apps.</li>
            <li><strong>Net Banking</strong> – Secure transactions directly from your <strong>internet-enabled bank account</strong>.</li>
            <li><strong>Cash on Delivery (COD)</strong> – Available for selected pin codes to give you extra peace of mind while shopping.</li>
          </ul>
        </div>
  
 
        <div className="mt-[30px] sm:mt-[36px]">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
            2. Secure Payment Processing
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
            We use industry-standard encryption protocols and process all transactions through <strong>trusted and verified payment gateways</strong> to ensure that your data remains confidential and protected at all times.
          </p>
        </div>
  
   
        <div className="mt-[30px] sm:mt-[36px]">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
            3. Currency & Billing
          </h2>
          <ul className="mt-4 list-disc pl-5 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
            <li>All transactions are charged in <strong>Indian Rupees (INR ₹)</strong>.</li>
            <li>Product prices displayed on our website are <strong>inclusive of all applicable taxes and charges</strong>.</li>
            <li>You will receive a detailed <strong>email confirmation and invoice</strong> after each successful payment.</li>
          </ul>
        </div>
  
   
        <div className="mt-[30px] sm:mt-[36px]">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] leading-[30px] sm:leading-[34px] md:leading-[38px] text-[#7A4E2D] font-playfair font-bold">
            4. Payment Issues & Support
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] leading-[26px] sm:leading-[27px] md:leading-[28px] text-[#162B44] font-lora">
            If you encounter any difficulties during the payment process or have questions regarding your transaction, feel free to reach out to our support team at <strong>readhaven2511@gmail.com</strong>. We are here to assist you promptly and ensure a hassle-free shopping experience.
          </p>
        </div>
      </div>
    );
  }
  