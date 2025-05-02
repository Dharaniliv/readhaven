import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    originalPrice: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;
