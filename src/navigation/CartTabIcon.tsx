import { StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

const CartTabIcon = ({ focused }: { focused: boolean }) => {
  const { totalItems } = useCart();
  return (
    <View
      style={[tabStyles.iconWrapper, focused && tabStyles.iconWrapperActive]}
    >
      <View>
        <Text style={tabStyles.iconEmoji}>🛒</Text>
        {totalItems > 0 && (
          <View style={tabStyles.badge}>
            <Text style={tabStyles.badgeText}>
              {totalItems > 9 ? "9+" : totalItems}
            </Text>
          </View>
        )}
      </View>
      <Text style={[tabStyles.iconLabel, focused && tabStyles.iconLabelActive]}>
        Cart
      </Text>
    </View>
  );
};

export default CartTabIcon;

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Spacing.radius.md,
    gap: 2,
    minWidth: 60,
  },
  iconWrapperActive: {
    backgroundColor: Colors.primaryLight,
  },
  iconEmoji: { fontSize: 20 },
  iconLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.textMuted,
  },
  iconLabelActive: { color: Colors.primary },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: Spacing.radius.full,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: "800" },
});
