'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '@/lib/definitions';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, options: { size?: string | null; color?: string | null }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartSheetOpen: boolean;
  setCartSheetOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const generateCartItemId = (productId: string, options: { size?: string | null; color?: string | null }): string => {
  const size = options.size || 'default-size';
  const color = options.color || 'default-color';
  return `${productId}-${size}-${color}`;
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartSheetOpen, setCartSheetOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);


  const addToCart = (product: Product, options: { size?: string | null; color?: string | null }) => {
    setCart(prevCart => {
      const cartItemId = generateCartItemId(product.id, options);
      const existingItemIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        const newItem: CartItem = { 
          ...product, 
          quantity: 1, 
          cartItemId: cartItemId,
          options: {
            ...product.options,
            selectedSize: options.size,
            selectedColor: options.color
          }
        };
        return [...prevCart, newItem];
      }
    });
    setCartSheetOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.cartItemId === cartItemId) {
          if (quantity <= 0) {
            return null; // Mark for removal
          }
          return { ...item, quantity };
        }
        return item;
      }).filter(Boolean) as CartItem[] // Filter out nulls
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartSheetOpen, setCartSheetOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
