import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, ViewStyle } from "react-native";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/** A single shimmering placeholder box. */
export function SkeletonBox({
  width = "100%",
  height = 16,
  borderRadius = 8,
  style,
}: SkeletonBoxProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: Colors.borderLight,
          opacity,
        },
        style,
      ]}
    />
  );
}

/** Skeleton placeholder for a ProductCard in the grid. */
export function ProductCardSkeleton() {
  return (
    <View style={styles.card}>
      <SkeletonBox height={110} borderRadius={0} />
      <View style={styles.body}>
        <SkeletonBox height={14} width="80%" style={{ marginBottom: 6 }} />
        <SkeletonBox height={10} width="40%" style={{ marginBottom: 8 }} />
        <SkeletonBox height={10} width="100%" style={{ marginBottom: 4 }} />
        <SkeletonBox height={10} width="70%" style={{ marginBottom: 10 }} />
        <View style={styles.footerRow}>
          <SkeletonBox height={18} width={50} />
          <SkeletonBox
            height={28}
            width={70}
            borderRadius={Spacing.radius.full}
          />
        </View>
      </View>
    </View>
  );
}

/** Grid of N product card skeletons (2 columns). */
export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.gridItem}>
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  body: { padding: Spacing.sm + 4 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 6,
  },
  gridItem: {
    width: "50%",
    padding: 6,
  },
});
