'use client';

import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'recentlyViewedProducts';
const MAX_RECENTLY_VIEWED = 5;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (storedItems) {
        setRecentlyViewed(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to load recently viewed items from localStorage", error);
    }
  }, []);

  const addProductToHistory = useCallback((productSlug: string) => {
    try {
      const currentItems = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]') as string[];
      
      const updatedItems = [productSlug, ...currentItems.filter(slug => slug !== productSlug)];
      const limitedItems = updatedItems.slice(0, MAX_RECENTLY_VIEWED);

      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(limitedItems));
      setRecentlyViewed(limitedItems);
    } catch (error) {
      console.error("Failed to save recently viewed item to localStorage", error);
    }
  }, []);

  return { recentlyViewed, addProductToHistory };
};
