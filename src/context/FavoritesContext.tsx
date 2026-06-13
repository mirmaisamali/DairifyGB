import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getItem, setItem, STORAGE_KEYS } from "../services/storageService";

interface FavoritesContextValue {
  favoriteIds: string[];
  loading: boolean;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getItem<string[]>(STORAGE_KEYS.FAVORITES, []);
      setFavoriteIds(stored);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    setItem(STORAGE_KEYS.FAVORITES, favoriteIds);
  }, [favoriteIds, loading]);

  const isFavorite = (productId: string) => favoriteIds.includes(productId);

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, loading, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
