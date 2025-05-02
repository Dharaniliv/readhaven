import Book from "../models/Book";



export const getBookByIdFromDB = async (googleId) => {
  try {
    const book = await Book.findOne({ googleId });
    if (!book) return null;
    return book;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching book by Google ID:", err);
    }

    return null;
  }
};

