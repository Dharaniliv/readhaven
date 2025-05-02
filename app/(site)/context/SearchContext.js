'use client';

import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async term => {
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `/api/search-suggestions?term=${encodeURIComponent(term)}`
      );
      if (!res.ok) {
        setSuggestions([]);
        return;
      }
      let data;
      try {
        data = await res.json();
      } catch {
        data = [];
      }
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };

  const clearSuggestions = () => setSuggestions([]);

  return (
    <SearchContext.Provider value={{ suggestions, fetchSuggestions, clearSuggestions }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
