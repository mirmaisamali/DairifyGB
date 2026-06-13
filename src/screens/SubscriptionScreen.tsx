import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SUBSCRIPTION_OPTIONS } from "../data/products";
import { SubscriptionFrequency, SubscriptionDuration } from "../types";
import Button from "../components/Button";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

const DURATIONS: SubscriptionDuration[] = ["1 Week", "1 Month"];

export default function SubscriptionScreen() {
  const [selectedFreq, setSelectedFreq] =
    useState<SubscriptionFrequency>("Daily");
  const [selectedDuration, setSelectedDuration] =
    useState<SubscriptionDuration>("1 Week");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Subscription Active!</Text>
          <Text style={styles.successSub}>
            Your <Text style={{ fontWeight: "800" }}>{selectedFreq}</Text> plan
            for <Text style={{ fontWeight: "800" }}>{selectedDuration}</Text>{" "}
            has been set up.
          </Text>
          <Text style={styles.successNote}>
            We'll deliver fresh dairy right to your door on schedule.
          </Text>
          <Button
            label="Modify Plan"
            onPress={() => setConfirmed(false)}
            variant="outline"
            style={{ marginTop: Spacing.lg }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Subscribe & Save</Text>
          <Text style={styles.subtitle}>
            Never run out of fresh dairy. Set up a recurring delivery plan.
          </Text>
        </View>

        {/* Frequency Options */}
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

        {/* Duration */}
        <Text style={styles.sectionLabel}>Plan Duration</Text>
        <View style={styles.durationRow}>
          {DURATIONS.map((d) => {
            const active = d === selectedDuration;
            return (
              <TouchableOpacity
                key={d}
                style={[
                  styles.durationChip,
                  active && styles.durationChipActive,
                ]}
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

        {/* Summary Card */}
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

        <Button
          label="Activate Subscription 🚀"
          onPress={() => setConfirmed(true)}
          size="lg"
          style={styles.ctaBtn}
        />

        <Text style={styles.note}>
          You can cancel or modify your plan at any time before the next
          delivery.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  header: { marginBottom: Spacing.lg },
  title: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  optionsList: { gap: Spacing.sm, marginBottom: Spacing.lg },
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
  optionIconWrapperActive: { backgroundColor: Colors.primaryLight },
  optionIcon: { fontSize: 24 },
  optionText: { flex: 1 },
  optionLabel: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  optionLabelActive: { color: Colors.primaryDark },
  optionDesc: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  optionRight: { alignItems: "flex-end", gap: 8 },
  savingsBadge: {
    backgroundColor: Colors.borderLight,
    borderRadius: Spacing.radius.full,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  savingsBadgeActive: { backgroundColor: Colors.primaryLight },
  savingsText: {
    fontSize: Spacing.font.xs,
    fontWeight: "600",
    color: Colors.textMuted,
  },
  savingsTextActive: { color: Colors.primary },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: Colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
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
  durationTextActive: { color: Colors.white },
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
  summaryKey: { fontSize: Spacing.font.sm, color: Colors.textSecondary },
  summaryVal: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  divider: { height: 1, backgroundColor: Colors.borderLight },
  ctaBtn: { marginBottom: Spacing.md },
  note: {
    textAlign: "center",
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  // Success state
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  successEmoji: { fontSize: 72 },
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
