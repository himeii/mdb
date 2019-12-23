import React from "react";
import { View, Text, Image } from "react-native";
import { FanArt } from "../../api/fanart";
import { MB } from "../../api/mb";
import { LastFM } from "../../api/lastfm";


type Props = {
  mbid: string;
};

type State = {
  artistThumb: string;
};

export default class Album extends React.Component<Props, State> {
  state: State = {
    artistThumb: ""
  };

  componentDidMount() {
    FanArt.getArtistImages("bfcc6d75-a6a5-4bc6-8282-47aec8531818").then(
      response => {
        this.setState({ artistThumb: response.data.artistthumb[0].url });
      }
    );
  }

  render() {
    const { artistThumb } = this.state;
    return (
      <View>
      </View>
    );
  }
}
