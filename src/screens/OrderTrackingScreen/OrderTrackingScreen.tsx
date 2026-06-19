import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import { RootStackParamList } from "@/types";
import { useOrders } from "@/context/OrdersContext";
import { notifyOrderStatusUpdate } from "@/services/notificationService";
import {
  getAdvanceStatusLabel,
  normalizeOrderStatus,
  orderStatusToStep,
} from "@/utils/orderStatus";
import MapPlaceholder from "./components/MapPlaceholder";
import ProgressSteps from "./components/ProgressSteps";
import DeliveryInfo from "./components/DeliveryInfo";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OrderTracking">;
  route: RouteProp<RootStackParamList, "OrderTracking">;
};

const OrderTrackingScreen = ({ navigation, route }: Props) => {
  const orderId = route.params?.orderId;
  const { orders, advanceOrderStatus } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  const status = normalizeOrderStatus(order?.status ?? "Confirmed");
  const delivered = status === "Delivered";
  const currentStep = orderStatusToStep(status);
  const advanceLabel = order ? getAdvanceStatusLabel(order.status) : null;

  const handleAdvanceStatus = () => {
    if (!orderId) return;
    const nextStatus = advanceOrderStatus(orderId);
    if (nextStatus) {
      notifyOrderStatusUpdate(orderId, nextStatus);
    }
  };

  const deliveryAddress = order?.address ?? "Your registered address, Gilgit";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Track Order</Text>
          <View
            style={[styles.orderBadge, delivered && styles.orderBadgeDelivered]}
          >
            <Text
              style={[
                styles.orderBadgeText,
                delivered && styles.orderBadgeTextDelivered,
              ]}
            >
              {delivered ? "📦 Delivered" : "🚚 In Transit"}
            </Text>
          </View>
        </View>

        {orderId && <Text style={styles.orderIdText}>Order #{orderId}</Text>}

        <MapPlaceholder delivered={delivered} />

        <ProgressSteps currentStep={currentStep} />

        <DeliveryInfo
          delivered={delivered}
          order={order}
          deliveryAddress={deliveryAddress}
        />

        {advanceLabel && (
          <Button
            label={advanceLabel}
            onPress={handleAdvanceStatus}
            style={styles.advanceBtn}
          />
        )}

        <Button
          label="Back to Shop"
          onPress={() => navigation.navigate("Main")}
          variant="outline"
          style={styles.backBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  orderBadge: {
    backgroundColor: "#FEF3C7",
    borderRadius: Spacing.radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  orderBadgeDelivered: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  orderBadgeText: {
    fontSize: Spacing.font.xs,
    fontWeight: "700",
    color: "#B45309",
  },
  orderBadgeTextDelivered: { color: Colors.primaryDark },
  orderIdText: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  advanceBtn: { marginBottom: Spacing.sm },
  backBtn: {},
});
