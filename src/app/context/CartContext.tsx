import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  cartId: string;
  product: any; // We'll keep it simple for now or export Product type later
  size: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: any, size: string) => void;
  removeFromCart: (cartId: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any, size: string) => {
    const newItem: CartItem = {
      cartId: Math.random().toString(36).substr(2, 9),
      product,
      size,
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true); // Open cart automatically when adding
  };

  const removeFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{ cartItems, isCartOpen, addToCart, removeFromCart, toggleCart, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
