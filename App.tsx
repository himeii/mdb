import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Album from "./src/components/Album/Album";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Deezer API goes here or it doesn't</Text>
      <Album></Album>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
