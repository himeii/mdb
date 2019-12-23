import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArtistAvatar } from '../../components/shared/ArtistAvatar'
import { LastFM } from '../../api/lastfm'
import { SimilarArtists } from '../../components/SimilarArtists/SimilarArtists'
import { Avatar } from '../../components/shared/Avatar'
import uniqBy from "lodash/uniqBy"

type ArtistProps = {
  mbid: string
}

export const Artist = ({mbid}: ArtistProps) => {
  const [artist, setArtist] = useState({});
  const [similar, setSimilar] = useState([]);
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    LastFM.getArtistInfo(mbid).then(response => setArtist(response.data.artist))
    LastFM.getSimilar(mbid).then(response => {
      const {similarartists: {artist}} = response.data;
      setSimilar(artist.map(({name, mbid}) => ({name,mbid})))
    })
    LastFM.getTags(mbid).then(response => {
      const {toptags: {tag}} = response.data;
      setTags(tag.slice(0,10));
    })
    LastFM.getAlbums(mbid).then(response => {
      const {topalbums: {album}} = response.data;
      const uniqueAlbums = uniqBy(album, "mbid");
      setAlbums(uniqueAlbums);
    })
  }, [mbid])
  

  return (
  <View>
    <Text>{artist.name}</Text>
    <ArtistAvatar mbid={artist.mbid} size="xlarge" />
    <SimilarArtists artists={similar} />
    <Text>{tags.map(tag => tag.name).join(", ")}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>  
      {albums.map(album => 
      <View>
        <Avatar key={album.mbid} uri={album.image.find(i => i.size === "extralarge")["#text"]} size="medium"></Avatar>
        <Text>{album.name}</Text>
      </View>
      )}

    </ScrollView>
  
  </View>)
}