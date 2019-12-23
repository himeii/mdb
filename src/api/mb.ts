import Axios from "axios";

const MBAPI = Axios.create({ baseURL: "http://musicbrainz.org/ws/2/" });

MBAPI.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    fmt: "json"
  };
  return config;
});

export const MB = {
  findArtists: name =>
    MBAPI.get(`artist/`, {
      params: {
        query: name
      }
    })
};
