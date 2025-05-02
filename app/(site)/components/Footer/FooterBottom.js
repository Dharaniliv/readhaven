export default function FooterBottom() {
  return (
    <div
      className="relative w-full bg-[#051B36]
                 flex flex-col justify-center items-center
                 text-white px-4 text-center py-6 gap-[12px]"
    >
      <p className="font-lora font-semibold text-[20px] md:text-[25px] leading-[28px]">
        ReadHaven – Escape into the World of Books.
      </p>
      <p className="font-lora font-semibold text-[16px] md:text-[18px] leading-[28px]">
        © 2025 ReadHaven. All rights reserved.
      </p>

      {/* mobile: static + margin-top; md+: absolute bottom-right */}
      <p className="mt-2 font-lora text-[14px] md:text-[16px] leading-[24px]
                    md:mt-0 md:absolute md:bottom-4 md:right-4">
        Illustrations by Storyset –{' '}
        <a
          href="https://storyset.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          storyset.com
        </a>
      </p>
    </div>
  );
}
