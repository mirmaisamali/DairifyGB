import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import {
  SubscriptionFrequency,
  SubscriptionDuration as DurationType,
} from "../types";
import SubscriptionSuccess from "../components/SubscriptionSuccess";
import SubscriptionOptions from "../components/SubscriptionOptions";
import SubscriptionDuration from "../components/SubscriptionDuration";
import SubscriptionSummary from "../components/SubscriptionSummary";

const SubscriptionScreen = () => {
  const [selectedFreq, setSelectedFreq] =
    useState<SubscriptionFrequency>("Daily");

  const [selectedDuration, setSelectedDuration] =
    useState<DurationType>("1 Week");

  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <SubscriptionSuccess
        selectedFreq={selectedFreq}
        selectedDuration={selectedDuration}
        onModify={() => setConfirmed(false)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Subscribe & Save</Text>
          <Text style={styles.subtitle}>
            Never run out of fresh dairy. Set up a recurring delivery plan.
          </Text>
        </View>

        {/* Frequency */}
        <SubscriptionOptions
          selectedFreq={selectedFreq}
          setSelectedFreq={setSelectedFreq}
        />

        {/* Duration */}
        <SubscriptionDuration
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />

        {/* Summary */}
        <SubscriptionSummary
          selectedFreq={selectedFreq}
          selectedDuration={selectedDuration}
        />

        <Button
          label="Activate Subscription 🚀"
          onPress={() => setConfirmed(true)}
          size="lg"
          style={styles.ctaBtn}
        />

        <Text style={styles.note}>
          You can cancel or modify your plan at any time before the next
          delivery.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  ctaBtn: {
    marginBottom: Spacing.md,
  },
  note: {
    textAlign: "center",
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
