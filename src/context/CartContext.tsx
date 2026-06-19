import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";
import { getItem, setItem, STORAGE_KEYS } from "@/services/storageService";

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  addToCart: (product: Product) => void;
  addItemsToCart: (entries: { product: Product; quantity: number }[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load persisted cart on mount.
  useEffect(() => {
    (async () => {
      const stored = await getItem<CartItem[]>(STORAGE_KEYS.CART, []);
      setItems(stored);
      setLoading(false);
    })();
  }, []);

  // Persist cart whenever it changes (after initial load).
  useEffect(() => {
    if (loading) return;
    setItem(STORAGE_KEYS.CART, items);
  }, [items, loading]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const addItemsToCart = (
    entries: { product: Product; quantity: number }[],
  ) => {
    setItems((prev) => {
      const next = [...prev];
      for (const { product, quantity } of entries) {
        if (quantity <= 0) continue;
        const idx = next.findIndex((i) => i.product.id === product.id);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + quantity,
          };
        } else {
          next.push({ product, quantity });
        }
      }
      return next;
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity + delta }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        addItemsToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
