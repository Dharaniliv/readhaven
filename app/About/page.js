import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-[#F5E8D9] px-4 md:px-20 py-16">
      {/* About Us Title */}
      <h1 className="text-[#7A4E2D] text-[40px] leading-[40px] font-playfair font-bold text-center mb-[67px] ">
        About Us
      </h1>

      {/* Welcome Heading */}
      <h2 className="text-[#7A4E2D] text-[30px] leading-[120%] font-playfair font-bold text-center mb-[20px]">
        Welcome to ReadHaven – Your Gateway to Endless Stories!
      </h2>

      {/* Full-width Paragraph */}
      <p className="text-[#162B44] text-[20px] leading-[160%] font-lora text-left mb-[60px]">
        At ReadHaven, we believe in the magic of books—their ability to transport us to new worlds, spark our imagination, and enrich our minds. Whether you're a lifelong reader or just beginning your journey, ReadHaven is here to be your trusted companion in the world of books. Our platform is designed with the reader in mind—simple, elegant, and filled with stories that captivate and inspire. Join us as we turn every page into a new adventure.
      </p>

      {/* Our Story Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-start -mt-[60px]">
        {/* Left Side */}
        <div className="flex-1 mt-[225px] relative">
          <h3 className="text-[#7A4E2D] text-[32px] leading-[38px] font-playfair font-bold mb-[15px] text-center">
            Our Story
          </h3>

          <div className="mt-4">
            <p className="text-[#162B44] text-[18px] leading-[28px] font-lora mb-[20px]">
              ReadHaven was founded with a simple vision: to create a haven for book lovers where they can explore, discover, and shop for their next great read with ease. We understand that books are more than just words on a page—they are experiences, emotions, and adventures waiting to unfold.
            </p>
            <p className="text-[#162B44] text-[18px] leading-[28px] font-lora">
              With a carefully curated collection spanning all genres, from timeless classics to the latest bestsellers, we strive to make reading more accessible, affordable, and enjoyable for everyone.
            </p>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 flex justify-center self-start pt-4">
          <Image
            src="/illustrations/Aboutusimage.svg"
            alt="About Us Illustration"
            width={710}
            height={710}
            className="w-full max-w-[710px] h-auto"
            priority
          />
        </div>
      </div>

      {/* What We Offer & Community Section */}
      <div className="flex flex-col lg:flex-row gap-10 mt-[50px]">
        {/* What We Offer */}
        <div className="flex-1">
          <h3 className="text-[#7A4E2D] text-[24px] leading-[30px] font-playfair font-bold mb-[26px]">
            What We Offer
          </h3>

          <div className="text-[#162B44] text-[18px] leading-[28px] font-lora space-y-[15px]">
            <p>
              📚 <span className="font-bold">A Vast Collection</span> – From fiction to non-fiction, self-help to fantasy, we have something for every reader.
            </p>
            <p>
              💰 <span className="font-bold">Affordable Prices & Discounts</span> – Enjoy great deals and discounts on your favorite books.
            </p>
            <p>
              🔍 <span className="font-bold">Seamless Search & Browsing</span> – Our intuitive platform makes it easy to find what you're looking for.
            </p>
            <p>
              🚚 <span className="font-bold">Fast & Reliable Delivery</span> – Get your books delivered to your doorstep without hassle.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-[325px] bg-[#7A4E2D] hidden lg:block" />

        {/* Community Section */}
        <div className="flex-1">
          <h3 className="text-[#7A4E2D] text-[24px] leading-[30px] font-playfair font-bold mb-[13px]">
            Join the ReadHaven Community
          </h3>

          <p className="text-[#162B44] text-[18px] leading-[28px] font-lora mb-[20px]">
            We’re more than just a bookstore—we’re a community of book lovers who share a passion for reading. Follow us on social media, join our book discussions, and be part of something special.
          </p>

          <h4 className="text-[#7A4E2D] text-[24px] leading-[30px] font-playfair font-bold mb-[24px]">
            Follow Us:
          </h4>

          {/* Social Icons */}
          <div className="flex gap-[40px] mb-[23px]">
            <div className="relative w-[32px] h-[32px] cursor-pointer group">
              <Image
                src="/illustrations/Instagramabout.svg"
                alt="Instagram"
                fill
                className="group-hover:hidden"
              />
              <Image
                src="/illustrations/Instagramabouthover.svg"
                alt="Instagram Hover"
                fill
                className="hidden group-hover:block"
              />
            </div>
            <div className="relative w-[32px] h-[32px] cursor-pointer group">
              <Image
                src="/illustrations/Facebookabout.svg"
                alt="Facebook"
                fill
                className="group-hover:hidden"
              />
              <Image
                src="/illustrations/Facebookabouthover.svg"
                alt="Facebook Hover"
                fill
                className="hidden group-hover:block"
              />
            </div>
            <div className="relative w-[32px] h-[32px] cursor-pointer group">
              <Image
                src="/illustrations/Twitterabout.svg"
                alt="Twitter"
                fill
                className="group-hover:hidden"
              />
              <Image
                src="/illustrations/Twitterabouthover.svg"
                alt="Twitter Hover"
                fill
                className="hidden group-hover:block"
              />
            </div>
          </div>

          <h4 className="text-[#7A4E2D] text-[24px] leading-[30px] font-playfair font-bold mb-[5px]">
            Happy Reading!
          </h4>
          <p className="text-[#162B44] text-[18px] leading-[28px] font-lora">
            – The ReadHaven Team
          </p>
        </div>
      </div>
    </div>
  );
}
