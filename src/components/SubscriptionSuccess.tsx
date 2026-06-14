import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { SubscriptionFrequency, SubscriptionDuration } from "../types";

interface Props {
  selectedFreq: SubscriptionFrequency;
  selectedDuration: SubscriptionDuration;
  onModify: () => void;
}

const SubscriptionSuccess = ({
  selectedFreq,
  selectedDuration,
  onModify,
}: Props) => {
  return (
    <View style={styles.successContainer}>
      <Text style={styles.successEmoji}>🎉</Text>

      <Text style={styles.successTitle}>Subscription Active!</Text>

      <Text style={styles.successSub}>
        Your <Text style={{ fontWeight: "800" }}>{selectedFreq}</Text> plan for{" "}
        <Text style={{ fontWeight: "800" }}>{selectedDuration}</Text> has been
        set up.
      </Text>

      <Text style={styles.successNote}>
        We'll deliver fresh dairy right to your door on schedule.
      </Text>

      <Button
        label="Modify Plan"
        onPress={onModify}
        variant="outline"
        style={{ marginTop: Spacing.lg }}
      />
    </View>
  );
};

export default SubscriptionSuccess;

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  successEmoji: {
    fontSize: 72,
  },
  successTitle: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.primary,
    textAlign: "center",
  },
  successSub: {
    fontSize: Spacing.font.md,
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 24,
  },
  successNote: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
