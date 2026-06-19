import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "@/types";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface Props {
  products: Product[];
  selectedIds: string[];
  onToggle: (productId: string) => void;
}

const SubscriptionProductPicker = ({
  products,
  selectedIds,
  onToggle,
}: Props) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Choose Products</Text>
      <Text style={styles.subtitle}>
        Select the dairy items you want delivered on schedule.
      </Text>
      <View style={styles.list}>
        {products.map((product) => {
          const selected = selectedIds.includes(product.id);
          return (
            <TouchableOpacity
              key={product.id}
              style={[styles.row, selected && styles.rowSelected]}
              onPress={() => onToggle(product.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>{product.emoji}</Text>
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.unit}>{product.unit}</Text>
              </View>
              <View style={[styles.check, selected && styles.checkSelected]}>
                {selected && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SubscriptionProductPicker;

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.lg },
  title: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  list: { gap: Spacing.sm },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.md,
    padding: Spacing.sm + 4,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  rowSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  name: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  unit: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkMark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
