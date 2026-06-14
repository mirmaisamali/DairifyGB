import { StyleSheet, Text, View } from "react-native";
import { Order } from "@/types";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface IProps {
  delivered: boolean;
  order?: Order;
  deliveryAddress: string;
}

const DeliveryInfo = ({ delivered, order, deliveryAddress }: IProps) => {
  return (
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
  );
};

export default DeliveryInfo;

const styles = StyleSheet.create({
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
});
