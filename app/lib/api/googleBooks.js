

export async function fetchBooksByCategory(category, totalResults = 30) {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const maxPerRequest = 40;
    const fetchPromises = [];
  
    for (let startIndex = 0; startIndex < totalResults; startIndex += maxPerRequest) {
      const maxResults = Math.min(maxPerRequest, totalResults - startIndex);
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=relevance&key=${apiKey}`;
      fetchPromises.push(fetch(url).then((res) => res.ok ? res.json() : Promise.reject(`Google Books API error: ${res.status} ${res.statusText}`)));
    }
  
    try {
      const results = await Promise.all(fetchPromises);
      const allBooks = results.flatMap((res) => res.items || []);
      return allBooks;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to fetch books by category:", error);
      }
  
      return [];
    }
  }
  