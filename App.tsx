import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { OrdersProvider } from './src/context/OrdersContext';
import TabNavigator from './src/navigation/TabNavigator';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import { RootStackParamList } from './src/types';
import Colors from './src/constants/colors';
import { requestNotificationPermissions } from './src/services/notificationService';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return (
    <CartProvider>
      <FavoritesProvider>
        <OrdersProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.background },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main">
                {({ navigation }) => <TabNavigator navigation={navigation} />}
              </Stack.Screen>
              <Stack.Screen
                name="OrderSuccess"
                component={OrderSuccessScreen}
                options={{ animation: 'slide_from_bottom' }}
              />
              <Stack.Screen
                name="OrderTracking"
                component={OrderTrackingScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrdersProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
