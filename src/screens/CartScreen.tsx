import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { notifyOrderPlaced } from "../services/notificationService";
import { generateOrderId } from "../utils/format";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { Order, RootStackParamList } from "../types";

type PaymentMethod = "cod" | "card";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function CartScreen({ navigation }: Props) {
  const {
    items,
    loading,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const { addOrder } = useOrders();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");

  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryFee;

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingEmoji}>🛒</Text>
          <Text style={styles.loadingText}>Loading your cart...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <EmptyState
          emoji="🛒"
          title="Your cart is empty"
          subtitle="Add some fresh dairy products from the Shop tab."
        />
      </SafeAreaView>
    );
  }

  const handlePlaceOrder = () => {
    const orderId = generateOrderId();

    const order: Order = {
      id: orderId,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        unit: i.product.unit,
        emoji: i.product.emoji,
        price: i.product.price,
        quantity: i.quantity,
      })),
      totalPrice,
      deliveryFee,
      grandTotal,
      address: address.trim() || "Default address, Gilgit",
      paymentMethod: payment,
      date: new Date().toISOString(),
      status: "Pending",
    };

    addOrder(order);
    notifyOrderPlaced(orderId);
    clearCart();
    navigation.navigate("OrderSuccess", { orderId });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
          <Text style={styles.itemCount}>{totalItems} items</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsCard}>
          {items.map((item, idx) => (
            <View key={item.product.id}>
              <View style={styles.cartItem}>
                <View style={styles.itemEmojiBg}>
                  <Text style={styles.itemEmoji}>{item.product.emoji}</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.itemUnit}>{item.product.unit}</Text>
                  <Text style={styles.itemPrice}>
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.itemActions}>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.product.id, -1)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyNum}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={[styles.qtyBtn, styles.qtyBtnPlus]}
                      onPress={() => updateQuantity(item.product.id, 1)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[styles.qtyBtnText, { color: Colors.white }]}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.product.id)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {idx < items.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Enter your full delivery address..."
            placeholderTextColor={Colors.textMuted}
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentOptions}>
            {[
              {
                id: "cod" as PaymentMethod,
                label: "Cash on Delivery",
                emoji: "💵",
                desc: "Pay when you receive",
              },
              {
                id: "card" as PaymentMethod,
                label: "Card / Wallet",
                emoji: "💳",
                desc: "JazzCash, EasyPaisa, Card",
              },
            ].map((opt) => {
              const active = payment === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.paymentCard,
                    active && styles.paymentCardActive,
                  ]}
                  onPress={() => setPayment(opt.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.paymentEmoji}>{opt.emoji}</Text>
                  <View style={styles.paymentInfo}>
                    <Text
                      style={[
                        styles.paymentLabel,
                        active && styles.paymentLabelActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text style={styles.paymentDesc}>{opt.desc}</Text>
                  </View>
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Subtotal</Text>
            <Text style={styles.summaryVal}>
              Rs {totalPrice.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Delivery Fee</Text>
            <Text
              style={[styles.summaryVal, deliveryFee === 0 && styles.freeText]}
            >
              {deliveryFee === 0 ? "FREE 🎉" : `Rs ${deliveryFee}`}
            </Text>
          </View>
          {deliveryFee === 0 && (
            <Text style={styles.freeDeliveryNote}>
              🎉 Free delivery on orders above Rs 500!
            </Text>
          )}
          <View style={styles.totalDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>
              Rs {grandTotal.toLocaleString()}
            </Text>
          </View>
        </View>

        <Button
          label="Place Order 🚀"
          onPress={handlePlaceOrder}
          size="lg"
          style={styles.placeOrderBtn}
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
  itemCount: {
    fontSize: Spacing.font.sm,
    color: Colors.textMuted,
    fontWeight: "500",
    backgroundColor: Colors.borderLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Spacing.radius.full,
  },
  itemsCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  itemEmojiBg: {
    width: 56,
    height: 56,
    borderRadius: Spacing.radius.md,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  itemEmoji: { fontSize: 28 },
  itemInfo: { flex: 1 },
  itemName: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  itemUnit: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.primary,
    marginTop: 4,
  },
  itemActions: { alignItems: "flex-end", gap: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  qtyBtnPlus: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  qtyBtnText: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary },
  qtyNum: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
  removeBtn: { paddingVertical: 2 },
  removeBtnText: {
    fontSize: Spacing.font.xs,
    color: Colors.error,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.md,
  },
  section: { marginBottom: Spacing.md },
  sectionTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  addressInput: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    fontSize: Spacing.font.sm,
    color: Colors.textPrimary,
    minHeight: 80,
  },
  paymentOptions: { gap: Spacing.sm },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  paymentCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  paymentEmoji: { fontSize: 28 },
  paymentInfo: { flex: 1 },
  paymentLabel: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  paymentLabelActive: { color: Colors.primaryDark },
  paymentDesc: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: Colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryKey: { fontSize: Spacing.font.sm, color: Colors.textSecondary },
  summaryVal: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  freeText: { color: Colors.success },
  freeDeliveryNote: {
    fontSize: Spacing.font.xs,
    color: Colors.success,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#F0FDF4",
    borderRadius: Spacing.radius.sm,
    paddingVertical: 4,
  },
  totalDivider: { height: 1.5, backgroundColor: Colors.border },
  totalLabel: {
    fontSize: Spacing.font.lg,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  totalVal: {
    fontSize: Spacing.font.xl,
    fontWeight: "900",
    color: Colors.primary,
  },
  placeOrderBtn: {},
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  loadingEmoji: { fontSize: 48 },
  loadingText: {
    fontSize: Spacing.font.md,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
});
