import "dotenv/config";
import { fetchBooksByCategory } from "../../lib/api/googleBooks.js";
import { storeRomanceBooksInDB } from "../../lib/db/romance.js";
import connectToDatabase from "../../lib/db/mongo.js";
import Book from "../../lib/models/Book.js";

async function seedRomanceBooks() {
  await connectToDatabase();

  const rawBooks = await fetchBooksByCategory("Romance", 80);
  const books = rawBooks
    .filter((item) => item.volumeInfo.imageLinks?.thumbnail)
    .map((item) => {
      const basePrice = Math.floor(Math.random() * 201) + 100;
      const originalPrice = basePrice + Math.floor(Math.random() * 301) + 200;

      return {
        googleId: item.id,
        title: item.volumeInfo.title || "Untitled",
        author: item.volumeInfo.authors?.[0] || "Unknown",
        image: item.volumeInfo.imageLinks.thumbnail,
        price: `Rs.${basePrice}`,
        originalPrice: `Rs.${originalPrice}`,
        category: "Romance",
        description: item.volumeInfo.description || "",
      };
    });


  const existingIds = await Book.find({
    googleId: { $in: books.map((b) => b.googleId) },
  }).distinct("googleId");
  const newBooks = books.filter((b) => !existingIds.includes(b.googleId));

  await storeRomanceBooksInDB(newBooks);


  process.exit(); 
}

seedRomanceBooks();
