import { View, Text, StyleSheet } from "react-native";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import {
  Product,
  SubscriptionFrequency,
  SubscriptionDuration,
} from "@/types";

interface Props {
  selectedFreq: SubscriptionFrequency;
  selectedDuration: SubscriptionDuration;
  productIds: string[];
  products: Product[];
  onModify: () => void;
  onCancel: () => void;
}

const SubscriptionSuccess = ({
  selectedFreq,
  selectedDuration,
  productIds,
  products,
  onModify,
  onCancel,
}: Props) => {
  const selectedProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <View style={styles.successContainer}>
      <Text style={styles.successEmoji}>🎉</Text>

      <Text style={styles.successTitle}>Subscription Active!</Text>

      <Text style={styles.successSub}>
        Your <Text style={{ fontWeight: "800" }}>{selectedFreq}</Text> plan for{" "}
        <Text style={{ fontWeight: "800" }}>{selectedDuration}</Text> has been
        set up.
      </Text>

      {selectedProducts.length > 0 && (
        <View style={styles.productList}>
          <Text style={styles.productListTitle}>Delivering:</Text>
          {selectedProducts.map((p) => (
            <Text key={p.id} style={styles.productItem}>
              {p.emoji} {p.name}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.successNote}>
        We'll deliver fresh dairy right to your door on schedule.
      </Text>

      <Button
        label="Modify Plan"
        onPress={onModify}
        variant="outline"
        style={{ marginTop: Spacing.lg, alignSelf: "stretch" }}
      />
      <Button
        label="Cancel Subscription"
        onPress={onCancel}
        variant="ghost"
        style={{ alignSelf: "stretch" }}
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
  productList: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: "stretch",
    gap: 4,
  },
  productListTitle: {
    fontSize: Spacing.font.sm,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  productItem: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
  },
  successNote: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
