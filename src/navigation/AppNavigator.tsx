import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import { RootStackParamList } from "../types";
import Colors from "../constants/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Main" component={TabNavigator} />

        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccessScreen}
          options={{ animation: "slide_from_bottom" }}
        />

        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
