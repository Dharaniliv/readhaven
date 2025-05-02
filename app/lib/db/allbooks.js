

import connectToDatabase from "./mongo";
import Book from "../models/Book";

export async function getAllBooksFromDB() {
  await connectToDatabase();

  const books = await Book.find({})
    .sort({ createdAt: -1 })
    .lean();

  return books.map(book => ({
    ...book,
    _id: book._id.toString(),
  }));
}