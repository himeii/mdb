import React from 'react'
import { StyleSheet, View, Image } from "react-native"

export type AvatarProps = {
  uri?: string,
  size: "xlarge" | "large" | "medium" | "small",
  rounded?: boolean,
  square?: boolean
}

export const Avatar = ({size, uri, rounded, square}: AvatarProps) => {
  return (
    <View style={[styles.container, styles[size || "small"], rounded && styles.rounded, square && styles.square ]}>
      <Image source={{uri}} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: 300,
  },
  large: {
    height: 200,
    width: 200,
  },
  medium: {    
    height: 150,
    width: 150,
  },
  small: {    
    height: 100,
    width: 100,
  },
  image: {
    flex: 1,
    resizeMode: "cover"
  }
})