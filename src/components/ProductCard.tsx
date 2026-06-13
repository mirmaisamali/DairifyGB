import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import Colors from '../constants/colors';
import Spacing from '../constants/spacing';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const cartItem = items.find(i => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const favorite = isFavorite(product.id);

  return (
    <View style={styles.card}>
      {/* Emoji placeholder (replace with <Image> later) */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.emojiLarge}>{product.emoji}</Text>
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => toggleFavorite(product.id)}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>Rs {product.price}</Text>

          {qty === 0 ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart(product)}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          ) : (
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
                <Text style={[styles.qtyBtnText, styles.qtyBtnPlusText]}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    margin: 6,
  },
  imagePlaceholder: {
    backgroundColor: Colors.surface,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: { fontSize: 16 },
  emojiLarge: { fontSize: 52 },
  body: { padding: Spacing.sm + 4 },
  name: {
    fontSize: Spacing.font.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  unit: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  description: {
    fontSize: Spacing.font.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: Spacing.font.md,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.radius.full,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  addBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Spacing.font.sm,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  qtyBtnPlus: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  qtyBtnPlusText: { color: Colors.white },
  qtyNum: {
    fontSize: Spacing.font.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
});
