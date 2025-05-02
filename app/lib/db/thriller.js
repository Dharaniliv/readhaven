
import { getBooksByCategory, storeBooksByCategory } from "./books";


export const getThrillerBooksFromDB = async () => {
 
  const books = await getBooksByCategory("Mystery & Thriller", { sortNewestFirst: true });
  

  return books.map(book => ({
    ...book,
    _id: book._id.toString(),
  }));
};


export const storeThrillerBooksInDB = (books) => storeBooksByCategory(books, "Mystery & Thriller");
