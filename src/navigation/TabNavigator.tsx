import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ShopScreen from "@/screens/ShopScreen";
import SubscriptionScreen from "@/screens/SubscriptionScreen";
import FavoritesScreen from "@/screens/FavoritesScreen";
import CartScreen from "@/screens/CartScreen";
import OrderHistoryScreen from "@/screens/OrderHistoryScreen";
import Colors from "@/constants/colors";
import { MainTabParamList, RootStackParamList } from "@/types";
import TabIcon from "./TabIcon";
import CartTabIcon from "./CartTabIcon";

const Tab = createBottomTabNavigator<MainTabParamList>();

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const TabNavigator = ({ navigation }: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Shop"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏪" label="Shop" focused={focused} />
          ),
        }}
      >
        {() => <ShopScreen navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Subscription"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📅" label="Subscribe" focused={focused} />
          ),
        }}
        component={SubscriptionScreen}
      />

      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="❤️" label="Favorites" focused={focused} />
          ),
        }}
      >
        {() => <FavoritesScreen navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      >
        {() => <CartScreen navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📦" label="Orders" focused={focused} />
          ),
        }}
      >
        {() => <OrderHistoryScreen navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default TabNavigator;

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 72,
    paddingBottom: 8,
    paddingTop: 4,
  },
});
