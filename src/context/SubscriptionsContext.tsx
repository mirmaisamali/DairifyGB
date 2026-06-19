import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Subscription,
  SubscriptionDuration,
  SubscriptionFrequency,
} from "@/types";
import { getItem, setItem, STORAGE_KEYS } from "@/services/storageService";

interface SubscriptionsContextValue {
  subscription: Subscription | null;
  loading: boolean;
  activateSubscription: (plan: {
    frequency: SubscriptionFrequency;
    duration: SubscriptionDuration;
    productIds: string[];
  }) => void;
  cancelSubscription: () => void;
}

const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(
  null,
);

export const SubscriptionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getItem<Subscription | null>(
        STORAGE_KEYS.SUBSCRIPTION,
        null,
      );
      setSubscription(stored?.active ? stored : null);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    setItem(STORAGE_KEYS.SUBSCRIPTION, subscription);
  }, [subscription, loading]);

  const activateSubscription = (plan: {
    frequency: SubscriptionFrequency;
    duration: SubscriptionDuration;
    productIds: string[];
  }) => {
    setSubscription({
      frequency: plan.frequency,
      duration: plan.duration,
      productIds: plan.productIds,
      startDate: new Date().toISOString(),
      active: true,
    });
  };

  const cancelSubscription = () => {
    setSubscription(null);
  };

  return (
    <SubscriptionsContext.Provider
      value={{ subscription, loading, activateSubscription, cancelSubscription }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
};

export function useSubscriptions(): SubscriptionsContextValue {
  const ctx = useContext(SubscriptionsContext);
  if (!ctx) {
    throw new Error(
      "useSubscriptions must be used inside SubscriptionsProvider",
    );
  }
  return ctx;
}
