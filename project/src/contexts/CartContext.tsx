import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Card } from './CardContext';

export interface CartItem {
  card: Card;
  quantity: number;
  addedAt: Date;
}

export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}

export interface TaxInfo {
  province: string;
  taxRate: number;
  taxType: string;
  shippingRate: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (card: Card, quantity?: number) => void;
  removeFromCart: (cardId: string) => void;
  updateQuantity: (cardId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getTaxInfo: (province: string) => TaxInfo;
  calculateTotals: (province: string) => {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    taxInfo: TaxInfo;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const TAX_RATES = {
  'ON': { rate: 0.13, type: 'HST', shipping: 15 },
  'QC': { rate: 0.14975, type: 'GST + QST', shipping: 15 },
  'BC': { rate: 0.12, type: 'HST', shipping: 18 },
  'AB': { rate: 0.05, type: 'GST', shipping: 12 },
  'SK': { rate: 0.11, type: 'GST + PST', shipping: 15 },
  'MB': { rate: 0.12, type: 'GST + PST', shipping: 15 },
  'NB': { rate: 0.15, type: 'HST', shipping: 20 },
  'NS': { rate: 0.15, type: 'HST', shipping: 20 },
  'PE': { rate: 0.15, type: 'HST', shipping: 20 },
  'NL': { rate: 0.15, type: 'HST', shipping: 25 },
  'NT': { rate: 0.05, type: 'GST', shipping: 30 },
  'NU': { rate: 0.05, type: 'GST', shipping: 35 },
  'YT': { rate: 0.05, type: 'GST', shipping: 30 }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('slabSavvyCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('slabSavvyCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (card: Card, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.card.id === card.id);
      if (existingItem) {
        return prev.map(item =>
          item.card.id === card.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { card, quantity, addedAt: new Date() }];
    });
  };

  const removeFromCart = (cardId: string) => {
    setItems(prev => prev.filter(item => item.card.id !== cardId));
  };

  const updateQuantity = (cardId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cardId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.card.id === cardId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.card.price || 0) * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getTaxInfo = (province: string): TaxInfo => {
    const taxData = TAX_RATES[province as keyof typeof TAX_RATES] || TAX_RATES.ON;
    return {
      province,
      taxRate: taxData.rate,
      taxType: taxData.type,
      shippingRate: taxData.shipping
    };
  };

  const calculateTotals = (province: string) => {
    const subtotal = getCartTotal();
    const taxInfo = getTaxInfo(province);
    const shipping = taxInfo.shippingRate;
    const tax = subtotal * taxInfo.taxRate;
    const total = subtotal + tax + shipping;

    return {
      subtotal,
      tax,
      shipping,
      total,
      taxInfo
    };
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getTaxInfo,
    calculateTotals
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};