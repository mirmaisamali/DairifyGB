import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import {
  Product,
  SubscriptionFrequency,
  SubscriptionDuration as DurationType,
} from "@/types";
import { useSubscriptions } from "@/context/SubscriptionsContext";
import { getAllProducts } from "@/services/productService";
import { notifySubscriptionActivated } from "@/services/notificationService";
import SubscriptionSuccess from "./components/SubscriptionSuccess";
import SubscriptionOptions from "./components/SubscriptionOptions";
import SubscriptionDuration from "./components/SubscriptionDuration";
import SubscriptionSummary from "./components/SubscriptionSummary";
import SubscriptionProductPicker from "./components/SubscriptionProductPicker";

const SubscriptionScreen = () => {
  const { subscription, activateSubscription, cancelSubscription } =
    useSubscriptions();

  const [selectedFreq, setSelectedFreq] =
    useState<SubscriptionFrequency>("Daily");
  const [selectedDuration, setSelectedDuration] =
    useState<DurationType>("1 Week");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (subscription && !editing) {
      setSelectedFreq(subscription.frequency);
      setSelectedDuration(subscription.duration);
      setSelectedProductIds(subscription.productIds);
    }
  }, [subscription, editing]);

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleActivate = () => {
    if (selectedProductIds.length === 0) return;
    activateSubscription({
      frequency: selectedFreq,
      duration: selectedDuration,
      productIds: selectedProductIds,
    });
    notifySubscriptionActivated(selectedFreq);
    setEditing(false);
  };

  if (subscription && !editing) {
    return (
      <SubscriptionSuccess
        selectedFreq={subscription.frequency}
        selectedDuration={subscription.duration}
        productIds={subscription.productIds}
        products={products}
        onModify={() => setEditing(true)}
        onCancel={() => {
          cancelSubscription();
          setEditing(false);
          setSelectedProductIds([]);
        }}
      />
    );
  }

  const canActivate = selectedProductIds.length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Subscribe & Save</Text>
          <Text style={styles.subtitle}>
            Never run out of fresh dairy. Set up a recurring delivery plan.
          </Text>
        </View>

        <SubscriptionOptions
          selectedFreq={selectedFreq}
          setSelectedFreq={setSelectedFreq}
        />

        <SubscriptionDuration
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />

        <SubscriptionProductPicker
          products={products}
          selectedIds={selectedProductIds}
          onToggle={toggleProduct}
        />

        <SubscriptionSummary
          selectedFreq={selectedFreq}
          selectedDuration={selectedDuration}
          productCount={selectedProductIds.length}
        />

        <Button
          label="Activate Subscription 🚀"
          onPress={handleActivate}
          size="lg"
          disabled={!canActivate}
          style={styles.ctaBtn}
        />

        {!canActivate && (
          <Text style={styles.validation}>
            Select at least one product to continue.
          </Text>
        )}

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
    marginBottom: Spacing.sm,
  },
  validation: {
    textAlign: "center",
    fontSize: Spacing.font.xs,
    color: "#B45309",
    marginBottom: Spacing.sm,
  },
  note: {
    textAlign: "center",
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
