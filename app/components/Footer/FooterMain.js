import Image from 'next/image';
import './FooterResponsive.css'; // Import the CSS for responsive styles

export default function FooterMain() {
  return (
    <div className="w-full h-[300px] bg-[#7A4E2D] px-4 flex items-center footer-responsive">
      {/* Left Section */}
      <div className="w-[470px] h-[232px] flex flex-col items-center justify-center text-center left-section">
        {/* Logo and Text */}
        <div className="flex items-center gap-[6px] cursor-pointer group">
          <span className="text-white text-[24px] md:text-[24px] font-bold font-playfair leading-snug tracking-tight group-hover:text-[#F5E8D9] transition-colors">
            ReadHaven
          </span>
          <Image
            src="/icons/Group.svg"
            alt="Logo"
            width={23}
            height={23}
            className="block group-hover:hidden transition-opacity"
          />
          <Image
            src="/icons/Group-hover.svg"
            alt="Logo Hover"
            width={23}
            height={23}
            className="hidden group-hover:block transition-opacity"
          />
        </div>

        {/* Paragraph */}
        <p className="mt-[16px] text-white font-lora font-normal text-[18px] leading-[28px] tracking-[0.01em] max-w-[350px]">
          At ReadHaven, we believe every book opens a new world. From timeless classics to modern bestsellers, we bring stories to life with a seamless reading experience. Explore, discover, and immerse yourself in the joy of books—your next adventure starts here.
        </p>
      </div>

      {/* Vertical Divider for Desktop */}
      <div className="w-[1px] h-[175px] bg-white opacity-60 mt-[50px] ml-[20px] divider" />

      {/* Horizontal Divider for Mobile (between Left & Middle+Right) */}
      <div className="horizontal-divider md:hidden w-full h-[1px] bg-[#C4A484] my-4"></div>

      {/* Middle + Right Section */}
      <div className="ml-[90px] flex items-start gap-[80px] middle-right">
        {/* Middle Section - Links Columns */}
        <div className="flex gap-[65px] links-columns middle-section">
          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px]">
              Quick Links:
            </h3>
            <div className="mt-[22px] flex flex-col space-y-[24px]">
              {["About Us", "Contact Us", "Terms & Conditions", "Privacy Policy"].map((text, index) => (
                <span key={index} className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px]">
              Support:
            </h3>
            <div className="mt-[22px] flex flex-col space-y-[24px]">
              {["Shipping & Returns", "Payment Methods", "Help & FAQs"].map((text, index) => (
                <span key={index} className="cursor-pointer text-white font-inter font-medium text-[16px] leading-[24px] tracking-[0.5px] hover:text-[#F5DEB3] transition-colors">
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Divider for Desktop (between Links and Get In Touch) */}
        <div className="w-[1px] h-[175px] bg-white opacity-60 mt-[50px] ml-[10px] divider" />

        {/* Horizontal Divider for Mobile (before Get In Touch) */}
        <div className="horizontal-divider-2 md:hidden w-full h-[1px] bg-[#C4A484] my-4"></div>

        {/* Right Section - Get In Touch */}
        <div className="flex flex-col ml-[20px] right-section">
          <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px]">
            Get In Touch:
          </h3>

          {/* Call */}
          <div className="flex items-center gap-2 mt-[22px]">
            <Image src="/icons/Phone.svg" alt="Phone" width={31} height={30} />
            <span className="text-white font-playfair text-[22px] leading-[30px]">
              - 123–123–0123
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 mt-[18px]">
            <Image src="/icons/Email.svg" alt="Mail" width={31} height={30} />
            <span className="text-white font-playfair text-[22px] leading-[30px]">
              - readhaven2511@gmail.com
            </span>
          </div>

          {/* Follow Us */}
          <h3 className="text-white font-playfair font-semibold text-[22px] leading-[30px] mt-[18px]">
            Follow Us:
          </h3>
          <div className="flex items-center gap-[40px] mt-[17px] follow-icons">
            {/* Instagram */}
            <div className="relative w-[30px] h-[30px] cursor-pointer group">
              <Image
                src="/icons/Instagram.svg"
                alt="Instagram"
                fill
                className="block group-hover:hidden transition-opacity"
              />
              <Image
                src="/icons/Instagram-hover.svg"
                alt="Instagram Hover"
                fill
                className="hidden group-hover:block transition-opacity"
              />
            </div>

            {/* Facebook */}
            <div className="relative w-[30px] h-[30px] cursor-pointer group">
              <Image
                src="/icons/Facebook.svg"
                alt="Facebook"
                fill
                className="block group-hover:hidden transition-opacity"
              />
              <Image
                src="/icons/Facebook-hover.svg"
                alt="Facebook Hover"
                fill
                className="hidden group-hover:block transition-opacity"
              />
            </div>

            {/* Twitter */}
            <div className="relative w-[30px] h-[30px] cursor-pointer group">
              <Image
                src="/icons/Twitter.svg"
                alt="Twitter"
                fill
                className="block group-hover:hidden transition-opacity"
              />
              <Image
                src="/icons/Twitter-hover.svg"
                alt="Twitter Hover"
                fill
                className="hidden group-hover:block transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
