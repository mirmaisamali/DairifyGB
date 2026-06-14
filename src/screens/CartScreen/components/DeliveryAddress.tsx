import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

const DeliveryAddress = ({ address, setAddress }: IProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Delivery Address</Text>
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
  sectionTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
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
