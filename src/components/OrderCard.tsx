import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatOrderDate, formatPrice } from "../utils/format";
import { Order } from "../types";
import StatusBadge from "./StatusBadge";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

interface IProps {
  order: Order;
  onPress: () => void;
}

const OrderCard = ({ order, onPress }: IProps) => {
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{formatOrderDate(order.date)}</Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      <View style={styles.cardBodyColumn}>
        {order.items.map((it) => (
          <View key={it.productId} style={styles.itemRow}>
            <Text style={styles.itemEmoji}>{it.emoji}</Text>
            <Text style={styles.itemName} numberOfLines={1}>
              {it.name}
            </Text>
            <Text style={styles.itemQty}>x {it.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.totalLabel}>Total Items</Text>
        <Text style={styles.totalVal}>{itemCount}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalVal}>{formatPrice(order.grandTotal)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
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
  orderId: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  orderDate: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardBodyColumn: {
    flexDirection: "column",
    gap: Spacing.xs,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  itemEmoji: { fontSize: 20 },
  itemName: {
    flex: 1,
    fontSize: Spacing.font.md,
    color: Colors.textPrimary,
  },
  itemQty: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    fontWeight: "700",
    marginLeft: Spacing.sm,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
  },
  totalLabel: { fontSize: Spacing.font.sm, color: Colors.textSecondary },
  totalVal: {
    fontSize: Spacing.font.lg,
    fontWeight: "800",
    color: Colors.primary,
  },
});
