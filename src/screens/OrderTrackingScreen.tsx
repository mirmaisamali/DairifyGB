import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Button from "../components/Button";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { RootStackParamList } from "../types";
import { useOrders } from "../context/OrdersContext";
import { notifyOrderDelivered } from "../services/notificationService";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "OrderTracking">;
  route: RouteProp<RootStackParamList, "OrderTracking">;
};

const STEPS = [
  {
    id: 1,
    label: "Order Confirmed",
    desc: "Your order has been received.",
    emoji: "✅",
    time: "6:02 AM",
  },
  {
    id: 2,
    label: "Packed",
    desc: "Your dairy items are being packed fresh.",
    emoji: "📦",
    time: "6:15 AM",
  },
  {
    id: 3,
    label: "Out for Delivery",
    desc: "Your order is on its way to you!",
    emoji: "🚚",
    time: "6:45 AM",
  },
  {
    id: 4,
    label: "Delivered",
    desc: "Order delivered. Enjoy your fresh dairy!",
    emoji: "🥛",
    time: "8:00 AM",
  },
];

export default function OrderTrackingScreen({ navigation, route }: Props) {
  const orderId = route.params?.orderId;
  const { orders, updateOrderStatus } = useOrders();
  const order = orders.find((o) => o.id === orderId);

  const [delivered, setDelivered] = useState(order?.status === "Delivered");
  const currentStep = delivered ? 4 : 3; // 3 = Out for delivery, 4 = Delivered

  const handleMarkDelivered = () => {
    setDelivered(true);
    if (orderId) updateOrderStatus(orderId, "Delivered");
    notifyOrderDelivered();
  };

  const deliveryAddress = order?.address ?? "Your registered address, Gilgit";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
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

        {/* Map placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapEmoji}>{delivered ? "🏠" : "🗺️"}</Text>
          <Text style={styles.mapTitle}>
            {delivered ? "Order Delivered" : "Live Tracking"}
          </Text>
          <Text style={styles.mapSub}>
            {delivered
              ? "Enjoy your fresh dairy!"
              : "Delivery agent is 2.3 km away"}
          </Text>
          {!delivered && (
            <View style={styles.agentRow}>
              <View style={styles.agentDot} />
              <Text style={styles.agentText}>
                Ali (Delivery Agent) • ⭐ 4.9
              </Text>
            </View>
          )}
        </View>

        {/* Progress Steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Delivery Progress</Text>
          {STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isPast = step.id < currentStep;
            const isFuture = step.id > currentStep;

            return (
              <View key={step.id} style={styles.stepRow}>
                {/* Left: connector */}
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.stepCircle,
                      isPast && styles.stepCircleDone,
                      isActive && styles.stepCircleActive,
                      isFuture && styles.stepCircleFuture,
                    ]}
                  >
                    {isFuture ? (
                      <View style={styles.stepDot} />
                    ) : (
                      <Text style={styles.stepEmoji}>{step.emoji}</Text>
                    )}
                  </View>
                  {idx < STEPS.length - 1 && (
                    <View
                      style={[
                        styles.connector,
                        (isPast || isActive) && styles.connectorDone,
                      ]}
                    />
                  )}
                </View>

                {/* Right: content */}
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text
                      style={[
                        styles.stepLabel,
                        isFuture && styles.stepLabelFuture,
                        isActive && styles.stepLabelActive,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text
                      style={[
                        styles.stepTime,
                        isFuture && styles.stepTimeFuture,
                      ]}
                    >
                      {step.time}
                    </Text>
                  </View>
                  <Text
                    style={[styles.stepDesc, isFuture && styles.stepDescFuture]}
                  >
                    {step.desc}
                  </Text>
                  {isActive && (
                    <View style={styles.activePill}>
                      <View style={styles.activeDot} />
                      <Text style={styles.activeText}>
                        {step.id === 4 ? "Completed" : "In Progress"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Delivery info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Delivering To</Text>
              <Text style={styles.infoVal}>{deliveryAddress}</Text>
            </View>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⏱️</Text>
            <View>
              <Text style={styles.infoLabel}>
                {delivered ? "Delivered At" : "Estimated Arrival"}
              </Text>
              <Text style={styles.infoVal}>
                {delivered ? "8:00 AM" : "8:00 AM – 8:30 AM"}
              </Text>
            </View>
          </View>
          {order && (
            <>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>💵</Text>
                <View>
                  <Text style={styles.infoLabel}>Order Total</Text>
                  <Text style={styles.infoVal}>
                    Rs {order.grandTotal.toLocaleString()}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {!delivered && (
          <Button
            label="Mark as Delivered 📦"
            onPress={handleMarkDelivered}
            style={styles.markDeliveredBtn}
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
}

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
  mapPlaceholder: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.xl,
    padding: Spacing.lg,
    alignItems: "center",
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  mapEmoji: { fontSize: 52 },
  mapTitle: {
    fontSize: Spacing.font.lg,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  mapSub: { fontSize: Spacing.font.sm, color: Colors.textSecondary },
  agentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.full,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  agentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  agentText: {
    fontSize: Spacing.font.xs,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  stepsCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  stepsTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  stepRow: { flexDirection: "row", gap: Spacing.md },
  stepLeft: { alignItems: "center", width: 44 },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.borderLight,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  stepCircleDone: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  stepCircleFuture: {
    backgroundColor: Colors.borderLight,
    borderColor: Colors.border,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  stepEmoji: { fontSize: 20 },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 24,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  connectorDone: { backgroundColor: Colors.primary },
  stepContent: { flex: 1, paddingBottom: Spacing.md },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  stepLabel: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  stepLabelActive: { color: Colors.primary },
  stepLabelFuture: { color: Colors.textMuted },
  stepTime: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  stepTimeFuture: { color: Colors.textMuted },
  stepDesc: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    marginTop: 3,
    lineHeight: 16,
  },
  stepDescFuture: { color: Colors.textMuted },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: Spacing.radius.full,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  activeText: {
    fontSize: Spacing.font.xs,
    color: Colors.primary,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  infoIcon: { fontSize: 24, width: 32, textAlign: "center" },
  infoLabel: { fontSize: Spacing.font.xs, color: Colors.textMuted },
  infoVal: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 2,
  },
  infoDivider: { height: 1, backgroundColor: Colors.borderLight },
  markDeliveredBtn: { marginBottom: Spacing.sm },
  backBtn: {},
});
