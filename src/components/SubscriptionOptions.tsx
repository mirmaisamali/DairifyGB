import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SubscriptionFrequency } from "../types";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { SUBSCRIPTION_OPTIONS } from "../data/products";

interface Props {
  selectedFreq: SubscriptionFrequency;
  setSelectedFreq: (freq: SubscriptionFrequency) => void;
}

const SubscriptionOptions = ({ selectedFreq, setSelectedFreq }: Props) => {
  return (
    <View>
      <Text style={styles.sectionLabel}>Delivery Frequency</Text>

      <View style={styles.optionsList}>
        {SUBSCRIPTION_OPTIONS.map((opt) => {
          const active = opt.id === selectedFreq;

          return (
            <TouchableOpacity
              key={opt.id}
              style={[styles.optionCard, active && styles.optionCardActive]}
              onPress={() => setSelectedFreq(opt.id)}
              activeOpacity={0.8}
            >
              {/* Left side */}
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.optionIconWrapper,
                    active && styles.optionIconWrapperActive,
                  ]}
                >
                  <Text style={styles.optionIcon}>{opt.emoji}</Text>
                </View>

                <View style={styles.optionText}>
                  <Text
                    style={[
                      styles.optionLabel,
                      active && styles.optionLabelActive,
                    ]}
                  >
                    {opt.label}
                  </Text>

                  <Text style={styles.optionDesc}>{opt.description}</Text>
                </View>
              </View>

              {/* Right side */}
              <View style={styles.optionRight}>
                <View
                  style={[
                    styles.savingsBadge,
                    active && styles.savingsBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.savingsText,
                      active && styles.savingsTextActive,
                    ]}
                  >
                    {opt.savings}
                  </Text>
                </View>

                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SubscriptionOptions;

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },

  optionsList: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  optionCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: Colors.border,
  },

  optionCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.sm,
  },

  optionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: Spacing.radius.md,
    backgroundColor: Colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  optionIconWrapperActive: {
    backgroundColor: Colors.primaryLight,
  },

  optionIcon: {
    fontSize: 24,
  },

  optionText: {
    flex: 1,
  },

  optionLabel: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  optionLabelActive: {
    color: Colors.primaryDark,
  },

  optionDesc: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },

  optionRight: {
    alignItems: "flex-end",
    gap: 8,
  },

  savingsBadge: {
    backgroundColor: Colors.borderLight,
    borderRadius: Spacing.radius.full,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },

  savingsBadgeActive: {
    backgroundColor: Colors.primaryLight,
  },

  savingsText: {
    fontSize: Spacing.font.xs,
    fontWeight: "600",
    color: Colors.textMuted,
  },

  savingsTextActive: {
    color: Colors.primary,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    borderColor: Colors.primary,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
