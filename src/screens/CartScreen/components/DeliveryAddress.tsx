import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface IProps {
  address: string;
  setAddress: (value: string) => void;
  savedHint?: boolean;
}

const DeliveryAddress = ({ address, setAddress, savedHint }: IProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        {savedHint && address.trim().length > 0 && (
          <Text style={styles.savedBadge}>💾 Saved</Text>
        )}
      </View>
      <TextInput
        style={styles.addressInput}
        placeholder="Enter your full delivery address..."
        placeholderTextColor={Colors.textMuted}
        value={address}
        onChangeText={setAddress}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </View>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.md },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  savedBadge: {
    fontSize: Spacing.font.xs,
    color: Colors.primary,
    fontWeight: "700",
  },
  addressInput: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    fontSize: Spacing.font.sm,
    color: Colors.textPrimary,
    minHeight: 80,
  },
});
