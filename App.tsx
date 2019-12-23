import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import Album from "./src/components/Album/Album";
import { Artist } from "./src/screens/Artist/Artist";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Artist mbid="c9368a03-bf26-40b6-bdfa-9af8d10b568b" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0
  }
});
