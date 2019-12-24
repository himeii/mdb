import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { PullToSearchScrollView } from "./PullToSearchScrollView";
import Animated from "react-native-reanimated";

const { Value } = Animated;

export const Screen = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<any>) => {
  const translateY = new Value(0);
  return (
    <View style={[styles.screen, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#000",
    flex: 1
  }
});
