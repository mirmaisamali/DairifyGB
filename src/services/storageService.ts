import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Storage keys used across the app. Keeping them centralized avoids
 * typos and makes it easy to see everything that's persisted.
 */
export const STORAGE_KEYS = {
  CART: "@dairifygb/cart",
  FAVORITES: "@dairifygb/favorites",
  ORDERS: "@dairifygb/orders",
} as const;

/**
 * Read and JSON-parse a value from AsyncStorage.
 * Returns `fallback` if the key doesn't exist or parsing fails.
 */
export async function getItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[storage] Failed to read "${key}":`, err);
    return fallback;
  }
}

/**
 * JSON-stringify and write a value to AsyncStorage.
 */
export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] Failed to write "${key}":`, err);
  }
}

/**
 * Remove a key from AsyncStorage entirely.
 */
export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.warn(`[storage] Failed to remove "${key}":`, err);
  }
}
