import connectToDatabase from "./mongo";
import Book from "../models/Book";

export async function searchBooksInDB(query, { limit = 5 } = {}) {
    const cleaned = query.trim();
    if (!cleaned) return [];
  
    await connectToDatabase();
    const words = cleaned.split(/\s+/);
    const regex = words.map(w => `(?=.*${w})`).join('');
  
    const docs = await Book.find(
      { title: { $regex: regex, $options: 'i' } },
      { googleId: 1, title: 1, author: 1, price: 1, originalPrice: 1, image: 1 }
    )
      .lean();
  
    return docs.map(b => {
      let cover = '/dp.png';
      if (typeof b.image === 'string') {
        cover = b.image;
      } else if (b.image?.data && b.image?.contentType) {
        const raw = Buffer.isBuffer(b.image.data)
          ? b.image.data
          : Buffer.from(b.image.data || []);
        cover = `data:${b.image.contentType};base64,${raw.toString('base64')}`;
      }
      return {
        id:            b.googleId,
        title:         b.title,
        author:        b.author,
        price:         b.price,
        originalPrice: b.originalPrice,
        cover,
      };
    });
  }
  