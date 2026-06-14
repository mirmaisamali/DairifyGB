import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Category } from "@/types";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

const CATEGORIES: { id: Category; emoji: string }[] = [
  { id: "Milk", emoji: "🥛" },
  { id: "Yogurt & Lassi", emoji: "🫙" },
  { id: "Butter & Ghee", emoji: "🧈" },
];

interface CategoryTabsProps {
  selected: Category;
  onSelect: (cat: Category) => void;
}

const CategoryTabs = ({ selected, onSelect }: CategoryTabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => {
        const active = cat.id === selected;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            activeOpacity={0.8}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={styles.emoji}>{cat.emoji}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>
              {cat.id}
            </Text>
            {active && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.radius.full,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: "relative",
    height: 40,
  },
  tabActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  emoji: { fontSize: 16 },
  label: {
    fontSize: Spacing.font.sm,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  labelActive: { color: Colors.primaryDark },
  dot: {
    position: "absolute",
    bottom: -2,
    left: "50%",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});
