import Image from "next/image";
import { getBookByIdFromDB } from "@/app/lib/db/findbooks";
import BookCarousel from "@/app/(site)/components/BookCarousel";
import { getBestSellerBooksFromDB } from "@/app/lib/db/bestsellers";
import { getFictionBooksFromDB } from "@/app/lib/db/fiction";
import { getRomanceBooksFromDB } from "@/app/lib/db/romance";
import { getNonFictionBooksFromDB } from "@/app/lib/db/nonfiction";
import { getThrillerBooksFromDB } from "@/app/lib/db/thriller";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteBookButton from "@/app/(site)/components/DeleteBookButton"; 
import BookDetailsClientSection from "../../components/BookDetailsClientSection";
import EditBookButton from "../../components/EditBookButton";
import BuyNowButton from "../../components/BuyNowButton";

export async function generateMetadata({ params }) {
  const { id } =await params;
  const bookDoc = await getBookByIdFromDB(id);
  if (!bookDoc) notFound();

  const book = JSON.parse(JSON.stringify(bookDoc));

  return {
    title: `${book.title}`,
    description: book.description || "Discover more about this book, including its author, synopsis, and reviews on ReadHaven.",
  }}

export default async function BookDetailsPage({ params }) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.isAdmin; 

  const fiction = await getFictionBooksFromDB();
  const romance = await getRomanceBooksFromDB();
  const nonFiction = await getNonFictionBooksFromDB();
  const thriller = await getThrillerBooksFromDB();
  const bestSeller = await getBestSellerBooksFromDB();

  
  const { id } = await params;
  const bookDoc = await getBookByIdFromDB(id);
  if (!bookDoc) notFound();
  
  const book = JSON.parse(JSON.stringify(bookDoc));

  const cleanedBook = {
    googleId: book.googleId || book._id,
    title: book.title,
    author: book.author,
    description: book.description,
    price: book.price,
    image: book.image,
  };

  const categoryBgColor = {
    Fiction: "#4B785D",
    Romance: "#D96666",
    "Non-Fiction": "#7A4E2D",
    "Mystery & Thriller": "#BA68C8",
    BestSeller: "#1E3A5F",
  };

  const categorySlugMap = {
    "Best Seller": "best-sellers",
    "Non Fiction": "non-fiction",
    "Mystery & Thriller": "thriller",
    Fiction: "fiction",
    Romance: "romance",
    Thriller: "thriller",
  };

  const categorySlug =
    categorySlugMap[book.category] ||
    book.category.toLowerCase().replace(/\s+/g, "-");

  const bgColor = categoryBgColor[book.category] || categoryBgColor.BestSeller;
  const buttonColor = book.category === "Best Seller" ? "#7A4E2D" : "#1E3A5F";

  let relatedBooks = [];
  switch (book.category) {
    case "Fiction":
      relatedBooks = fiction;
      break;
    case "Romance":
      relatedBooks = romance;
      break;
    case "Non-Fiction":
      relatedBooks = nonFiction;
      break;
    case "Thriller":
      relatedBooks = thriller;
      break;
    default:
      relatedBooks = bestSeller;
      break;
  }


  return (
    <>
      <div className="flex flex-col md:flex-row gap-[20px] md:gap-[300px] px-4 sm:px-5 pt-[120px] md:pt-[150px] ml-[20px] md:ml-[100px]">
      
        <div className="w-full sm:w-[339px] h-auto sm:h-[520px] flex-shrink-0">
          <Image
            src={book.image}
            alt="Book cover"
            width={339}
            height={520}
            className="object-cover"
            priority
            draggable={false}
          />
           {isAdmin && (
          <div className="flex space-x-2 mt-4">
            <EditBookButton bookId={id} />
            <DeleteBookButton bookId={id} />
          </div>
        )}
        </div>

      
        <div className="text-[#7A4E2D] w-full sm:w-auto">
          <h1 className="font-bold text-[28px] sm:text-[40px] leading-[36px] sm:leading-[48px] font-playfair">
            {book.title}
          </h1>

          <p className="mt-[10px] sm:mt-[13px] text-[18px] sm:text-[24px] leading-[24px] sm:leading-[30px] font-medium font-playfair">
            By {book.author} 
          </p>

          <p className="mt-[10px] sm:mt-[13px] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px] font-medium font-playfair">
            Category: {book.category} 
          </p>

          <div className="mt-[10px] sm:mt-[17px] flex items-center gap-[10px] sm:gap-[18px]">
            <p className="text-[24px] sm:text-[30px] leading-[30px] sm:leading-[38px] font-bold tracking-[0.3%] font-inter">
              {book.price}.00
            </p>
            <p className="text-[#888888] text-[18px] sm:text-[24px] leading-[22px] sm:leading-[28px] font-semibold tracking-[0.3%] font-inter line-through">
              {book.originalPrice}.00
            </p>
          </div>

          <BookDetailsClientSection book={book} email={session?.user?.email} />

        
       <BuyNowButton amount={book.price} bookTitle={book.title} />

         
          <div className="mt-[20px] sm:mt-[25px] text-[#7A4E2D] text-[18px] sm:text-[24px] leading-[22px] sm:leading-[30px] font-playfair font-medium">
            Delivery within 4-6 business days
          </div>

       
          <div className="mt-[30px] sm:mt-[55px] flex flex-wrap justify-between sm:justify-start sm:gap-[80px]">
            <div className="flex flex-col items-center gap-[10px] sm:gap-[17px] w-1/3 sm:w-auto">
              <Image
                src="/icons/secure.svg"
                alt="secure"
                width={30}
                height={30}
              />
              <p className="text-[#7A4E2D] text-[18px] sm:text-[24px] leading-[22px] sm:leading-[30px] font-playfair font-medium">
                Secure Payments
              </p>
            </div>

            <div className="flex flex-col items-center gap-[10px] sm:gap-[17px] w-1/3 sm:w-auto">
              <Image
                src="/icons/truck.svg"
                alt="truck"
                width={30}
                height={30}
              />
              <p className="text-[#7A4E2D] text-[18px] sm:text-[24px] leading-[22px] sm:leading-[30px] font-playfair font-medium">
                COD Available
              </p>
            </div>

            <div className="flex flex-col items-center gap-[10px] sm:gap-[17px] w-1/3 sm:w-auto">
              <Image
                src="/icons/quality.svg"
                alt="quality"
                width={30}
                height={30}
              />
              <p className="text-[#7A4E2D] text-[18px] sm:text-[24px] leading-[22px] sm:leading-[30px] font-playfair font-medium">
                Quality Checked
              </p>
            </div>
          </div>

      
          <div className="mt-[30px] sm:mt-[40px] w-full sm:w-[685px] h-[1px] bg-[#7A4E2D]" />

          <div className="mt-[20px] sm:mt-[26px] text-[#7A4E2D] text-[20px] sm:text-[24px] leading-[24px] sm:leading-[30px] font-playfair font-semibold">
            About This Book
          </div>

          <p className="mt-[15px] sm:mt-[17px] text-[#7A4E2D] text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] font-lora font-medium w-full sm:w-[685px]">
            {book.description} 
          </p>
        </div>
      </div>

     
      <div className="mt-[150px] sm:mt-[310px] text-center">
        <h2 className="text-[#7A4E2D] text-[28px] sm:text-[32px] leading-[34px] sm:leading-[38px] font-playfair font-semibold">
          Recommended Books
        </h2>

        
        <div className="mt-[10px] sm:mt-[14px] -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 xl:-mx-20">
          <BookCarousel
            books={relatedBooks.slice(0, 15)} 
            bgColor={bgColor}
            buttonColor={buttonColor} 
          />
        </div>

   
        <Link
          href={`/categories/${categorySlug}`}
          className="w-full flex justify-center"
        >
          <button className="mt-[30px] sm:mt-[45px] w-[160px] sm:w-[180px] h-[50px] sm:h-[56px] bg-[#7A4E2D] hover:bg-[#6B3F1D] text-white rounded-[6px] font-montserrat font-semibold text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] tracking-[1%]">
            View All
          </button>
        </Link>
      </div>
    </>
  );
}
