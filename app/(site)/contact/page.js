'use client';
import { useState } from "react";
import Image from "next/image";


export default function ContactPage() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [formError, setFormError] = useState("");
  

  const isEmailActive = emailFocused || emailValue !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailValue.trim() || !nameValue.trim() || !messageValue.trim()) {
      setFormError("Please fill in all the fields before submitting.");
      return;
    }

    setFormError("");
    alert("Your message has been sent to the ReadHaven team! 📬");

    setEmailValue("");
    setNameValue("");
    setMessageValue("");
  };

  return (
    <>
   
      <div className="bg-[#F5E8D9] pt-[67px] px-4 sm:px-6">
        <h1 className="text-[#7A4E2D] text-[32px] sm:text-[40px] leading-[40px] font-playfair font-bold text-center mb-[67px]">
          Contact Us
        </h1>
      </div>

   
      <div className="w-full bg-[#7A4E2D] py-10 flex justify-center">
        <div className="w-full max-w-[1280px] px-4 md:px-10 flex justify-center">
          <div className="bg-[#F5E8D9] w-full max-w-[800px] rounded-xl flex flex-col items-center py-10 px-4 sm:px-6 md:px-12">
       
            <h2 className="text-[#7A4E2D] text-[18px] sm:text-[24px] leading-[28px] sm:leading-[30px] font-playfair font-medium text-center mb-[10px] sm:mb-[15px]">
              Have questions or need help?
            </h2>
            <h3 className="text-[#162B44] text-[28px] sm:text-[40px] leading-[36px] sm:leading-[48px] font-playfair font-bold text-center mb-[25px] sm:mb-[30px]">
              We’d love to hear from you!
            </h3>

            {formError && (
              <p className="text-red-600 text-[14px] font-inter font-medium mb-4 text-center">
                {formError}
              </p>
            )}

       
            <form className="w-full max-w-[505px] flex flex-col gap-[20px] sm:gap-[26px]" onSubmit={handleSubmit}>
           
              <div className="flex flex-col gap-[4px]">
                <label className="text-[#5A3E36] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full h-[46px] sm:h-[52px] px-4 pr-12 py-[9px] border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-montserrat text-[15px] sm:text-[16px] tracking-[-0.01em] focus:outline-none"
                  />
                  <Image
                    src={isEmailActive ? "/icons/Emailcontacthover.svg" : "/icons/Emailcontact.svg"}
                    alt="Email Icon"
                    width={28}
                    height={28}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-[28px] h-[28px]"
             draggable="false"
                  />
                </div>
              </div>

           
              <div className="flex flex-col gap-[4px]">
                <label className="text-[#5A3E36] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="w-full h-[46px] sm:h-[52px] px-4 py-[9px] border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-montserrat text-[15px] sm:text-[16px] tracking-[-0.01em] focus:outline-none"
                />
              </div>

              
              <div className="flex flex-col gap-[4px]">
                <label className="text-[#5A3E36] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your message here"
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  className="w-full h-[110px] sm:h-[127px] px-4 py-[9px] border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-montserrat text-[15px] sm:text-[16px] tracking-[-0.01em] resize-none focus:outline-none"
                />
              </div>

            
              <button
                type="submit"
                className="w-full h-[46px] sm:h-[50px] bg-[#8B5E3C] hover:bg-[#7A4E2D] text-white rounded-[8px] px-6 py-3 font-montserrat font-semibold text-[15px] sm:text-[16px] tracking-[0.01em] transition-colors"
              >
                Send Message
              </button>
            </form>

      
            <div className="flex items-center justify-center gap-[18px] mt-[45px] sm:mt-[56px] mb-[40px] sm:mb-[47px] w-full max-w-[505px]">
              <div className="flex-grow h-[1px] bg-[#7A4E2D]" />
              <span className="text-[#7A4E2D] font-inter text-[14px] leading-[20px]">OR</span>
              <div className="flex-grow h-[1px] bg-[#7A4E2D]" />
            </div>

      
            <div className="flex flex-col gap-[22px] items-center sm:items-start w-full max-w-[505px] text-center sm:text-left">
              <h3 className="text-[#162B44] font-playfair text-[20px] sm:text-[24px] leading-[30px] font-medium">
                Other Contact Options:
              </h3>

       
              <div className="flex items-center gap-2">
                <Image src="/icons/Phonecontact.svg" alt="Phone" width={26} height={26} className="sm:w-[31px] sm:h-[30px]" />
                <span className="text-[#7A4E2D] font-playfair text-[18px] sm:text-[22px] leading-[30px]">- 123–123–0123</span>
              </div>

              
              <div className="flex items-center gap-2">
                <Image src="/icons/Emailcontacthover.svg" alt="Email" width={26} height={26} className="sm:w-[31px] sm:h-[30px]" />
                <span className="text-[#7A4E2D] font-playfair text-[18px] sm:text-[22px] leading-[30px]">- readhaven2511@gmail.com</span>
              </div>

           
              <div className="w-full flex flex-col items-center sm:items-start">
                <h3 className="text-[#162B44] font-playfair text-[20px] sm:text-[24px] leading-[30px] font-medium mb-[14px] sm:mb-[17px]">
                  Follow Us:
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-[30px] sm:gap-[40px]">
              
               <div className="relative w-[30px] h-[30px] cursor-pointer">
  <Image
    src="/icons/Instagramabouthover.svg"
    alt="Instagram"
    fill
    className="block transition-opacity"
  />
</div>

<div className="relative w-[30px] h-[30px] cursor-pointer">
  <Image
    src="/icons/Facebookabouthover.svg"
    alt="Facebook"
    fill
    className="block transition-opacity"
  />
</div>

<div className="relative w-[30px] h-[30px] cursor-pointer">
  <Image
    src="/icons/Twitterabouthover.svg"
    alt="Twitter"
    fill
    className="block transition-opacity"
  />
</div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
