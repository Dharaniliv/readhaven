

import { getBooksByCategory, storeBooksByCategory } from "./books";


export const getFictionBooksFromDB = async () => {
 
  const books = await getBooksByCategory("Fiction", { sortNewestFirst: true });
  
  
  return books.map(book => ({
    ...book,
    _id: book._id.toString(),
  }));
};


export const storeFictionBooksInDB = (books) => storeBooksByCategory(books, "Fiction");
