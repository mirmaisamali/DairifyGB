import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { SubscriptionFrequency, SubscriptionDuration } from "../types";

interface Props {
  selectedFreq: SubscriptionFrequency;
  selectedDuration: SubscriptionDuration;
}

const SubscriptionSummary = ({ selectedFreq, selectedDuration }: Props) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Your Plan Summary</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryKey}>Frequency</Text>
        <Text style={styles.summaryVal}>{selectedFreq}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryKey}>Duration</Text>
        <Text style={styles.summaryVal}>{selectedDuration}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryKey}>First Delivery</Text>
        <Text style={styles.summaryVal}>Tomorrow Morning 🌅</Text>
      </View>
    </View>
  );
};

export default SubscriptionSummary;

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },

  summaryTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 4,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryKey: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
  },

  summaryVal: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
});
