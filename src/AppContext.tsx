import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './data';

interface CartItem extends Product {
  cartQuantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface AppNotification {
  id: string;
  message: string;
  type: 'success' | 'info';
}

interface FlyToCartTrigger {
  id: string;
  image: string;
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string, startCoords?: { x: number, y: number }, endCoords?: { x: number, y: number }) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (productId: string, delta: number, size?: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  notifications: AppNotification[];
  removeNotification: (id: string) => void;
  flyTrigger: FlyToCartTrigger | null;
  clearFlyTrigger: () => void;
  cartBump: boolean;
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

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [flyTrigger, setFlyTrigger] = useState<FlyToCartTrigger | null>(null);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    localStorage.setItem('nbb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nbb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addNotification = (message: string) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications([{ id, message, type: 'success' }]); // Replace existing notifications for singleton behavior
    setTimeout(() => removeNotification(id), 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearFlyTrigger = () => setFlyTrigger(null);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string, startCoords?: { x: number, y: number }, endCoords?: { x: number, y: number }) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      
      if (startCoords) {
        setFlyTrigger({
          id: Math.random().toString(36).substring(7),
          image: product.image,
          startX: startCoords.x,
          startY: startCoords.y,
          endX: endCoords?.x,
          endY: endCoords?.y
        });
        
        // Delay the bump effect to match fly animation duration (approx 800ms)
        setTimeout(() => {
          setCartBump(true);
          setTimeout(() => setCartBump(false), 300);
        }, 800);
      } else {
        setCartBump(true);
        setTimeout(() => setCartBump(false), 300);
      }

      addNotification(`${product.name} added to cart!`);

      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, cartQuantity: item.cartQuantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, cartQuantity: quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateCartQuantity = (productId: string, delta: number, size?: string) => {
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedSize === size)
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
      clearCart,
      notifications,
      removeNotification,
      flyTrigger,
      clearFlyTrigger,
      cartBump
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
