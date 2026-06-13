import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import { CartItem } from "../types";

interface IProps {
  items: CartItem[];
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItems = ({ items, updateQuantity, removeFromCart }: IProps) => {
  return (
    <View style={styles.itemsCard}>
      {items.map((item, idx) => (
        <View key={item.product.id}>
          <View style={styles.cartItem}>
            <View style={styles.itemEmojiBg}>
              <Text style={styles.itemEmoji}>{item.product.emoji}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.product.name}
              </Text>
              <Text style={styles.itemUnit}>{item.product.unit}</Text>
              <Text style={styles.itemPrice}>
                Rs {(item.product.price * item.quantity).toLocaleString()}
              </Text>
            </View>
            <View style={styles.itemActions}>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.product.id, -1)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{item.quantity}</Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, styles.qtyBtnPlus]}
                  onPress={() => updateQuantity(item.product.id, 1)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.qtyBtnText, { color: Colors.white }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => removeFromCart(item.product.id)}
                style={styles.removeBtn}
              >
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
          {idx < items.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  itemsCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  itemEmojiBg: {
    width: 56,
    height: 56,
    borderRadius: Spacing.radius.md,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  itemEmoji: { fontSize: 28 },
  itemInfo: { flex: 1 },
  itemName: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  itemUnit: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.primary,
    marginTop: 4,
  },
  itemActions: { alignItems: "flex-end", gap: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  qtyBtnPlus: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  qtyBtnText: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary },
  qtyNum: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
  removeBtn: { paddingVertical: 2 },
  removeBtnText: {
    fontSize: Spacing.font.xs,
    color: Colors.error,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.md,
  },
});
