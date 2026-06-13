import { StyleSheet, Text, View } from "react-native";
import { Order } from "../types";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

interface IProps {
  status: Order["status"];
}

const StatusBadge = ({ status }: IProps) => {
  const isDelivered = status === "Delivered";
  return (
    <View
      style={[
        styles.statusBadge,
        isDelivered ? styles.statusDelivered : styles.statusPending,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isDelivered ? styles.statusTextDelivered : styles.statusTextPending,
        ]}
      >
        {isDelivered ? "📦 Delivered" : "⏳ Pending"}
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
  statusDelivered: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  statusText: { fontSize: Spacing.font.xs, fontWeight: "700" },
  statusTextPending: { color: "#B45309" },
  statusTextDelivered: { color: Colors.primaryDark },
});
