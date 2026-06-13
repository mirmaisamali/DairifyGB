import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopScreen from '../screens/ShopScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { useCart } from '../context/CartContext';
import Colors from '../constants/colors';
import Spacing from '../constants/spacing';
import { MainTabParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={[tabStyles.iconWrapper, focused && tabStyles.iconWrapperActive]}>
      <Text style={tabStyles.iconEmoji}>{emoji}</Text>
      <Text style={[tabStyles.iconLabel, focused && tabStyles.iconLabelActive]}>{label}</Text>
    </View>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const { totalItems } = useCart();
  return (
    <View style={[tabStyles.iconWrapper, focused && tabStyles.iconWrapperActive]}>
      <View>
        <Text style={tabStyles.iconEmoji}>🛒</Text>
        {totalItems > 0 && (
          <View style={tabStyles.badge}>
            <Text style={tabStyles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
          </View>
        )}
      </View>
      <Text style={[tabStyles.iconLabel, focused && tabStyles.iconLabelActive]}>Cart</Text>
    </View>
  );
}

export default function TabNavigator({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.tabBar,
        tabBarShowLabel: false,
        tabBarScrollEnabled: false,
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
        {() => <ShopScreen />}
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
        component={FavoritesScreen}
      />

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
}

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 72,
    paddingBottom: 8,
    paddingTop: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Spacing.radius.md,
    gap: 2,
    minWidth: 60,
  },
  iconWrapperActive: {
    backgroundColor: Colors.primaryLight,
  },
  iconEmoji: { fontSize: 20 },
  iconLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  iconLabelActive: { color: Colors.primary },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: Spacing.radius.full,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: '800' },
});
