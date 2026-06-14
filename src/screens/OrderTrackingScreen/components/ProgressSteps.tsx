import { StyleSheet, Text, View } from "react-native";
import Spacing from "@/constants/spacing";
import Colors from "@/constants/colors";

const STEPS = [
  {
    id: 1,
    label: "Order Confirmed",
    desc: "Your order has been received.",
    emoji: "✅",
    time: "6:02 AM",
  },
  {
    id: 2,
    label: "Packed",
    desc: "Your dairy items are being packed fresh.",
    emoji: "📦",
    time: "6:15 AM",
  },
  {
    id: 3,
    label: "Out for Delivery",
    desc: "Your order is on its way to you!",
    emoji: "🚚",
    time: "6:45 AM",
  },
  {
    id: 4,
    label: "Delivered",
    desc: "Order delivered. Enjoy your fresh dairy!",
    emoji: "🥛",
    time: "8:00 AM",
  },
];

interface IProps {
  currentStep: 3 | 4; // 3 = Out for delivery, 4 = Delivered
}

const ProgressSteps = ({ currentStep }: IProps) => {
  return (
    <View style={styles.stepsCard}>
      <Text style={styles.stepsTitle}>Delivery Progress</Text>
      {STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isPast = step.id < currentStep;
        const isFuture = step.id > currentStep;

        return (
          <View key={step.id} style={styles.stepRow}>
            {/* Left: connector */}
            <View style={styles.stepLeft}>
              <View
                style={[
                  styles.stepCircle,
                  isPast && styles.stepCircleDone,
                  isActive && styles.stepCircleActive,
                  isFuture && styles.stepCircleFuture,
                ]}
              >
                {isFuture ? (
                  <View style={styles.stepDot} />
                ) : (
                  <Text style={styles.stepEmoji}>{step.emoji}</Text>
                )}
              </View>
              {idx < STEPS.length - 1 && (
                <View
                  style={[
                    styles.connector,
                    (isPast || isActive) && styles.connectorDone,
                  ]}
                />
              )}
            </View>

            {/* Right: content */}
            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <Text
                  style={[
                    styles.stepLabel,
                    isFuture && styles.stepLabelFuture,
                    isActive && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
                <Text
                  style={[styles.stepTime, isFuture && styles.stepTimeFuture]}
                >
                  {step.time}
                </Text>
              </View>
              <Text
                style={[styles.stepDesc, isFuture && styles.stepDescFuture]}
              >
                {step.desc}
              </Text>
              {isActive && (
                <View style={styles.activePill}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeText}>
                    {step.id === 4 ? "Completed" : "In Progress"}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ProgressSteps;

const styles = StyleSheet.create({
  stepsCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  stepsTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  stepRow: { flexDirection: "row", gap: Spacing.md },
  stepLeft: { alignItems: "center", width: 44 },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.borderLight,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  stepCircleDone: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  stepCircleFuture: {
    backgroundColor: Colors.borderLight,
    borderColor: Colors.border,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  stepEmoji: { fontSize: 20 },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 24,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  connectorDone: { backgroundColor: Colors.primary },
  stepContent: { flex: 1, paddingBottom: Spacing.md },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  stepLabel: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  stepLabelActive: { color: Colors.primary },
  stepLabelFuture: { color: Colors.textMuted },
  stepTime: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  stepTimeFuture: { color: Colors.textMuted },
  stepDesc: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    marginTop: 3,
    lineHeight: 16,
  },
  stepDescFuture: { color: Colors.textMuted },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: Spacing.radius.full,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  activeText: {
    fontSize: Spacing.font.xs,
    color: Colors.primary,
    fontWeight: "700",
  },
});
