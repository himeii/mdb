import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { Artist } from "./src/screens/Artist/Artist";
import * as Font from "expo-font";

async function loadFonts(setLoaded) {
  await Font.loadAsync({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Light.ttf"),
    Feather: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf")
  });
  setLoaded(true);
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  loadFonts(setLoaded);

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Artist mbid="63aa26c3-d59b-4da4-84ac-716b54f1ef4d" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0
  }
});
