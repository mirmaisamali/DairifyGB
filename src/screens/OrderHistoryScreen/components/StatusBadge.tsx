import { StyleSheet, Text, View } from "react-native";
import { OrderStatus } from "@/types";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import { getOrderStatusLabel, normalizeOrderStatus } from "@/utils/orderStatus";

interface IProps {
  status: OrderStatus;
}

const StatusBadge = ({ status }: IProps) => {
  const normalized = normalizeOrderStatus(status);
  const isDelivered = normalized === "Delivered";
  const isInTransit =
    normalized === "OutForDelivery" || normalized === "Packed";

  return (
    <View
      style={[
        styles.statusBadge,
        isDelivered
          ? styles.statusDelivered
          : isInTransit
            ? styles.statusTransit
            : styles.statusPending,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isDelivered
            ? styles.statusTextDelivered
            : isInTransit
              ? styles.statusTextTransit
              : styles.statusTextPending,
        ]}
      >
        {getOrderStatusLabel(status)}
      </Text>
    </View>
  );
};
export default StatusBadge;

const styles = StyleSheet.create({
  statusBadge: {
    borderRadius: Spacing.radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusPending: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  statusTransit: {
    backgroundColor: "#DBEAFE",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  statusDelivered: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  statusText: { fontSize: Spacing.font.xs, fontWeight: "700" },
  statusTextPending: { color: "#B45309" },
  statusTextTransit: { color: "#1D4ED8" },
  statusTextDelivered: { color: Colors.primaryDark },
});
