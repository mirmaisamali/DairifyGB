import { StyleSheet, View } from "react-native";
import SkeletonBox from "./SkeletonBox";
import Colors from "../constants/colors";
import Spacing from "../constants/spacing";

const ProductCardSkeleton = () => {
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
};
export default ProductCardSkeleton;

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
});
