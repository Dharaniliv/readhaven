
import connectToDatabase from "./mongo.js";
import Book from "../models/Book.js";


export async function getBooksByCategory(category, options = {}) {
  await connectToDatabase();

  const query = Book.find({ category });

 
  if (options.sortNewestFirst) {
    query.sort({ _id: -1 });
  }

  const books = await query.lean();

  return books.map((book) => ({
    ...book,
    _id: book._id.toString(),
  }));
}


export async function storeBooksByCategory(books, category) {
  await connectToDatabase();

  const categorizedBooks = books.map((book) => ({
    ...book,
    category,
  }));

  const operations = categorizedBooks.map((book) => ({
    updateOne: {
      filter: { googleId: book.googleId },
      update: { $setOnInsert: book },
      upsert: true,
    },
  }));

  await Book.bulkWrite(operations);
}