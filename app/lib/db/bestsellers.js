import { getBooksByCategory, storeBooksByCategory } from "./books";


export const getBestSellerBooksFromDB = async () => {
  const books = await getBooksByCategory("Best Seller", { sortNewestFirst: true });

  return books.map(book => ({
    ...book,
    _id: book._id.toString(),
  }));
};


export const storeBestSellerBooksInDB = (books) => storeBooksByCategory(books, "Best Seller");
