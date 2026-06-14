import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface IProps {
  deliveryFee: 0 | 50;
  grandTotal: number;
  totalPrice: number;
}
const PriceSummary = ({ deliveryFee, grandTotal, totalPrice }: IProps) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryKey}>Subtotal</Text>
        <Text style={styles.summaryVal}>Rs {totalPrice.toLocaleString()}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryKey}>Delivery Fee</Text>
        <Text style={[styles.summaryVal, deliveryFee === 0 && styles.freeText]}>
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
        <Text style={styles.totalVal}>Rs {grandTotal.toLocaleString()}</Text>
      </View>
    </View>
  );
};

export default PriceSummary;

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.md },
  sectionTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
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
});
