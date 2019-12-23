import React from "react";
import { View, Text, Image } from "react-native";
import { FanArt } from "../../api/fanart";
import { MB } from "../../api/mb";

type Props = {
  mdib: string;
};

type State = {
  artistThumb: string;
};

export default class Album extends React.Component<Props, State> {
  state: State = {
    artistThumb: ""
  };

  componentDidMount() {
    FanArt.getArtistImages("49cd96a6-42c3-44f6-ba2a-cd9301046b96").then(
      response => {
        this.setState({ artistThumb: response.data.artistthumb[0].url });
      }
    );
    MB.findArtists("Burzum").then(response => console.log(response));
  }

  render() {
    const { artistThumb } = this.state;
    return (
      <View>
        <Text>49cd96a6-42c3-44f6-ba2a-cd9301046b96</Text>
        <Text>{artistThumb}</Text>
        <View style={{ borderRadius: 50 }}>
          <Image
            source={{ uri: artistThumb || "default" }}
            style={{ height: 100, width: 100 }}
          ></Image>
        </View>
      </View>
    );
  }
}
