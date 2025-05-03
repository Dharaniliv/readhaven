import Link from 'next/link';
import Image from 'next/image';
import './FooterResponsive.css'; 

export default function FooterMain() {
  return (
    <div className="w-full h-[300px] bg-[#7A4E2D] px-4 flex items-center footer-responsive">
   
      <div className="w-[470px] h-[232px] flex flex-col items-center justify-center text-center left-section">
      
      <Link href="/">
  <div className="flex items-center gap-[10px] cursor-pointer">
    <span className="text-white text-[24px] md:text-[24px] font-bold font-playfair leading-snug tracking-tight">
      ReadHaven
    </span>

    <Image
      src="/icons/Group.svg"
      alt="Logo"
      width={23}
      height={23}
      className="block transition-opacity"
    />
  </div>
</Link>


 
        <p className="mt-[16px] text-white font-lora font-medium sm:text-[18px] text-[15px]  leading-[28px] tracking-[0.01em] max-w-[350px]">
          At ReadHaven, we believe every book opens a new world. From timeless classics to modern bestsellers, we bring stories to life with a seamless reading experience. Explore, discover, and immerse yourself in the joy of books—your next adventure starts here.
        </p>
      </div>

      
      <div className="w-[1px] h-[175px] bg-white opacity-60 mt-[50px] ml-[20px] divider" />

 
      <div className="horizontal-divider md:hidden w-full h-[1px] bg-[#C4A484] my-4"></div>

   
      <div className="ml-[90px] flex items-start gap-[80px] middle-right">
       
        <div className="flex gap-[65px] links-columns middle-section">
      
          <div className="flex flex-col">
            <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px]">
              Quick Links:
            </h3>
            <div className="mt-[22px] flex flex-col space-y-[24px]">
              <Link href="/about">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  About Us
                </span>
              </Link>
              <Link href="/contact">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  Contact Us
                </span>
              </Link>
              <Link href="/terms-and-conditions">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  Terms & Conditions
                </span>
              </Link>
              <Link href="/privacy-policy">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  Privacy Policy
                </span>
              </Link>
            </div>
          </div>

         
          <div className="flex flex-col">
            <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px]">
              Support:
            </h3>
            <div className="mt-[22px] flex flex-col space-y-[24px]">
              <Link href="/shipping-returns">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  Shipping & Returns
                </span>
              </Link>
              <Link href="/payment-methods">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  Payment Methods
                </span>
              </Link>
              <Link href="/help-faqs">
                <span className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  Help & FAQs
                </span>
              </Link>
            </div>
          </div>
        </div>

        
        <div className="w-[1px] h-[175px] bg-white opacity-60 mt-[50px] ml-[10px] divider" />

       
        <div className="horizontal-divider-2 md:hidden w-full h-[1px] bg-[#C4A484] my-4"></div>

      
        <div className="flex flex-col ml-[20px] right-section">
          <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px]">
            Get In Touch:
          </h3>

   
          <div className="flex items-center gap-2 mt-[22px]">
            <Image src="/icons/Phone.svg" alt="Phone" width={31} height={30} />
            <span className="text-white font-playfair text-[22px] leading-[30px]">
              - 123–123–0123
            </span>
          </div>

         
          <div className="flex items-center gap-2 mt-[18px]">
            <Image src="/icons/Email.svg" alt="Mail" width={31} height={30} />
            <span className="text-white font-playfair sm:text-[22px] text-[18px] leading-[30px]">
              - readhaven2511@gmail.com
            </span>
          </div>

        
          <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px] mt-[18px]">
            Follow Us:
          </h3>
          <div className="flex items-center gap-[40px] mt-[17px] follow-icons">
 
          <div className="relative w-[30px] h-[30px] cursor-pointer">
  <Image
    src="/icons/Instagram.svg"
    alt="Instagram"
    fill
    className="block transition-opacity"
  />
</div>

<div className="relative w-[30px] h-[30px] cursor-pointer">
  <Image
    src="/icons/Facebook.svg"
    alt="Facebook"
    fill
    className="block transition-opacity"
  />
</div>

<div className="relative w-[30px] h-[30px] cursor-pointer">
  <Image
    src="/icons/Twitter.svg"
    alt="Twitter"
    fill
    className="block transition-opacity"
  />
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
