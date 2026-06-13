import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTS } from "../data/products";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import ProductGridSkeleton from "../components/Skeleton";

const FavoritesScreen = () => {
  const { favoriteIds, loading } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);

  const favoriteProducts = PRODUCTS.filter((p) => favoriteIds.includes(p.id));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Mock refresh — favorites are local, so just simulate a delay.
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteProducts.length}{" "}
          {favoriteProducts.length === 1 ? "item" : "items"} saved
        </Text>
      </View>

      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : favoriteProducts.length === 0 ? (
        <EmptyState
          emoji="❤️"
          title="No favorites yet"
          subtitle="Tap the heart icon on any product to save it here for quick access later."
        />
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};
export default FavoritesScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: Spacing.font.xxl,
    fontWeight: "900",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  grid: { paddingHorizontal: 6, paddingBottom: 24 },
});
