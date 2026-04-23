import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './data';

interface CartItem extends Product {
  cartQuantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nbb_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('nbb_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nbb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nbb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, cartQuantity: item.cartQuantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, cartQuantity: quantity, selectedSize: size, selectedColor: color }];
    });
    // Add a little bounce effect logic if needed elsewhere
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, cartQuantity: Math.max(1, item.cartQuantity + delta) } 
        : item
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      cart, 
      wishlist, 
      addToCart, 
      removeFromCart, 
      updateCartQuantity, 
      toggleWishlist, 
      isInWishlist,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
