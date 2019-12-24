import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ArtistAvatar } from "../shared/ArtistAvatar";
import { Text } from "../shared/Text";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

type ArtistProps = {
  name: string;
  mbid: string;
};

type SimilarArtistsProps = {
  artists: ArtistProps[];
};

export const SimilarArtists = ({
  artists,
  refs,
  ownRef
}: SimilarArtistsProps) => {
  return (
    <NativeViewGestureHandler ref={ownRef} simultaneousHandlers={refs}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {artists.map(artist => (
          <View style={styles.artist} key={artist.mbid}>
            <ArtistAvatar mbid={artist.mbid} size="small" />
            <Text style={{ width: 100 }} size="small" weight="bold">
              {artist.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </NativeViewGestureHandler>
  );
};

const styles = StyleSheet.create({
  artist: {
    marginRight: 8
  }
});
