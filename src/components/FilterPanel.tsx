import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import Button from "./Button";

interface FilterPanelProps {
  visible: boolean;
  onClose: () => void;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  priceBounds: { min: number; max: number };
  onApply: (min: number | undefined, max: number | undefined) => void;
  onReset: () => void;
}

export default function FilterPanel({
  visible,
  onClose,
  minPrice,
  maxPrice,
  priceBounds,
  onApply,
  onReset,
}: FilterPanelProps) {
  const [minText, setMinText] = useState(
    minPrice !== undefined ? String(minPrice) : "",
  );
  const [maxText, setMaxText] = useState(
    maxPrice !== undefined ? String(maxPrice) : "",
  );

  useEffect(() => {
    setMinText(minPrice !== undefined ? String(minPrice) : "");
    setMaxText(maxPrice !== undefined ? String(maxPrice) : "");
  }, [minPrice, maxPrice, visible]);

  const handleApply = () => {
    const min = minText.trim() === "" ? undefined : Number(minText);
    const max = maxText.trim() === "" ? undefined : Number(maxText);
    onApply(min, max);
    onClose();
  };

  const handleReset = () => {
    setMinText("");
    setMaxText("");
    onReset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.sheet}
            onPress={() => {}}
          >
            <View style={styles.handle} />
            <Text style={styles.title}>Filter by Price</Text>
            <Text style={styles.subtitle}>
              Products range from Rs {priceBounds.min} to Rs {priceBounds.max}
            </Text>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={styles.label}>Min Price (Rs)</Text>
                <TextInput
                  style={styles.input}
                  placeholder={String(priceBounds.min)}
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={minText}
                  onChangeText={setMinText}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Max Price (Rs)</Text>
                <TextInput
                  style={styles.input}
                  placeholder={String(priceBounds.max)}
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={maxText}
                  onChangeText={setMaxText}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <Button
                label="Reset"
                onPress={handleReset}
                variant="outline"
                style={styles.actionBtn}
              />
              <Button
                label="Apply Filter"
                onPress={handleApply}
                style={styles.actionBtn}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: Spacing.radius.xl,
    borderTopRightRadius: Spacing.radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: Spacing.font.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginTop: -8,
  },
  row: { flexDirection: "row", gap: Spacing.sm },
  field: { flex: 1, gap: 6 },
  label: {
    fontSize: Spacing.font.sm,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: Spacing.radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 48,
    fontSize: Spacing.font.md,
    color: Colors.textPrimary,
  },
  actions: { flexDirection: "row", gap: Spacing.sm, marginTop: Spacing.sm },
  actionBtn: { flex: 1 },
});
