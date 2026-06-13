import { Product, SubscriptionOption } from "../types";
import productsData from "./products.json";

// Re-exported for backward compatibility with existing imports.
// New code should prefer `services/productService.ts`.
export const PRODUCTS: Product[] = productsData.products as Product[];

export const SUBSCRIPTION_OPTIONS: SubscriptionOption[] = [
  {
    id: "Daily",
    label: "Daily Delivery",
    description: "Fresh dairy at your door every single morning.",
    emoji: "🌅",
    savings: "Best Value",
  },
  {
    id: "Alternate Days",
    label: "Alternate Days",
    description: "Delivered every other day – great for small families.",
    emoji: "📅",
    savings: "Popular",
  },
  {
    id: "Weekly",
    label: "Weekly Delivery",
    description: "One bulk delivery per week for your convenience.",
    emoji: "📦",
    savings: "Flexible",
  },
];
