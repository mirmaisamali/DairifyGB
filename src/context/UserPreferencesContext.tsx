import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserPreferences } from "@/types";
import { getItem, setItem, STORAGE_KEYS } from "@/services/storageService";

interface UserPreferencesContextValue {
  preferences: UserPreferences;
  loading: boolean;
  setDeliveryAddress: (address: string) => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  deliveryAddress: "",
};

const UserPreferencesContext =
  createContext<UserPreferencesContextValue | null>(null);

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getItem<UserPreferences>(
        STORAGE_KEYS.USER_PREFERENCES,
        DEFAULT_PREFERENCES,
      );
      setPreferences(stored);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }, [preferences, loading]);

  const setDeliveryAddress = (address: string) => {
    setPreferences((prev) => ({ ...prev, deliveryAddress: address }));
  };

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, loading, setDeliveryAddress }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export function useUserPreferences(): UserPreferencesContextValue {
  const ctx = useContext(UserPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useUserPreferences must be used inside UserPreferencesProvider",
    );
  }
  return ctx;
}
