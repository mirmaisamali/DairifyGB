// ─── Navigation types ─────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: undefined;
  OrderSuccess: undefined;
  OrderTracking: undefined;
};

export type MainTabParamList = {
  Shop: undefined;
  Subscription: undefined;
  Cart: undefined;
};

// ─── Domain types ─────────────────────────────────────────────────────────────

export type Category = 'Milk' | 'Yogurt & Lassi' | 'Butter & Ghee';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;         // PKR
  unit: string;          // e.g. "1 Litre", "500g"
  emoji: string;         // placeholder instead of image
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SubscriptionFrequency = 'Daily' | 'Alternate Days' | 'Weekly';
export type SubscriptionDuration = '1 Week' | '1 Month';

export interface SubscriptionOption {
  id: SubscriptionFrequency;
  label: string;
  description: string;
  emoji: string;
  savings: string;
}
