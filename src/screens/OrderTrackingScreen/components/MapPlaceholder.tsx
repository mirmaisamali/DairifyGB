import { StyleSheet, Text, View } from "react-native";
import Spacing from "@/constants/spacing";
import Colors from "@/constants/colors";

interface IProps {
  delivered: boolean;
}
const MapPlaceholder = ({ delivered }: IProps) => {
  return (
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
          <Text style={styles.agentText}>Ali (Delivery Agent) • ⭐ 4.9</Text>
        </View>
      )}
    </View>
  );
};

export default MapPlaceholder;

const styles = StyleSheet.create({
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
});
