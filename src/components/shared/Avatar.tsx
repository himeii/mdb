import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

const WIDTH = Dimensions.get("screen").width;

export type AvatarProps = {
  uri?: string;
  size: "full" | "xlarge" | "large" | "medium" | "small";
  rounded?: boolean;
  square?: boolean;
};

export const Avatar = ({ size, uri, rounded, square }: AvatarProps) => {
  return (
    <View
      style={[
        styles.container,
        styles[size || "small"],
        rounded && styles.rounded,
        square && styles.square
      ]}
    >
      <Image source={{ uri }} style={[styles.image, styles[size]]} />
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    width: WIDTH,
    borderRadius: 0,
    aspectRatio: 1 / 1
  },
  container: {
    overflow: "hidden",
    borderRadius: 10
  },
  rounded: {
    borderRadius: 300 / 2
  },
  square: {
    borderRadius: 0
  },
  xlarge: {
    height: 300,
    width: 300
  },
  large: {
    height: 200,
    width: 200
  },
  medium: {
    height: 150,
    width: 150
  },
  small: {
    height: 100,
    width: 100
  },
  image: {
    flex: 1,
    resizeMode: "cover"
  }
});
