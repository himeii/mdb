import React, { createRef, useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ArtistAvatar } from "../../components/shared/ArtistAvatar";
import { LastFM } from "../../api/lastfm";
import { SimilarArtists } from "../../components/SimilarArtists/SimilarArtists";
import { Avatar } from "../../components/shared/Avatar";
import uniqBy from "lodash/uniqBy";
import { Text } from "../../components/shared/Text";
import { Screen } from "../../components/shared/Screen";
import { PullToSearchScrollView } from "../../components/shared/PullToSearchScrollView";
import Animated from "react-native-reanimated";
import { SearchContainer } from "../../components/shared/SearchContainer";
import { Search } from "../../components/shared/Search";
import {
  TouchableWithoutFeedback,
  NativeViewGestureHandler
} from "react-native-gesture-handler";

const { Value } = Animated;

type ArtistProps = {
  mbid: string;
};

export const Artist = ({ mbid }: ArtistProps) => {
  const [artist, setArtist] = useState({
    name: "",
    mbid: "",
    bio: {
      summary: ""
    }
  });
  const [similar, setSimilar] = useState([]);
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState(false);
  const translateY = new Value(0);
  const artistRef = React.createRef();
  const viewRef = React.createRef();

  useEffect(() => {
    LastFM.getArtistInfo(mbid).then(response =>
      setArtist(response.data.artist)
    );
    LastFM.getSimilar(mbid).then(response => {
      const {
        similarartists: { artist }
      } = response.data;
      setSimilar(artist.map(({ name, mbid }) => ({ name, mbid })));
    });
    LastFM.getTags(mbid).then(response => {
      const {
        toptags: { tag }
      } = response.data;
      setTags(tag.slice(0, 10));
    });
    LastFM.getAlbums(mbid).then(response => {
      const {
        topalbums: { album }
      } = response.data;
      // const uniqueAlbums = uniqBy(album, "mbid");
      setAlbums(album);
    });
  }, [mbid]);

  return (
    <Screen>
      <SearchContainer {...{ translateY, entity: "artist" }} />

      <PullToSearchScrollView
        translateY={translateY}
        onPull={() => setSearch(true)}
        viewRef={viewRef}
        artistRef={artistRef}
      >
        <Text style={styles.artistName} size="xlarge" weight="black">
          {artist.name}
        </Text>
        <ArtistAvatar mbid={artist.mbid} size="full" />
        <Text weight="bold" size="xsmall">
          {tags.map(tag => tag.name).join(", ")}
        </Text>
        <Text size="large" weight="bold">
          Recordings
        </Text>
        <NativeViewGestureHandler simultaneousHandlers={viewRef}>
          <FlatList
            data={albums}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <View
                pointerEvents="box-only"
                style={{ marginRight: 16 }}
                key={item.name}
              >
                <Avatar
                  uri={
                    item.image.find(i => i.size === "extralarge")["#text"] ||
                    "oleg"
                  }
                  size="medium"
                ></Avatar>
                <Text style={{ width: 150 }} weight="bold">
                  {item.name}
                </Text>
              </View>
            )}
            ref={artistRef}
            horizontal
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        </NativeViewGestureHandler>
        <Text>{artist.bio.summary}</Text>
        <Text size="large" weight="bold">
          Similar artists
        </Text>
        <SimilarArtists artists={similar} />
      </PullToSearchScrollView>
      <Search
        search={search}
        onPress={() => {
          console.log("search", search);
          setSearch(false);
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  artistName: {
    ...StyleSheet.absoluteFillObject,
    elevation: 2,
    top: 8,
    left: 8,
    opacity: 0.9,
    zIndex: 1
  }
});
