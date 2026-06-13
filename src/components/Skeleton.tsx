import { View, StyleSheet } from "react-native";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.gridItem}>
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
};
export default ProductGridSkeleton;

const styles = StyleSheet.create({
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
