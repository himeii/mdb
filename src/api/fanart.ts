import Axios from "axios";

const FANART_API_KEY = "97fb5f433da1658a65a25e897d273a65";
const fanArtAPI = Axios.create({
  baseURL: "http://webservice.fanart.tv/v3/music/"
});

export const FanArt = {
  getArtistImages: mbid => {
    const url = `${fanArtAPI.defaults.baseURL}${mbid}?api_key=${FANART_API_KEY}`;
    return fanArtAPI.get(`${mbid}?api_key=${FANART_API_KEY}`);
  }
};
