"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "shop-mvp-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (error) {
        console.error("Failed to parse cart", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setItems((current) => {
        const existing = current.find((entry) => entry.productId === item.productId);
        if (existing) {
          return current.map((entry) =>
            entry.productId === item.productId
              ? { ...entry, qty: entry.qty + qty }
              : entry
          );
        }
        return [...current, { ...item, qty }];
      });
    },
    []
  );

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((current) =>
      current
        .map((entry) => (entry.productId === productId ? { ...entry, qty } : entry))
        .filter((entry) => entry.qty > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((entry) => entry.productId !== productId));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, updateQty, removeItem, clear, total }),
    [items, addItem, updateQty, removeItem, clear, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
