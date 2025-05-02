
"use client";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import BookGrid from "./BookGrid";

export default function CategoryBookSection({ category, color }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch(`/api/${category}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error(`Failed to fetch ${category} books:`, err);
        }
  
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [category]);

  return loading ? <Loader color={color} /> : <BookGrid books={books} />;
}
