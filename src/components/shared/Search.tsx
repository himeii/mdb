import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "./Text";
import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

export const Search = ({ search, onPress }) => {
  if (!search) return null;
  console.log(onPress);
  return (
    <View style={styles.search}>
      <Text onPress={onPress}>Search will be here</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={{ width: 40, height: 40, backgroundColor: "red" }}>
          <Feather name="x" color="white" size={32}></Feather>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    position: "absolute",
    left: 24,
    top: 84,
    height: height - 64,
    width: width - 48,
    backgroundColor: "black",
    elevation: 4
  }
});
