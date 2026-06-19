import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { OrdersProvider } from "./src/context/OrdersContext";
import { SubscriptionsProvider } from "./src/context/SubscriptionsContext";
import { UserPreferencesProvider } from "./src/context/UserPreferencesContext";
import { requestNotificationPermissions } from "./src/services/notificationService";
import AppNavigator from "./src/navigation/AppNavigator";
import CartProvider from "./src/context/CartContext";
import FavoritesProvider from "./src/context/FavoritesContext";

export default function App() {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return (
    <UserPreferencesProvider>
      <CartProvider>
        <FavoritesProvider>
          <OrdersProvider>
            <SubscriptionsProvider>
              <StatusBar style="dark" />
              <AppNavigator />
            </SubscriptionsProvider>
          </OrdersProvider>
        </FavoritesProvider>
      </CartProvider>
    </UserPreferencesProvider>
  );
}
