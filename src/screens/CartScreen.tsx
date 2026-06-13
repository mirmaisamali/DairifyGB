import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
import CartItems from "../components/CartItems";
import DeliveryAddress from "../components/DeliveryAddress";
import PaymentMethod from "../components/PaymentMethod";
import PriceSummary from "../components/PriceSummary";

type PaymentMethod = "cod" | "card";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const CartScreen = ({ navigation }: Props) => {
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
        <CartItems
          items={items}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />

        {/* Delivery Address */}
        <DeliveryAddress address={address} setAddress={setAddress} />

        {/* Payment Method */}
        <PaymentMethod payment={payment} setPayment={setPayment} />

        {/* Price Summary */}
        <PriceSummary
          deliveryFee={deliveryFee}
          grandTotal={grandTotal}
          totalPrice={totalPrice}
        />

        <Button
          label="Place Order 🚀"
          onPress={handlePlaceOrder}
          size="lg"
          style={styles.placeOrderBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

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
