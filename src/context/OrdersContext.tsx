import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Order, OrderStatus } from "@/types";
import { getItem, setItem, STORAGE_KEYS } from "@/services/storageService";
import { normalizeOrderStatus, getNextOrderStatus } from "@/utils/orderStatus";

interface OrdersContextValue {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => OrderStatus | null;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

function migrateOrders(orders: Order[]): Order[] {
  return orders.map((o) => ({
    ...o,
    status: normalizeOrderStatus(o.status),
  }));
}

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getItem<Order[]>(STORAGE_KEYS.ORDERS, []);
      setOrders(migrateOrders(stored));
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
      prev.map((o) =>
        o.id === orderId ? { ...o, status: normalizeOrderStatus(status) } : o,
      ),
    );
  };

  const advanceOrderStatus = (orderId: string): OrderStatus | null => {
    let nextStatus: OrderStatus | null = null;
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        nextStatus = getNextOrderStatus(o.status);
        if (!nextStatus) return o;
        return { ...o, status: nextStatus };
      }),
    );
    return nextStatus;
  };

  return (
    <OrdersContext.Provider
      value={{ orders, loading, addOrder, updateOrderStatus, advanceOrderStatus }}
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
