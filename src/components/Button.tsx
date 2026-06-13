import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        size === "sm" && styles.sm,
        size === "lg" && styles.lg,
        isPrimary && styles.primary,
        isOutline && styles.outline,
        variant === "ghost" && styles.ghost,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.primary} />
      ) : (
        <Text
          style={[
            styles.label,
            size === "sm" && styles.labelSm,
            size === "lg" && styles.labelLg,
            isPrimary && styles.labelPrimary,
            isOutline && styles.labelOutline,
            variant === "ghost" && styles.labelGhost,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Spacing.radius.full,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  sm: { paddingVertical: 8, paddingHorizontal: Spacing.md },
  lg: { paddingVertical: 18, paddingHorizontal: Spacing.xl },
  primary: { backgroundColor: Colors.primary },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: { backgroundColor: "transparent" },
  disabled: { opacity: 0.5 },
  label: {
    fontSize: Spacing.font.md,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  labelSm: { fontSize: Spacing.font.sm },
  labelLg: { fontSize: Spacing.font.lg },
  labelPrimary: { color: Colors.white },
  labelOutline: { color: Colors.primary },
  labelGhost: { color: Colors.primary },
});
