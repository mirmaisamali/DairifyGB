// ─── Navigation types ─────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: { screen?: keyof MainTabParamList } | undefined;
  OrderSuccess: { orderId: string };
  OrderTracking: { orderId?: string } | undefined;
  ProductDetail: { productId: string };
};

export type MainTabParamList = {
  Shop: undefined;
  Subscription: undefined;
  Favorites: undefined;
  Cart: undefined;
  Orders: undefined;
};

// ─── Domain types ─────────────────────────────────────────────────────────────

export type Category = "Milk" | "Yogurt & Lassi" | "Butter & Ghee";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // PKR
  unit: string; // e.g. "1 Litre", "500g"
  emoji: string; // placeholder instead of image
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SubscriptionFrequency = "Daily" | "Alternate Days" | "Weekly";
export type SubscriptionDuration = "1 Week" | "1 Month";

export interface SubscriptionOption {
  id: SubscriptionFrequency;
  label: string;
  description: string;
  emoji: string;
  savings: string;
}

export interface Subscription {
  frequency: SubscriptionFrequency;
  duration: SubscriptionDuration;
  productIds: string[];
  startDate: string; // ISO timestamp
  active: boolean;
}

export interface UserPreferences {
  deliveryAddress: string;
}

// ─── Order types ──────────────────────────────────────────────────────────────

/** @deprecated Legacy status — migrated to "Confirmed" on load. */
export type LegacyOrderStatus = "Pending";

export type OrderStatus =
  | LegacyOrderStatus
  | "Confirmed"
  | "Packed"
  | "OutForDelivery"
  | "Delivered";

export interface OrderItem {
  productId: string;
  name: string;
  unit: string;
  emoji: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  deliveryFee: number;
  grandTotal: number;
  address: string;
  paymentMethod: "cod" | "card";
  date: string; // ISO timestamp
  status: OrderStatus;
}
