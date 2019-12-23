import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArtistAvatar } from '../shared/ArtistAvatar'

type ArtistProps = {
  name: string,
  mbid: string
}

type SimilarArtistsProps = {
  artists: ArtistProps[]
}

export const SimilarArtists = ({artists}: SimilarArtistsProps) => {
  return (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {
    artists.map(artist => (
      <View key={artist.mbid}>
        <ArtistAvatar mbid={artist.mbid} size="small" />
        <Text>{artist.name}</Text>
      </View>))
    }
  </ScrollView>
  )
}