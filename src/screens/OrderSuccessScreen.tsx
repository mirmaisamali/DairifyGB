import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Button from "../components/Button";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { RootStackParamList } from "../types";
import { useOrders } from "../context/OrdersContext";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OrderSuccess">;
  route: RouteProp<RootStackParamList, "OrderSuccess">;
};

const OrderSuccessScreen = ({ navigation, route }: Props) => {
  const { orderId } = route.params;
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === orderId);
  const paymentLabel =
    order?.paymentMethod === "card" ? "Card / Wallet" : "Cash on Delivery";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* Animated checkmark ring */}
        <View style={styles.iconOuter}>
          <View style={styles.iconMiddle}>
            <View style={styles.iconInner}>
              <Text style={styles.checkEmoji}>✅</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Order Placed{"\n"}Successfully 🎉</Text>
        <Text style={styles.subtitle}>
          Your fresh dairy items are on the way from Gilgit.
        </Text>

        {/* Order info pill */}
        <View style={styles.orderBadge}>
          <Text style={styles.orderBadgeText}>Order #{orderId}</Text>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🚚</Text>
            <View>
              <Text style={styles.detailLabel}>Estimated Delivery</Text>
              <Text style={styles.detailVal}>Today, 7:00 AM – 9:00 AM</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <View>
              <Text style={styles.detailLabel}>Delivering From</Text>
              <Text style={styles.detailVal}>DairifyGB Farm Hub, Gilgit</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💵</Text>
            <View>
              <Text style={styles.detailLabel}>Payment</Text>
              <Text style={styles.detailVal}>{paymentLabel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            label="Track Order 🗺️"
            onPress={() => navigation.navigate("OrderTracking", { orderId })}
            size="lg"
          />
          <Button
            label="Back to Shop"
            onPress={() => navigation.navigate("Main")}
            variant="outline"
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OrderSuccessScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  iconOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(34,197,94,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconMiddle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(34,197,94,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  checkEmoji: { fontSize: 40 },
  title: {
    fontSize: Spacing.font.xxl + 2,
    fontWeight: "900",
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 34,
  },
  subtitle: {
    fontSize: Spacing.font.md,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginTop: -4,
  },
  orderBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Spacing.radius.full,
    paddingVertical: 8,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  orderBadgeText: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.primaryDark,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    width: "100%",
    gap: Spacing.sm,
  },
  detailRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  detailIcon: { fontSize: 24, width: 36, textAlign: "center" },
  detailLabel: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    fontWeight: "500",
  },
  detailVal: {
    fontSize: Spacing.font.sm,
    color: Colors.textPrimary,
    fontWeight: "700",
    marginTop: 2,
  },
  detailDivider: { height: 1, backgroundColor: Colors.borderLight },
  actions: { width: "100%", gap: Spacing.sm, marginTop: Spacing.sm },
});
