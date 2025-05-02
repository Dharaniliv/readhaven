

import { getBooksByCategory, storeBooksByCategory } from "./books";


export const getNonFictionBooksFromDB = async () => {

  const books = await getBooksByCategory("Non-Fiction", { sortNewestFirst: true });
  

  return books.map(book => ({
    ...book,
    _id: book._id.toString(),
  }));
};


export const storeNonFictionBooksInDB = (books) => storeBooksByCategory(books, "Non-Fiction");
