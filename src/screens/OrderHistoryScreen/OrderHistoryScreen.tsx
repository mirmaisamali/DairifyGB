import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useOrders } from "@/context/OrdersContext";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/services/productService";
import EmptyState from "@/components/EmptyState";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import { Order, Product, RootStackParamList } from "@/types";
import SkeletonBox from "@/components/SkeletonBox";
import OrderCard from "./components/OrderCard";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const OrderHistoryScreen = ({ navigation }: Props) => {
  const { orders, loading } = useOrders();
  const { addItemsToCart } = useCart();
  const [refreshing, setRefreshing] = useState(false);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const handleReorder = async (order: Order) => {
    setReorderingId(order.id);
    try {
      const entries = (
        await Promise.all(
          order.items.map(async (item) => {
            const product = await getProductById(item.productId);
            return product ? { product, quantity: item.quantity } : null;
          }),
        )
      ).filter(Boolean) as { product: Product; quantity: number }[];

      if (entries.length > 0) {
        addItemsToCart(entries);
        navigation.navigate("Main", { screen: "Cart" });
      }
    } finally {
      setReorderingId(null);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <Text style={styles.subtitle}>
          {orders.length} {orders.length === 1 ? "order" : "orders"} placed
        </Text>
      </View>

      {loading ? (
        <View style={styles.list}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ gap: 6 }}>
                  <SkeletonBox width={120} height={14} />
                  <SkeletonBox width={90} height={10} />
                </View>
                <SkeletonBox
                  width={80}
                  height={22}
                  borderRadius={Spacing.radius.full}
                />
              </View>
              <SkeletonBox width="100%" height={14} />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                navigation.navigate("OrderTracking", { orderId: item.id })
              }
              onReorder={() => handleReorder(item)}
              reordering={reorderingId === item.id}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <EmptyState
              emoji="📦"
              title="No orders yet"
              subtitle="Your placed orders will show up here so you can track them and re-order easily."
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};
export default OrderHistoryScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  list: { paddingHorizontal: Spacing.md, paddingBottom: 24, gap: Spacing.sm },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
