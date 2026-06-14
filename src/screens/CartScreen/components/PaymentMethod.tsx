import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Spacing from "@/constants/spacing";
import Colors from "@/constants/colors";

type PaymentMethods = "cod" | "card";

interface IProps {
  payment: PaymentMethods;
  setPayment: Dispatch<SetStateAction<PaymentMethods>>;
}

const PaymentMethod = ({ payment, setPayment }: IProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentOptions}>
        {[
          {
            id: "cod" as PaymentMethods,
            label: "Cash on Delivery",
            emoji: "💵",
            desc: "Pay when you receive",
          },
          {
            id: "card" as PaymentMethods,
            label: "Card / Wallet",
            emoji: "💳",
            desc: "JazzCash, EasyPaisa, Card",
          },
        ].map((opt) => {
          const active = payment === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[styles.paymentCard, active && styles.paymentCardActive]}
              onPress={() => setPayment(opt.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.paymentEmoji}>{opt.emoji}</Text>
              <View style={styles.paymentInfo}>
                <Text
                  style={[
                    styles.paymentLabel,
                    active && styles.paymentLabelActive,
                  ]}
                >
                  {opt.label}
                </Text>
                <Text style={styles.paymentDesc}>{opt.desc}</Text>
              </View>
              <View style={[styles.radio, active && styles.radioActive]}>
                {active && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.md },
  sectionTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  paymentOptions: { gap: Spacing.sm },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  paymentCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  paymentEmoji: { fontSize: 28 },
  paymentInfo: { flex: 1 },
  paymentLabel: {
    fontSize: Spacing.font.sm,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  paymentLabelActive: { color: Colors.primaryDark },
  paymentDesc: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: Colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
