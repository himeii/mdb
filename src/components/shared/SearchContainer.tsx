import React, { ReactElement } from "react";
import Animated from "react-native-reanimated";
import { StyleSheet, Dimensions } from "react-native";
import { Text } from "./Text";
import { bInterpolate } from "react-native-redash";

const width = Dimensions.get("screen").width;
const { interpolate, Extrapolate } = Animated;

interface SearchContainerProps {
  translateY: Animated.Value<number>;
  children?: ReactElement[];
  entity: string;
}

export const SearchContainer = ({
  translateY,
  children,
  entity
}: SearchContainerProps) => {
  const translation = interpolate(translateY, {
    inputRange: [100, 150],
    outputRange: [-width, 14],
    extrapolate: Extrapolate.CLAMP
  });
  const opacity = interpolate(translateY, {
    inputRange: [100, 150],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <Animated.View
      style={[
        styles.searchContainer,
        { transform: [{ translateX: translation }], opacity }
      ]}
    >
      <Text size="large" weight="black">
        Search for an {entity}...
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    height: 150,
    justifyContent: "center",
    position: "absolute"
  }
});
