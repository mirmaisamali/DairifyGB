import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { getProductById } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Button from "@/components/Button";
import SkeletonBox from "@/components/SkeletonBox";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";
import { Product, RootStackParamList } from "@/types";
import { formatPrice } from "@/utils/format";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ProductDetail">;
  route: RouteProp<RootStackParamList, "ProductDetail">;
};

const ProductDetailScreen = ({ navigation, route }: Props) => {
  const { productId } = route.params;
  const { items, addToCart, updateQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getProductById(productId);
      setProduct(result ?? null);
      setLoading(false);
    })();
  }, [productId]);

  const cartItem = items.find((i) => i.product.id === productId);
  const qty = cartItem?.quantity ?? 0;
  const favorite = isFavorite(productId);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.container}>
          <SkeletonBox width="100%" height={220} borderRadius={Spacing.radius.lg} />
          <SkeletonBox width="70%" height={24} style={{ marginTop: Spacing.md }} />
          <SkeletonBox width="40%" height={16} style={{ marginTop: Spacing.sm }} />
          <SkeletonBox width="100%" height={60} style={{ marginTop: Spacing.md }} />
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={styles.notFoundTitle}>Product not found</Text>
          <Button label="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.hero}>
          <Text style={styles.emoji}>{product.emoji}</Text>
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={() => toggleFavorite(product.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.favoriteIcon}>{favorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        <View style={styles.descCard}>
          <Text style={styles.descTitle}>About this product</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.actions}>
          {qty === 0 ? (
            <Button
              label="Add to Cart 🛒"
              onPress={() => addToCart(product)}
              size="lg"
            />
          ) : (
            <View style={styles.qtySection}>
              <Text style={styles.qtyLabel}>Quantity in cart</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(product.id, -1)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{qty}</Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, styles.qtyBtnPlus]}
                  onPress={() => updateQuantity(product.id, 1)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.qtyBtnText, styles.qtyBtnPlusText]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  backBtn: { marginBottom: Spacing.sm, alignSelf: "flex-start" },
  backBtnText: {
    fontSize: Spacing.font.md,
    fontWeight: "700",
    color: Colors.primary,
  },
  hero: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.xl,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emoji: { fontSize: 96 },
  favoriteBtn: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteIcon: { fontSize: 22 },
  categoryPill: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primaryLight,
    borderRadius: Spacing.radius.full,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: Spacing.md,
  },
  categoryText: {
    fontSize: Spacing.font.xs,
    fontWeight: "700",
    color: Colors.primaryDark,
  },
  name: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  unit: {
    fontSize: Spacing.font.sm,
    color: Colors.textMuted,
    marginTop: 4,
  },
  price: {
    fontSize: Spacing.font.xl,
    fontWeight: "800",
    color: Colors.primaryDark,
    marginTop: Spacing.sm,
  },
  descCard: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.lg,
  },
  descTitle: {
    fontSize: Spacing.font.md,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  actions: { marginTop: Spacing.lg },
  qtySection: { alignItems: "center", gap: Spacing.sm },
  qtyLabel: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  qtyBtnPlus: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  qtyBtnText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  qtyBtnPlusText: { color: Colors.white },
  qtyNum: {
    fontSize: Spacing.font.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
    minWidth: 32,
    textAlign: "center",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  notFoundEmoji: { fontSize: 56 },
  notFoundTitle: {
    fontSize: Spacing.font.lg,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
});
