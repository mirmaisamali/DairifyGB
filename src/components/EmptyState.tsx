import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import Button from "./Button";

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  emoji,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} style={styles.action} />
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  emoji: { fontSize: 72 },
  title: {
    fontSize: Spacing.font.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Spacing.font.md,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  action: { marginTop: Spacing.sm, minWidth: 180 },
});
