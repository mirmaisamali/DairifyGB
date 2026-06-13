import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Order, OrderStatus } from "../types";
import { getItem, setItem, STORAGE_KEYS } from "../services/storageService";

interface OrdersContextValue {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getItem<Order[]>(STORAGE_KEYS.ORDERS, []);
      setOrders(stored);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    setItem(STORAGE_KEYS.ORDERS, orders);
  }, [orders, loading]);

  // Newest orders first.
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
  };

  return (
    <OrdersContext.Provider
      value={{ orders, loading, addOrder, updateOrderStatus }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
}
