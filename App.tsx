import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { OrdersProvider } from "./src/context/OrdersContext";
import { requestNotificationPermissions } from "./src/services/notificationService";
import AppNavigator from "./src/navigation/AppNavigator";
import CartProvider from "./src/context/CartContext";
import FavoritesProvider from "./src/context/FavoritesContext";

export default function App() {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return (
    <CartProvider>
      <FavoritesProvider>
        <OrdersProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </OrdersProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
