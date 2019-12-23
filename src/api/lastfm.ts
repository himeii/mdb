import Axios from "axios";

const LastFMAPI = Axios.create({baseURL: "http://ws.audioscrobbler.com/2.0/"});
const LASTFM_API_KEY = "4af7905801a82a4a436dae078cc1175d"
LastFMAPI.interceptors.request.use(config => ({
  ...config,
  params: {
    ...config.params,
    api_key: LASTFM_API_KEY,
    format: "json"
  }
}))

export const LastFM = {
  getArtistInfo: (mbid) => LastFMAPI.get("/", {params: {
    method: "artist.getinfo",
    mbid
  }}),
  getSimilar: (mbid) => LastFMAPI.get("/", {params: {
    method: "artist.getSimilar",
    mbid,
    limit: 10
  }}),
  getTags: (mbid) => LastFMAPI.get("/", {params: {
    method: "artist.getTopTags",
    mbid,
    limit: 10
  }}),
  getAlbums: (mbid) => LastFMAPI.get("/", {params: {
    method: "artist.getTopAlbums",
    mbid,
  }}),
}