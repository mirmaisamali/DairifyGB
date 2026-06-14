import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface IProps {
  emoji: string;
  label: string;
  focused: boolean;
}

const TabIcon = ({ emoji, label, focused }: IProps) => {
  return (
    <View
      style={[tabStyles.iconWrapper, focused && tabStyles.iconWrapperActive]}
    >
      <Text style={tabStyles.iconEmoji}>{emoji}</Text>
      <Text style={[tabStyles.iconLabel, focused && tabStyles.iconLabelActive]}>
        {label}
      </Text>
    </View>
  );
};

export default TabIcon;

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Spacing.radius.md,
    gap: 2,
    minWidth: 60,
  },
  iconWrapperActive: {
    backgroundColor: Colors.primaryLight,
  },
  iconEmoji: { fontSize: 20 },
  iconLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.textMuted,
  },
  iconLabelActive: { color: Colors.primary },
});
