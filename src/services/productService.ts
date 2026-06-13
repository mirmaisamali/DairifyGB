import { Product, Category } from '../types';
import productsData from '../data/products.json';

const ALL_PRODUCTS: Product[] = productsData.products as Product[];

/** Simulated network delay so loading skeletons / pull-to-refresh feel real. */
const MOCK_DELAY_MS = 500;

function delay<T>(value: T, ms: number = MOCK_DELAY_MS): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

export interface ProductFilters {
  search?: string;
  category?: Category | 'All';
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Fetch all products. Mimics an async API call but reads from local JSON.
 */
export async function getAllProducts(): Promise<Product[]> {
  return delay([...ALL_PRODUCTS]);
}

/**
 * Fetch a single product by id.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  return delay(ALL_PRODUCTS.find(p => p.id === id));
}

/**
 * Fetch products belonging to a category.
 */
export async function getProductsByCategory(category: Category): Promise<Product[]> {
  return delay(ALL_PRODUCTS.filter(p => p.category === category));
}

/**
 * Search + filter products entirely on the client using local data.
 * - `search`: case-insensitive match against product name & description
 * - `category`: exact category match ('All' returns everything)
 * - `minPrice` / `maxPrice`: inclusive price range
 */
export async function searchProducts(filters: ProductFilters): Promise<Product[]> {
  const { search, category, minPrice, maxPrice } = filters;
  const query = search?.trim().toLowerCase() ?? '';

  const results = ALL_PRODUCTS.filter(p => {
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

    const matchesCategory = !category || category === 'All' || p.category === category;

    const matchesMin = minPrice === undefined || p.price >= minPrice;
    const matchesMax = maxPrice === undefined || p.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  return delay(results);
}

/**
 * Returns the min and max price across all products — useful for
 * building a price-range filter slider/inputs.
 */
export function getPriceBounds(): { min: number; max: number } {
  const prices = ALL_PRODUCTS.map(p => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export const CATEGORIES: Category[] = ['Milk', 'Yogurt & Lassi', 'Butter & Ghee'];
