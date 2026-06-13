import { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";
import Colors from "../constants/colors";

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const SkeletonBox = ({
  width = "100%",
  height = 16,
  borderRadius = 8,
  style,
}: SkeletonBoxProps) => {
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
};
export default SkeletonBox;
