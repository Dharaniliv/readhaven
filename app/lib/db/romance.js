
import { getBooksByCategory, storeBooksByCategory } from "./books";


export const getRomanceBooksFromDB = async () => {
 
  const books = await getBooksByCategory("Romance", { sortNewestFirst: true });
  
 
  return books.map(book => ({
    ...book,
    _id: book._id.toString(),
  }));
};


export const storeRomanceBooksInDB = (books) => storeBooksByCategory(books, "Romance");
