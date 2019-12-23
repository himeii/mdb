import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet } from "react-native"
import { useState } from "react"
import { FanArt } from "../../api/fanart"
import Axios, { AxiosResponse } from 'axios'
import { Avatar, AvatarProps } from './Avatar'

const PLACEHOLDER = "http://www.scottishculture.org/themes/scottishculture/images/music_placeholder.png"

type ArtistAvatarProps = {
  mbid: string,
} & AvatarProps

export const ArtistAvatar = ({mbid, size} : ArtistAvatarProps ) => {

  const [uri, setUri] = useState(PLACEHOLDER);
  useEffect(() => {
    FanArt.getArtistImages(mbid).then((response) => {
      setUri(getAvatarFromResponse(response));
    }).catch(() => setUri(PLACEHOLDER) )
  }, [mbid])

  return (
    <Avatar {...{uri, size}} />
  )
}

function getAvatarFromResponse(response: AxiosResponse): string {
  const {data} = response;
  const {artistthumb, hdmusiclogo, artistbackground} = data;
  const existent = [artistthumb, artistbackground].filter(Boolean);
  if (existent.length) {
    return existent[0][0].url
  }

  const {albums} = data;
  const albumsMbid = Object.keys(albums);
  if (albumsMbid.length) {
    const albumCovers = albumsMbid.map(mbid => albums[mbid]);
    console.log(albumCovers)
    const firstAlbum = albumCovers.sort((a,b) => b.albumcover[0].id - a.albumcover[0].id).pop();

    return firstAlbum.albumcover[0].url;
  }

  return PLACEHOLDER;
}

