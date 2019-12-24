import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet
} from "react-native";

type TextProps = {
  size?: "xlarge" | "large" | "medium" | "normal" | "small" | "xsmall";
  weight?: "black" | "bold" | "regular" | "thin";
} & RNTextProps;

export const Text = ({
  children,
  size,
  weight,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => {
  return (
    <RNText
      style={[styles[size], styles[weight], styles.color, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  color: {
    color: "white"
  },
  xlarge: {
    fontSize: 48
  },
  large: {
    fontSize: 32
  },
  medium: {
    fontSize: 26
  },
  normal: {
    fontSize: 16
  },
  small: {
    fontSize: 14
  },
  xsmall: {
    fontSize: 12
  },
  black: {
    fontFamily: "Poppins-Black"
  },
  bold: {
    fontFamily: "Poppins-Bold"
  },
  regular: {
    fontFamily: "Poppins-Regular"
  },
  thin: {
    fontFamily: "Poppins-Light"
  }
});

Text.defaultProps = {
  size: "normal",
  weight: "regular"
};
