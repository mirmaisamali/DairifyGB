import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Category, Product } from '../types';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';
import { ProductGridSkeleton } from '../components/Skeleton';
import { useCart } from '../context/CartContext';
import { searchProducts, getPriceBounds } from '../services/productService';
import Colors from '../constants/colors';
import Spacing from '../constants/spacing';

const priceBounds = getPriceBounds();

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Milk');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [filterVisible, setFilterVisible] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { totalItems, totalPrice } = useCart();

  const filterActive = minPrice !== undefined || maxPrice !== undefined;

  const loadProducts = useCallback(async () => {
    const results = await searchProducts({
      search: searchQuery,
      category: searchQuery ? 'All' : selectedCategory,
      minPrice,
      maxPrice,
    });
    setProducts(results);
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  // Initial load + whenever filters change.
  useEffect(() => {
    setLoading(true);
    loadProducts().finally(() => setLoading(false));
  }, [loadProducts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, [loadProducts]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning! 👋</Text>
          <Text style={styles.appName}>DairifyGB</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.locationBadge}>
            <Text style={styles.locationText}>📍 Gilgit, GB</Text>
          </View>
        </View>
      </View>

      {/* Hero Banner */}
      {!isSearching && (
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerBadge}>🌿 Fresh Today</Text>
            <Text style={styles.bannerTitle}>Farm-Fresh Dairy{'\n'}Delivered Daily</Text>
            <Text style={styles.bannerSub}>From the valleys of Gilgit-Baltistan.</Text>
          </View>
          <Text style={styles.bannerEmoji}>🏔️</Text>
        </View>
      )}

      {/* Search + Filter */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search milk, yogurt, ghee..."
        onFilterPress={() => setFilterVisible(true)}
        filterActive={filterActive}
      />

      {/* Category Tabs (hidden while searching) */}
      {!isSearching && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Products</Text>
            <Text style={styles.sectionCount}>{products.length} items</Text>
          </View>
          <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
        </>
      )}

      {isSearching && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <Text style={styles.sectionCount}>{products.length} found</Text>
        </View>
      )}

      {/* Product Grid */}
      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : products.length === 0 ? (
        <EmptyState
          emoji="🔍"
          title="No products found"
          subtitle="Try adjusting your search term or price filters."
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
          }
        />
      )}

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <View style={styles.cartInfo}>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
            <Text style={styles.cartLabel}>Items in cart</Text>
          </View>
          <Text style={styles.cartTotal}>Rs {totalPrice.toLocaleString()}</Text>
        </View>
      )}

      {/* Price Filter Modal */}
      <FilterPanel
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceBounds={priceBounds}
        onApply={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
        onReset={() => {
          setMinPrice(undefined);
          setMaxPrice(undefined);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  appName: {
    fontSize: Spacing.font.xl,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  headerRight: { alignItems: 'flex-end', paddingTop: 4 },
  locationBadge: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  locationText: { fontSize: Spacing.font.xs, color: Colors.textSecondary, fontWeight: '600' },
  banner: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: Spacing.radius.xl,
    padding: Spacing.md + 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  bannerContent: { flex: 1 },
  bannerBadge: {
    fontSize: Spacing.font.xs,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: Spacing.font.xl,
    fontWeight: '800',
    color: Colors.white,
    lineHeight: 28,
  },
  bannerSub: {
    fontSize: Spacing.font.sm,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    fontStyle: 'italic',
  },
  bannerEmoji: { fontSize: 52 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: Spacing.font.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionCount: {
    fontSize: Spacing.font.sm,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  grid: { paddingHorizontal: 6, paddingBottom: 100 },
  columnWrapper: { gap: 0 },
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  cartInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cartBadge: {
    backgroundColor: Colors.white,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: Spacing.font.sm,
  },
  cartLabel: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: Spacing.font.md,
  },
  cartTotal: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: Spacing.font.lg,
  },
});
