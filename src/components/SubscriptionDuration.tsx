import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { SubscriptionDuration as DurationType } from "../types";

const DURATIONS: DurationType[] = ["1 Week", "1 Month"];

interface Props {
  selectedDuration: DurationType;
  setSelectedDuration: (duration: DurationType) => void;
}

const SubscriptionDuration = ({
  selectedDuration,
  setSelectedDuration,
}: Props) => {
  return (
    <View>
      <Text style={styles.sectionLabel}>Plan Duration</Text>

      <View style={styles.durationRow}>
        {DURATIONS.map((d) => {
          const active = d === selectedDuration;

          return (
            <TouchableOpacity
              key={d}
              style={[styles.durationChip, active && styles.durationChipActive]}
              onPress={() => setSelectedDuration(d)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.durationText,
                  active && styles.durationTextActive,
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SubscriptionDuration;

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  durationRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  durationChip: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: Spacing.radius.md,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  durationChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  durationText: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  durationTextActive: {
    color: Colors.white,
  },
});
