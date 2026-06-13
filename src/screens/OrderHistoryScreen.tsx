import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrders } from '../context/OrdersContext';
import EmptyState from '../components/EmptyState';
import { SkeletonBox } from '../components/Skeleton';
import Colors from '../constants/colors';
import Spacing from '../constants/spacing';
import { Order, RootStackParamList } from '../types';
import { formatOrderDate, formatPrice } from '../utils/format';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function StatusBadge({ status }: { status: Order['status'] }) {
  const isDelivered = status === 'Delivered';
  return (
    <View style={[styles.statusBadge, isDelivered ? styles.statusDelivered : styles.statusPending]}>
      <Text style={[styles.statusText, isDelivered ? styles.statusTextDelivered : styles.statusTextPending]}>
        {isDelivered ? '📦 Delivered' : '⏳ Pending'}
      </Text>
    </View>
  );
}

function OrderCard({ order, onPress }: { order: Order; onPress: () => void }) {
  const itemPreview = order.items
    .slice(0, 3)
    .map(i => i.emoji)
    .join(' ');
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{formatOrderDate(order.date)}</Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.itemPreview}>{itemPreview}</Text>
        <Text style={styles.itemCount}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalVal}>{formatPrice(order.grandTotal)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function OrderHistoryScreen({ navigation }: Props) {
  const { orders, loading } = useOrders();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <Text style={styles.subtitle}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
        </Text>
      </View>

      {loading ? (
        <View style={styles.list}>
          {[1, 2, 3].map(i => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ gap: 6 }}>
                  <SkeletonBox width={120} height={14} />
                  <SkeletonBox width={90} height={10} />
                </View>
                <SkeletonBox width={80} height={22} borderRadius={Spacing.radius.full} />
              </View>
              <SkeletonBox width="100%" height={14} />
            </View>
          ))}
        </View>
      ) : orders.length === 0 ? (
        <EmptyState
          emoji="📦"
          title="No orders yet"
          subtitle="Your placed orders will show up here so you can track them and re-order easily."
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: { fontSize: Spacing.font.xxl, fontWeight: '900', color: Colors.textPrimary },
  subtitle: { fontSize: Spacing.font.sm, color: Colors.textSecondary, marginTop: 2 },
  list: { paddingHorizontal: Spacing.md, paddingBottom: 24, gap: Spacing.sm },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: { fontSize: Spacing.font.md, fontWeight: '800', color: Colors.textPrimary },
  orderDate: { fontSize: Spacing.font.xs, color: Colors.textMuted, marginTop: 2 },
  statusBadge: {
    borderRadius: Spacing.radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusPending: { backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#F59E0B' },
  statusDelivered: { backgroundColor: Colors.primaryLight, borderWidth: 1, borderColor: Colors.primary },
  statusText: { fontSize: Spacing.font.xs, fontWeight: '700' },
  statusTextPending: { color: '#B45309' },
  statusTextDelivered: { color: Colors.primaryDark },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPreview: { fontSize: 22 },
  itemCount: { fontSize: Spacing.font.sm, color: Colors.textSecondary, fontWeight: '500' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
  },
  totalLabel: { fontSize: Spacing.font.sm, color: Colors.textSecondary },
  totalVal: { fontSize: Spacing.font.lg, fontWeight: '800', color: Colors.primary },
});
